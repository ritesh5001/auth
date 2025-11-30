const express = require('express')
const userModel = require('../Model/user.model')

router = express.Router()

router.post('/register',async(req,res)=>{
    const{username,password} = req.body

    const user = await userModel.create({
        username,password
    })
    res.status(201).json({
        message:"User Registered Succesfully",
        user
    })
})

router.post('/login',async(req,res)=>{
    const {username,password} = req.body

    const user = await userModel.findOne({
        username:username
    })

    if(!user){
        return res.status(401).json({
            message:"User Not Registered Yet"
        })
    }

    const isPasswordValid = password == user.password

    if(!isPasswordValid){
        return res.status(401).json({
            message:"Invalid Password"
        })
    }

    res.status(201).json({
        message:"User LoggedIn Successfully"
    })
    
})

module.exports = router