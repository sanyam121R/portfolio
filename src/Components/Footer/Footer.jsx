import React, { useContext } from 'react';
import './style.scss';
import { MouseContext } from '../../context/mouse-context';

const Footer = () => {
  const { cursorChangeHandler } = useContext(MouseContext);
  const currentYear = new Date().getFullYear();

  const links = [
    { label: 'GitHub', url: 'https://github.com/sanyam121R', ariaLabel: 'Visit my GitHub profile' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/sanyam-rathore', ariaLabel: 'Visit my LinkedIn profile' },
    { label: 'Email', url: 'mailto:sanyam.12rathore@gmail.com', ariaLabel: 'Send me an email' },
    { label: 'Resume', url: '/Sanyam Rathore - Full Stack.pdf', ariaLabel: 'Download my resume' }
  ];

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Sanyam Rathore</h3>
          <p>Full-Stack Developer | React | Node.js | AWS</p>
        </div>

        <nav className="footer-nav" aria-label="Footer navigation">
          <div className="footer-links">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target={link.url.startsWith('http') ? '_blank' : '_self'}
                rel={link.url.startsWith('http') ? 'noopener noreferrer' : ''}
                className="footer-link"
                aria-label={link.ariaLabel}
                onMouseEnter={() => cursorChangeHandler('hovered')}
                onMouseLeave={() => cursorChangeHandler('')}
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Sanyam Rathore. All rights reserved.</p>
        <p className="footer-note">Built with <span aria-label="love">❤</span> using React & Sass</p>
      </div>
    </footer>
  );
};

export default Footer;
