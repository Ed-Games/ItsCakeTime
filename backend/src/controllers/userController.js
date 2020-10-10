require('dotenv').config()
const connection = require('../database/connection')
const jwt = require('jsonwebtoken')
const {generateAccessToken} = require('../services/authorization')

module.exports = {
    async index(request, response){
        const user = await connection('user').select('*')

        return response.json(user)
    },

    async login(request,response){
        const {userName, password} = request.body
       try {
            const user = await connection('user')
            .select('*')
            .where("user.userName","=",userName)
            .andWhere("user.password","=",password)
            //console.log(user[0].userName)
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
            return response.json({accessToken : accessToken, refreshToken:refreshToken})  

        } catch (error) {
            console.log(error)
           return response.status(500).json("couldn't create a token, try again")
       }


    },

    async logout(request,response){
        const user = request.user.name
        console.log("O QUE IMPORTA È AQUI")
       // refreshTokens = refreshTokens.filter(token => token !== request.body.token)
       await connection('user').where('user.userName','=',user).update({refreshToken: null})
        return response.sendStatus(204)
    },

    async create(request,response){
        //console.log("objeto JSON", request.body)
        const {userName, email, password, whatsapp} = request.body

        await connection('user').insert({
            userName,
            email,
            password,
        })

        id = await connection('user').select('user.id').where('user.email', "=", email)
        //console.log("here is the id need", id)

        user_id = id[0]['id']
        
        await connection('profile').insert({
            user_id,
            whatsapp
        })

        return response.status(201).json("created user")
    },

    async delete(request,response){
        const {id} = request.params
        const user = request.user.name
        const userToDelete = await connection('user').select('*').where("user.id",'=',id)
        //console.log(userToDelete[0]['userName'])

        if (userToDelete[0]['userName']==user){
            const userToDelete = await connection('user').select('*').where("user.id","=",id).delete()
            const profileToDelete = await connection('profile').select("*").where('profile.user_id', "=", id).delete()
            const productsToDelete = await connection('product').select('*').where('product.user_id','=',id).delete()
            return response.json([userToDelete, profileToDelete])
        } else{
            return response.status(403).json("you're not able to delete this account")
        }
    },

    async resetPassword(request,response){
        try {
            const {password} = request.body
            const {id} = request.params
            const user = request.user.name

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
    }
}