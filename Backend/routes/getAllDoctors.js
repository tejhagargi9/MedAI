const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctersModel"); 

// Route to get all doctors
router.get("/getAllDoctors", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
