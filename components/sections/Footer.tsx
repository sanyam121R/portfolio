'use client';

import { Mail, FileText, ArrowUpRight } from 'lucide-react';

const GitHubIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedInIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const links = [
  {
    label: 'GitHub',
    url: 'https://github.com/sanyam121R',
    ariaLabel: 'Visit my GitHub profile',
    icon: GitHubIcon,
    external: true,
  },
  {
    label: 'LinkedIn',
    url: 'https://linkedin.com/in/sanyam-rathore',
    ariaLabel: 'Visit my LinkedIn profile',
    icon: LinkedInIcon,
    external: true,
  },
  {
    label: 'Email',
    url: 'mailto:sanyam.12rathore@gmail.com',
    ariaLabel: 'Send me an email',
    icon: Mail,
    external: false,
  },
  {
    label: 'Resume',
    url: '/Sanyam Rathore - Full Stack.pdf',
    ariaLabel: 'Download my resume',
    icon: FileText,
    external: false,
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative"
      role="contentinfo"
    >
      <div className="max-w-[1200px] mx-auto p-8 text-[10px] flex flex-col gap-12">
        {/* Main row */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          {/* Identity block */}
          <div className="flex flex-col">
            <h3 className="text-primary text-[clamp(4rem,7vw,5rem)] leading-none tracking-tight font-mont-sign">
              Sanyam Rathore
            </h3>
            <p className="text-[12px] text-tertiary tracking-wide">
              Full-Stack Developer&nbsp;&nbsp;·&nbsp;&nbsp;Next.js&nbsp;&nbsp;·&nbsp;&nbsp;Node.js
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-1 flex-col md:flex-row" role="list">
              {links.map(({ label, url, ariaLabel, icon: Icon, external }) => (
                <li key={label} className="cursor-[url('https://cdn.cursors-4u.net/previews/tiny-finger-point-c1336353-32.webp')_32_32,auto]">
                  <a
                    href={url}
                    target='_blank'
                    rel={external ? 'noopener noreferrer' : undefined}
                    aria-label={ariaLabel}
                    className="cursor-[url('https://cdn.cursors-4u.net/previews/tiny-finger-point-c1336353-32.webp')_32_32,auto] group inline-flex items-center gap-1.5 text-sm text-tertiary transition-colors duration-200 hover:text-secondary hover:bg-primary/4 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-primary/30"
                  >
                    <Icon
                      size={14}
                      className="opacity-60 group-hover:opacity-100 transition-opacity duration-200 shrink-0"
                      aria-hidden="true"
                    />
                    {label}
                    <ArrowUpRight
                      size={11}
                      className= {`opacity-0 group-hover:opacity-50 -ml-0.5 transition-opacity duration-200 shrink-0`}
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom row */}
        <div className="sm:items-center flex flex-col justify-start md:justify-center text-[10px] text-[#3a3a3a]">
          <p>&copy; {currentYear} Sanyam Rathore. All rights reserved.</p>
          <p className="text-[#2e2e2e]">
            Built with{' '}
            <span aria-label="love" className="inline-block mx-0.5 text-[#4a3030]">
              ❤
            </span>{' '}
            using Next.js &amp; Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;