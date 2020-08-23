const User=require('../models/user')

const authorize=roles=>(req,res,next)=>{
    User.findById(req.userId)
        .then((user)=>{
           if(roles.includes(user.role)){
               next()
           }else{
               res.status(403).json({errors:'you are not authorized'})
           }
        })
        .catch((err)=>{
            res.json(err)
        })
}

module.exports={authorize}