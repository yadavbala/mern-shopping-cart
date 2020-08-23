require('dotenv').config()

module.exports={
    SECRET:process.env.APP_SECRET,
    PORT:process.env.APP_PORT,
    SECRETADMIN:process.env.APP_SECRETADMIN,
    MONGOOSEURI:process.env.APP_MONGOOSEURI
}