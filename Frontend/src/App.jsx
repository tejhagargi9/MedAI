import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MedAIHomepage from "./pages/Home";
import Navbar from "./Components/Navbar";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import DoctorsListPage from "./pages/doctors";
import ContactPage from "./pages/Conatct";
import PatientAppointments from "./pages/DoctorsHome";
import AboutPage from "./pages/About";




function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar stays across all pages */}
      <Routes>
        <Route path="/" element={<MedAIHomepage />} />
        <Route path="/singup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/consultDoctor" element={<DoctorsListPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/doctorsHome" element={<PatientAppointments />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
