import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FiGithub, FiTwitter, FiLinkedin, FiMenu, FiX } from "react-icons/fi";
import { Link as ScrollLink } from "react-scroll";

// ✅ 1. Add your Google Sheets Web App URL here
const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbzBKFbEHFRhvPwFy3JmNEhOVQfRh2LaO05y_aVkvm0C8nlRb411L34oYl2NV8oGBV08/exec"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [ContactFormOpen, setContactFormOpen] = useState(false);

  // ✅ 2. Copy the form state logic from your Contact.jsx component
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(""); // "success" | "error"

  const toggleMenu = () => setIsOpen(!isOpen);
  const openContactForm = () => {
    setStatus(""); // Reset status when opening the form
    setContactFormOpen(true);
  };
  const closeContactForm = () => setContactFormOpen(false);

  // ✅ 3. Copy the form handling functions from Contact.jsx
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status) setStatus(""); // Reset status when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('email', formData.email);
    formDataObj.append('message', formData.message);

    try {
      const response = await fetch(WEB_APP_URL, {
        method: "POST",
        body: formDataObj,
      });
      const result = await response.json();

      if (result.status === "success") {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" }); // Reset form
        // Auto-close the modal after 2 seconds
        setTimeout(() => {
          closeContactForm();
        }, 2000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
    }

    setLoading(false);
  };

  const navLinks = [
    { name: "Home", to: "home" },
    { name: "About Me", to: "about" },
    { name: "Projects", to: "projects" },
    { name: "Experience", to: "experience" },
    { name: "Contact", to: "contact" },
  ];

  return (
    <header className="fixed top-0 w-full z-50">
      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center justify-between h-16 md:h-20 px-6 lg:px-12 backdrop-blur-md bg-black/30">
        {/* ... (Your existing unchanged desktop navbar JSX) ... */}
        {/* Logo / Title */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 25,
            delay: 0.3,
            duration: 1.2,
          }}
          className="flex items-center"
        >
          <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-gray-500 to-gray-100 flex items-center justify-center text-purple-600 font-bold text-xl mr-3">
            M
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-gray-300 to-gray-100 bg-clip-text text-transparent">
            My Website
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="flex space-x-8">
          {navLinks.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: 0.5 + index * 0.1,
              }}
            >
              <ScrollLink
                to={item.to}
                spy={true}
                smooth={true}
                duration={800}
                offset={-70}
                activeClass="text-violet-400"
                className="relative cursor-pointer text-white hover:text-violet-400 font-medium transition-all duration-300 group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-600 group-hover:w-full transition-all duration-300"></span>
              </ScrollLink>
            </motion.div>
          ))}
        </nav>

        {/* Social icons */}
        <div className="flex items-center space-x-4">
          <motion.a
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            href="https://github.com/AnshajMalhotra"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-violet-400 transition-colors duration-300"
          >
            <FiGithub className="w-5 h-5" />
          </motion.a>
          <motion.a
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            href="https://x.com/malhotra_anshaj"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-violet-400 transition-colors duration-300"
          >
            <FiTwitter className="w-5 h-5" />
          </motion.a>
          <motion.a
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            href="https://www.linkedin.com/in/anshaj-malhotra-19023514a"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-violet-400 transition-colors duration-300"
          >
            <FiLinkedin className="w-5 h-5" />
          </motion.a>
        </div>

        {/* Hire Me Button */}
        <motion.button
          onClick={openContactForm}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 1.6,
            duration: 0.8,
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
          className="ml-4 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold hover:from-purple-700 hover:to-violet-700 transition-all duration-500"
        >
          Hire Me
        </motion.button>
      </div>

      {/* ... (Your existing unchanged mobile navbar JSX) ... */}
      <div className="flex md:hidden justify-between items-center px-4 py-4 bg-black/40 backdrop-blur-sm">
        {/* Mobile Logo */}
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-r from-gray-500 to-gray-100 flex items-center justify-center text-purple-600 font-bold text-lg">
            M
          </div>
          <span className="text-lg font-semibold text-gray-100">
            My Website
          </span>
        </div>

        {/* Hamburger */}
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={toggleMenu}
          className="text-gray-200"
        >
          {isOpen ? <FiX className="h-7 w-7" /> : <FiMenu className="h-7 w-7" />}
        </motion.button>
      </div>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="md:hidden overflow-hidden bg-black/90 backdrop-blur-md shadow-lg px-4 py-5 space-y-5"
      >
        {/* Mobile Nav Links */}
        <nav className="flex flex-col space-y-3">
          {navLinks.map((item) => (
            <ScrollLink
              key={item.name}
              to={item.to}
              spy={true}
              smooth={true}
              duration={800}
              offset={-70}
              onClick={toggleMenu}
              className="cursor-pointer text-gray-200 hover:text-violet-400 font-medium py-2"
            >
              {item.name}
            </ScrollLink>
          ))}
        </nav>

        {/* Mobile Social Links */}
        <div className="pt-4 border-t border-gray-700">
          <div className="flex space-x-5">
            <a
              href="https://github.com/AnshajMalhotra"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiGithub className="h-5 w-5 text-gray-300 hover:text-violet-400" />
            </a>
            <a
              href="https://x.com/malhotra_anshaj"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiTwitter className="h-5 w-5 text-gray-300 hover:text-violet-400" />
            </a>
            <a
              href="https://www.linkedin.com/in/anshaj-malhotra-19023514a"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiLinkedin className="h-5 w-5 text-gray-300 hover:text-violet-400" />
            </a>
          </div>
          <button
            onClick={() => {
              toggleMenu();
              openContactForm();
            }}
            className="mt-4 w-full px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-violet-400 font-bold"
          >
            Contact Me
          </button>
        </div>
      </motion.div>

      {/* ✅ UPDATED Contact Form Modal */}
      <AnimatePresence>
        {ContactFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeContactForm} // Close modal on overlay click
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 30,
              }}
              className="bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6 border border-violet-800/50"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-100">
                  Get in Touch
                </h1>
                <button
                  onClick={closeContactForm}
                  className="text-gray-400 hover:text-white"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              {/* Connect the form to the handleSubmit function */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name" // Connect to state
                    value={formData.name} // Connect to state
                    onChange={handleChange} // Connect to state
                    placeholder="Your Name"
                    required
                    className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-700 text-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email" // Connect to state
                    value={formData.email} // Connect to state
                    onChange={handleChange} // Connect to state
                    placeholder="Your Email"
                    required
                    className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-700 text-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    rows="4"
                    id="message"
                    name="message" // Connect to state
                    value={formData.message} // Connect to state
                    onChange={handleChange} // Connect to state
                    placeholder="How can I help you?"
                    required
                    className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-700 text-white"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={loading} // Disable button while loading
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full font-bold text-white px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 transition-all duration-300 rounded-lg shadow-md hover:shadow-lg hover:shadow-violet-600/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {/* Change text based on loading state */}
                  {loading ? "Sending..." : "Send Message"}
                </motion.button>
              </form>

              {/* Display feedback messages */}
              <div className="mt-4 text-center text-sm h-5">
                {status === "success" && (
                  <p className="text-green-400">✅ Message sent successfully!</p>
                )}
                {status === "error" && (
                  <p className="text-red-400">❌ Failed to send. Please try again.</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;