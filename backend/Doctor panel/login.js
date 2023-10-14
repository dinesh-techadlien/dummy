const mongoose = require("mongoose");
const Doctor = mongoose.model("Doctor");
const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your-secret-key'; // Replace with a long, secure random string
const app = express();

app.post('/doctor-login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if a doctor with the provided email exists in the database
      const doctor = await Doctor.findOne({ email });
  
      // If the doctor doesn't exist, send an error response
      if (!doctor) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Check if the provided password matches the stored password hash
      if (doctor.password !== password) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Generate a JWT token with the doctor's ID and role
      const token = jwt.sign({ id: doctor._id, role: 'doctor' }, JWT_SECRET, {
        expiresIn: '1h' // Token expires in 1 hour
      });
  
      // Send the token in the response
      res.json({ token });
    } catch (error) {
      console.error('Error authenticating doctor:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  
  module.exports = app