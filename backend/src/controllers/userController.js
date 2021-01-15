require('dotenv').config()
const connection = require('../database/connection')
const jwt = require('jsonwebtoken')
const {generateAccessToken} = require('../services/authorization')
const sendMail = require('../services/nodeMailerConfig')

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
        //console.log("objeto JSON", request.body)
        try {
            const {userName, email, password, whatsapp} = request.body

            const trx = await connection.transaction()

            await trx('user').insert({
                userName,
                email,
                password,
            })

            id = await trx('user').select('user.id').where('user.email', "=", email)
            //console.log("here is the id need", id)

            user_id = id[0]['id']
            
            await trx('profile').insert({
                user_id,
                whatsapp
            })

            await trx.commit()

            return response.status(201).json("created user")    
        } catch (error) {
            console.log(error)
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
            const {password} = request.body
            const {id} = request.params
            const user = request.user.name

            console.log(user)

            const userName = await connection('user').select('user.userName').where('user.id','=',id)
            if(userName[0]['userName']!=user){
                return response.sendStatus(403)
            }
            
            const passwdField = await connection('user')
            .select('user.password').where("user.id", "=",id)
            .update({'password':`${password}`})
            return response.json(passwdField)
        } catch (error) {
            console.log(error)
            return response.sendStatus(400)
        }
    },

    async requestNewPassword(request, response) {
        try {
            const email = request.body.email
            sendMail(email)
            return response.sendStatus(200)

        } catch (error) {
            console.log(error)
            response.sendStatus(error.status)
        }
    }
}