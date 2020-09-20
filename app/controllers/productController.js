
const Product=require('../models/product')

const productController={}


productController.list=(req,res)=>{
    console.log(req.query)
    let sortresult=req.query.sort?req.query.sort:'asc'
    let searchterm=req.query.search
    let min=req.query.min ? req.query.min:0
    let max=req.query.max ? req.query.max:5000
    if(searchterm){
        Product.find({ $text: { $search: searchterm } })
        .sort({price:sortresult})
      .exec((err,products)=>{
      if(err)
         return  res.status(400).json({errors:err})
         res.json(products)
    })
    }
    
    else{
        Product.find()
        .find({price:{$gt:min,$lt:max}})
        .sort({price:sortresult})
      .exec((err,products)=>{
      if(err)
         return  res.status(400).json({errors:err})
         res.json(products)
    })
    }
  
}

productController.create=(req,res)=>{
    console.log(req.file)
    const body=req.body
    //body.productPic=req.file.filename
    let dest,imagePath
    if(req.file){
        dest = req.file.destination
        imagePath = 'http://localhost:3055/'+dest + req.file.filename;
        body.productPic=imagePath
    } 
    const product=new Product(body)
        console.log(product)
        product.save()
                .then((product)=>{
                    res.json(product)
                })
                .catch((err)=>{
                    res.json(err)
                })
}

productController.show=(req,res)=>{
    const id=req.params.id
    Product.findById(id)
            .then((product)=>{
                if(product){
                   res.json(product) 
                }else{
                    res.json({})
                }
            })
            .catch((err)=>{
                res.json(err)
            })
}

productController.update=(req,res)=>{
    let dest,imagePath
    const id=req.params.id
    const body=req.body
    if(req.file){
         dest = req.file.destination
         imagePath = 'http://localhost:3055/'+dest + req.file.filename;
        body.productPic=imagePath
    }
    
        Product.findByIdAndUpdate(id,body,{new:true,runValidators:true,context:'query'})
        .then((product)=>{
            if(product){
                res.json(product)
            }else{
                res.json({})
            }
        })
        .catch((err)=>{
            res.json(err)
        }) 
    
   
}

productController.destroy=(req,res)=>{
    const id=req.params.id
    Product.findByIdAndDelete(id)
            .then((product)=>{
                if(product){
                    res.json(product)
                }else{
                    res.json({})
                }
            })
            .catch((err)=>{
                res.json(err)
            })
}


module.exports=productController