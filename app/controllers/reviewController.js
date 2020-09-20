const Review=require('../models/review')

const reviewController={}

reviewController.list=(req,res)=>{
   Review.find()
        .then((review)=>{
            res.json(review)
        })
        .catch((err)=>{
            res.json(err)
        })

}

reviewController.show=(req,res)=>{
    Review.findOne({user:req.userId})
         .then((review)=>{
             res.json(review)
         })
         .catch((err)=>{
             res.json(err)
         })
 
 }

reviewController.create=(req,res)=>{
    const body=req.body
    const review=new Review(body)
    review.user=req.userId
    review.save()
        .then((review)=>{
            res.json(review)
        })
        .catch((err)=>{
            console.log(err)
        })
}

module.exports=reviewController