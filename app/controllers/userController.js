const User=require('../models/user')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
const { SECRET } = require('../../utils/dotenv')
const {SECRETADMIN} = require('../../utils/dotenv')
const {usersregister,userslogin}=require('../../helpers/sessionfunc')
const userController={}

userController.register=(req,res)=>{
    const body=req.body
    const user=new User(body)
    body.admin==SECRETADMIN ? user.role='admin':'user'
    user.save()
        .then((user)=>{
            res.json(user)
        })
        .catch((err)=>{
            res.json(err)
        })
}


userController.login=(req,res)=>{
    const body=req.body
    User.findOne({email:body.email})
    .then((user)=>{
        if(user){
            console.log('user',user)
            bcryptjs.compare(body.password,user.password)
                    .then((result)=>{
                        if(result){
                            const obj={id:user._id}
                            const tokenData=jwt.sign(obj,SECRET,{expiresIn:'2d'})
                            console.log(tokenData)
                            res.json({token:tokenData})
                        }else{
                            res.json({errors:'email/password not found'})
                        }
                    })
        }
        else{
            res.json({errors:'email/password not found'})
        }
    })
    .catch((err)=>{
        res.json(err)
    })
}



userController.account=(req,res)=>{
    User.findOne({_id:req.userId})
        .then((user)=>{
            if(user){
                res.json(user)
            }else{
                res.json({})
            }
        })
        .catch((err)=>{
            res.json(err)
        })
}

module.exports=userController