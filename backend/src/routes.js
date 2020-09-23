const { urlencoded } = require('express')
const express = require('express')
const userController = require('./controllers/userController')

const routes = express.Router()

routes.use(express.json())

routes.use(urlencoded({
    extended: true
}))

console.log("routes is on")

routes.get('/users', userController.index)

routes.post('/users/create', userController.create)

module.exports = routes