import { motion } from "framer-motion";
import { FiBriefcase } from "react-icons/fi";

const experiences = [
  {
    year: "2020",
    title: "Math Tutor (Turito, Contract Based)",
    description:
      "Taught advanced mathematics to students online with interactive sessions while balancing academic and project commitments.",
  },
  {
    year: "2020",
    title: "Transmission Head, GsRacers + Efficycle Project",
    description:
      "Led the design & manufacturing of an eco-friendly three-wheeled vehicle for the national Efficycle competition while managing a multidisciplinary team and bagged 5th Position (All India).",
  },
  {
    year: "2021",
    title: "Startup Founder",
    description:
      "Founded a tech-driven student initiative, focusing on sustainable solutions - bike pooling for college-going students without commission.",
  },
  {
    year: "2023 ( January- May )",
    title: "Firmware Intern (Trackonomy, India)",
    description:
      "Developed BLE & LoRa-based low-level firmware for IoT devices (nRF Semiconductors), bridging hardware & cloud for secure data pipelines. Optimized BLE Sniffing Algorithm by 20%.",
  },
  {
    year: "2023 ( June - September )",
    title: "Backend Developer (Heximpact → Senstra, Australia)",
    description:
      "Built scalable REST APIs, optimized PostgreSQL schemas, integrated AWS services & implemented containerized deployments for large-scale IoT event handling.",
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative min-h-screen py-24 bg-gradient-to-b from-black via-violet-950 to-purple-950 overflow-hidden"
    >
      {/* ✅ Subtle background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b0764_1px,transparent_1px),linear-gradient(to_bottom,#3b0764_1px,transparent_1px)] bg-[size:30px_30px] opacity-5"></div>

      <div className="relative z-10 container mx-auto px-6 md:px-12">
        {/* ✅ Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }} // ✅ replay on scroll
          className="text-center text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-purple-300 text-4xl md:text-5xl font-extrabold mb-16 tracking-tight"
        >
          My <span className="text-violet-400">Professional Journey</span>
        </motion.h2>

        {/* ✅ Timeline Container */}
        <div className="relative max-w-3xl mx-auto before:content-[''] before:absolute before:top-0 before:left-4 md:before:left-1/2 before:h-full before:w-[2px] before:bg-gradient-to-b from-violet-600/50 to-purple-800/30">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: false }} // ✅ replays when you scroll back
              className={`relative flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mb-14 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* ✅ Timeline Dot */}
              <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-purple-700 shadow-md">
                <FiBriefcase className="text-white text-sm" />
              </div>

              {/* ✅ Year Label */}
              <div className="flex-shrink-0 w-24 text-violet-300 font-bold text-center md:text-right">
                {exp.year}
              </div>

              {/* ✅ Experience Card with subtle animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: false }} // ✅ triggers every time
                className="flex-1 bg-gradient-to-b from-gray-900/80 to-gray-800/60 border border-gray-700 hover:border-violet-600 rounded-xl p-6 shadow-md hover:shadow-violet-700/20 backdrop-blur-sm transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-white">
                  {exp.title}
                </h3>
                <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                  {exp.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
