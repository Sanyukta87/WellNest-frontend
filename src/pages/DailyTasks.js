import React, { useEffect, useState } from "react";
import axios from "axios";

function DailyTasks() {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const completeTask = async (id) => {
    try {
      await axios.post(
        `http://localhost:5000/api/tasks/complete/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Task completed! Points awarded 🌿");
      fetchTasks();
    } catch (err) {
      console.error("Error completing task:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-emerald-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-emerald-700 mb-4 text-center">
          ☀️ Daily Wellness Tasks
        </h2>

        {tasks.map((task) => (
          <div
            key={task._id}
            className="flex justify-between items-center bg-emerald-50 border border-emerald-200 rounded-xl p-3 mb-3"
          >
            <p className="text-emerald-900">{task.task}</p>
            {task.completedBy.includes(JSON.parse(atob(token.split(".")[1])).id) ? (
              <span className="text-sm text-gray-400">Done ✅</span>
            ) : (
              <button
                onClick={() => completeTask(task._id)}
                className="bg-emerald-600 text-white px-3 py-1 rounded-md hover:bg-emerald-700"
              >
                Complete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DailyTasks;
