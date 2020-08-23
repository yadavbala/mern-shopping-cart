

const mongoose=require('mongoose')

//const Schema=mongoose.Schema

const uploadSchema=new mongoose.Schema({
    image:String
})

module.exports=uploadSchema
