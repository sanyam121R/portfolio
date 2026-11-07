# Sanyam Rathore — Full-Stack Developer Portfolio

![Next.js](https://img.shields.io/badge/Next.js-16-000?logo=next.js) ![React](https://img.shields.io/badge/React-19-61DAFB?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss) ![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?logo=greensock)

> **Live:** [sanyam121r.vercel.app](https://sanyam121r.vercel.app/)

---

## 📁 Project Structure

```
portfolio/
├── app/                          # Next.js App Router (routes & layouts)
│   ├── api/contact/route.ts      # Contact form → Gmail (nodemailer)
│   ├── blogs/                    # Blog index + /blogs/[slug] pages
│   ├── globals.css               # Global styles (Tailwind v4 + theme)
│   ├── layout.tsx                # Root layout (metadata, fonts, cursor, shell)
│   ├── page.tsx                  # Home page (composes all sections + JSON-LD)
│   ├── robots.ts                 # robots.txt
│   └── sitemap.ts                # sitemap.xml (includes blog posts)
│
├── blogs/                        # Markdown posts (frontmatter; `draft: true` hides a post)
│
├── components/
│   ├── ClientShell.tsx           # Preloader + smooth scroll + nav wrapper
│   ├── CursorCanvas.tsx          # Custom trailing cursor (canvas-based)
│   ├── DraggableNav.tsx          # Draggable floating navigation menu
│   ├── PreLoader.tsx             # Canvas orb preloader
│   ├── SmoothScroll.tsx          # Lenis + GSAP ScrollTrigger sync
│   ├── sections/
│   │   ├── Hero.tsx, About.tsx, Project.tsx
│   │   ├── experience/           # Horizontal-scroll career journey (one file per scene)
│   │   ├── Credentials.tsx       # Education & certifications
│   │   ├── Blogs.tsx, LetsTalk.tsx, ContactMe.tsx
│   │   └── Header.tsx, Footer.tsx
│   └── TechStack/                # Interactive tech stack (list, center node, panels, SVG lines)
│
├── lib/
│   ├── blogs.ts                  # Blog loading (markdown + standalone HTML)
│   ├── fonts.ts                  # Font configuration
│   ├── gsapConfig.ts             # GSAP plugin registration
│   ├── markdown.ts               # remark/rehype pipeline
│   ├── site.ts                   # Site URL, description, social links
│   └── techStackData.ts          # Tech stack items & metadata
│
└── public/                       # Static assets (fonts, images, resume.pdf, HTML blogs)
```

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **UI Library** | React 19 |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS v4 |
| **Animations** | GSAP 3 + ScrollTrigger + Framer Motion 12 |
| **Icons** | lucide-react, react-icons |
| **Package Manager** | Bun |

---

## ✨ Features

- **Custom trailing cursor** — Canvas-based animated cursor trail
- **Draggable navigation** — Floating pill menu with GSAP-powered animations
- **Interactive tech stack** — Clickable tech items with detail panels and SVG connection lines
- **Smooth scroll animations** — GSAP ScrollTrigger entrance animations
- **Custom fonts** — Montreuil Signature (signature style) + Weird Words (display)
- **Dark theme** — Black background with white/grey text, glass-morphism accents
- **Responsive design** — Mobile-first with Tailwind breakpoints

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/sanyam121R/portfolio.git
cd portfolio

# Install dependencies
bun install

# Start the development server
bun dev

# Build for production
bun run build

# Start production server
bun start

# Lint
bun run lint
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📬 Connect

- **Portfolio:** [sanyam121r.vercel.app](https://sanyam121r.vercel.app/)
- **GitHub:** [github.com/sanyam121R](https://github.com/sanyam121R)
- **LinkedIn:** [linkedin.com/in/sanyam-rathore](https://linkedin.com/in/sanyam-rathore)
- **Email:** sanyamr.work@gmail.com

