const { request, response } = require('express')
const connection = require('../database/connection')
const { use } = require('../routes')
const { GetRequestUser } = require('../services/authorization')

module.exports = {
    async delete(request,response){
        try {
            const {id} = request.params
            await connection('profile').select('*').where("profile.id", "=", id).delete() 
            return response.status(200).json("profile deleted")
        } catch (error) {
            console.log(error)
            return response.sendStatus(500)
        }
    },

    async index(request,response){
        try {
            const profiles =await connection('profile').select('*')
            return response.status(200).json(profiles)
        } catch (error) {
            console.log(error)
            return response.sendStatus(500)
        }
    },

    async show(request,response){
        try {
            const userName = GetRequestUser().name
            const id = await connection('user')
            .select('id')
            .where('user.userName','=',userName)

            const profile = await connection('profile')
            .select('*')
            .where('profile.user_id','=',id[0]['id'])

            return response.json(profile)
        } catch (error) {
            console.log(error)
            return response.sendStatus(500)
        }
    },

    async update(request,response){
        try {
            const {id} = request.params
            const requestData = request.body
            const user = request.user.name
            
            const profileUser = await connection('profile').join('user','user.id','profile.user_id').select('user.userName').where('profile.id','=',id)
            
            console.log(profileUser[0]['userName'], user)
            
            if(user!=profileUser[0]['userName']) return response.sendStatus(403)

            if(request.file){
                const path = request.file.path
                await connection('profile').select('*').where("profile.id", "=", id).update(requestData).update({image:path})
        } else {
                await connection('profile').select('*').where("profile.id", "=", id).update(requestData)
        }

            return response.status(200).json("profile updated")
        } catch (error) {
            console.log(error)
            return response.sendStatus(500)
        }
    },

    async search(request,response){
       try {
            const {search} = request.body
            const users = await connection('profile')
            .join('user','user.id','profile.user_id')
            .select('user.userName','profile.image','profile.specialty').where('user.userName','=',search)

            return response.json(users)
       } catch (error) {
           console.log(error)
           return response.sendStatus(404)
       }
    }
}