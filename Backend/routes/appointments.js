const express = require("express");
const router = express.Router();
const Appointment = require("../models/appoinmentsModel"); 

router.post('/makeAppointments', async (req, res) => {
    try {
      const { doctorEmail, name, email, phone, healthIssue } = req.body;
  
      // Create new appointment
      const newAppointment = new Appointment({
        doctorEmail,
        name,
        email,
        phone,
        healthIssue
      });
  
      // Save appointment to database
      const savedAppointment = await newAppointment.save();
  
      res.status(201).json(savedAppointment);
    } catch (error) {
      console.error('Appointment booking error:', error);
      res.status(500).json({ message: 'Failed to book appointment', error: error.message });
    }
  });
  
  module.exports = router;