const express = require("express");
const router = express.Router();
const Appointment = require("../models/appoinmentsModel"); // adjust path as needed

// DELETE appointment by ID
router.delete("/deleteAppointment/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
