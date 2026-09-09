import { useRef } from "react";
export default function HeroSection() {
  const portrait = useRef(null);
  function tilt(event) {
    if (
      !window.matchMedia(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      ).matches
    )
      return;
    const box = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - box.left) / box.width - 0.5) * 8;
    const y = ((event.clientY - box.top) / box.height - 0.5) * -6;
    portrait.current.style.transform =
      "perspective(1200px) rotateY(" + x + "deg) rotateX(" + y + "deg)";
  }
  return (
    <section id="home" className="hero shell">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="status-dot" /> Anshaj Malhotra · Karlsruhe, Germany
        </p>
        <h1>
          IoT Solutions<span>Embedded Systems</span>
          <span className="muted-heading">Industrial Applications</span>
        </h1>
        <p className="hero-lead">
          I connect devices, data
          <br className="desktop-break" /> and applications.
        </p>
        <p className="hero-description">
          My experience spans BLE firmware, MQTT data pipelines, Go backend
          services and RTLS web tools, with hands-on work at DynaWo, Heximpact
          and Trackonomy.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#projects">
            Explore my work <span aria-hidden="true">↗</span>
          </a>
          <a className="button secondary" href="/resume-de.pdf" download>
            Download CV · DE <span aria-hidden="true">↓</span>
          </a>
          <a className="text-link" href="#contact">
            Contact me ↗
          </a>
        </div>
        <div className="availability">
          <span className="status-dot" />
          <div>
            <strong>
              Seeking Werkstudent or Master’s thesis opportunities
            </strong>
            <span>Karlsruhe and surrounding areas</span>
          </div>
        </div>
      </div>
      <div
        className="portrait-area"
        onPointerMove={tilt}
        onPointerLeave={() => {
          portrait.current.style.transform = "";
        }}
      >
        <div className="portrait-card" ref={portrait}>
          <div className="portrait-topline">
            <span>HARDWARE ↔ SOFTWARE</span>
            <span aria-hidden="true">+</span>
          </div>
          <img
            src="/portrait.webp"
            alt="Anshaj Malhotra"
            width="840"
            height="1120"
            fetchPriority="high"
          />
          <div className="portrait-caption">
            <span>Anshaj Malhotra</span>
            <span>M.Eng. student</span>
          </div>
        </div>
        <div className="portrait-note">
          <span className="crosshair" aria-hidden="true">
            ⌖
          </span>
          <div>
            From the device
            <br />
            <strong>to the decision.</strong>
          </div>
        </div>
      </div>
      <div className="hero-bottom">
        <p>
          M.Eng. student at <strong>Hochschule Wismar</strong>
          <span>Coursework completed; Master’s thesis remaining</span>
        </p>
        <a href="#projects" className="scroll-cue">
          SELECTED WORK <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
