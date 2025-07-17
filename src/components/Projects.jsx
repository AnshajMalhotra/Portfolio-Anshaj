import { motion } from "framer-motion";

// ✅ Project list
const projects = [
  {
    title: "IoT Fuel Cell Monitoring",
    description:
      "Real-time hydrogen fuel cell monitoring with ESP32-S3, LoRaWAN & AWS IoT Core.",
    category: "Embedded Systems",
    image: "/1.jpg",
  },
  {
    title: "Scalable IoT Backend",
    description:
      "GoLang microservices handling 10M+ daily IoT events with fault-tolerant pipelines & low-latency APIs.",
    category: "Cloud Backend",
    image: "/2.jpg",
  },
  {
    title: "ZHHOOP Bikepooling App",
    description:
      "University-based bikepooling app with optimized finance model & awarded best pitch at SGSITS E-Summit.",
    category: "App Concept",
    image: "/3.jpg",
  },
  {
    title: "CIFAR-10 Image Classifier",
    description:
      "Image recognition using CIFAR-10 dataset with TensorFlow, integrated with MATLAB for visualization.",
    category: "AI/ML",
    image: "/4.jpg",
  },
  {
    title: "Secure OTA Firmware Updates",
    description:
      "Tamper-proof OTA updates for IoT devices with BLE & LoRaWAN, ensuring device security.",
    category: "IoT Security",
    image: "/5.jpg",
  },
  {
    title: "CINE_FUN Cineplex System",
    description:
      "A movie booking & Cineplex management app with admin & user modes, seat tracking & cost control.",
    category: "Desktop App",
    image: "/6.jpg",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative min-h-screen py-28 bg-gradient-to-b from-black via-violet-950 to-purple-950 overflow-hidden"
    >
      {/* ✅ Subtle grid pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b0764_1px,transparent_1px),linear-gradient(to_bottom,#3b0764_1px,transparent_1px)] bg-[size:30px_30px] opacity-10"></div>

      {/* ✅ Foreground Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-10">
        {/* ✅ Section Title */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-purple-300 text-4xl md:text-5xl font-extrabold mb-16 tracking-tight drop-shadow-md"
        >
          My <span className="text-violet-400">Featured</span> Projects
        </motion.h2>

        {/* ✅ Grid of Project Cards */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((proj, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03, rotate: 0.3 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative rounded-xl bg-gradient-to-b from-gray-900/80 to-gray-800/60 border border-gray-700 hover:border-violet-600 shadow-lg hover:shadow-violet-700/30 backdrop-blur-md overflow-hidden"
            >
              {/* ✅ Image Container with Overlay */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              </div>

              {/* ✅ Project Info */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-white">
                  {proj.title}
                </h3>
                <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                  {proj.description}
                </p>

                {/* ✅ Category Badge */}
                <span className="mt-4 inline-block text-xs font-medium text-violet-300 bg-violet-900/40 px-3 py-1 rounded-full border border-violet-500/30">
                  {proj.category}
                </span>
              </div>

              {/* ✅ Decorative Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/10 via-purple-700/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
