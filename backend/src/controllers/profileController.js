const { request } = require('express')
const connection = require('../database/connection')

module.exports = {
    async delete(request,response){
        const {id} = request.params
        await connection('profile').select('*').where("profile.id", "=", id).delete() 
        return response.status(200).json("perfil deletado")
    },

    async index(request,response){
        const profiles =await connection('profile').select('*')

        return response.status(200).json(profiles)
    },

    async update(request,response){
        const {id} = request.params
        const requestData = request.body
        console.log(request.file.path)
        const path = request.file.path
        
        await connection('profile').select('*').where("profile.id", "=", id).update(requestData).update({image:path})

        return response.status(200).json("perfil atualizado")
    }
}