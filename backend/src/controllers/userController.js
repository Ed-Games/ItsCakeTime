require('dotenv').config()
const connection = require('../database/connection')
const jwt = require('jsonwebtoken')
const {generateAccessToken} = require('../services/authorization')
const sendMail = require('../services/nodeMailerConfig')
const crypto = require('crypto')
const ip = require('ip')

module.exports = {
    async index(request, response){
        try {
            const user = await connection('user').select('*') 
            return response.json(user)
        } catch (error) {
            return response.send(500),json('unable to get users list, try again later')
        }

    },

    async login(request,response){
        if(!request.body.userName || !request.body.password) return response.sendStatus(400)
        const {userName, password} = request.body
       try {
            const user = await connection('user')
            .select('*')
            .where("user.userName","=",userName)
            .andWhere("user.password","=",password)
            if (!user[0].userName) return response.status(404).json("No user found")

       } catch (error) {
           console.log(error)
            return response.sendStatus(400)
       }
        
        try {
            const userauth = {name : userName}
            const accessToken = generateAccessToken(userName)
            const refreshToken = jwt.sign(userauth,''+process.env.REFRESH_TOKEN_SECRET)
            await connection('user').where('user.userName','=',userName).update({refreshToken})
            const data = await connection('user').select('email','id').where('user.userName',userName)
            return response.json({accessToken : accessToken, refreshToken:refreshToken,userName,email: data[0]['email'], id: data[0]['id']})  
 
        } catch (error) {
            console.log(error)
           return response.status(500).json("couldn't create a token, try again")
       }


    },

    async logout(request,response){
        const user = request.user.name
        try {
            await connection('user').where('user.userName','=',user).update({refreshToken: null})
             return response.sendStatus(204)  
        } catch (error) {
            console.log(error)
            return response.status(500).json('internal server error')
        }
    },

    async create(request,response){
        try {
            const {userName, email, password, whatsapp, image} = request.body
 
            const trx = await connection.transaction()

            const hasUserWithTheseCredentials = await trx('user')
            .where('user.email','=',email)
            .orWhere('user.userName','=',userName)
            .count().first()

            console.log("there is a user with these credentials? :",hasUserWithTheseCredentials.count)

            const countResult = process.env.PROJECT_MODE? Number(hasUserWithTheseCredentials.count) : Number(hasUserWithTheseCredentials['count(*)'])

            if(countResult!=0){
                console.log('there is at least one user with these credentials, aborting...')
                trx.rollback()
                return response.status(400).json('A user with this name or e-mail already exists')
            } else {
                console.log('there is no user with these credentials, go ahead')
                await trx('user').insert({
                    userName,
                    email,
                    password,
                })

                const {id} = await trx('user').select('user.id').where('user.email', "=", email).first()
                console.log(id)
                const user_id = id
                await trx('profile').insert({
                    user_id,
                    whatsapp,
                    image: image? image : 'default.png'
                })

                await trx.commit()
            }

            return response.status(201).json("created user")    
        } catch (error) {
            console.log("error: ",error)
            return response.status(500).json('unable to create user or profile, please check if your data is correct and try again')
        }
    },

    async delete(request,response){
        try {
            const {id} = request.params
            const user = request.user.name
            const trx = await connection.transaction()
    
            const userToDelete = await trx('user').select('*').where("user.id",'=',id)
            //console.log(userToDelete[0]['userName'])
    
            if (userToDelete[0]['userName']==user){
                const userToDelete = await trx('user').select('*').where("user.id","=",id).delete()
                const profileToDelete = await trx('profile').select("*").where('profile.user_id', "=", id).delete()
                const productsToDelete = await trx('product').select('*').where('product.user_id','=',id).delete()
                await trx.commit()
                return response.json([userToDelete, profileToDelete])
            } else{
                return response.status(403).json("you're not able to delete this account")
            }
        } catch (error) {
            return response.status(500).json('unable to delete user, please check your data and try again')
        }
    },

    async resetPassword(request,response){
        try {
            const {password, email} = request.body
            const {token} = request.params
            
            const user = await connection('user').select('*').where('email','=', email).first()


            if(!user) {
                return response.status(404).send("user not found")
            }

            if(user.requestPasswdToken != token) {
                return response.status(404).send("token invalid")
            }

            const now = new Date()

            if( now > user.expirationDate) return response.status(400).send("this token is no longer valid, request a new one")
    
            await connection('user')
            .select('password').where("requestPasswdToken", "=",token)
            .update({password})

            const accessToken = generateAccessToken(user.userName)

            return response.json({name:user.userName, email:user.email, id:user.id, accessToken})
        } catch (error) {
            console.log("erro: ",error)
            return response.sendStatus(error)
        }
    },

    async requestNewPassword(request, response) {
        const email = request.body.email

        try {

            const user =  await connection('user').where('email', '=', email).select('userName').first()

            if(!user) return response.sendStatus(404)

            const token = crypto.randomBytes(20).toString('hex')

            const now = new Date()
            now.setHours(now.getHours() + 1)

            console.log("EMAIL: ",email)
            const answer = await connection('user').select('*').where('email','=', email).update({requestPasswdToken:token,expirationDate: now})
            console.log("TOKEN: ",token)
            sendMail(email, token)
            return response.json(answer).status(200)

        } catch (error) {
            console.log(error)
            response.sendStatus(error.status)
        }
    }
}