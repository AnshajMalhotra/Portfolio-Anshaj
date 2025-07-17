import Spline from "@splinetool/react-spline";
import { motion } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiLinkedin,
  FiGithub,
  FiTwitter,
} from "react-icons/fi";
import { useState } from "react";

// 🚨 PASTE YOUR NEWEST WEB APP URL HERE
// This must be the URL you get after deploying the final, simplified Google Script.
const WEB_APP_URL =
"https://script.google.com/macros/s/AKfycbzBKFbEHFRhvPwFy3JmNEhOVQfRh2LaO05y_aVkvm0C8nlRb411L34oYl2NV8oGBV08/exec"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(""); // "success" | "error"

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status) setStatus(""); // Reset status when typing
  };

  // ✅ UPDATED: This function now uses FormData to avoid CORS preflight issues.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(""); // Reset status on new submission

    // Create a FormData object to send the data
    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('email', formData.email);
    formDataObj.append('message', formData.message);

    try {
      const response = await fetch(WEB_APP_URL, {
        method: "POST",
        body: formDataObj, // Send the data as FormData
      });

      // The Google Script will still return JSON, so we parse it
      const result = await response.json();

      if (result.status === "success") {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" }); // Reset form
      } else {
        // Handle cases where the script itself reports an error
        console.error("Script error:", result.message);
        setStatus("error");
      }
    } catch (error) {
      // Handle network errors or other fetch-related issues
      console.error("Google Sheets fetch error:", error);
      setStatus("error");
    }

    setLoading(false);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen flex flex-col justify-center py-28 bg-gradient-to-b from-black via-violet-950 to-purple-950 overflow-hidden"
    >
      {/* Spline Animation Background */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <Spline scene="https://prod.spline.design/PMvTJrhiWQhNVEHL/scene.splinecode" />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#3b0764_1px,transparent_1px),linear-gradient(to_bottom,#3b0764_1px,transparent_1px)] bg-[size:30px_30px] opacity-10"></div>

      {/* Foreground Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-16">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
          className="text-center text-4xl md:text-5xl font-extrabold text-white mb-10"
        >
          Let’s <span className="text-violet-400">Connect</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* LEFT SIDE - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
            className="space-y-6 bg-black/30 backdrop-blur-md rounded-lg p-6 border border-violet-800/20 shadow-xl"
          >
            <h3 className="text-2xl font-bold text-white">
              Contact Information
            </h3>
            <p className="text-gray-300 text-sm">
              Feel free to reach out for collaborations, opportunities, or just
              to say hi!
            </p>

            {/* Contact Info List */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-300 hover:text-violet-400 transition">
                <FiMail className="text-violet-400" />
                <a href="mailto:anshajm9@gmail.com" className="hover:underline">
                  anshajm9@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-300 hover:text-violet-400 transition">
                <FiPhone className="text-violet-400" />
                <a href="tel:+4917627409363" className="hover:underline">
                  +49 176 27409363
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-300 hover:text-violet-400 transition">
                <FiMapPin className="text-violet-400" />
                Wismar, Germany
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-5 mt-6">
              <a
                href="https://www.linkedin.com/in/anshaj-malhotra-19023514a"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-violet-400 transition text-xl"
              >
                <FiLinkedin />
              </a>
              <a
                href="https://github.com/AnshajMalhotra"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-violet-400 transition text-xl"
              >
                <FiGithub />
              </a>
              <a
                href="https://x.com/malhotra_anshaj"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-violet-400 transition text-xl"
              >
                <FiTwitter />
              </a>
            </div>

            {/* Fun Facts */}
            <div className="mt-8 p-4 bg-violet-900/20 border border-violet-700/30 rounded-lg shadow-md">
              <h4 className="text-white font-semibold text-lg">Fun Facts 🎉</h4>
              <ul className="text-gray-300 text-sm mt-2 list-disc list-inside space-y-1">
                <li>Played Badminton at State Level 🏸</li>
                <li>Love listening to music & exploring new genres 🎶</li>
              </ul>
            </div>
          </motion.div>

          {/* RIGHT SIDE - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
            className="bg-black/40 p-6 rounded-lg shadow-lg backdrop-blur-md border border-violet-700/20"
          >
            <h3 className="text-xl font-bold text-white mb-6">
              Send me a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-gray-300">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="w-full mt-1 px-4 py-2 rounded-md bg-black/40 border border-violet-700/30 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300">Your Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full mt-1 px-4 py-2 rounded-md bg-black/40 border border-violet-700/30 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300">Your Message</label>
                <textarea
                  rows="4"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message..."
                  required
                  className="w-full mt-1 px-4 py-2 rounded-md bg-black/40 border border-violet-700/30 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={loading}
                className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 rounded-md shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send Message"}
              </motion.button>
            </form>

            {/* Success/Error Feedback */}
            {status === "success" && (
              <p className="text-green-400 text-sm mt-4 text-center">
                ✅ Message sent successfully! I'll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-red-400 text-sm mt-4 text-center">
                ❌ Oops! Something went wrong. Please try again or reach out directly.
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}