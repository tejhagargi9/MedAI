import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Stethoscope, FileText, Shield, X, AlertCircle, Home, Pill, Stethoscope as MedicalStethoscope } from 'lucide-react';

const MedAIHomepage = () => {
  const [prompt, setPrompt] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6 
      } 
    }
  };

  const parseResponse = (responseText) => {
    const sections = {
      treatment: '',
      homeRemedies: '',
      medication: '',
      additionalAdvice: ''
    };

    // Parse sections using regex
    const sectionMatchers = [
      { key: 'treatment', regex: /Treatment:([\s\S]*?)Home Remedies:/i },
      { key: 'homeRemedies', regex: /Home Remedies:([\s\S]*?)Medication:/i },
      { key: 'medication', regex: /Medication:([\s\S]*?)Additional Advice:/i },
      { key: 'additionalAdvice', regex: /Additional Advice:([\s\S]*?)Note:/i }
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
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-blue-200 h-12 w-12 animate-spin"></div>
        </div>
      )}

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
              <h2 className="text-2xl font-bold text-blue-800">Medical Insights</h2>
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

              <div className="bg-red-50 p-3 rounded-lg text-sm text-red-700 border-l-4 border-red-500">
                ⚠️ This is computer-generated advice. Always consult healthcare professionals for accurate diagnosis and treatment.
              </div>
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
            Get instant, personalized medical insights and prescription recommendations 
            with our advanced AI technology.
          </motion.p>

          {/* Prompt Input */}
          <motion.form 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto"
          >
            <div className="relative">
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
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Analyzing...' : 'Analyze'}
              </button>
            </div>
          </motion.form>
        </div>

        {/* Features Section */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            visible: { 
              transition: { 
                staggerChildren: 0.2 
              } 
            }
          }}
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          <motion.div 
            variants={featureVariants}
            className="bg-white p-6 rounded-xl shadow-md text-center"
          >
            <FileText className="mx-auto text-blue-600 mb-4" size={48} />
            <h3 className="text-xl font-semibold mb-3">Detailed Reports</h3>
            <p className="text-gray-600">Comprehensive medical analysis and prescription recommendations</p>
          </motion.div>

          <motion.div 
            variants={featureVariants}
            className="bg-white p-6 rounded-xl shadow-md text-center"
          >
            <Stethoscope className="mx-auto text-green-600 mb-4" size={48} />
            <h3 className="text-xl font-semibold mb-3">AI Diagnostics</h3>
            <p className="text-gray-600">Advanced AI-powered symptom analysis and insights</p>
          </motion.div>

          <motion.div 
            variants={featureVariants}
            className="bg-white p-6 rounded-xl shadow-md text-center"
          >
            <Shield className="mx-auto text-purple-600 mb-4" size={48} />
            <h3 className="text-xl font-semibold mb-3">Privacy Secure</h3>
            <p className="text-gray-600">Confidential and secure medical information processing</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MedAIHomepage;