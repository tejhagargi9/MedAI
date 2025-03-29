import React, { useEffect, useState } from "react";
import { Stethoscope, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check localStorage for login status on component mount
    const loginStatus = localStorage.getItem('isLogin');
    setIsLoggedIn(loginStatus === 'true');
  }, []);

  const handleLogout = () => {
    // Remove login status from localStorage
    localStorage.clear();
    // Update login state

    setIsLoggedIn(false);
    // Redirect to home page
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Stethoscope className="text-blue-600" size={32} />
          <h1 className="text-2xl font-bold text-gray-800">MedAI</h1>
        </div>
        <div className="flex space-x-6 items-center">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
            Home
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600 transition">
            About
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition">
            Contact
          </Link>

          {/* Conditional rendering based on login status */}
          {!isLoggedIn ? (
            <Link to="/login">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
                login
              </button>
            </Link>
          ) : (
            <button 
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition flex items-center space-x-2"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;