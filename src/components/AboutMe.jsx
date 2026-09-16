const capabilities = [
  ["Embedded", "C/C++ · ESP32 · nRF52 · FreeRTOS · BLE · Testing"],
  ["IoT & localization", "MQTT · Node-RED · BLE · RTLS · RSSI validation"],
  [
    "Applications & data",
    "Go · Python · React/TypeScript · REST APIs · PostgreSQL",
  ],
  ["Delivery", "Docker · Linux · Git · API validation · Hardware evaluation"],
];

export default function AboutMe() {
  return (
    <section id="about" className="section shell about-section">
      <div className="section-intro">
        <p className="eyebrow">03 / ABOUT ME</p>
        <h2>
          Curious across
          <br />
          <em>the whole system.</em>
        </h2>
      </div>
      <div className="about-layout">
        <div className="about-statement">
          <p>
            I enjoy the work between disciplines: understanding a requirement,
            choosing the right hardware, making the data useful, and checking
            that the result holds up.
          </p>
          <a className="quiet-link" href="#contact">
            Start a conversation ↗
          </a>
        </div>
        <div className="about-facts">
          <div>
            <span>NOW</span>
            <p>
              M.Eng. Electrical and Informational Technology at Hochschule
              Wismar. Coursework completed; Master’s thesis remaining.
              Expected graduation: March 2027.
            </p>
          </div>
          <div>
            <span>BEFORE</span>
            <p>
              B.Tech. Electronics and Instrumentation Engineering at SGSITS,
              Indore · 2019–2023.
            </p>
          </div>
          <div>
            <span>LANGUAGES</span>
            <p>English C1 · German B1, preparing for B2 · Hindi native.</p>
          </div>
        </div>
      </div>
      <div id="capabilities" className="capabilities">
        <div className="capabilities-heading">
          <p className="eyebrow">WHAT I WORK WITH</p>
          <h3>Connecting the pieces.</h3>
        </div>
        <div className="capability-list">
          {capabilities.map(([title, skills], index) => (
            <div className="capability-row" key={title}>
              <span>0{index + 1}</span>
              <h4>{title}</h4>
              <p>{skills}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
