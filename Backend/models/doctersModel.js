const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    hospital: {
      type: String,
      required: true,
      trim: true,
    },
    degree: {
      type: [String], // Array of strings
      required: true,
    },
    specialisation: {
      type: [String], // Array of strings
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", DoctorSchema);
