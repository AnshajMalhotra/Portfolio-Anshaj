import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
  { id: "home", label: "HOME" },
  { id: "about", label: "ABOUT" },
  { id: "projects", label: "PROJECTS" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "contact", label: "CONTACT" },
];

export default function VerticalNavSingle() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const currentLabel =
    sections.find((sec) => sec.id === activeSection)?.label || "HOME";

  return (
    <div className="fixed top-1/2 right-8 transform -translate-y-1/2 z-50 hidden md:flex flex-col items-center">
      
      {/* ✅ Top line */}
      <motion.div 
        layout 
        className="w-[2px] h-[50px] bg-gray-400"
      />

      {/* ✅ Animated Vertical Word */}
      <div 
        className="flex flex-col items-center my-2 cursor-pointer"
        onClick={() => scrollToSection(activeSection)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLabel} // triggers animation on section change
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center"
          >
            {currentLabel.split("").map((letter, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
                className="text-sm text-gray-200 hover:text-violet-400 transition-all"
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ✅ Bottom line */}
      <motion.div 
        layout 
        className="w-[2px] h-[50px] bg-gray-400"
      />
    </div>
  );
}
