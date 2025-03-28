import React from "react";
import {
  HeartPulse,
  Shield,
  Brain,
  Users,
  BookCheck,
  Stethoscope,
} from "lucide-react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="min-h-screen relative top-[3vw] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Healing Horizons
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Transforming Healthcare Through Innovation and Compassion
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Brain className="mr-3 text-blue-600" size={32} />
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Healing Horizons was born from a vision to bridge cutting-edge
              medical technology with compassionate healthcare delivery. We aim
              to empower patients and doctors through innovative, intelligent
              solutions.
            </p>
          </div>
        </div>

        {/* Key Features Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Patient Benefits */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Users className="text-green-600 mb-4" size={40} />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              For Patients
            </h3>
            <ul className="text-gray-600 space-y-2">
              <li className="flex items-center">
                <HeartPulse className="mr-2 text-red-500" size={20} />
                AI-Generated Health Insights
              </li>
              <li className="flex items-center">
                <BookCheck className="mr-2 text-purple-500" size={20} />
                Personalized Treatment Recommendations
              </li>
              <li className="flex items-center">
                <Stethoscope className="mr-2 text-blue-500" size={20} />
                Expert Doctor Consultations
              </li>
            </ul>
          </div>

          {/* Doctor Benefits */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Stethoscope className="text-blue-600 mb-4" size={40} />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              For Doctors
            </h3>
            <ul className="text-gray-600 space-y-2">
              <li className="flex items-center">
                <Brain className="mr-2 text-teal-500" size={20} />
                AI-Powered Diagnostic Support
              </li>
              <li className="flex items-center">
                <Users className="mr-2 text-indigo-500" size={20} />
                Comprehensive Patient Data
              </li>
              <li className="flex items-center">
                <Shield className="mr-2 text-green-500" size={20} />
                Secure Patient Management
              </li>
            </ul>
          </div>

          {/* Core Values */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Shield className="text-yellow-600 mb-4" size={40} />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Our Core Values
            </h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Patient-Centric Care</li>
              <li>• Technological Innovation</li>
              <li>• Data Privacy & Security</li>
              <li>• Universal Accessibility</li>
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-blue-600 text-white p-8 rounded-lg shadow-xl">
            <h2 className="text-3xl font-bold mb-4">
              Join Our Healthcare Revolution
            </h2>
            <p className="text-blue-100 mb-6">
              Whether you're a patient seeking comprehensive care or a doctor
              looking to enhance your practice, Healing Horizons is your partner
              in creating a healthier, more connected medical ecosystem.
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/singup">
                <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition">
                  For Patients
                </button>
              </Link>

              <Link to="/singup">
                <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition">
                  For Doctors
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
