import React from "react";
import { Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-light">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Stethoscope className="text-blue-600" size={32} />
          <h1 className="text-2xl font-bold text-gray-800">MedAI</h1>
        </div>
        <div className="flex space-x-6 items-center">
          <a href="#" className="text-gray-700 hover:text-blue-600 transition">
            Home
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600 transition">
            Services
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600 transition">
            About
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600 transition">
            Contact
          </a>
          <Link to="/singup">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
