const Order=require('../models/order')
const User=require('../models/user')
const Product=require('../models/product')
const orderController={}

orderController.create=(req,res)=>{
    const body=req.body
    const order=new Order(body)
    order.user=req.userId
    order.save()
        .then((order)=>{
            const quan=order.orderItems.map(ele=>ele.quantity)
            const prod=order.orderItems.map(ele=>ele.product)
            prod.map(ele=>{
                return quan.map(ele1=>{
                    return Product.findOneAndUpdate(
                        {_id:ele},
                        {$inc:{stock:-ele1,sold:ele1}},
                        {new:true,runValidators:true}
                        )
                        .then((product)=>{
                            console.log(product)
                        })
                        .catch((err)=>{
                            console.log(err)
                        })
                })
               
            })
            res.json(order)
        })
        .catch((err)=>{
            console.log(err)
        })
}

orderController.list=(req,res)=>{
    const user=req.userId
    User.findOne({_id:user})
        .then((user)=>{
            if(user.role=='admin'){
                Order.find()
                .then((orders)=>{
                    res.json(orders)
                })
                .catch((err)=>{
                    console.log(err)
                })
            }
            else{
                Order.find({user:user._id})
                    .then((orders)=>{
                        res.json(orders)
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
            }
           
        })
        .catch((err)=>{
            console.log(err)
        })
   
}

orderController.destroy=(req,res)=>{
    const id=req.params.id
    Order.findByIdAndDelete(id)
        .then((order)=>{
            res.json(order)
        })
        .catch((err)=>{
            res.json(err)
        })
}

module.exports=orderController