import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { UserCircle, Award } from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import toast from "react-hot-toast";
import EmergencyContactForm from "../components/EmergencyContactForm";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [quote, setQuote] = useState("");
  const [progress, setProgress] = useState({ points: 0, streak: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in first 🌿");
      navigate("/");
      return;
    }

    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const decoded = JSON.parse(window.atob(base64));

      // Fetch user info
      axios
        .get(`https://wellnest-backend-3911.onrender.com
/api/auth/user/${decoded.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch(() => toast.error("Failed to fetch user details."));

      // Fetch gamified progress
      axios
        .get("https://wellnest-backend-3911.onrender.com
/api/gamify/progress", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setProgress(res.data))
        .catch(() => toast.error("Error fetching progress."));
    } catch {
      toast.error("Invalid token. Please log in again.");
    }

    const quotes = [
      "Breathe in peace, exhale stress 🌿",
      "Progress, not perfection 🌸",
      "You are doing better than you think 💫",
      "Small steps lead to big change 🌱",
      "Take a deep breath — you got this ☀️",
    ];
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast("Goodbye 👋", { icon: "🌿" });
    navigate("/");
  };

  const progressValue = Math.min(progress.points % 100, 100);

  // 🌟 Achievements Logic
  const getBadge = () => {
    if (progress.streak >= 30)
      return { title: "Wellness Champion", color: "text-yellow-600" };
    if (progress.streak >= 15)
      return { title: "Mindful Explorer", color: "text-emerald-600" };
    if (progress.streak >= 7)
      return { title: "Consistency Star", color: "text-blue-600" };
    return { title: "Beginner", color: "text-gray-400" };
  };
  const badge = getBadge();

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream via-white to-sage/40 flex flex-col items-center">
      {/* Navbar */}
      <div className="w-full flex justify-between items-center px-8 py-4 bg-white shadow-sm rounded-b-3xl">
        <h1 className="text-2xl font-bold text-emerald-700">🌿 WellNest</h1>
        <div
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition"
        >
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt="Profile"
              className="w-10 h-10 rounded-full border border-emerald-300"
            />
          ) : (
            <UserCircle className="w-10 h-10 text-emerald-600" />
          )}
        </div>
      </div>

      {/* Greeting */}
      <motion.div
        className="text-center mt-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {user && (
          <p className="text-lg text-gray-700">
            Hello,{" "}
            <span className="font-semibold text-emerald-800">{user.email}</span>{" "}
            👋
          </p>
        )}
        <p className="italic text-emerald-600 mt-2">{quote}</p>
      </motion.div>

      {/* Progress Tracker */}
      <motion.div
        className="mt-6 flex flex-col items-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div style={{ width: 140, height: 140 }}>
          <CircularProgressbar
            value={progressValue}
            text={`${progress.points}`}
            styles={buildStyles({
              textSize: "16px",
              pathColor: "#059669",
              textColor: "#065f46",
              trailColor: "#d1fae5",
            })}
          />
        </div>
        <p className="mt-3 text-emerald-700 font-semibold">
          🔥 {progress.streak} Day Streak
        </p>
      </motion.div>

      {/* Achievements Section */}
      <motion.div
        className="bg-white p-6 rounded-2xl shadow-md text-center mt-6 w-80 hover:shadow-lg transition"
        whileHover={{ scale: 1.03 }}
      >
        <h2 className="text-xl font-semibold text-emerald-700 mb-3">
          🏅 Achievement
        </h2>
        <Award className={`w-10 h-10 mx-auto ${badge.color}`} />
        <p className="mt-2 text-gray-600 font-medium">{badge.title}</p>
      </motion.div>

      {/* Dashboard Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6 w-11/12 md:w-4/5">
        <motion.div
          className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-lg transition"
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-xl font-semibold text-emerald-700 mb-4">
            🌸 Your Mood
          </h2>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate("/mood-tracker")}
              className="bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700 transition"
            >
              Track Mood
            </button>
            <button
              onClick={() => navigate("/mood-history")}
              className="bg-emerald-100 text-emerald-700 py-2 rounded-md hover:bg-emerald-200 transition"
            >
              Mood History
            </button>
            <button
              onClick={() => navigate("/mood-summary")}
              className="bg-emerald-50 text-emerald-700 py-2 rounded-md hover:bg-emerald-100 transition"
            >
              Mood Summary
            </button>
          </div>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-lg transition"
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-xl font-semibold text-emerald-700 mb-4">
            📔 Journal
          </h2>
          <p className="text-gray-600 mb-4 text-sm">
            Reflect, write, and understand your emotions better.
          </p>
          <button
            onClick={() => navigate("/journal")}
            className="bg-emerald-600 text-white py-2 px-6 rounded-md hover:bg-emerald-700 transition"
          >
            Open Journal
          </button>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-lg transition"
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-xl font-semibold text-emerald-700 mb-4">
            ☀️ Daily Wellness Tasks
          </h2>
          <p className="text-gray-600 mb-4 text-sm">
            Complete daily goals and earn wellness points 🌿
          </p>
          <button
            onClick={() => navigate("/tasks")}
            className="bg-emerald-600 text-white py-2 px-6 rounded-md hover:bg-emerald-700 transition"
          >
            View Tasks
          </button>
        </motion.div>
      </div>

      {/* Emergency Contact Section */}
      <motion.div
        className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-lg transition mt-10 w-11/12 md:w-3/5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-xl font-semibold text-emerald-700 mb-4">
          🆘 Emergency Contact
        </h2>
        <p className="text-gray-600 mb-4 text-sm">
          Set an emergency email address to alert someone you trust when you trigger the SOS system.
        </p>
        <EmergencyContactForm />
      </motion.div>

      {/* SOS Section */}
      <motion.div
        className="bg-red-50 p-6 rounded-2xl shadow-md text-center hover:shadow-lg transition mt-8 w-11/12 md:w-3/5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-xl font-semibold text-red-700 mb-4">🚨 Emergency SOS</h2>
        <p className="text-gray-700 mb-4 text-sm">
          Press the button below to immediately alert your emergency contact via email.
        </p>
        <button
          onClick={async () => {
            if (window.confirm("Are you sure you want to send an SOS alert?")) {
              try {
                const token = localStorage.getItem("token");
                await axios.post(
                  "https://wellnest-backend-3911.onrender.com
/api/sos/send",
                  { message: "SOS alert triggered from WellNest Dashboard." },
                  { headers: { Authorization: `Bearer ${token}` } }
                );
                toast.success("✅ SOS alert sent successfully!");
              } catch (err) {
                console.error("Error sending SOS:", err);
                toast.error("❌ Failed to send SOS alert. Please try again.");
              }
            }
          }}
          className="bg-red-500 text-white font-semibold py-2 px-6 rounded-xl hover:bg-red-600 transition-all"
        >
          Send SOS Alert
        </button>
        <p className="text-xs text-gray-500 mt-3">
          This will notify your saved emergency contact immediately.
        </p>
      </motion.div>

      {/* Logout + Chatbot */}
      <div className="mt-10 mb-6 flex flex-col md:flex-row gap-4">
        <button
          onClick={() => navigate("/chatbot")}
          className="bg-emerald-200 text-emerald-900 py-2 px-6 rounded-md hover:bg-emerald-300 transition"
        >
          Talk to WellNest 💬
        </button>
        <button
          onClick={handleLogout}
          className="bg-gray-300 text-gray-800 py-2 px-6 rounded-md hover:bg-gray-400 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
