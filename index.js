const express=require('express')
const configureDB = require('./config/database')
const cors=require('cors')
const app=express()
const chalk=require('chalk')
const {PORT}=require('./utils/dotenv')

const router=require('./config/routes')

app.use(cors())
const port=PORT

app.use(express.json())

app.use(express.static('./public'))

app.use('/',router)

configureDB()


app.use((err,req,res,next)=>{
    res.status(401).json({errors:err.message})
})

app.listen(port,()=>{
   console.log(`${chalk.green('success')} ${chalk.cyanBright(`listening to port,${port}`)}`)
})