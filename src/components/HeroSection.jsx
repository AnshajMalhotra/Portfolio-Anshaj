export default function HeroSection() {
  return (
    <section id="home" className="hero shell">
      <div className="hero-main">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" /> Karlsruhe, Germany · Open to
            opportunities
          </p>
          <h1>
            Engineering
            <br />
            <em>what connects.</em>
          </h1>
          <p className="hero-lead">
            Hi, I’m <strong>Anshaj Malhotra.</strong> I connect devices, data
            and applications — from BLE firmware and RTLS pipelines to
            industrial web tools.
          </p>
          <div className="hero-actions">
            <a className="pill-button" href="#projects">
              Explore my work <span aria-hidden="true">↗</span>
            </a>
            <a className="quiet-link" href="/resume-de.pdf" download>
              Download CV <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <figure className="hero-portrait">
          <img
            src="/portrait.webp"
            alt="Portrait of Anshaj Malhotra"
            width="170"
            height="170"
            fetchPriority="high"
          />
          <figcaption>
            <strong>Anshaj Malhotra</strong>
            <span>Engineer · M.Eng. student</span>
          </figcaption>
        </figure>
      </div>
      <div className="hero-bottom">
        <span>Working across hardware, software and the space between.</span>
        <a href="#projects">
          Scroll to discover <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
