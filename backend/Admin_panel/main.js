const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const authenticateToken = require('../Admin_panel/middleware/admin')
const Location = require('./locationmodel');
const Slot = require('./schedule');
const ExcelJS = require('exceljs');
const moment = require('moment');
const multer = require('multer');
const fileUpload = require('express-fileupload');

const app = express();
app.use(express.json());
const upload = multer(); 
app.use(fileUpload());

const secretKey = 'your-secret-key'; 

const Doctor = mongoose.model('Doctor', {
  name: String,
  specialisation: String,
  experience: Number,
  email: {
    type: String,
    unique: true, // Enforce uniqueness on email field
    required: true, // Email is required
  },
  phoneNumber: {
    type: String,
    unique: true, 
    required: true, 
  },
  branch: {
    type: String,
    required: true, 
  },
  password:{
    type: String,
    required: true, 
  }
});

const Receptionist = mongoose.model('Receptionist', {
  email: {
    type: String,
    unique: true, // Enforce uniqueness on email field
    required: true, // Email is required
  },
  branch: String,
  password: String,
});

const users = [
  {
    id: 1,
    username: 'admin@gmail.com',
    password: 'admin', // Plain text password
  }
];

app.post('/adminlogin', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    const token = jwt.sign({user}, secretKey);
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Incorrect username or password.' });
  }
});

app.get('/admin-panel', authenticateToken, (req, res) => {
  // If the authentication is successful, this endpoint is accessible.
  res.json('Welcome to the Admin Panel!');
});

app.post('/locations', authenticateToken, async (req, res) => {
  const { branch, address, contactNumber, url } = req.body;

  try {
    const location = new Location({ branch, address, contactNumber, url});
    await location.save();
    return res.status(201).json({ message: 'Location created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to create location' });
  }
});

app.get('/branches', async (req, res) => {
  try {
    const branches = await Location.find({}, 'branch'); 
    return res.status(200).json(branches);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to fetch branches' });
  }
});


app.post('/add-doctor', authenticateToken, async (req, res) => {
  console.log('Request User:', req.user);
  try {
    const { name, specialisation, experience, email, phonenumber, branch, password, schedule } = req.body;

    // Create a new doctor with the provided data
    const newDoctor = new Doctor({
      name,
      specialisation,
      experience,
      email,
      phonenumber,
      branch,
      password
    });

    // Save the doctor to the database
    await newDoctor.save();

    res.json({ message: 'Doctor data added successfully.' });
  } catch (error) {
    console.error('Error adding doctor data:', error);
    res.status(500).json({ message: 'Error adding doctor data.' });
  }
});


app.post('/:doctorEmail/schedule/upload', async (req, res) => {
  const { doctorEmail } = req.params;
  console.log('Received request to upload schedule for doctor:', doctorEmail);
  // Check if file is uploaded with the name 'schedule'
  if (!req.files || !req.files.schedule) {
    return res.status(400).json({ error: 'No file uploaded with name "schedule"' });
  }

  try {
    const uploadedFile = req.files.schedule;
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(uploadedFile.data);
    const worksheet = workbook.getWorksheet(1);
    const schedules = [];
    
    for (let i = 2; i <= worksheet.rowCount; i++) {
      const row = worksheet.getRow(i);
      const day = row.getCell(1).text;
      const type = row.getCell(2).text;
      const startTime = row.getCell(3).text;
      const endTime = row.getCell(4).text;

      schedules.push({
        day,
        slots: [
          {
            type,
            startTime,
            endTime,
          },
        ],
      });
    }

    const doctor = await Doctor.findOne({ email: doctorEmail });
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    let doctorSlots = await Slot.findOne({ doctor: doctor._id });
    if (doctorSlots) {
      doctorSlots.schedule = schedules;
    } else {
      doctorSlots = new Slot({ doctor: doctor._id, schedule: schedules });
    }

    await doctorSlots.save();

    res.status(200).json({ message: 'Schedule data uploaded and saved successfully' });
  } catch (error) {
    console.error('Error processing Excel file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.get('/showdoctors', authenticateToken, async (req, res) => {
  try {
    // Query the database to get the list of doctors
    const doctors = await Doctor.find();
    res.json(doctors); // Send the list of doctors as a JSON response
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Error fetching doctor data.' });
  }
});


app.post('/add-receptionist', authenticateToken, async (req, res) => {
  // Logging for debugging
  console.log('Request User:', req.user);  
  // Only accessible to users with the 'admin' role  
    try {      
      const newreceptionist = new Receptionist({
        email: req.body.email,
        branch: req.body.branch,
        password: req.body.password,
      });
      await newreceptionist.save();
      res.json({ message: 'Receptionist details added successfully.' });
      
    } catch (error) {
      console.error('Error adding receptionist:', error);
      res.status(500).json({ message: 'Error adding receptionist details.' });
    }
  
});



app.get('/showreceptionists', authenticateToken, async (req, res) => {  
  try {
    // Query the database to find a receptionist by email ID
    const receptionist = await Receptionist.find({ });
    res.json(receptionist)
  } catch (error) {
    console.error('Error fetching receptionist by email:', error);
    res.status(500).json({ message: 'Error fetching receptionist data.' })
  }
});

module.exports = app;



