const mongoose=require('mongoose')
const isEmail=require('validator/lib/isEmail')
const isNumeric=require('validator/lib/isNumeric')
const bcryptjs=require('bcryptjs')
const mongooseuniquevalidator=require('mongoose-unique-validator')
const Schema=mongoose.Schema

const userSchema=new Schema({
    username:{
        type:String,
        unique:[true,'username already exists'],
        minlength:[3,'username must atleast have 3 characters'],
        trim:true,
        required:[true,'username is mandatory']
    },
    email:{
        type:String,
        unique:[true,'email already exists'],
        trim:true,
        required:[true,'email is mandatory'],
        validate:{
            validator:function(value){
                return isEmail(value)
            },
            message:function(){
                return 'Invalid Email format'
            }
        }
    },
    password:{
        type:String,
        required:[true,'password is mandatory'],
        minlength:[8,'password must be minimum of 8 characters'],
        maxlength:[128,'password must be maximum of 128 characters']
    },
    mobile:{
        type:Number,
        minlength:[10,'mobile number must be minimum of 10 digits'],
        maxlength:[10,'mobile number must be maximum of 10 digits'],
        required:[true,'mobile number is mandatory']
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    address:{
        type:String
    }
},{timestamps:true})

userSchema.plugin(mongooseuniquevalidator)

userSchema.pre('save',function(next){
    const user=this
    bcryptjs.genSalt()
            .then((salt)=>{
                bcryptjs.hash(user.password,salt)
                        .then((encryptedpassword)=>{
                            user.password=encryptedpassword
                            next()
                        })
                        .catch((err)=>{
                          console.log(err)
                        })
            })
            .catch((err)=>{
               console.log(err)
            })
})

const User=mongoose.model('User',userSchema)

module.exports=User

