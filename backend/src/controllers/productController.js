const connection = require('../database/connection');


module.exports = {
    async index(request,response){
        try {
            const products = await connection('product')
            .join('user','user.id','product.user_id')
            .join('profile','profile.user_id','product.user_id')
            .select('product.name',
            'product.price',
            'product.category',
            'product.image',
            'product.detail',
            'product.id',
            'user.email',
            'profile.whatsapp'
            )

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
        return response.json(product[0])
       } catch (error) {
           console.log(error)
           return response.sendStatus(404)
       }
    },

    async filter(request,response){
        try {
            const {price, category} = request.query

            console.log(request.body)

            const products = await connection('product')
            .join('user','user.id','=',"product.user_id")
            .join('profile','profile.user_id','=','product.user_id')
            .select(
                'product.price',
                'product.category',
                'product.image',
                'product.name',
                'product.id',
                'profile.whatsapp',
                'user.email'
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
        if(!request.params.id || !request.body) return response.sendStatus(400)
        const {id} = request.params
        const data = request.body
        const user = request.user.name

        const productUser = await connection('product')
        .join('user','user.id','product.user_id')
        .select('user.userName')
        .where('product.id','=',id)

        //console.log(user, productUser[0]['userName'])
        console.log(data)
        if(productUser[0]['userName']!=user) return response.sendStatus(403)

        if(request.file){
            const imageName = request.file.path

            await connection('product')
            .select('*')
            .where('id','=',id)
            .update(data).update({image:imageName})
        } else{

            await connection('product')
            .select('*')
            .where('id','=',id)
            .update(data)
        }

        return response.json(data)
       } catch (error) {
           console.log(error)
           return response.sendStatus(500)
       }
    },

    async listByLoggedUser(request, response){
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

    async listByUserId(request,response) {
        console.log("loading...")
        try {
            const userId = request.params.id
            const products = await connection('product')
            .join('user','user.id','product.user_id')
            .select('product.name',
            'product.detail',
            'product.category',
            'product.image',
            'product.price',
            'product.id'
            ).where('user.id','=', userId)

            return response.json(products)

        } catch (error) {
            console.log(error)
            return response.sendStatus(500)
        }
    }

}