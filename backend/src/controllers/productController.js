const { response } = require('express');
const connection = require('../database/connection');


module.exports = {
    async index(request,response){
        try {
            const products = await connection('product').select('name','price','category','image','detail','id');
            return response.json(products)
        } catch (error) {
            console.log(error)
            return response.sendStatus(500)
        }
    },

    async create(request,response){
        try {
            const user = request.user.name
            const id = await connection('user').select('id').where('user.userName','=',user)
            const user_id = id[0]['id']
            const {price, detail,category,name} = request.body;
            console.log("ioiioioioioioioioio", user_id)
            await connection('product').insert({
                price,
                detail,
                category,
                user_id,
                image: request.file.path,
                name
            })

            return response.status(201).json("product created");
        } catch (error) {
            console.log(error)
            return response.sendStatus(500)
        }
    },

    async detail(request,response){
       try {
        const {id} = request.params
        const product = await connection('product')
        .join('user','user.id','=','product.user_id')
        .join('profile','profile.user_id','=','product.user_id')
        .select('product.detail',
        'product.price',
        'product.category',
        'product.image',
        'product.name',
        'profile.whatsapp',
        'user.email',
        'user.userName',
        ).where('product.id','=',id)
        return response.json(product)
       } catch (error) {
           console.log(error)
           return response.sendStatus(404)
       }
    },

    async filter(request,response){
        try {
            const {price, category} = request.body
            const products = await connection('product')
            .join('user','user.id','=',"product.user_id")
            .join('profile','profile.user_id','=','product.user_id')
            .select(
                'product.price',
                'product.category',
                'product.image',
                'product.name',
                'product.id'
                )
            .where("product.price","=",price)
            .andWhere("product.category","=",category)
            return response.json(products)
        } catch (error) {
            console.log(error)
            return response.sendStatus(400)
        }
    },

    async delete(request,response){
        try {
            if(!request.params.id) return response.sendStatus(400)

            const {id} = request.params
            const user = request.user.name
            const productUser =  await connection('product')
            .join('user','user.id','product.user_id')
            .select('user.username')
            .where('product.id','=',id)

            console.log("alert:",user,productUser)
            if(user!=productUser[0]['userName']) return response.sendStatus(403)

            const productToDelete = await connection('product').select('*').where('product.id','=',id).delete()
            return response.json(productToDelete)
        } catch (error) {
            console.log(error)
            return response.sendStatus(500)
        }
    },

    async update(request,response){
       try {
        if(!request.params.id || !request.body.product) return response.sendStatus(400)
        const {id} = request.params
        const product = request.body
        const user = request.user.name

        const productUser = await connection('product')
        .join('user','user.id','product.user_id')
        .select('user.userName')
        .where('product.id','=',id)

        console.log(user, productUser)
        if(productUser[0]['userName']!=user) return response.sendStatus(403)

        await connection('product')
        .select('*')
        .where('product.id','=',id)
        .update(product)

        return response.json(product)
       } catch (error) {
           console.log(error)
           return response.sendStatus(500)
       }
    },

    async list(request, response){
       try {
        const user = request.user.name
        const products = await connection('product')
        .join('user','user.id','product.user_id')
        .select('product.name',
        'product.detail',
        'product.category',
        'product.image',
        'product.price',
        'product.id'
        ).where('user.userName','=', user)
    
        return response.json(products)
       } catch (error) {
           console.log(error)
           return response.sendStatus(500)
       }
    },

    async edit(request,response){
        try {
            if(!request.body || !request.params.id) return response.sendStatus(400)
            const user = request.user.name
            const {id} = request.params
            const data = request.body

            const profileUser = await connection('product')
            .join('user','user.id','product.user_id')
            .select('user.userName')
            .where('product.id','=',id)

            console.log(profileUser)

            if(user!=profileUser[0]['userName']) return response.sendStatus(403)

            const editedProduct = await connection('product')
            .join('user','user.id','product.user_id')
            .select('*')
            .where('product.id','=',id)
            .update(data)

            return response.json(editedProduct)
        } catch (error) {
            console.log(error)
            return response.sendStatus(500)
        }

    }

}