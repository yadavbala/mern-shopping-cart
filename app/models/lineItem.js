const mongoose=require('mongoose')

const Schema=mongoose.Schema

const lineItemSchema=new Schema({
    product:{
        type:Schema.Types.ObjectId,
        ref:'PRODUCT',
        required:true
    },
    quantity:{
        type:Number,
        default:1
    },
    size:{
        type:Number,
        enum:[30,32,34,36,38,40]
    },
    price:{
        type:Number
    },
    subtotal:{
        type:Number
    }
})

module.exports=lineItemSchema