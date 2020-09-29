const connection = require('../database/connection');


module.exports = {
    async index(request,response){
        const products = await connection('product').select('*');
        return response.json(products)
    },

    async create(request,response){
        const {price, detail,category,user_id, image} = request.body;
        console.log("ioiioioioioioioioio")
        await connection('product').insert({
            price,
            detail,
            category,
            user_id,
            image
        })

        return response.status(201).json("product created");
    },

    async detail(request,response){
        const {id} = request.params
        const product = await connection('product').select('*').where('product.id','=',id)
        return response.json(product)
    },

    /*async filter(request,response){
        const{price, userName, category} = request.body
        const {product, profile}=await connection('product')
        .join('profile','profile.user_id','=','product.user_id')
        .select('*').where()
        const products = await connection('product').select('*');
        return response.json(products)
        
    },*/

    async filter(request,response){
        const {price, category, userName} = request.body
        const products = await connection('product')
        .join('user','user.id','=',"product.user_id")
        .select('*')
        .where("user.userName","=", userName)
        .andWhere("product.price","=",price)
        .andWhere("product.category","=",category)
        return response.json(products)
    }
}