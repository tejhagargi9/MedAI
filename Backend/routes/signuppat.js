const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

router.post('/signuppat', async (req, res) => {
    try {
      const { 
        name, 
        email, 
        password 
      } = req.body;

      console.log("backend pat : ", req.body)
  
      // Validate input
      if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists' });
      }
  
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create new user
      const newUser = new User({
        name,
        email,
        password: hashedPassword
      });
  
      // Save user to database
      await newUser.save();
  
      res.status(201).json({ 
        message: 'Patient account created successfully',
        user: {
          name: newUser.name,
          email: newUser.email
        }
      });
  
    } catch (error) {
      console.error('Patient signup error:', error);
      res.status(500).json({ message: 'Server error during patient signup', error: error.message });
    }
  });
  
  module.exports = router;
