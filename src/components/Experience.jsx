const experiences = [
  {
    year: "2026",
    company: "DynaWo",
    role: "IoT Solution Manager Intern",
    location: "Ettlingen, Germany",
    points: [
      "Developed Locate-IQ with React/TypeScript and NocoDB REST integration to manage and compare RTLS hardware.",
      "Built MQTT/Node-RED pipelines for BLE gateway ingestion, filtering, timestamp processing and NDJSON output. Supported multi-gateway RSSI tests against LiDAR-SLAM reference data.",
      "Connected hardware evaluation with requirements, documentation, onboarding and partner research.",
    ],
    tags: "React / TypeScript / MQTT / Node-RED / RTLS",
  },
  {
    year: "JUN — SEP 2023",
    company: "Heximpact",
    role: "IoT & Backend Developer",
    location: "India · Client: Senstra, Australia",
    points: [
      "Built Go REST APIs for sensor data, device shadows and heartbeats, including time-range queries, pagination and filtering.",
      "Worked with PostgreSQL and AWS IoT Core workflows; validated API behavior with Postman. Developed ESP32/FreeRTOS prototypes using tasks, queues, mutexes and event groups.",
    ],
    tags: "Go / PostgreSQL / AWS IoT Core / ESP32 / FreeRTOS",
  },
  {
    year: "JAN — MAY 2023",
    company: "Trackonomy",
    role: "Firmware Trainee",
    location: "Indore, India",
    points: [
      "Worked on BLE scanning and advertising with nRF52810/nRF52832, C/C++ and internal sniffer tools.",
      "Executed 100+ grey-box test cases (self-reported scope), using Python/Raspberry Pi workflows, SEGGER/J-Link RTT and Otii Arc for debugging and OTA support.",
    ],
    tags: "C/C++ / nRF52 / BLE / Python / Firmware validation",
  },
];
export default function Experience() {
  return (
    <section id="experience" className="section shell">
      <div className="section-heading">
        <div>
          <p className="eyebrow">02 / EXPERIENCE</p>
          <h2>Hands-on, across the stack.</h2>
        </div>
        <p>
          Firmware, data pipelines and applications.
          <br />
          Built with teams in Germany and India.
        </p>
      </div>
      <div className="experience-list">
        {experiences.map((exp) => (
          <article className="experience-row" key={exp.company}>
            <div className="experience-date">{exp.year}</div>
            <div className="experience-company">
              <h3>{exp.company}</h3>
              <p>{exp.role}</p>
              <span>{exp.location}</span>
            </div>
            <div className="experience-details">
              <ul>
                {exp.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <p className="tech-line">{exp.tags}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
