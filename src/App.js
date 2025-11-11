import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import MoodTracker from "./pages/MoodTracker";
import MoodHistory from "./pages/MoodHistory";
import MoodSummary from "./pages/MoodSummary";
import Journal from "./pages/Journal";
import Chatbot from "./pages/Chatbot";
import Profile from "./pages/Profile";
import DailyTasks from "./pages/DailyTasks";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      {/* 🌿 Global Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#f0fdf4", // light emerald tone
            color: "#065f46",
            border: "1px solid #a7f3d0",
            fontFamily: "Poppins, sans-serif",
          },
        }}
      />

      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mood-tracker" element={<MoodTracker />} />
          <Route path="/mood-history" element={<MoodHistory />} />
          <Route path="/mood-summary" element={<MoodSummary />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tasks" element={<DailyTasks />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
