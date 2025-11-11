import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

function MoodHistory() {
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Please log in first.");

    axios
      .get("http://localhost:5000/api/moods/history", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMoods(res.data))
      .catch(() => toast.error("Failed to load mood history."));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-sage/30 flex flex-col items-center py-10">
      <motion.h1
        className="text-3xl font-bold text-emerald-700 mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🌸 Mood History
      </motion.h1>

      {moods.length === 0 ? (
        <p className="text-gray-500 italic">No mood records yet 🌿</p>
      ) : (
        <div className="w-11/12 md:w-2/3 bg-white rounded-2xl shadow-lg p-6">
          {moods.map((mood, index) => (
            <div
              key={index}
              className="flex justify-between border-b border-gray-200 py-3"
            >
              <p className="text-gray-700">{mood.emoji} {mood.mood}</p>
              <p className="text-gray-400 text-sm">
                {new Date(mood.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MoodHistory;
