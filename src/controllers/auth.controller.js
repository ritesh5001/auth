const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


async function registerUser(req,res){
    const {username,email,password,fullName:{firstName,lastName}} = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    });

    if(isUserAlreadyExists){
        return res.status(409).json({
            message:"Username or email already exists"
        })
    }

    const hash = await bcrypt.hash(password,10);

    const user = await userModel.create({
        username,
        email,
        password:hash,
        fullName:{firstName,lastName}
    })

    const token = jwt.sign({
         id: user._id,
         username:user.username,
         email:user.email,
         role:user.role
    },process.env.JWT_SECRET,{ expiresIn:'1d'})

    res,cookie("token",token,{
        httpOnly:true,
        secure:true,
        maxAge: 24*60*60*1000,
    })
}


module.exports = {
    registerUser
}