const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phonenumber:{
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false // Initially, the user is not verified
    },
    
    verificationCode: {
        type: String,
        required: true
    },
})

const USER=new mongoose.model('USER',userSchema)

module.exports=USER