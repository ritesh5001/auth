const express = require('express')
const userModel = require('../Model/user.model')
const jwt = require('jsonwebtoken')

router = express.Router()

router.post('/register',async(req,res)=>{
    const{username,password} = req.body

    const user = await userModel.create({
        username,password
    })

const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

    res.status(201).json({
        message:"User Registered Succesfully",
        user,
        token
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

router.get('/user',async(req,res)=>{
    const{token} = req.body

    if(!token){
       return res.status(401)({
        message:"unthorisez access"
       })
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        
        const user = await userModel.findOne({
            _id:decoded.id
        })

        res.status(200).json({
            message:"user data fatched Successfully",
            user
        })

    } catch (error) {
        return res.status(401).json({
            message:"Unathorized Invalid User"
        })
    }

})

module.exports = router