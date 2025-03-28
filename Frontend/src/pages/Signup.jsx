import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  UserPlus,
  Stethoscope,
  Shield,
  User,
  Mail,
  Lock,
  Hospital,
  GraduationCap,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [userType, setUserType] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    // Doctor-specific fields
    hospitalName: "",
    degree: "",
    specialization: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  const handleUserTypeSelect = (type) => {
    setUserType(type);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let response;
      // Determine the appropriate backend route based on user type
      if (userType === "doctor") {
        response = await axios.post("http://localhost:3000/signupdoc", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          hospitalName: formData.hospitalName,
          degree: formData.degree,
          specialization: formData.specialization,
        });
        localStorage.setItem("isLogin", true)
        localStorage.setItem("email", formData.email)
        navigate("/doctorsHome")
      } else {
        console.log(formData.name, formData.email, formData.password);

        response = await axios.post("http://localhost:3000/signuppat", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem("isLogin", true)
        navigate("/")


      }

      // Handle successful signup
      toast.success("Account created successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Reset form or redirect
      console.log("Signup successful:", response.data);
    } catch (error) {
      // Handle signup error
      toast.error(
        error.response?.data?.message || "Signup failed. Please try again.",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );

      console.error(
        "Signup error:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyles =
    "w-full p-3 pl-10 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition";
  const iconStyles =
    "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <ToastContainer />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white shadow-lg rounded-2xl overflow-hidden"
      >
        {/* User Type Selection */}
        {userType === null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-8 text-center"
          >
            <UserPlus className="mx-auto mb-6 text-blue-600" size={64} />
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Create Your Account
            </h2>
            <p className="text-gray-600 mb-8">Select your account type</p>

            <div className="grid grid-cols-2 gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleUserTypeSelect("doctor")}
                className="bg-blue-100 hover:bg-blue-200 py-4 rounded-xl flex flex-col items-center"
              >
                <Stethoscope className="mb-3 text-blue-600" size={40} />
                <span className="font-semibold text-blue-800">Doctor</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleUserTypeSelect("patient")}
                className="bg-green-100 hover:bg-green-200 py-4 rounded-xl flex flex-col items-center"
              >
                <User className="mb-3 text-green-600" size={40} />
                <span className="font-semibold text-green-800">Patient</span>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Signup Form */}
        {userType && (
          <motion.form
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="p-8"
          >
            <div className="flex items-center mb-6">
              <button
                type="button"
                onClick={() => setUserType(null)}
                className="mr-4 text-gray-500 hover:text-gray-700"
              >
                ←
              </button>
              <h2 className="text-2xl font-bold text-gray-800">
                {userType === "doctor"
                  ? "Doctor Registration"
                  : "Patient Registration"}
              </h2>
            </div>

            {/* Common Fields */}
            <div className="space-y-4">
              <div className="relative">
                <User className={iconStyles} size={20} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className={inputStyles}
                  required
                />
              </div>

              <div className="relative">
                <Mail className={iconStyles} size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  className={inputStyles}
                  required
                />
              </div>

              <div className="relative">
                <Lock className={iconStyles} size={20} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className={inputStyles}
                  required
                />
              </div>

              {/* Doctor-Specific Fields */}
              {userType === "doctor" && (
                <>
                  <div className="relative">
                    <Hospital className={iconStyles} size={20} />
                    <input
                      type="text"
                      name="hospitalName"
                      value={formData.hospitalName}
                      onChange={handleInputChange}
                      placeholder="Hospital Name"
                      className={inputStyles}
                      required
                    />
                  </div>

                  <div className="relative">
                    <GraduationCap className={iconStyles} size={20} />
                    <input
                      type="text"
                      name="degree"
                      value={formData.degree}
                      onChange={handleInputChange}
                      placeholder="Medical Degree (e.g., MBBS, MD)"
                      className={inputStyles}
                      required
                    />
                  </div>

                  <div className="relative">
                    <Stethoscope className={iconStyles} size={20} />
                    <input
                      type="text"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleInputChange}
                      placeholder="Medical Specialization"
                      className={inputStyles}
                      required
                    />
                  </div>
                </>
              )}


              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isLoading}
                className={`w-full text-white py-3 rounded-lg transition ${
                  isLoading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </motion.button>
            </div>
            <Link to="/login">
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Already have an account?
                  <a href="#" className="text-blue-600 ml-2 hover:underline">
                    Login
                  </a>
                </p>
              </div>
            </Link>
          </motion.form>
        )}
      </motion.div>
    </div>
  );
};

export default SignupPage;
