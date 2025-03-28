import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Stethoscope, Mail, Lock, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [userType, setUserType] = useState(null);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleUserTypeSelect = (type) => {
    setUserType(type);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement login authentication logic
    console.log('Login Submitted:', { userType, loginData });
  };

  const inputStyles = "w-full p-3 pl-10 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition";
  const iconStyles = "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
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
            <LogIn className="mx-auto mb-6 text-blue-600" size={64} />
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Welcome Back</h2>
            <p className="text-gray-600 mb-8">Select your account type to login</p>
            
            <div className="grid grid-cols-2 gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleUserTypeSelect('doctor')}
                className="bg-blue-100 hover:bg-blue-200 py-4 rounded-xl flex flex-col items-center"
              >
                <Stethoscope className="mb-3 text-blue-600" size={40} />
                <span className="font-semibold text-blue-800">Doctor</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleUserTypeSelect('patient')}
                className="bg-green-100 hover:bg-green-200 py-4 rounded-xl flex flex-col items-center"
              >
                <User className="mb-3 text-green-600" size={40} />
                <span className="font-semibold text-green-800">Patient</span>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Login Form */}
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
                {userType === 'doctor' ? 'Doctor Login' : 'Patient Login'}
              </h2>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Mail className={iconStyles} size={20} />
                <input 
                  type="email"
                  name="email"
                  value={loginData.email}
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
                  value={loginData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className={inputStyles}
                  required
                />
              </div>

              <div className="flex justify-between items-center">
                <label className="flex items-center text-gray-600">
                  <input 
                    type="checkbox" 
                    className="mr-2 rounded text-blue-600 focus:ring-blue-500"
                  />
                  Remember me
                </label>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Login
              </motion.button>
            </div>
            <Link to="/singup">
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account? 
                <a href="#" className="text-blue-600 ml-2 hover:underline">Sign Up</a>
              </p>
            </div></Link>
            
          </motion.form>
        )}
      </motion.div>
    </div>
  );
};

export default LoginPage;