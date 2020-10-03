const jwt = require('jsonwebtoken')
require('dotenv').config()


let User = null

function authenticateToken(request,response, next){
    const authHeader = request.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(token==null) return response.sendStatus(401)

    jwt.verify(token,''+process.env.ACCESS_TOKEN, (error,user)=>{
        if(error) return response.sendStatus(403)
        request.user = user
        User = user
        //console.log("olha o user: ", request.user.name)
        next()
    })

}


function GetRequestUser(){
    return User
}

module.exports = {
    authenticateToken,
    GetRequestUser

}
