const { response } = require('express');
const connection = require('../database/connection');


module.exports = {
    async index(request,response){
        const products = await connection('product').select('name','price','category','image');
        return response.json(products)
    },

    async create(request,response){
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
    },

    async detail(request,response){
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
    },

    async filter(request,response){
        const {price, category} = request.body
        const products = await connection('product')
        .join('user','user.id','=',"product.user_id")
        .join('profile','profile.user_id','=','product.user_id')
        .select(
            'product.price',
            'product.category',
            'product.image',
            'product.name',
            )
        .where("product.price","=",price)
        .andWhere("product.category","=",category)
        return response.json(products)
    },

    async delete(request,response){
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
    },

    async update(request,response){
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
    },

    async list(request, response){
        const user = request.user.name
        console.log("aaaaaaaaaaaaaaaaa",user)
        const products = await connection('product')
        .join('user','user.id','product.user_id')
        .select('product.name',
        'product.detail',
        'product.category',
        'product.image',
        'product.price',
        ).where('user.userName','=', user)
    

        return response.json(products)
    },

    async edit(request,response){
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

    }

}