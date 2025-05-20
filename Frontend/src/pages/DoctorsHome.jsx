import React, { useState, useEffect } from 'react';
import { Phone, Mail, UserCircle, Trash2, Edit } from 'lucide-react';
import axios from 'axios';

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const doctorsEmail = localStorage.getItem("email");
        const response = await axios.get("http://localhost:3000/getAllAppointments");

        console.log(response.data)
        
        // Filter appointments by doctor's email
        const filteredAppointments = response.data.filter(
          appointment => appointment.doctorEmail === doctorsEmail
        );
        
        setAppointments(filteredAppointments);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch appointments");
        setLoading(false);
        console.error("Error fetching appointments:", err);
      }
    };

    fetchAppointments();
  }, []);

  const handleDeleteAppointment = async (id) => {
      try {
      await axios.delete(`http://localhost:3000/deleteAppointment/${id}`);
      setAppointments(prev => prev.filter(apt => apt._id !== id));
    } catch (err) {
      console.error("Error deleting appointment:", err);
    }
  };

  const renderAppointmentCard = (appointment) => {
    return (
      <div 
        key={appointment._id}
        className="bg-white rounded-lg shadow-md p-6 relative hover:shadow-lg transition-all duration-300"
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <UserCircle className="text-blue-500" size={40} />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{appointment.name}</h3>
              <p className="text-gray-500 text-sm">{appointment.healthIssue}</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => handleDeleteAppointment(appointment._id)}
              className="text-red-500 hover:bg-red-50 p-2 rounded-full"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>

        <div className="space-y-2 mt-4">
          <div className="flex items-center space-x-2">
            <Mail className="text-gray-500" size={18} />
            <span className="text-gray-700">{appointment.email}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="text-gray-500" size={18} />
            <span className="text-gray-700">{appointment.phone}</span>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex justify-center items-center">
        <p className="text-xl text-gray-600">Loading appointments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex justify-center items-center">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Patient Appointments</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map(renderAppointmentCard)}
        </div>

        {appointments.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl text-gray-500">No appointments scheduled</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientAppointments;