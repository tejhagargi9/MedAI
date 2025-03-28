import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  Stethoscope, 
  Mail, 
  Hospital, 
  GraduationCap, 
  UserPlus, 
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle
} from 'lucide-react';

const AppointmentModal = ({ doctor, isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [healthIssue, setHealthIssue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const appointmentData = {
        doctorEmail: doctor.email,
        name,
        email,
        phone,
        healthIssue
      };

      const response = await axios.post('http://localhost:3000/makeAppointments', appointmentData);
      
      // Reset form and close modal
      setName('');
      setEmail('');
      setPhone('');
      setHealthIssue('');
      onSubmit(response.data);
      onClose();
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md relative"
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Book Appointment with Dr. {doctor.name}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input 
              type="text" 
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input 
              type="email" 
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input 
              type="tel" 
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full p-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label htmlFor="healthIssue" className="block text-sm font-medium text-gray-700 mb-1">
              Health Issue
            </label>
            <textarea 
              id="healthIssue"
              value={healthIssue}
              onChange={(e) => setHealthIssue(e.target.value)}
              required
              rows={4}
              className="w-full p-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Describe your health concern"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Book Appointment
          </button>
        </form>
      </motion.div>
    </div>
  );
};

const DoctorsListPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentSuccess, setAppointmentSuccess] = useState(false);
  const doctorsPerPage = 9;

  // Fetch doctors on component mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:3000/getAllDoctors');
        setDoctors(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch doctors');
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Get unique specializations for filter
  const specializations = [...new Set(doctors.map(doc => doc.specialization))];

  // Filter doctors based on search and specialization
  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedSpecialization === '' || doctor.specialization === selectedSpecialization)
  );

  // Pagination logic
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

  const handleAppointment = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleCloseModal = () => {
    setSelectedDoctor(null);
  };

  const handleAppointmentSubmit = (response) => {
    // Show success message
    setAppointmentSuccess(true);
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setAppointmentSuccess(false);
    }, 5000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading doctors...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 relative">
      {/* Appointment Success Notification */}
      {appointmentSuccess && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed top-8 right-8 z-50 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-lg flex items-center"
        >
          <CheckCircle className="mr-3" size={24} />
          <div>
            <p className="font-bold">Appointment Booked</p>
            <p className="text-sm">You will soon be contacted by the doctor.</p>
          </div>
        </motion.div>
      )}

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto relative top-[5vw]"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Find Your Specialist
        </h1>

        {/* Search and Filter Section */}
        <div className="mb-8 flex space-x-4">
          <div className="relative flex-grow">
            <input 
              type="text"
              placeholder="Search doctors by name..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on new search
              }}
              className="w-full p-3 pl-10 border-2 border-blue-200 rounded-full focus:outline-none focus:border-blue-500"
            />
            <Search 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              size={20} 
            />
          </div>

          <select 
            value={selectedSpecialization}
            onChange={(e) => {
              setSelectedSpecialization(e.target.value);
              setCurrentPage(1); // Reset to first page on specialization change
            }}
            className="p-3 border-2 border-blue-200 rounded-full focus:outline-none focus:border-blue-500"
          >
            <option value="">All Specializations</option>
            {specializations.map(spec => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
        </div>

        {/* Doctors Grid */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {currentDoctors.map(doctor => (
            <motion.div
              key={doctor._id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.5 }
                }
              }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Stethoscope className="text-blue-600" size={32} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{doctor.name}</h2>
                  <p className="text-gray-500 text-sm">{doctor.specialization}</p>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-gray-600">
                  <Mail className="mr-2 text-blue-500" size={18} />
                  <span>{doctor.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Hospital className="mr-2 text-green-500" size={18} />
                  <span>{doctor.hospital}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <GraduationCap className="mr-2 text-purple-500" size={18} />
                  <span>{doctor.degree}</span>
                </div>
              </div>

              <div className="flex justify-center items-center border-t pt-4">
                <button
                  onClick={() => handleAppointment(doctor)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition flex items-center"
                >
                  <UserPlus className="mr-2" size={18} />
                  Book Appointment
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredDoctors.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No doctors found matching your search criteria.
          </div>
        )}

        {/* Pagination Controls */}
        {filteredDoctors.length > doctorsPerPage && (
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button 
              onClick={() => paginate(currentPage - 1)} 
              disabled={currentPage === 1}
              className="bg-blue-500 text-white p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition flex items-center"
            >
              <ChevronLeft size={20} />
            </button>

            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>

            <button 
              onClick={() => paginate(currentPage + 1)} 
              disabled={currentPage === totalPages}
              className="bg-blue-500 text-white p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition flex items-center"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </motion.div>

      {/* Book Appointment Modal */}
      {selectedDoctor && (
        <AppointmentModal
          doctor={selectedDoctor}
          isOpen={!!selectedDoctor}
          onClose={handleCloseModal}
          onSubmit={handleAppointmentSubmit}
        />
      )}
    </div>
  );
};

export default DoctorsListPage;