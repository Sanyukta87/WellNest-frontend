import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const moods = [
    { emoji: "😊", label: "Happy", color: "bg-yellow-200" },
    { emoji: "😐", label: "Neutral", color: "bg-gray-200" },
    { emoji: "😔", label: "Sad", color: "bg-blue-200" },
    { emoji: "😤", label: "Angry", color: "bg-red-200" },
    { emoji: "😌", label: "Calm", color: "bg-green-200" },
  ];

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setMessage("");
  };

  const handleSaveMood = async () => {
    if (!selectedMood) {
      setMessage("Please select a mood before saving 🌿");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in again!");
      navigate("/");
      return;
    }

    try {
      await axios.post(
        "https://wellnest-backend-3911.onrender.com/api/moods/add",
        { mood: selectedMood.label },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage("🌿 Mood saved successfully!");
    } catch (error) {
      console.error("Error saving mood:", error);
      setMessage("❌ Failed to save mood. Try again!");
    }
  };

  return (
    <div className="min-h-screen bg-cream text-charcoal flex flex-col items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-11/12 md:w-1/2 text-center">
        <h1 className="text-3xl font-bold text-emerald-700 mb-6">
          🌱 How are you feeling today?
        </h1>

        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {moods.map((mood) => (
            <button
              key={mood.label}
              onClick={() => handleMoodSelect(mood)}
              className={`text-5xl p-4 rounded-xl transition-transform transform hover:scale-110 ${
                selectedMood?.label === mood.label
                  ? `${mood.color} ring-4 ring-emerald-400`
                  : "bg-gray-100"
              }`}
            >
              {mood.emoji}
            </button>
          ))}
        </div>

        <button
          onClick={handleSaveMood}
          className="bg-emerald-600 text-white py-2 px-6 rounded-md hover:bg-emerald-700 transition"
        >
          Save Mood
        </button>

        {message && <p className="mt-4 text-lg">{message}</p>}

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-6 text-emerald-700 underline hover:text-emerald-900"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default MoodTracker;
