const mongoose=require('mongoose')
const lineItemSchema = require('./lineItem')
const Product=require('./product')
const Schema=mongoose.Schema

const cartSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    cartItems:{
       type:[lineItemSchema],
       required: true,
       validate: {
           validator: function(value){
               if(!value) {
                   return false
               }
               return value.length != 0
           },
           message: "line items cannot be empty"
       }
    },
    total:{
        type:Number,
        default:0
    }
},{timestamps:true})

cartSchema.pre('save', function(next){
    const cart = this 
    console.log(cart)
    let total = 0 
   cart.cartItems.forEach((ele=>{
       ele.subtotal=ele.price*ele.quantity
       total+=ele.subtotal
   }))
   cart.total=total
   next()
})


const Cart=mongoose.model('Cart',cartSchema)

module.exports=Cart