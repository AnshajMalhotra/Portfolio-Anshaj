import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi"; // for bullet icons

export default function About() {
  const skills = [
    "Bridged firmware & cloud at Trackonomy with BLE & LoRa IoT solutions",
    "Built RESTful APIs & PostgreSQL data models for large-scale IoT at Heximpact (Senstra)",
    "Experienced in GoLang, Python, C/C++, AWS & containerized deployments",
    "Strong focus on secure OTA updates & edge-to-cloud data flows",
    "Thrive in IoT, cloud architecture & automation-driven ecosystems",
    "Aim to deliver reliable, scalable & future-ready backend infrastructures",
  ];

  return (
    <section
      id="about" // ✅ important for smooth scroll
      className="relative min-h-screen flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-violet-800 to-purple-900 px-6 md:px-16 py-20"
    >
      {/* ✅ Left: About Me Text */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="md:w-1/2 text-left text-white"
      >
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
          Hi, I’m{" "}
          <span className="text-violet-300 drop-shadow-md">Anshaj Malhotra</span>
        </h1>

        {/* Intro */}
        <p className="mt-6 text-lg text-violet-100 max-w-xl leading-relaxed">
          A <strong>Backend & Embedded Systems Developer</strong> passionate
          about creating scalable, secure, and future-ready solutions.
        </p>

        {/* ✅ Bullet Points with icons */}
        <ul className="mt-6 space-y-4">
          {skills.map((text, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 * index }}
              className="flex items-start space-x-3 text-violet-100 text-base leading-relaxed"
            >
              <FiCheckCircle className="text-violet-300 flex-shrink-0 mt-1" />
              <span>{text}</span>
            </motion.li>
          ))}
        </ul>

        {/* ✅ Download CV Button */}
        <motion.a
          whileHover={{ scale: 1.05 }}
          href="/resume.pdf" // replace with your actual CV file in public/
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-10 px-8 py-3 rounded-lg bg-gradient-to-r from-violet-500 to-purple-600 hover:from-purple-700 hover:to-violet-700 transition-all duration-300 font-semibold shadow-lg"
        >
          📄 Download CV
        </motion.a>
      </motion.div>

      {/* ✅ Right: Portrait Image */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative md:w-1/2 flex justify-center mt-12 md:mt-0"
      >
        <div className="relative">
          {/* Decorative Frame */}
          <div className="absolute -top-6 -left-6 w-full h-full border-4 border-violet-300 rounded-xl shadow-lg"></div>

          {/* ✅ Photo from public folder */}
          <img
            src="/Potrait.jpg"
            alt="Anshaj Malhotra"
            className="relative z-10 w-[260px] sm:w-[300px] md:w-[360px] rounded-xl shadow-2xl object-cover"
          />
        </div>
      </motion.div>
    </section>
  );
}
