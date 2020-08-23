const mongoose=require('mongoose')


const Schema=mongoose.Schema

const uniquevalidator=require('mongoose-unique-validator')

const uploadSchema=require('./upload')

const productSchema=new Schema({
    name:{
        type:String,
        required:[true,'name is mandatory'],
        unique:true,
        minlength:[2,'product name must be minimum of 2 characters']
    },
    price:{
        type:Number,
        required:[true,'price is required'],
        minlength:[1,'price must be atleast of 1 digit']
    },
    quantity:{
        type:Number,
        default:1
    },
    productPic:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:[true,'description is mandatory'],
        minlength:[10,'product name must be minimum of 10 characters']
    },
    categoryId:{
        type:Schema.Types.ObjectId,
        ref:'Category',
       required:true
    },
    brand:{
        type:String,
        required:true
    },
    size:{
        type:Array,
        required:[true,'size is mandatory']
    }
},{timestamps:true})

productSchema.plugin(uniquevalidator)

const Product=mongoose.model('Product',productSchema)

module.exports=Product