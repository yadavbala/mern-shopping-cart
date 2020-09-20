const express=require('express')

const router=express.Router()

const multer=require('multer')
const multerConf=require('../app/middlewares/upload')

const usersCltr=require('../app/controllers/userController')
const categoryController=require('../app/controllers/categoryController')
const {authenticate} = require('../app/middlewares/authenticate')
const {authorize}=require('../app/middlewares/authorize')
const productController = require('../app/controllers/productController')
const cartController=require('../app/controllers/cartController')
const orderController=require('../app/controllers/orderController')

const reviewController = require('../app/controllers/reviewController')

router.post('/api/users/register',usersCltr.register)
router.post('/api/users/login',usersCltr.login)


router.get('/api/account',authenticate,usersCltr.account)
router.get('/api/categories',authenticate,authorize(['user','admin']),categoryController.list)
router.get('/api/categories/:id',authenticate,authorize(['user','admin']),categoryController.show)
router.post('/api/categories',authenticate,authorize(['admin']),categoryController.create)
router.put('/api/categories/:id',authenticate,authorize(['admin']),categoryController.update)
router.delete('/api/categories/:id',authenticate,authorize(['admin']),categoryController.destroy)

router.get('/api/products',authenticate,authorize(['user','admin']),productController.list)
router.get('/api/products/:id',authenticate,authorize(['user','admin']),productController.show)
router.post('/api/products',authenticate,authorize(['admin']),multer(multerConf).single('photo'),productController.create)
router.put('/api/products/:id',authenticate,authorize(['admin']),multer(multerConf).single('photo'),productController.update)
router.delete('/api/products/:id',authenticate,authorize(['admin']),productController.destroy)

router.post('/api/cart',authenticate,authorize(['user']),cartController.create)
router.get('/api/cart',authenticate,authorize(['user']),cartController.list)
router.get('/api/cart/:id',authenticate,authorize(['user']),cartController.show)
router.delete('/api/cart/:id',authenticate,authorize(['user']),cartController.destroy)

router.post('/api/orders',authenticate,authorize(['user','admin']),orderController.create)
router.get('/api/orders',authenticate,authorize(['user','admin']),orderController.list)
router.delete('/api/orders/:id',authenticate,authorize(['user','admin']),orderController.destroy)

router.get('/api/productreview',authenticate,authorize(['user','admin']),reviewController.list)
router.get('/api/productreview',authenticate,authorize(['user','admin']),reviewController.show)
router.post('/api/productreview',authenticate,authorize(['user','admin']),reviewController.create)

module.exports=router