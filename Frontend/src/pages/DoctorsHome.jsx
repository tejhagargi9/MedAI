import React, { useState, useEffect } from 'react';
import { Calendar, Phone, Mail, UserCircle, MoreVertical, Trash2, Edit } from 'lucide-react';
import { motion } from 'framer-motion';

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      date: '2024-04-15',
      time: '10:30 AM',
      doctor: 'Dr. Emily Smith',
      specialty: 'Cardiology'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '+1 (555) 987-6543',
      date: '2024-04-16',
      time: '02:45 PM',
      doctor: 'Dr. Michael Brown',
      specialty: 'Orthopedics'
    },
    {
      id: 3,
      name: 'Michael Lee',
      email: 'michael.lee@example.com',
      phone: '+1 (555) 246-8135',
      date: '2024-04-17',
      time: '11:15 AM',
      doctor: 'Dr. Rachel Green',
      specialty: 'Neurology'
    },
    {
      id: 4,
      name: 'Emma Wilson',
      email: 'emma.wilson@example.com',
      phone: '+1 (555) 369-2580',
      date: '2024-04-18',
      time: '03:30 PM',
      doctor: 'Dr. David Johnson',
      specialty: 'Pediatrics'
    }
  ]);

  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleDeleteAppointment = (id) => {
    setAppointments(appointments.filter(apt => apt.id !== id));
  };

  const renderAppointmentCard = (appointment) => {
    return (
      <motion.div 
        key={appointment.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-md p-6 relative hover:shadow-lg transition-all duration-300"
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <UserCircle className="text-blue-500" size={40} />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{appointment.name}</h3>
              <p className="text-gray-500 text-sm">{appointment.specialty}</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => setSelectedAppointment(appointment)}
              className="text-blue-500 hover:bg-blue-50 p-2 rounded-full"
            >
              <Edit size={20} />
            </button>
            <button 
              onClick={() => handleDeleteAppointment(appointment.id)}
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
          <div className="flex items-center space-x-2">
            <Calendar className="text-gray-500" size={18} />
            <span className="text-gray-700">
              {appointment.date} at {appointment.time}
            </span>
          </div>
        </div>
      </motion.div>
    );
  };

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