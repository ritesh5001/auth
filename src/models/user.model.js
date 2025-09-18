const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String
})

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String
    },
    fullName: {
        firstName: {
            type: String,
            require: true
        },
        lastName: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        enum: ['user', 'seller'],
        default: 'user'
    },
    address: [
        addressSchema
    ]
})

const userModel = mongoose.model('user',userSchema);

module.exports = userModel;