
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Doctor = require("../models/doctersModel");

// Doctor Signup Route
router.post('/signupdoc', async (req, res) => {
  try {
    const { 
      name, 
      email, 
      password, 
      hospitalName, 
      degree, 
      specialization 
    } = req.body;

    // Validate input
    if (!name || !email || !password || !hospitalName || !degree || !specialization) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if doctor already exists
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ message: 'Doctor with this email already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new doctor
    const newDoctor = new Doctor({
      name,
      email,
      password: hashedPassword,
      hospital: hospitalName,
      degree: Array.isArray(degree) ? degree : [degree],
      specialisation: Array.isArray(specialization) ? specialization : [specialization]
    });

    // Save doctor to database
    await newDoctor.save();

    res.status(201).json({ 
      message: 'Doctor account created successfully',
      doctor: {
        name: newDoctor.name,
        email: newDoctor.email,
        hospital: newDoctor.hospital
      }
    });

  } catch (error) {
    console.error('Doctor signup error:', error);
    res.status(500).json({ message: 'Server error during doctor signup', error: error.message });
  }
});

module.exports = router;
