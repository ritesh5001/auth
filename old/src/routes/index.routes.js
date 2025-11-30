const express = require("express");
const router = express.Router();

router.use((req,res,next)=>{
    console.log("This is the middleware between Router and API")
    next()
})

router.get('/',(req,res)=>{
    res.json({
        message:"This is the Route Message"
    })
})


module.exports = router