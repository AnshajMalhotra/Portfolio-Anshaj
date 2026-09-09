const capabilities = [
  {
    number: "01",
    title: "Embedded",
    skills:
      "C/C++ · ESP32 · nRF52 · FreeRTOS · BLE · J-Link · Testing & debugging",
    evidence: "Firmware validation at Trackonomy; prototypes at Heximpact.",
    link: "#experience",
  },
  {
    number: "02",
    title: "IoT & localization",
    skills: "MQTT · Node-RED · BLE · RTLS · RSSI validation",
    evidence: "Gateway pipelines and localization testing at DynaWo.",
    link: "#experience",
  },
  {
    number: "03",
    title: "Applications & data",
    skills: "Go · Python · React/TypeScript · REST APIs · PostgreSQL · NocoDB",
    evidence: "Locate-IQ and sensor-data services for Senstra at Heximpact.",
    link: "#projects",
  },
  {
    number: "04",
    title: "Delivery & solution work",
    skills:
      "Docker · Linux · Git · API validation · Hardware evaluation · Documentation · Stakeholder communication",
    evidence: "Locate-IQ container configuration and DynaWo solution work.",
    link: "#projects",
  },
];
export default function AboutMe() {
  return (
    <>
      <section id="capabilities" className="section shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">03 / CAPABILITIES</p>
            <h2>Connecting the pieces.</h2>
          </div>
          <p>
            From requirements and hardware evaluation
            <br />
            to implementation and validation.
          </p>
        </div>
        <div className="capability-grid">
          {capabilities.map((item) => (
            <article className="capability" key={item.title}>
              <span className="card-number">{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.skills}</p>
              <a href={item.link}>
                {item.evidence} <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
        <p className="exposure-note">
          <strong>Evaluation & exposure</strong> LoRaWAN, Wirepas and UWB
          hardware assessment. Implementation depth varies by technology.
        </p>
      </section>
      <section id="about" className="section shell about-section">
        <div className="about-title">
          <p className="eyebrow">04 / A LITTLE CONTEXT</p>
          <h2>
            An engineer.
            <br />
            Always a student.
          </h2>
          <p>
            I enjoy the work between disciplines: understanding a requirement,
            choosing the right hardware, and making the data useful.
          </p>
        </div>
        <div className="about-details">
          <article>
            <p className="eyebrow">EDUCATION</p>
            <h3>M.Eng. Electrical and Informational Technology</h3>
            <p>Hochschule Wismar · Expected March 2027</p>
            <p>
              Coursework completed; Master’s thesis remaining.
              <br />
              Current grade: 2.3
            </p>
            <p className="previous-degree">
              B.Tech. Electronics and Instrumentation Engineering
              <br />
              SGSITS, Indore · 2019–2023
            </p>
          </article>
          <article className="languages">
            <p className="eyebrow">LANGUAGES</p>
            <p>
              <strong>German</strong> B1 · Preparing for B2
            </p>
            <p>
              <strong>English</strong> C1 <span> / </span>
              <strong>Hindi</strong> Native
            </p>
          </article>
          <article>
            <p className="eyebrow">BEYOND THE DESK</p>
            <p>
              Math tutoring at Turito. Campus research and pitching with the
              four-person Zhhoop team. Transmission design with GS Racers at
              Efficycle: reported All-India Rank 5 and Best Project Plan Award.
              Community work with Block 17 in Wismar, and badminton off the
              clock.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
