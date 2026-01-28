import { BrowserRouter, Routes, Route } from "react-router-dom";
import { API_BASE } from "./config";

console.log("API_BASE in App:", API_BASE);
 

import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import Verify from "./pages/Verify";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
