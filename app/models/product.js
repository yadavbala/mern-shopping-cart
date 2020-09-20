const mongoose=require('mongoose')


const Schema=mongoose.Schema

const uniquevalidator=require('mongoose-unique-validator')


const productSchema=new Schema({
    name:{
        type:String,
        required:[true,'name is mandatory'],
        unique:true,
        minlength:[2,'product name must be minimum of 2 characters'],
        sparse:true
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
    description:{
        type:String,
        required:[true,'description is mandatory'],
        minlength:[10,'product name must be minimum of 10 characters']
    },
    categoryId:{
        type:Schema.Types.ObjectId,
        ref:'Category',
       required:[true,'category is mandatory']
    },
    brand:{
        type:String,
        required:[true,'brand is mandatory']
    },
    productPic:{
        type:String
    },
    stock:{
        type:Number,
        default:0
    },
    sold:{
        type:Number,
        default:0
    }
    
},{timestamps:true})

productSchema.plugin(uniquevalidator)

productSchema.index({name:'text'})

const Product=mongoose.model('Product',productSchema)

module.exports=Product