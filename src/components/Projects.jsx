import { useEffect, useState } from "react";
import { projects, secondaryProjects } from "../data/projects";
import ProjectDialog from "./ProjectDialog";
import LocateSample from "./LocateSample";
import "./project-evidence.css";

function FeaturedVisual({ project }) {
  if (project.id === "locate")
    return (
      <figure className="feature-media locate-media">
        <LocateSample compact />
        <figcaption>ILLUSTRATIVE RECONSTRUCTION · SAMPLE DEVICES</figcaption>
      </figure>
    );
  if (project.id === "quality")
    return (
      <figure className="feature-media quality-media">
        <div className="quality-dashboard">
          <span className="dashboard-label">
            AUTOMOTIVE QUALITY / SYNTHETIC SAMPLE
          </span>
          <strong>25,000</strong>
          <span>MEASUREMENTS ACROSS 3,572 VEHICLES</span>
          <div>
            <p>
              <b>98.01%</b>
              <span>Measurement pass rate</span>
            </p>
            <p>
              <b>86.93%</b>
              <span>Vehicle first-pass yield</span>
            </p>
          </div>
          <div className="dashboard-bars">
            <i style={{ width: "98.01%" }} />
            <i style={{ width: "86.93%" }} />
          </div>
          <small>Stored sample output · Not a measured factory trend</small>
        </div>
        <figcaption>SYNTHETIC DATA · PUBLIC PROJECT SAMPLE</figcaption>
      </figure>
    );
  return (
    <figure className="feature-media rtls-media">
      <div className="rtls-graphic" aria-hidden="true">
        <span>BLE gateways</span>
        <i />
        <span>MQTT / Node-RED</span>
        <i />
        <span>NDJSON output</span>
        <i />
        <span>Trajectory comparison</span>
      </div>
      <figcaption>EXPLANATORY PIPELINE · PRIVATE EMPLOYER DATA</figcaption>
    </figure>
  );
}

export default function Projects() {
  const [activeId, setActiveId] = useState(() => window.location.hash.slice(9));
  useEffect(() => {
    const syncProject = () => {
      setActiveId(
        window.location.hash.startsWith("#project/")
          ? window.location.hash.slice(9)
          : null,
      );
    };
    window.addEventListener("hashchange", syncProject);
    return () => window.removeEventListener("hashchange", syncProject);
  }, []);
  const active = projects.find((project) => project.id === activeId);
  return (
    <section id="projects" className="section shell work-section">
      <div className="section-intro">
        <p className="eyebrow">01 / SELECTED WORK</p>
        <h2>
          Selected
          <br />
          <em>engineering work.</em>
        </h2>
        <p>
          A few problems I have worked through, from device data and interfaces
          to embedded prototypes.
        </p>
      </div>
      <div className="featured-list">
        {projects.map((project) => (
          <article className="featured-project" key={project.id}>
            <div className="featured-copy">
              <span className="project-index">
                {project.number} / {project.category}
              </span>
              <div>
                <p className="project-status">
                  {project.status.replace("Â", "").replace("â€™", "’")}
                </p>
                <h3>{project.title}</h3>
                <p className="featured-summary">
                  {project.subtitle} {project.contribution}
                </p>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <div className="featured-actions">
                <a href={`#project/${project.id}`} data-project-trigger={project.id}>
                  Explore case study <span aria-hidden="true">↗</span>
                </a>
                {project.repo && (
                  <a href={project.repo} target="_blank" rel="noreferrer">
                    Source ↗
                  </a>
                )}
              </div>
            </div>
            <FeaturedVisual project={project} />
          </article>
        ))}
      </div>
      {active && (
        <ProjectDialog
          key={active.id}
          project={active}
          onClose={() => { window.location.hash = "projects"; }}
        />
      )}
    </section>
  );
}

export function AdditionalProjects() {
  return (
      <section id="additional-projects" className="section shell more-work additional-projects">
        <div className="more-work-title">
          <p className="eyebrow">MORE PROJECTS</p>
          <h2>
            Ideas, prototypes
            <br />
            and practice.
          </h2>
        </div>
        <div className="more-grid">
          {secondaryProjects.map((project) => (
            <article className="more-card" key={project.title}>
              <figure>
                {project.image ? (
                  <img
                    src={
                      project.title === "CIFAR-10 image classifier"
                        ? "/projects/cifar.webp"
                        : project.image
                    }
                    alt={project.imageAlt}
                    width="640"
                    height="400"
                    loading="lazy"
                  />
                ) : (
                  <div className="rtos-art" aria-hidden="true">
                    Task A <span>↔</span> Event bits <span>↔</span> Task B
                  </div>
                )}
                <figcaption>{project.imageCaption}</figcaption>
              </figure>
              <div>
                <span className="project-index">{project.category}</span>
                <h3>{project.title.replace("Â", "").replace("â€™", "’")}</h3>
                <p>{project.description}</p>
                {project.repo && (
                  <a href={project.repo} target="_blank" rel="noreferrer">
                    {project.actionLabel || "View project"} ↗
                  </a>
                )}
                {project.details && (
                  <details>
                    <summary>Read project story ↗</summary>
                    <p>{project.details}</p>
                  </details>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
  );
}
