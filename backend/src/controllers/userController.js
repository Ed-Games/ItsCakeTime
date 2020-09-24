const { query } = require('express')
const connection = require('../database/connection')

module.exports = {
    async index(request, response){
        const user = await connection('user').select('*')

        return response.json(user)
    },

    async create(request,response){
        console.log("objeto JSON", request.body)
        const {userName, email, password} = request.body

        await connection('user').insert({
            userName,
            email,
            password
        })

        return response.status(201).json("created user")
    },

    async delete(request,response){
        const {id} = request.params
        const userToDelete = await connection('user').select('*').where("user.id","=",id).delete();
        return response.json(userToDelete)
    }
}