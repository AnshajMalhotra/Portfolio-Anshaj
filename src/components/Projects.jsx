import { useState } from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiExternalLink, FiGithub, FiInfo, FiX } from "react-icons/fi";

const projects = [
  {
    title: "IoT Fuel Cell Monitoring",
    description:
      "Real-time hydrogen fuel cell monitoring with ESP32-S3, LoRaWAN & AWS IoT Core.",
    category: "Embedded Systems",
    image: "/1.jpg",
    repoUrl: "https://github.com/AnshajMalhotra/Fuel-Cell-Monitoring-.git",
    cta: "View repo",
  },
  {
    title: "Scalable IoT Backend & Secure OTA",
    description:
      "Internal Heximpact work across heartbeat APIs, sensor data handling, ESP32 mutex learning, storage flows, and secure firmware updates.",
    category: "Cloud + Embedded",
    image: "/2.jpg",
    cta: "Project notes",
    details: [
      "Worked on internal Heximpact systems involving heartbeat API development, learning sensor data handlers, backend data storage, and IoT device data flow.",
      "Explored ESP32 mutex concepts while connecting firmware behavior with backend reliability concerns.",
      "Contributed around secure OTA firmware update thinking for BLE and LoRaWAN-based IoT devices.",
      "This was internal company work, so there is no public GitHub repository for the implementation.",
    ],
  },
  {
    title: "ZHHOOP Bikepooling App",
    description:
      "A fixed-destination campus bike-pooling concept backed by large-scale survey validation, startup pitching, and AICTE seed funding.",
    category: "Startup Concept",
    image: "/3.jpg",
    cta: "Read story",
    details: [
      "Founded ZHHOOP as a campus ride-sharing platform designed to reduce commute costs and waiting time for students and employees.",
      "Validated the problem through surveys covering around 40,000 people, with 78% confirming the problem was worth solving.",
      "Calculated an addressable market of 31,200 users and a serviceable obtainable market of around 4,000 users.",
      "Identified 15,000+ vehicle owners willing to share rides and defined user personas, JTBD-based solution design, strategy, revenue model, and competitive positioning.",
      "Pitched the startup at SGSITS E-Summit in front of institute leadership and students, receiving strong appreciation for practicality and scalability.",
      "Secured AICTE seed funding to move the concept into early product and prototype development.",
    ],
    skills:
      "Project Management, USP Design, Budget Management, React Native, Pitching, Operational Cost Analysis, Competitive Advantage, Android Development",
  },
  {
    title: "CIFAR-10 Image Classifier",
    description:
      "Image recognition using CIFAR-10 dataset with TensorFlow, integrated with MATLAB for visualization.",
    category: "AI/ML",
    image: "/4.jpg",
    repoUrl: "https://github.com/AnshajMalhotra/Cifar_10_python",
    cta: "View repo",
  },
  {
    title: "EFFICYCLE - CAD & CAE Analysis",
    description:
      "Transmission Head work for Efficycle, combining mechanical design ownership with CAD and CAE analysis for Team GS Racers.",
    category: "Mechanical Design",
    image: "/5.jpeg",
    repoUrl:
      "https://www.linkedin.com/posts/anshaj-malhotra-19023514a_teamgsracers-activity-6803117842733633536-Yhso?utm_source=share&utm_medium=member_desktop&rcm=ACoAACP8TbwBCuh0Zs3R1sWH4PFoPp1vAoeulvM",
    cta: "View post",
    externalIcon: "link",
  },
  {
    title: "CINE_FUN Cineplex System",
    description:
      "A movie booking & Cineplex management app with admin & user modes, seat tracking & cost control.",
    category: "Desktop App",
    image: "/6.jpg",
    repoUrl: "https://github.com/AnshajMalhotra/Cineplex-Management-System",
    cta: "View repo",
  },
];

const MotionButton = motion.button;
const MotionHeading = motion.h2;
const MotionLink = motion.a;

