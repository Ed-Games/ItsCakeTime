const { response } = require('express')
const jwt = require('jsonwebtoken')
require('dotenv').config()


let User = null

let refreshTokens = []

function generateAccessToken(userName){
    const userauth = {name : userName}
    const accessToken = jwt.sign(userauth, ''+process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s'})
    //console.log(userauth)
    return accessToken
}

function refreshToken(request,response){
    const refreshToken = request.body.token
    if (refreshToken == null) {
        console.log('nulo')
        return response.sendStatus(401)
    }

    if (!refreshTokens.includes(''+ refreshToken)){
        console.log('não esta no array')
        return response.sendStatus(403)
    } 

    jwt.verify(refreshToken, ''+process.env.REFRESH_TOKEN_SECRET, (error, user)=>{
        if(error) {
            console.log(error)
            return response.sendStatus(403)
        }
        //console.log("olha o nome do user",user.name)
        const accessToken = generateAccessToken(user.name)

        return response.json(accessToken)
    })
}

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
    GetRequestUser,
    refreshTokens,
    generateAccessToken,
    refreshToken

}
