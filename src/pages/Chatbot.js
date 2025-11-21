import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Send, Bot, User } from "lucide-react";

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "🌿 Hello there! I'm your WellNest companion. How are you feeling today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // 🧭 Auto scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✉️ Send message to backend (emotion-aware)
  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = input.trim();

    // Add user message immediately
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    setIsTyping(true);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "https://wellnest-backend-3911.onrender.com/api/ai/chat",
        { message: userMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { reply, emotion } = res.data;

      // Define colors by emotion
      const emotionStyle =
        emotion === "sad"
          ? "bg-blue-50 text-blue-700"
          : emotion === "happy"
          ? "bg-yellow-50 text-yellow-700"
          : emotion === "anxious"
          ? "bg-purple-50 text-purple-700"
          : "bg-emerald-50 text-emerald-700";

      // Add AI response
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: reply,
          emotion,
          style: emotionStyle,
        },
      ]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "❌ Sorry, I’m having trouble responding right now. Please try again later.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream via-white to-sage/40 flex flex-col items-center py-6 px-4 font-[Poppins]">
      <motion.div
        className="bg-white/90 backdrop-blur-md shadow-lg rounded-3xl w-full max-w-3xl flex flex-col h-[80vh] border border-sage/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="flex items-center justify-center gap-3 py-4 bg-emerald-100 rounded-t-3xl border-b border-emerald-200">
          <Bot className="text-emerald-700 w-6 h-6" />
          <h1 className="text-xl font-semibold text-emerald-800">
            WellNest AI Wellness Companion 💬
          </h1>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-3 rounded-2xl max-w-xs md:max-w-sm text-sm leading-relaxed shadow-sm ${
                  msg.sender === "user"
                    ? "bg-emerald-200 text-emerald-900"
                    : msg.style || "bg-emerald-50 text-emerald-700"
                }`}
              >
                {msg.sender === "bot" && (
                  <span className="block text-xs opacity-60 mb-1">
                    WellNest 🤍
                  </span>
                )}
                {msg.text}
                {msg.emotion && msg.sender === "bot" && (
                  <span className="block text-xs mt-1 text-gray-400 italic">
                    ({msg.emotion} tone)
                  </span>
                )}
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <div className="text-sm text-gray-500 italic animate-pulse pl-2">
              WellNest is typing...
            </div>
          )}

          <div ref={chatEndRef}></div>
        </div>

        {/* Input Area */}
        <div className="p-4 flex gap-3 border-t border-gray-200 bg-emerald-50 rounded-b-3xl">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your thoughts..."
            className="flex-1 px-4 py-2 border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300"
          />
          <button
            onClick={sendMessage}
            className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-xl transition-all"
          >
            <Send size={20} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default Chatbot;
