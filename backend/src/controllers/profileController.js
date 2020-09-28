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
        console.log("oioioioioioioioio")
        const {id} = request.params
        const requestData = request.body

        await connection('profile').select('*').where("profile.id", "=", id).update(requestData)

        return response.status(200).json("perfil atualizado")
    }
}