function ProjectCard({ project, onOpen }) {
  const isDialogCard = Boolean(project.details);
  const Icon = isDialogCard
    ? FiInfo
    : project.externalIcon === "link"
      ? FiExternalLink
      : FiGithub;
  const sharedProps = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    whileHover: { y: -8, scale: 1.03, rotate: 0.3 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.4, ease: "easeOut" },
    viewport: { once: true },
    className:
      "group relative block w-full rounded-xl bg-gradient-to-b from-gray-900/80 to-gray-800/60 border border-gray-700 hover:border-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 shadow-lg hover:shadow-violet-700/30 backdrop-blur-md overflow-hidden cursor-pointer text-left",
  };

  const cardContent = (
    <>
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/55 text-white shadow-lg backdrop-blur-sm transition duration-300 group-hover:bg-violet-600 group-hover:border-violet-300">
          <FiArrowUpRight aria-hidden="true" className="text-xl" />
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-violet-200">
            {project.title}
          </h3>
          <Icon
            aria-hidden="true"
            className="mt-1 shrink-0 text-xl text-violet-300 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
          />
        </div>

        <p className="text-sm text-gray-400 mt-2 leading-relaxed">
          {project.description}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="inline-block text-xs font-medium text-violet-300 bg-violet-900/40 px-3 py-1 rounded-full border border-violet-500/30">
            {project.category}
          </span>
          <span className="text-xs font-semibold uppercase tracking-wide text-violet-200 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {project.cta}
          </span>
        </div>
      </div>

      <div className="pointer-events-none absolute -inset-1 bg-gradient-to-r from-violet-600/10 via-purple-700/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
    </>
  );

  if (isDialogCard) {
    return (
      <MotionButton
        type="button"
        aria-label={`Open ${project.title} details`}
        onClick={() => onOpen(project)}
        {...sharedProps}
      >
        {cardContent}
      </MotionButton>
    );
  }

  return (
    <MotionLink
      href={project.repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${project.title}`}
      {...sharedProps}
    >
      {cardContent}
    </MotionLink>
  );
}

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <section
      id="projects"
      className="relative min-h-screen py-28 bg-gradient-to-b from-black via-violet-950 to-purple-950 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b0764_1px,transparent_1px),linear-gradient(to_bottom,#3b0764_1px,transparent_1px)] bg-[size:30px_30px] opacity-10"></div>

      <div className="relative z-10 container mx-auto px-6 md:px-10">
        <MotionHeading
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-purple-300 text-4xl md:text-5xl font-extrabold mb-16 tracking-tight drop-shadow-md"
        >
          My <span className="text-violet-400">Featured</span> Projects
        </MotionHeading>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              onOpen={setActiveProject}
            />
          ))}
        </div>
      </div>

      {activeProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 py-8 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-dialog-title"
          onClick={() => setActiveProject(null)}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative max-h-[86vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-violet-500/30 bg-gray-950 p-6 text-left shadow-2xl shadow-violet-900/40"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveProject(null)}
              aria-label="Close project details"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-gray-200 transition hover:bg-violet-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
            >
              <FiX aria-hidden="true" />
            </button>

            <span className="inline-block text-xs font-medium text-violet-300 bg-violet-900/40 px-3 py-1 rounded-full border border-violet-500/30">
              {activeProject.category}
            </span>
            <h3
              id="project-dialog-title"
              className="mt-4 pr-10 text-2xl font-bold text-white"
            >
              {activeProject.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-300">
              {activeProject.description}
            </p>

            <div className="mt-5 space-y-3">
              {activeProject.details.map((detail) => (
                <p
                  key={detail}
                  className="rounded-lg border border-violet-500/15 bg-white/[0.03] p-3 text-sm leading-relaxed text-gray-300"
                >
                  {detail}
                </p>
              ))}
            </div>

            {activeProject.skills && (
              <p className="mt-5 text-sm leading-relaxed text-violet-200">
                <span className="font-semibold text-white">Skills: </span>
                {activeProject.skills}
              </p>
            )}
          </motion.div>
        </div>
      )}
    </section>
  );
}
