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
          {["All work", "IoT / RTLS", "Embedded / Test", "Data / Web"].map(
            (label) => (
              <button
                key={label}
                aria-pressed={filter === label}
                onClick={() => setFilter(label)}
              >
                {label}
              </button>
            ),
          )}
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
          <p className="eyebrow">ALSO EXPLORING</p>
          <div>
            {secondary.map((project) => (
              <article key={project.title}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a
                  className="text-link"
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                >
                  View source ↗
                </a>
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
