const express = require("express");
const bcrypt = require("bcryptjs");
const Doctor = require("../models/doctersModel"); // Ensure the correct path to your model

const router = express.Router();

// Login Route
router.post("/logindoc", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if doctor exists
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful", doctor });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
