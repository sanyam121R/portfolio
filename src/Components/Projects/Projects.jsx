import React, { useContext } from 'react';
import './style.scss';
import { projectsData } from '../../data/projectsData';
import { MouseContext } from '../../context/mouse-context';

const Projects = () => {
  const { cursorChangeHandler } = useContext(MouseContext);

  return (
    <section className="projects-section" aria-label="Projects">
      <div className="projects-container">
        {projectsData.map((project) => (
          <article key={project.id} className="project__card">
            <h2 className="project__title">
              {project.title}
              <span className="project__subtitle">
                ({project.subtitle})
              </span>
            </h2>

            {project.note && (
              <p className="project__note">
                <em>{project.note}</em>
              </p>
            )}

            <p className="project__description">
              {project.description}
            </p>

            {project.bullets && (
              <ul className="project__bullets">
                {project.bullets.map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>
            )}

            <div className="project__section-label">Tech Stack</div>

            {project.techStack && (
              <p className="project__tech-inline">
                {project.techStack.join(', ')}
              </p>
            )}

            {project.learningResource && (
              <div className="project__learning">
                <span>Learning from:</span>{' '}
                <a
                  href={project.learningResource.url}
                  className="project__link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Learning resource: ${project.learningResource.text}`}
                  onMouseEnter={() => cursorChangeHandler('hovered')}
                  onMouseLeave={() => cursorChangeHandler('')}
                >
                  {project.learningResource.text}
                </a>
              </div>
            )}

            <div className="project__links">
              {project.links?.github && (
                <a
                  href={project.links.github}
                  className="project__action-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} GitHub repository`}
                  onMouseEnter={() => cursorChangeHandler('hovered')}
                  onMouseLeave={() => cursorChangeHandler('')}
                >
                  GitHub
                </a>
              )}
              {project.links?.demo && (
                <a
                  href={project.links.demo}
                  className="project__action-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} live demo`}
                  onMouseEnter={() => cursorChangeHandler('hovered')}
                  onMouseLeave={() => cursorChangeHandler('')}
                >
                  Live Demo
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;
