import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://wellnest-backend-3911.onrender.com
/api/auth/signup", formData);
      alert("Account created successfully 🌸");
      navigate("/");
    } catch (error) {
      alert("❌ Signup failed. Try again!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-cream via-white to-sage/30 font-[Poppins]">
      <motion.div
        className="bg-white/90 backdrop-blur-md shadow-xl rounded-3xl p-8 w-11/12 md:w-1/3 border border-sage/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-emerald-700 text-center mb-6">
          🌱 Join WellNest
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Create your account and begin your wellness journey 🌿
        </p>

        <form onSubmit={handleSignup} className="flex flex-col gap-5">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="p-3 rounded-xl border border-sage/30 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="p-3 rounded-xl border border-sage/30 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="p-3 rounded-xl border border-sage/30 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="bg-sage hover:bg-emerald-700 text-white py-3 rounded-xl shadow-md transition-all"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-emerald-700 font-semibold cursor-pointer hover:underline"
          >
            Log in
          </span>
        </p>
      </motion.div>
    </div>
  );
}

export default Signup;
