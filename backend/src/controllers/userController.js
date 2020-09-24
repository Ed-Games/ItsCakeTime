const { query } = require('express')
const connection = require('../database/connection')

module.exports = {
    async index(request, response){
        const user = await connection('user').select('*')

        return response.json(user)
    },

    async create(request,response){
        console.log("objeto JSON", request.body)
        const {userName, email, password, whatsapp} = request.body

        await connection('user').insert({
            userName,
            email,
            password,
            whatsapp
        })


        return response.status(201).json("created user")
    },

    async delete(request,response){
        const {id} = request.params
        const userToDelete = await connection('user').select('*').where("user.id","=",id).delete();
        return response.json(userToDelete)
    },

    async resetPassword(request,response){
        const {password} = request.body
        const {id} = request.params
        const passwdField = await connection('user').select('user.password').where("user.id", "=",id).update({'password':`${password}`})
        return response.json(passwdField)
    }
}