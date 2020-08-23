const mongoose=require('mongoose')

const Schema=mongoose.Schema

const uniquevalidator=require('mongoose-unique-validator')
const categorySchema=new Schema({
    title:{
        type:String,
        required:[true,'category is required'],
        unique:[true,'category already exists'],
        minlength:[3,'category should be minimum of 3 characters']
    },
    description:{
        type:String,
        required:[true,'description is required'],
        minlength:[8,'category should be minimum of 8 characters']
    }
},{timestamps:true})

categorySchema.plugin(uniquevalidator)

const Category=mongoose.model('Category',categorySchema)

module.exports=Category