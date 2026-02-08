import React from 'react';
import './Projects.scss';

const Projects = () => {
  return (
    <section className="project">
      <div className="project__card">
        <h2 className="project__title">
          StreamSync
          <span className="project__subtitle">
            (Real-time video sharing)
          </span>
        </h2>

        <p className="project__note">
          <em>Currently building to learn a modern AI-powered SaaS stack and upskill myself.</em>
        </p>

        <p className="project__description">
          Developing a full‑stack AI‑powered SaaS platform for real‑time video sharing with a cross‑platform desktop application.
        </p>

        <ul className="project__bullets">
          <li>
            Implementing low‑latency video streaming and real‑time communication using Socket.io and Express.js for smooth synced playback between users.
          </li>
          <li>
            Architecting static and dynamic content delivery on AWS CloudFront to ensure fast global video distribution and high availability.
          </li>
          <li>
            Building both the web app and Electron desktop client with Next.js and TypeScript, backed by PostgreSQL and Prisma.
          </li>
        </ul>

        <div className="project__section-label">Tech Stack</div>

        <p className="project__tech-inline">
          Next.js, Electron, Express.js, Socket.io, AWS CloudFront, PostgreSQL,
          Prisma, Tailwind CSS, Clerk
        </p>

        <div className="project__learning">
          <span>Learning from:</span>{' '}
          <a
            href="https://www.youtube.com/watch?v=3R63m4sTpKo&t=3466s"
            className="project__link"
            target="_blank"
            rel="noreferrer"
          >
            Web Prodigies – AI SaaS Realtime Video Sharing + Desktop App
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
