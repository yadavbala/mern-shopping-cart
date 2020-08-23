const jwt=require('jsonwebtoken');
const { SECRET } = require('../../utils/dotenv');

const authenticate=(req,res,next)=>{
    const authToken=req.headers.authorization
    if(authToken){
        let tokenData;
        try{
             tokenData=jwt.verify(authToken,SECRET)
             req.userId=tokenData.id
            next()
        }
        catch(e){
            throw new Error(e)
        }
    }else{
        res.status(401).json({errors:'token not found'})
    }
}

module.exports={authenticate}