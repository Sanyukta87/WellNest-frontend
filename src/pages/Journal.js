import React, { useState, useEffect } from "react";
import axios from "axios";

function Journal() {
  const [entries, setEntries] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const token = localStorage.getItem("token");

  // Fetch journals
  useEffect(() => {
    axios
      .get("https://wellnest-backend-3911.onrender.com
/api/journal", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setEntries(res.data))
      .catch((err) => console.error(err));
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://wellnest-backend-3911.onrender.com
/api/journal",
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEntries([res.data, ...entries]);
      setTitle("");
      setContent("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://wellnest-backend-3911.onrender.com
/api/journal/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEntries(entries.filter((entry) => entry._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-emerald-50 rounded-2xl shadow-md">
      <h2 className="text-3xl font-bold text-emerald-900 mb-4">🪶 My Journal</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <textarea
          placeholder="Write your thoughts..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 border rounded-xl h-32 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <button
          type="submit"
          className="bg-emerald-700 text-white px-5 py-2 rounded-xl hover:bg-emerald-800"
        >
          Save Entry
        </button>
      </form>

      <div className="mt-6 space-y-4">
        {entries.map((entry) => (
          <div
            key={entry._id}
            className="p-4 bg-white shadow rounded-xl border border-emerald-100"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-emerald-800">
                {entry.title}
              </h3>
              <button
                onClick={() => handleDelete(entry._id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
            <p className="text-gray-700 mt-2">{entry.content}</p>
            <small className="text-gray-500">
              {new Date(entry.date).toLocaleString()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Journal;
