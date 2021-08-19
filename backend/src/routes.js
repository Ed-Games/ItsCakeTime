const { urlencoded } = require('express')
const express = require('express')
const productController = require('./controllers/productController')
const profileController = require('./controllers/profileController')
const userController = require('./controllers/userController')
const upload = require('./services/multerConfig')


const routes = express.Router()
const { authenticateToken, refreshToken } = require('./services/authorization')
const appUrl = process.env.PROJECT_MODE? 'itscaketime:///CreateNewPasswd/' : 'exp://10.0.0.105:19000/--/CreateNewPasswd/'

routes.use(express.json())

routes.use(urlencoded({
    extended: true
}))


!process.env.PROJECT_MODE && routes.get('/users/', userController.index) //NOT TO USE IN PRODUCTION

routes.post('/login', userController.login)

routes.post('/users/register/', userController.create)

routes.delete('/users/delete/:id/',authenticateToken, userController.delete)

routes.delete('/profile/delete/:id/',profileController.delete) //NOT TO USE IN PRODUCTION

routes.get('/profile/', profileController.index) 

routes.get('/profile/show',authenticateToken, profileController.show)

routes.get('/profile/search/',profileController.search)

routes.get('/profile/:id', profileController.detail)

routes.put('/profile/update/:id/',authenticateToken,upload.single('image') ,profileController.update)

routes.get('/products/', productController.index)

routes.post('/products/create/',authenticateToken,upload.single('image'), productController.create)

routes.get('/products/:id/', productController.detail)

routes.get('/product/filter/',productController.filter)

routes.delete('/products/delete/:id',authenticateToken,productController.delete)

routes.put('/products/update/:id',authenticateToken,upload.single('image'), productController.update)

routes.get('/product/myproducts',authenticateToken,productController.listByLoggedUser)

routes.get('/profile/:id/products', productController.listByUserId)

routes.get('/token',authenticateToken,refreshToken)

routes.delete('/logout',authenticateToken, userController.logout)

routes.post('/requestNewPassword', userController.requestNewPassword)

routes.put('/users/resetPassword/:token/', userController.resetPassword)

routes.get('/app/redirect/:token/:email',(request,response)=> {response.redirect(`${appUrl}${request.params.token}/${request.params.email}`);{console.log(`${appUrl}${request.params.token}/${request.params.email}`)}})

module.exports = routes