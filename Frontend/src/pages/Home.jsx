import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Stethoscope,
  FileText,
  Shield,
  X,
  AlertCircle,
  Home,
  Pill,
  Stethoscope as MedicalStethoscope,
  UserPlus,
  LogIn,
  Calendar,
} from "lucide-react";

const MedAIHomepage = () => {
  const [prompt, setPrompt] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasEmail, setHasEmail] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check localStorage for login status and email on component mount
    const loginStatus = localStorage.getItem('isLogin');
    const email = localStorage.getItem('email');
    setIsLoggedIn(loginStatus === 'true');
    setHasEmail(!!email); // Set to true if email exists in localStorage
  }, []);

  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const handleGetStarted = () => {
    // Redirect to login page
    navigate('/singup');
  };

  const parseResponse = (responseText) => {
    const sections = {
      treatment: "",
      homeRemedies: "",
      medication: "",
      additionalAdvice: "",
    };

    // Parse sections using regex
    const sectionMatchers = [
      { key: "treatment", regex: /Treatment:([\s\S]*?)Home Remedies:/i },
      { key: "homeRemedies", regex: /Home Remedies:([\s\S]*?)Medication:/i },
      { key: "medication", regex: /Medication:([\s\S]*?)Additional Advice:/i },
      { key: "additionalAdvice", regex: /Additional Advice:([\s\S]*?)Note:/i },
    ];

    sectionMatchers.forEach(({ key, regex }) => {
      const match = responseText.match(regex);
      if (match) {
        sections[key] = match[1].trim();
      }
    });

    return sections;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!prompt.trim()) {
      alert("Please enter a medical symptom or concern.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/getAIResponse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      console.log("Response from backend:", data);

      if (response.ok) {
        const parsedResponse = parseResponse(data.response);
        setAiResponse(parsedResponse);
        setIsModalOpen(true);
      } else {
        alert("Error: " + (data.error || "Something went wrong"));
      }
    } catch (error) {
      console.error("Error sending request:", error);
      alert("Failed to connect to the server.");
    } finally {
      setIsLoading(false);
    }
  };

  const LoadingSpinner = () => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-50 bg-opacity-90">
        <div className="relative">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360],
              borderRadius: ["20%", "50%", "20%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-48 h-48 bg-blue-500 flex items-center justify-center"
          >
            <Stethoscope className="text-white" size={64} strokeWidth={1.5} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="mt-4 text-center text-gray-700 font-semibold"
          >
            Analyzing your symptoms...
          </motion.div>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
              duration: 3,
              ease: "linear",
            }}
            className="mt-4 h-1 bg-blue-300"
          />
        </div>
      </div>
    );
  };

  const renderResponseSection = (title, content, icon) => {
    if (!content) return null;

    return (
      <div className="bg-blue-50 p-4 rounded-lg mb-4 border-l-4 border-blue-500">
        <div className="flex items-center mb-2">
          {icon}
          <h3 className="text-xl font-semibold text-blue-800 ml-2">{title}</h3>
        </div>
        <p className="text-gray-700 leading-relaxed">{content}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Loading Spinner */}
      {isLoading && <LoadingSpinner />}

      {/* Custom Modal */}
      {isModalOpen && aiResponse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative"
          >
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h2 className="text-2xl font-bold text-blue-800">
                Medical Insights
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-600 hover:text-gray-900 transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-4 space-y-4">
              {renderResponseSection(
                "Treatment",
                aiResponse.treatment,
                <MedicalStethoscope className="text-blue-600" size={24} />
              )}

              {renderResponseSection(
                "Home Remedies",
                aiResponse.homeRemedies,
                <Home className="text-green-600" size={24} />
              )}

              {renderResponseSection(
                "Medication",
                aiResponse.medication,
                <Pill className="text-purple-600" size={24} />
              )}

              {renderResponseSection(
                "Additional Advice",
                aiResponse.additionalAdvice,
                <AlertCircle className="text-yellow-600" size={24} />
              )}
            </div>
          </motion.div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 pt-24 pb-12"
      >
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-5xl font-bold text-gray-800 mb-6"
          >
            AI-Powered Medical Assistance
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto mb-10"
          >
            Get instant, personalized medical insights and prescription
            recommendations with our advanced AI technology.
          </motion.p>

          {/* Conditional Rendering based on Email in localStorage */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="max-w-3xl mx-auto space-y-4"
          >
            {hasEmail ? (
              // Show only See Appointments button when email exists in localStorage
              <Link to="/doctorsHome">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-blue-600 text-white p-4 rounded-full hover:bg-blue-700 transition flex items-center justify-center space-x-2"
                >
                  <Calendar size={24} />
                  <span>See Appointments</span>
                </motion.button>
              </Link>
            ) : (
              // Show original UI when no email in localStorage
              !isLoggedIn ? (
                <motion.button
                  onClick={handleGetStarted}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-blue-600 text-white p-4 rounded-full hover:bg-blue-700 transition flex items-center justify-center space-x-2"
                >
                  <LogIn size={24} />
                  <span>Get Started</span>
                </motion.button>
              ) : (
                <>
                  <form onSubmit={handleSubmit} className="relative mb-4">
                    <input
                      type="text"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Describe your medical symptoms or concern..."
                      className="w-full p-4 pl-12 pr-4 text-lg border-2 border-blue-200 rounded-full focus:outline-none focus:border-blue-500 transition"
                    />
                    <Search
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={24}
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition ${
                        isLoading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {isLoading ? "Analyzing..." : "Analyze"}
                    </button>
                  </form>

                  {/* Consult Specialist Doctors Button */}
                  <Link to="/consultDoctor">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-green-500 text-white p-4 rounded-full hover:bg-green-600 transition flex items-center justify-center space-x-2"
                    >
                      <UserPlus size={24} />
                      <span>Consult Specialist Doctors</span>
                    </motion.button>
                  </Link>
                </>
              )
            )}
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          <motion.div
            variants={featureVariants}
            className="bg-white p-6 rounded-xl shadow-md text-center"
          >
            <FileText className="mx-auto text-blue-600 mb-4" size={48} />
            <h3 className="text-xl font-semibold mb-3">Detailed Reports</h3>
            <p className="text-gray-600">
              Comprehensive medical analysis and prescription recommendations
            </p>
          </motion.div>

          <motion.div
            variants={featureVariants}
            className="bg-white p-6 rounded-xl shadow-md text-center"
          >
            <Stethoscope className="mx-auto text-green-600 mb-4" size={48} />
            <h3 className="text-xl font-semibold mb-3">AI Diagnostics</h3>
            <p className="text-gray-600">
              Advanced AI-powered symptom analysis and insights
            </p>
          </motion.div>

          <motion.div
            variants={featureVariants}
            className="bg-white p-6 rounded-xl shadow-md text-center"
          >
            <Shield className="mx-auto text-purple-600 mb-4" size={48} />
            <h3 className="text-xl font-semibold mb-3">Privacy Secure</h3>
            <p className="text-gray-600">
              Confidential and secure medical information processing
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MedAIHomepage;