import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

function MoodSummary() {
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Please log in first.");

    axios
      .get("https://wellnest-backend-3911.onrender.com
/api/moods/summary", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setSummary(res.data))
      .catch(() => toast.error("Failed to load mood summary."));
  }, []);

  const COLORS = ["#34d399", "#fbbf24", "#60a5fa", "#f87171", "#a78bfa"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-sage/30 flex flex-col items-center py-10">
      <motion.h1
        className="text-3xl font-bold text-emerald-700 mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🌿 Mood Summary
      </motion.h1>

      {summary.length === 0 ? (
        <p className="text-gray-500 italic">No data available yet 🌸</p>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg p-6 w-11/12 md:w-2/3 flex flex-col items-center">
          <h2 className="text-xl text-emerald-600 font-semibold mb-4">
            Your Mood Distribution
          </h2>
          <div className="w-full h-80">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={summary}
                  dataKey="count"
                  nameKey="mood"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {summary.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}

export default MoodSummary;
