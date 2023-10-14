const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const USER = mongoose.model("USER");
const admin = require("./models/adminlog");
const doc = require("./models/doclog");
const rec = require("./models/reclog");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const SECRET_KEY = "priyanka";

//const requireLogin = require("../middleware/middleware");


const bodyParser = require('body-parser');
const axios = require('axios');

router.use(bodyParser.json());

router.post('/signup', async (req, res) => {
    const { name, email, password, phonenumber } = req.body;

    if (!email || !password || !name || !phonenumber) {
        return res.status(400).json({ message: 'Email, name, password, and phone number are required' });
    }

    const existingUser = await USER.findOne({ $or: [{ email }, { phonenumber }] });
    if (existingUser) {
        return res.status(409).json({ message: 'Email or phone number is already registered' });
    }

    const verificationCode = Math.floor(1000 + Math.random() * 9000);

    const newUser = new USER({
        name,
        email,
        password,
        phonenumber,
        verificationCode, // Store the verification code (you might want to hash it)
        isVerified: false // Initially mark the user as not verified
    });

    await newUser.save();

    // Send verification code via 2Factor.in API
    try {
        const response = await axios.get(`https://2factor.in/API/V1/3ce33ac7-6149-11ee-addf-0200cd936042/SMS/${phonenumber}/${verificationCode}`);

        return res.status(200).json({ message: 'User registered successfully. Verification code sent.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to send verification code' });
    }
});






router.post('/verify-otp-signup', async (req, res) => {
    const { phonenumber, verificationCode } = req.body;

    try {
      const user = await USER.findOne({ phonenumber });

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      if (user.verificationCode === verificationCode) {
          user.isVerified = true;
          await user.save();
          return res.status(200).json({ message: 'Phone number verified successfully' });
      } else {
          return res.status(401).json({ message: 'Invalid verification code' });
      }
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
  }
    
});

async function sendOTP(phonenumber, otp) {
  try {
      const response = await axios.get(
        `https://2factor.in/API/V1/3ce33ac7-6149-11ee-addf-0200cd936042/SMS/${phonenumber}/${otp}`
      );

      // Check the response from 2Factor API for success or handle errors accordingly
      if (response.data.Status === 'Success') {
          
          console.log('OTP sent successfully via 2Factor API');
      } else {
          console.error('Failed to send OTP via 2Factor API:', response.data.Details);
      }
  } catch (error) {
      console.error('Error sending OTP via 2Factor API:', error.message);
  }
}



router.post('/signin', async (req, res) => {
  const { phonenumber } = req.body;

    try {
        // Find the user based on the provided phone number
        const user = await USER.findOne({ phonenumber });

        // If the user is not found, return an error response
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate a random 4-digit OTP
        const otp = Math.floor(1000 + Math.random() * 9000);

        // Save the OTP to the VerificationCode collection for verification
        await USER.findOneAndUpdate(
            { phonenumber },
            { $set: { verificationCode: otp } },
            { upsert: true, new: true }
        );

        // Send the OTP to the user via SMS or email using your sendOTP function
        sendOTP(phonenumber, otp);

        return res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/verify-otp-signin', async (req, res) => {
  const { phonenumber, verificationCode } = req.body;

    try {
        // Find the user based on the provided phone number
        const user = await USER.findOne({ phonenumber });

        // If the user is not found, return an error response
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the provided verification code matches the stored OTP
        if (user.verificationCode !== verificationCode) {
            return res.status(401).json({ message: 'Invalid OTP' });
        }

        // Generate a JWT token for authentication
        const token = jwt.sign({ userId: user._id, phonenumber: user.phonenumber }, 'YOUR_SECRET_KEY', {
            expiresIn: '1h' // Token expires in 1 hour (you can adjust the expiration time)
        });

        // Send a success response with the token
        return res.status(200).json({ message: 'Sign in successful', token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});









router.get("/stafflogin",(req,res) => {
    res.json(admin)
    res.json(doc)
    res.json(rec)
})



module.exports = router;