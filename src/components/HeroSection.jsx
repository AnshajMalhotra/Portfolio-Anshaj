export default function HeroSection() {
  return (
    <section id="home" className="hero shell">
      <div className="hero-main">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" /> Engineering portfolio · Karlsruhe, Germany
          </p>
          <h1>
            Anshaj
            <br />
            <em>Malhotra.</em>
          </h1>
          <p className="hero-role">IoT &amp; Embedded Systems Engineer</p>
          <p className="hero-lead">
            I connect devices, data and applications — from BLE firmware and
            RTLS pipelines to industrial web tools.
          </p>
          <p className="hero-availability">Seeking a Werkstudent role or a practical Master’s thesis.</p>
          <div className="hero-actions">
            <a className="pill-button" href="#projects">
              Explore my work <span aria-hidden="true">↗</span>
            </a>
            <div className="cv-links" aria-label="Download curriculum vitae">
              <span>Download CV</span>
              <a className="quiet-link" href="/resume-en.pdf" download>English ↓</a>
              <a className="quiet-link" href="/resume-de.pdf" download>Deutsch ↓</a>
            </div>
          </div>
        </div>
        <figure className="hero-portrait">
          <img
            src="/portrait.webp"
            alt="Portrait of Anshaj Malhotra"
            width="340"
            height="425"
            fetchPriority="high"
          />
          <figcaption>
            <strong>From devices to useful systems.</strong>
            <span>Engineer · M.Eng. student</span>
          </figcaption>
        </figure>
      </div>
      <div className="hero-bottom">
        <span><b>01</b> Embedded &amp; firmware</span>
        <span><b>02</b> IoT &amp; localization</span>
        <span><b>03</b> Applications &amp; data</span>
        <a href="#projects">
          Selected work <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
