import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MedAIHomepage from "./pages/Home";
import Navbar from "./Components/Navbar";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";


function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar stays across all pages */}
      <Routes>
        <Route path="/" element={<MedAIHomepage />} />
        <Route path="/singup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        
      </Routes>
    </Router>
  );
}

export default App;
