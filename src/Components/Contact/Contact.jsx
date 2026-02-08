import React, { useContext } from 'react';
import './style.scss';
import { MouseContext } from '../../context/mouse-context';

const Contact = () => {
  const { cursorChangeHandler } = useContext(MouseContext);

  const contactInfo = {
    email: 'sanyam.12rathore@gmail.com',
    phone: '+91-9752117992',
    github: 'https://github.com/sanyam121R',
    linkedin: 'https://linkedin.com/in/sanyam-rathore',
    twitter: 'https://twitter.com',
    resume: '/Sanyam Rathore - Full Stack.pdf'
  };

  return (
    <section className="contact-section" role="region" aria-label="Contact">
      <div className="contact-container">
        <h2 className="contact-title">Get in Touch</h2>
        <p className="contact-subtitle">Let's work together on something amazing</p>

        <div className="contact-content">
          <div className="contact-links">
            <a
              href={`mailto:${contactInfo.email}`}
              className="contact-link"
              aria-label={`Email: ${contactInfo.email}`}
              onMouseEnter={() => cursorChangeHandler('hovered')}
              onMouseLeave={() => cursorChangeHandler('')}
            >
              <span className="link-label">Email</span>
              <span className="link-value">{contactInfo.email}</span>
            </a>

            <a
              href={`tel:${contactInfo.phone.replace(/\D/g, '')}`}
              className="contact-link"
              aria-label={`Phone: ${contactInfo.phone}`}
              onMouseEnter={() => cursorChangeHandler('hovered')}
              onMouseLeave={() => cursorChangeHandler('')}
            >
              <span className="link-label">Phone</span>
              <span className="link-value">{contactInfo.phone}</span>
            </a>
          </div>

          <div className="social-links">
            <h3 className="social-title">Find me on</h3>
            <div className="social-icons">
              <a
                href={contactInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="GitHub profile"
                onMouseEnter={() => cursorChangeHandler('hovered')}
                onMouseLeave={() => cursorChangeHandler('')}
              >
                GitHub
              </a>
              <a
                href={contactInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn profile"
                onMouseEnter={() => cursorChangeHandler('hovered')}
                onMouseLeave={() => cursorChangeHandler('')}
              >
                LinkedIn
              </a>
              <a
                href={contactInfo.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="View resume"
                onMouseEnter={() => cursorChangeHandler('hovered')}
                onMouseLeave={() => cursorChangeHandler('')}
              >
                Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
