const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


async function registerUser(req, res) {

    try {

        const { username, email, password } = req.body;
        const firstName = req.body?.fullName?.firstName ?? req.body.firstName;
        const lastName = req.body?.fullName?.lastName ?? req.body.lastName;

        const isUserAlreadyExists = await userModel.findOne({
            $or: [
                { username },
                { email }
            ]
        });

        if (isUserAlreadyExists) {
            return res.status(409).json({
                message: "Username or email already exists"
            })
        }

        const hash = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            password: hash,
            fullName: { firstName, lastName }
        })

        const token = jwt.sign({
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }, process.env.JWT_SECRET, { expiresIn: '1d' })

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        })

        res.status(201).json({
            message: "user registered successfully",
            id: user._id,
            username: user.username,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                fullName: user.fullName,
                role: user.role,
                address: user.address
            }
        })
    }

    catch (err) {
        console.log("Error in register User", err);

        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: 'validation error', errors: err.errors });
        }
        res.status(500).json({ message: "internal server error" });
    }


}

async function loginUser(req, res) {
    try {
        const { username, email, password } = req.body;

        const user = await userModel
            .findOne({ $or: [{ email }, { username }] })
            .select('+password');

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password || "");
        if (!isMatch) {
            return res.status(401).json({
                message: 'invalid credentials'
            })
        }

        const token = jwt.sign({
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }, process.env.JWT_SECRET, { expiresIn: '1d' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,

        });

        return res.status(200).json({
            message: 'Logged in Succesfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                fullName: user.fullName,
                role: user.role,
                address: user.address
            }
        });
    }
    catch (err) {
        console.log('Error in loginUser:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    registerUser,
    loginUser
}