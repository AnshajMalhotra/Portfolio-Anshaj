import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";

const HeroSection = () => {
  return (
    <motion.section
      id="home"  // ✅ Added for smooth scrolling navigation
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="relative h-screen bg-gradient-to-b from-violet-900 to-black flex flex-col xl:flex-row items-center justify-between lg:px-24 px-8 overflow-hidden"
    >
      {/* ✅ Left Content */}
      <div className="z-40 text-center xl:text-left mt-16 xl:mt-0">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20,
            delay: 0.3,
          }}
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white mb-6"
        >
          Building Fast <br /> Reliable Results
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20,
            delay: 0.6,
          }}
          className="text-lg md:text-xl lg:text-2xl text-violet-200 max-w-2xl mx-auto xl:mx-0 leading-relaxed"
        >
          I build intelligent, scalable, and efficient solutions—whether it’s
          designing low-level firmware for embedded devices, architecting robust
          backend APIs, or integrating IoT systems that bridge hardware with the
          cloud. With hands-on experience in GoLang, Python, and C/C++, I have
          developed real-world solutions involving BLE, LoRa, and cloud services,
          ensuring seamless data flow from sensors to applications.
        </motion.p>
      </div>

      {/* ✅ Right Spline Animation */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute xl:static xl:flex xl:justify-end right-0 top-0 w-full xl:w-[50%] h-[50vh] xl:h-full"
      >
        <Spline
          scene="https://prod.spline.design/zJ0UKaZGv19XflII/scene.splinecode"
          className="w-full h-full"
        />
      </motion.div>

      {/* ✅ Soft Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent xl:hidden"></div>
    </motion.section>
  );
};

export default HeroSection;
