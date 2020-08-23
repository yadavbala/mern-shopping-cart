const User=require('../app/models/user')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
const { SECRET } = require('../utils/dotenv')
const {SECRETADMIN} = require('../utils/dotenv')
const usersregister=(body,response)=>{
    const user=new User(body)
    body.admin==SECRETADMIN ? user.role='admin':'user'
    user.save()
        .then((user)=>{
            response.json(user)
        })
        .catch((err)=>{
            response.json(err)
        })
}

const userslogin=(body,res)=>{
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
}

module.exports={usersregister,userslogin}