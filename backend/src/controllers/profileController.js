const { request, response } = require('express')
const connection = require('../database/connection')
const { GetRequestUser } = require('../services/authorization')

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

    async show(request,response){
        //console.log(request.user)
        //const userName = request.user.name
        //const userName = user.name
        //console.log("olha",userName)
        const userName = GetRequestUser().name
        const id = await connection('user')
        .select('id')
        .where('user.userName','=',userName)

        const profile = await connection('profile')
        .select('*')
        .where('profile.user_id','=',id[0]['id'])

        return response.json(profile)
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