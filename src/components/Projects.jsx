import { useState } from "react";
import { projects, secondaryProjects } from "../data/projects";
import ProjectVisual from "./ProjectVisual";
import ProjectDialog from "./ProjectDialog";
export default function Projects() {
  const [filter, setFilter] = useState("All work");
  const [active, setActive] = useState(null);
  const visible = projects.filter(
    (p) => filter === "All work" || p.filters.includes(filter),
  );
  const secondary = secondaryProjects.filter(
    (p) => filter === "All work" || p.category === filter,
  );
  return (
    <section id="projects" className="section shell">
      <div className="section-heading">
        <div>
          <p className="eyebrow">01 / SELECTED WORK</p>
          <h2>Engineering, made tangible.</h2>
        </div>
        <p>
          A closer look at the problem,
          <br />
          the implementation, and the evidence.
        </p>
      </div>
      <div className="project-toolbar">
        <div className="filters" role="group" aria-label="Filter projects">
          {[
            "All work",
            "IoT / RTLS",
            "Embedded / Test",
            "Data / Web",
            "Product / Design",
          ].map((label) => (
            <button
              key={label}
              aria-pressed={filter === label}
              onClick={() => setFilter(label)}
            >
              {label}
            </button>
          ))}
        </div>
        <span className="results-count" aria-live="polite">
          {visible.length + secondary.length} projects
        </span>
      </div>
      <div className="project-grid">
        {visible.map((project) => (
          <article className="project-card" key={project.id}>
            <ProjectVisual id={project.id} />
            <div className="project-card-body">
              <p className="project-status">{project.status}</p>
              <h3>{project.title}</h3>
              <p>{project.subtitle}</p>
              <div className="tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="project-actions">
                <button
                  className="text-link"
                  aria-label={"Read " + project.title + " case study"}
                  onClick={() => setActive(project)}
                >
                  Read case study <span aria-hidden="true">↗</span>
                </button>
                {project.repo && (
                  <a
                    href={project.repo}
                    aria-label={"View " + project.title + " source"}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View source ↗
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
      {secondary.length > 0 && (
        <div className="secondary-projects">
          <div className="collection-heading">
            <div>
              <p className="eyebrow">MORE OF MY WORK</p>
              <h3>From circuit boards to campus ideas.</h3>
            </div>
            <p>Projects, prototypes and learning along the way.</p>
          </div>
          <div>
            {secondary.map((project) => (
              <article className="small-project-card" key={project.title}>
                <figure className="small-project-image">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.imageAlt}
                      width="640"
                      height="400"
                      loading="lazy"
                    />
                  ) : (
                    <div className="rtos-art" aria-hidden="true">
                      <span>Task A</span>
                      <b>↔</b>
                      <span>Event bits</span>
                      <b>↔</b>
                      <span>Task B</span>
                    </div>
                  )}
                  <figcaption>{project.imageCaption}</figcaption>
                </figure>
                <div className="small-project-body">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  {project.repo && (
                    <a
                      className="text-link"
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {project.actionLabel || "View source"} ↗
                    </a>
                  )}
                  {project.details && (
                    <details className="project-notes">
                      <summary>
                        Read project story <span aria-hidden="true">↗</span>
                      </summary>
                      <p>{project.details}</p>
                    </details>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
      {active && (
        <ProjectDialog project={active} onClose={() => setActive(null)} />
      )}
    </section>
  );
}
