const express = require('express')
const userModel = require('../models/user.model')

const router = express.Router()

router.post('/register',async(req,res)=>{
    const{username,password} = req.body;
    const user = userModel.create({
        username,password
    })
    res.status(201).json({
        message:"User registered Successfully",
        user
    })
})

router.post('/login',async(req,res)=>{
    const{username,password} = req.body;
    const isUserExist = await userModel.findOne({
        username:username
    })

    if(!isUserExist){
        return res.status(401).json({
            message:"User Not found"
        })
    }
    const isPasswordValid = password == isUserExist.password
    if(!isPasswordValid){
        return res.status(401).json({
            message:"password is incorrect"
        })
    }

    return res.status(201).json({
        message:"User Logged in Successullyy"
    })
})

module.exports = router