const mongoose=require('mongoose')

const Schema=mongoose.Schema

const reviewSchema=new Schema({
    review:{
        type:Number,
        min:0,
        max:5
    },
    product:{
        type:Schema.Types.ObjectId,
        ref:'Product'
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
})

const Review=mongoose.model('Review',reviewSchema)

module.exports=Review