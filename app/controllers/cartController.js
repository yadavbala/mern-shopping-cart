const Cart=require('../models/cart')


const cartController={}

cartController.list=(req,res)=>{
    Cart.find({user:req.userId})
        .then((items)=>{
            res.json(items)
        })
        .catch((err)=>{
            res.json(err)
        })
}

cartController.show=(req,res)=>{
    const id=req.params.id
    Cart.findById(id)
        .then((item)=>{
            if(item){
                res.json(item)
            }else{
                res.json({})
            }
        })
        .catch((err)=>{
            res.json(err)
        })
}

cartController.create=(req,res)=>{
    const body=req.body
    const price=body.price
    const user=req.userId
   Cart.findOne({user})
    .then((cart)=>{
        if(cart){
            const productExists=cart.cartItems.find(ele=>ele.product==body.product)
            console.log(productExists)
                if(productExists){
                Cart.findOneAndUpdate({
                    user: user,
                    cartItems: {
                      $elemMatch: { product: body.product }
                    }, 
                  },
                    {
                      $inc: { 'cartItems.$.quantity': body.quantity },
                      total:cart.total+(price*body.quantity),
                      $set: {"cartItems.$.subtotal":productExists.subtotal+(price*body.quantity)}
                    },
                    {new:true,runValidators:true})
                    .exec()
        
                .then((updatedCart)=>{
                   res.json(updatedCart)
                })
            }
            else{
               cart.cartItems.push(body)
               cart.save()
                    .then((cart)=>{
                        res.json(cart)
                    })
            }
        }else{
            console.log('create cart')
           Cart.create({
               user,
               cartItems:[body]
           })
           .then((cart)=>{
               res.json(cart)
           })
           
        }
    })
}



cartController.destroy=(req,res)=>{
    const user=req.userId
    const subtotal=req.query.subtotal
    const total=req.query.total
    const id=req.params.id
    Cart.findOneAndUpdate(
        {user},
        {
        $pull:{cartItems:{_id:id}},
        total:total-subtotal
        },
        {new:true,runValidators:true}
    )
        .then((cart)=>{
            console.log(cart)
            if(cart){
                res.json(cart)
            }
            else{
                res.json({})
            }
        })
        .catch((err)=>{
            console.log(err)
        })
}

module.exports=cartController