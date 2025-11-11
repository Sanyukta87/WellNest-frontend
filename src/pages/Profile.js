import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    institution: "",
    goals: "",
    about: "",
    emergencyContact: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const decoded = JSON.parse(window.atob(base64));

      axios
        .get(`http://localhost:5000/api/auth/user/${decoded.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data);
          setFormData({
            name: res.data.name || "",
            institution: res.data.institution || "",
            goals: res.data.goals || "",
            about: res.data.about || "",
            emergencyContact: res.data.emergencyContact || "",
          });
        })
        .catch((err) => console.error("Failed to load profile:", err));
    } catch (err) {
      console.error("Token decode error:", err);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(
        "http://localhost:5000/api/profile/update",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data);
      setIsEditing(false);
      alert("✅ Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to update profile. Try again.");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream via-white to-sage/30 flex flex-col items-center justify-center font-[Poppins] px-4">
      <motion.div
        className="bg-white/90 backdrop-blur-md shadow-xl rounded-3xl p-8 w-full max-w-lg border border-sage/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-emerald-700 mb-6 text-center">
          🌿 Your Profile
        </h1>

        {/* Avatar */}
        {user.avatar ? (
          <img
            src={user.avatar}
            alt="Profile Avatar"
            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-emerald-300 shadow-md"
          />
        ) : (
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center text-4xl text-emerald-700 font-bold">
            {user.name ? user.name.charAt(0).toUpperCase() : "?"}
          </div>
        )}

        {/* Editable Fields */}
        <div className="space-y-4 text-gray-700">
          <div>
            <label className="font-semibold text-emerald-700">Full Name</label>
            <input
              type="text"
              name="name"
              disabled={!isEditing}
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-2 rounded-md mt-1 border ${
                isEditing
                  ? "border-emerald-300 focus:ring-2 focus:ring-emerald-400"
                  : "border-gray-200 bg-gray-100"
              }`}
            />
          </div>

          <div>
            <label className="font-semibold text-emerald-700">Institution</label>
            <input
              type="text"
              name="institution"
              disabled={!isEditing}
              value={formData.institution}
              onChange={handleChange}
              className={`w-full p-2 rounded-md mt-1 border ${
                isEditing
                  ? "border-emerald-300 focus:ring-2 focus:ring-emerald-400"
                  : "border-gray-200 bg-gray-100"
              }`}
            />
          </div>

          <div>
            <label className="font-semibold text-emerald-700">Goals</label>
            <textarea
              name="goals"
              rows="2"
              disabled={!isEditing}
              value={formData.goals}
              onChange={handleChange}
              className={`w-full p-2 rounded-md mt-1 border ${
                isEditing
                  ? "border-emerald-300 focus:ring-2 focus:ring-emerald-400"
                  : "border-gray-200 bg-gray-100"
              }`}
            />
          </div>

          <div>
            <label className="font-semibold text-emerald-700">About You</label>
            <textarea
              name="about"
              rows="2"
              disabled={!isEditing}
              value={formData.about}
              onChange={handleChange}
              className={`w-full p-2 rounded-md mt-1 border ${
                isEditing
                  ? "border-emerald-300 focus:ring-2 focus:ring-emerald-400"
                  : "border-gray-200 bg-gray-100"
              }`}
            />
          </div>

          <div>
            <label className="font-semibold text-emerald-700">
              Emergency Contact
            </label>
            <input
              type="text"
              name="emergencyContact"
              disabled={!isEditing}
              value={formData.emergencyContact}
              onChange={handleChange}
              className={`w-full p-2 rounded-md mt-1 border ${
                isEditing
                  ? "border-emerald-300 focus:ring-2 focus:ring-emerald-400"
                  : "border-gray-200 bg-gray-100"
              }`}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-emerald-600 text-white px-5 py-2 rounded-md hover:bg-emerald-700 transition"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 text-gray-800 px-5 py-2 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-sage text-white px-5 py-2 rounded-md hover:bg-emerald-700 transition"
            >
              Edit Profile
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default Profile;
