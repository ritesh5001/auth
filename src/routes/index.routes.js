const express = require('express')

const router = express.Router()

router.get('/',(req,res,next)=>{
    console.log("Message from the Middleware Between Router and API")
    next()
})

router.get('/',(req,res)=>{
    res.json({
        message:"Message from index router"
    })
})


module.exports = router