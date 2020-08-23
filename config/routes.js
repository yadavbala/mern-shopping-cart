const express=require('express')

const router=express.Router()

const multer=require('multer')
const multerConf=require('../app/middlewares/upload')

const usersCltr=require('../app/controllers/usersCltr')
const categoriesCltr=require('../app/controllers/categoriesCltr')
const {authenticate} = require('../app/middlewares/authenticate')
const {authorize}=require('../app/middlewares/authorize')
const productsCltr = require('../app/controllers/productsCltr')

router.post('/api/users/register',usersCltr.register)
router.post('/api/users/login',usersCltr.login)


router.get('/api/account',authenticate,usersCltr.account)
router.get('/api/categories',authenticate,authorize(['admin']),categoriesCltr.list)
router.get('/api/categories/:id',authenticate,authorize(['admin']),categoriesCltr.show)
router.post('/api/categories',authenticate,authorize(['admin']),categoriesCltr.create)
router.put('/api/categories/:id',authenticate,authorize(['admin']),categoriesCltr.update)
router.delete('/api/categories/:id',authenticate,authorize(['admin']),categoriesCltr.destroy)

router.get('/api/products',authenticate,authorize(['user','admin']),productsCltr.list)
//router.get('/api/products/:id',authenticate,authorize(['user','admin']),productsCltr.show)
router.post('/api/products',authenticate,authorize(['admin']),multer(multerConf).single('photo'),productsCltr.create)
//router.post('/api/upload',authenticate,authorize(['admin']),multer(multerConf).single('photo'),productsCltr.upload)
/*router.put('/api/products/:id',authenticate,authorize(['admin']),productsCltr.update)
router.delete('/api/products/:id',authenticate,authorize(['admin']),productsCltr.destroy)*/

module.exports=router