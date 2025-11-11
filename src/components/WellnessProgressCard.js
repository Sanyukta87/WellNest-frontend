import React, { useEffect, useState } from "react";
import axios from "axios";

function WellnessProgressCard() {
  const [progress, setProgress] = useState({ points: 0, streak: 0, level: 1 });
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/gamify/progress", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProgress(res.data))
      .catch((err) => console.error("Progress error:", err));
  }, [token]);

  return (
    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mt-6 text-center">
      <h3 className="text-emerald-700 font-bold text-xl mb-2">🌱 Wellness Progress</h3>
      <p className="text-emerald-900">
        <strong>Level {progress.level}</strong>
      </p>
      <p className="text-emerald-800">Points: {progress.points}</p>
      <p className="text-emerald-700">Streak: {progress.streak} days 🔥</p>
      <div className="w-full bg-emerald-100 h-3 rounded-full mt-3">
        <div
          className="bg-emerald-600 h-3 rounded-full"
          style={{ width: `${(progress.points % 100)}%` }}
        ></div>
      </div>
    </div>
  );
}

export default WellnessProgressCard;
