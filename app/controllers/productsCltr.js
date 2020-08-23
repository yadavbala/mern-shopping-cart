
const Product=require('../models/products')

const uploadSchema=require('../models/upload')
const productsCltr={}


productsCltr.list=(req,res)=>{
    Product.find()
            .then((products)=>{
               res.json(products)
            })
            .catch((err)=>{
                res.json(err)
            })
}

/*productsCltr.upload=(req,res)=>{
    console.log(req.file)
   
   const upload=new uploadSchema({image:req.file.path})

   console.log(upload)
   //res.redirect('back')
}*/

productsCltr.create=(req,res)=>{
    const body=req.body
   console.log(req.body)
   
    console.log(req.file)
    body.productPic=req.file.path
   
    const product=new Product(body)
    product.save()
            .then((product)=>{
                res.json(product)
            })
            .catch((err)=>{
                res.json(err)
            })
}

module.exports=productsCltr