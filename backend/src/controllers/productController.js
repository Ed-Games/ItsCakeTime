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
    }
}