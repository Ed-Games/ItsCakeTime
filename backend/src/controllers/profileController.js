const connection = require('../database/connection')
const ip = require('ip')
const { RemoveFile } = require('../../utils/removeFile')
const prefix = process.env.PROJECT_MODE == 'production'? 'itscaketime-server.herokuapp.com': `${ip.address()}:3333`
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
            const profiles =await connection('profile')
            .join('user','user.id','profile.user_id')
            .select(
                'profile.id',
                'profile.description',
                'profile.whatsapp',
                'profile.user_id',
                'profile.image',
                'profile.specialty',
                'user.userName'
                )

                const serializedProfiles = profiles.map(profile => {
                    return {
                        ...profile,
                        imageUrl: `http://${prefix}/uploads/${profile.image}`
                    }
                })

            return response.status(200).json(serializedProfiles)
        } catch (error) {
            console.log(error)
            return response.sendStatus(500)
        }
    },

    async show(request,response){
        
        try {
            const userName = request.user.name
            const {id} = await connection('user')
            .select('id')
            .where('user.userName','=',userName).first()

            console.log(id)

            const profile = await connection('profile').join('user','user.id','profile.user_id')
            .select('profile.id',
            'profile.user_id', 
            'profile.description',
            'profile.whatsapp',
            'profile.image',
            'profile.specialty',
            'user.userName',
            'user.email',
            'user.userName')
            .where('profile.user_id','=',id).first()

            console.log(profile.image)

            const serealizedProfile = {
                ...profile,
                imageUrl: `http://${prefix}/uploads/${profile.image}`
            }

            return response.json({profile:serealizedProfile})
        } catch (error) {
            console.log(error)
            return response.sendStatus(500)
        }
    },

    async detail(request, response) {
        const {id} = request.params

        try {
            const profile = await connection('profile')
            .join('user','user.id','profile.user_id')
            .select(
                'profile.id',
                'profile.description',
                'profile.user_id',
                'profile.image',
                'profile.whatsapp',
                'profile.specialty',
                'user.email',
                'user.userName'
                )
            .where('profile.id','=', id).first()

            if(!profile) return response.sendStatus(404)

            const serializedProfile = {
                ...profile,
                imageUrl: `http://${prefix}/uploads/${profile.image}`
            }

            return response.json(serializedProfile).status(200)
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
            
            const profile = await connection('profile').join('user','user.id','profile.user_id').select('user.userName','profile.image').where('profile.id','=',id).first()
            
            console.log(profile, user)
            
            if(user!=profile.userName) return response.sendStatus(403)

            if(request.file){
                RemoveFile(profile.image)
                const imageName = request.file.filename
                await connection('profile').select('*').where("profile.id", "=", id).update({
                    ...requestData,
                    image: imageName
                })
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
            const {search} = request.query
            const profiles = await connection('profile')
            .join('user','user.id','profile.user_id')
            .select('user.userName','profile.image','profile.specialty','profile.id').where('user.userName','like',`%${search}%`)

            const serializedProfiles = profiles.map(profile => {
                return {
                    ...profile,
                    imageUrl: `http://${prefix}/uploads/${profile.image}`
                }
            })
            
            return response.json(serializedProfiles)
       } catch (error) {
           console.log(error)
           return response.sendStatus(404)
       }
    }
}