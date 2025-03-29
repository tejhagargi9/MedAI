const express = require("express");
const router = express.Router();
const Appointment = require("../models/appoinmentsModel"); // Adjust the path as needed

// GET all appointments
router.get("/getAllAppointments", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error });
  }
});

module.exports = router;