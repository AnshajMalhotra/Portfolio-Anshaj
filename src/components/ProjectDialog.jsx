import { useEffect, useRef } from "react";
import ProjectVisual from "./ProjectVisual";

export default function ProjectDialog({ project, onClose }) {
  const dialog = useRef(null);
  useEffect(() => {
    const element = dialog.current;
    const trigger = document.activeElement;
    const oldOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = oldOverflow;
      trigger?.focus();
    };
  }, []);
  function trapFocus(event) {
    if (event.key !== "Tab") return;
    const items = [...dialog.current.querySelectorAll("button, a[href]")];
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
          <a
            href="/locate-iq-sample.webp"
            target="_blank"
            rel="noreferrer"
            aria-label="Open full Locate-IQ sample screenshot"
          >
            <img
              src="/locate-iq-sample.webp"
              width="1360"
              height="900"
              alt="Locate-IQ interface with four offline sample devices, search and technology filters"
            />
          </a>
          <figcaption>
            Interface preview · Offline sample catalog · No employer database
            connected. Open image to enlarge.
          </figcaption>
        </figure>
      ) : (
        <ProjectVisual id={project.id} />
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
