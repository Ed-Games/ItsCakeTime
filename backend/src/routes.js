const { urlencoded } = require('express')
const express = require('express')
const productController = require('./controllers/productController')
const profileController = require('./controllers/profileController')
const userController = require('./controllers/userController')

const routes = express.Router()

routes.use(express.json())

routes.use(urlencoded({
    extended: true
}))

console.log("routes is on")

routes.get('/users', userController.index) //NOT TO USE IN PRODUCTION

routes.post('/users/create', userController.create)

routes.delete('/users/delete/:id', userController.delete)

routes.put('/users/resetPassword/:id', userController.resetPassword)

routes.delete('/profile/delete/:id',profileController.delete) //NOT TO USE IN PRODUCTION

routes.get('/profile', profileController.index) //NOT TO USE IN PRODUCTION

routes.put('/profile/update/:id', profileController.update)

routes.get('/products', productController.index)

routes.post('/products/create', productController.create)

module.exports = routes