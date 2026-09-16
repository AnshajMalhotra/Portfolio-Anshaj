import { useEffect, useRef } from "react";
import LocateSample from "./LocateSample";
import QualityDemo from "./QualityDemo";

export default function ProjectDialog({ project, onClose }) {
  const dialog = useRef(null);
  useEffect(() => {
    const element = dialog.current;
    const trigger = document.activeElement === document.body
      ? document.querySelector(`[data-project-trigger="${project.id}"]`)
      : document.activeElement;
    const oldOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = oldOverflow;
      trigger?.focus({ preventScroll: true });
    };
  }, [project.id]);
  function trapFocus(event) {
    if (event.key !== "Tab") return;
    const items = [...dialog.current.querySelectorAll("button, a[href], input, select, textarea, summary, [tabindex]:not([tabindex='-1'])")]
      .filter((item) => !item.disabled && item.getClientRects().length > 0);
    const first = items[0],
      last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
  return (
    <dialog
      className="project-dialog"
      ref={dialog}
      aria-labelledby="project-dialog-title"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onKeyDown={trapFocus}
    >
      <div className="dialog-heading">
        <p className="eyebrow">CASE STUDY / {project.number}</p>
        <button
          autoFocus
          className="close-dialog"
          aria-label="Close case study"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
      <p className="project-status">{project.status}</p>
      <h2 id="project-dialog-title">{project.title}</h2>
      <p className="dialog-subtitle">{project.subtitle}</p>
      {project.id === "locate" ? (
        <figure className="source-screenshot">
          <LocateSample />
          <figcaption>
            Portfolio reconstruction · Search and inspect generic sample devices.
          </figcaption>
        </figure>
      ) : project.id === "quality" ? (
        <QualityDemo />
      ) : (
        <figure className="source-screenshot">
          <div
            className="rtls-graphic"
            aria-label="BLE gateway observations flow through MQTT and Node-RED to NDJSON output and trajectory comparison"
          >
            <span>BLE gateways</span>
            <i />
            <span>MQTT / Node-RED</span>
            <i />
            <span>NDJSON output</span>
            <i />
            <span>Trajectory comparison</span>
          </div>
          <figcaption>
            Explanatory pipeline. Employer code and data remain private.
          </figcaption>
        </figure>
      )}
      <div className="case-study-content">
        {[
          ["The problem", project.problem],
          ["My contribution", project.contribution],
          ["Implementation", project.implementation],
          ["Validation & output", project.validation],
          ["Status & limitations", project.limitation],
        ].map(([heading, body]) => (
          <div key={heading}>
            <h3>{heading}</h3>
            <p>{body}</p>
          </div>
        ))}
      </div>
      <section className="project-evidence" aria-label="Architecture and validation review">
        <h3>Follow the engineering decisions</h3>
        <p>{project.evidenceIntro}</p>
        <ol className="evidence-flow">
          {project.architecture.map(([title, detail], index) => (
            <li key={title}><strong>{index + 1}. {title}</strong><span>{detail}</span></li>
          ))}
        </ol>
        <h3>What to inspect</h3>
        <ul className="evidence-checks">
          {project.reviewChecks.map((check) => <li key={check}>{check}</li>)}
        </ul>
      </section>
      <div className="dialog-actions">
        {project.repo && (
          <a
            className="button primary"
            href={project.repo}
            target="_blank"
            rel="noreferrer"
          >
            View source ↗
          </a>
        )}
        {project.evidence && (
          <a
            className="text-link"
            href={project.evidence}
            target="_blank"
            rel="noreferrer"
          >
            {project.evidenceLabel} ↗
          </a>
        )}
        <button className="button secondary" onClick={onClose}>
          Back to work
        </button>
      </div>
    </dialog>
  );
}
