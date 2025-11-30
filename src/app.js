const express = require('express')
const indexRoutes = require('./routes/index.routes')
const authRoute = require('./routes/auth.route')

const app = express()

app.use(express.json())


app.get('/',(req,res,next)=>{
    console.log("Message from Middleware Between App and Router")
    next()
})

app.use('/',indexRoutes)

app.use('/auth',authRoute)

module.exports = app