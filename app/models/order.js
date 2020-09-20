
const mongoose=require('mongoose')

const Schema=mongoose.Schema

const orderSchema=new Schema({
    orderItems:{
        type:Array,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    total:{
        type:Number,
        required:true
    },
    address:{
        type:String
    }

},{timestamps:true})

const Order=mongoose.model('Order',orderSchema)

module.exports=Order