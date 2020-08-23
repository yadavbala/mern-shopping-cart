const mongoose=require('mongoose')
const {MONGOOSEURI}=require('../utils/dotenv')
const chalk=require('chalk')
const configureDB=()=>{
    mongoose.connect(MONGOOSEURI,{
        useCreateIndex:true,
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>{
        console.log(`${chalk.yellow('connected to db')}`)
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports=configureDB