import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://wellnest-backend-3911.onrender.com
/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      alert("Welcome back 🌿");
      navigate("/dashboard");
    } catch (error) {
      alert("❌ Invalid email or password");
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
          🌿 WellNest Login
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Welcome back! Log in to continue your wellness journey ✨
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-xl border border-sage/30 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-xl border border-sage/30 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-sage hover:bg-emerald-700 text-white py-3 rounded-xl shadow-md transition-all"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          New here?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-emerald-700 font-semibold cursor-pointer hover:underline"
          >
            Create an account
          </span>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;
