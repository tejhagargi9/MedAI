const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    doctorEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    healthIssue: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically stores appointment creation time
    },
  },
  { timestamps: true } // Adds createdAt & updatedAt fields
);

module.exports = mongoose.model("Appointment", appointmentSchema);
