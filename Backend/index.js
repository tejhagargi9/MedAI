const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Use Routes Correctly
const signupdoc = require('./routes/signupdoc');
const signuppat = require("./routes/signuppat");
const generate = require("./routes/generatreMed");
const doctorsroute = require("./routes/getAllDoctors");
const loginDocRoute = require("./routes/logindoc");
const loginPatRoute = require("./routes/loginpat");
const appointmentsRoute = require("./routes/appointments");
const getAppointmentsRoute = require("./routes/getAllAppointments");
const deleteAppointments = require("./routes/deleteAppointments");

app.use(signupdoc);
app.use(signuppat);
app.use(generate);
app.use(doctorsroute);
app.use(loginDocRoute);
app.use(loginPatRoute);
app.use(appointmentsRoute);
app.use(getAppointmentsRoute);
app.use(deleteAppointments);


// Basic Route
app.get("/", (req, res) => {
  res.send("Welcome to the Express server!");
});

// Error Handling Middleware
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message,
    },
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
