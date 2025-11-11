import React, { useState, useEffect } from "react";
import axios from "axios";

function EmergencyContactForm() {
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);

  // 🪄 Fetch existing contact when component loads
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/profile/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setContact(res.data.emergencyContact || "");
      } catch (err) {
        console.log("Error fetching contact:", err);
      }
    };
    fetchContact();
  }, []);

  // 🧠 Save or update contact email
  const handleSave = async () => {
    if (!contact) {
      alert("Please enter an email address.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:5000/api/profile/emergency-contact",
        { emergencyContact: contact },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Emergency contact saved successfully!");
    } catch (err) {
      alert("❌ Failed to save emergency contact.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm border border-emerald-200 p-5 rounded-2xl shadow-md w-full max-w-md mx-auto mt-6">
      <h3 className="text-xl font-semibold text-emerald-800 mb-3">
        Emergency Contact
      </h3>

      <input
        type="email"
        placeholder="Enter emergency contact email"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        className="border border-emerald-300 focus:border-emerald-500 outline-none p-2 rounded-lg w-full mb-4 text-gray-700 placeholder-gray-400"
      />

      <button
        onClick={handleSave}
        disabled={loading}
        className={`${
          loading ? "bg-emerald-300" : "bg-emerald-500 hover:bg-emerald-600"
        } text-white px-5 py-2 rounded-xl transition-all w-full`}
      >
        {loading ? "Saving..." : "Save Contact"}
      </button>

      <p className="text-xs text-gray-500 mt-2">
        This email will receive an alert if you trigger the SOS button.
      </p>
    </div>
  );
}

export default EmergencyContactForm;