const express = require('express');


const router = express.Router();

router.get('/',(req,res)=>{
    res.json({messgae:'Welcome to the Middleware Project'});
})
 

module.exports = router;