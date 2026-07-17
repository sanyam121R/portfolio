# Sanyam Rathore — Full-Stack Developer Portfolio

![Next.js](https://img.shields.io/badge/Next.js-16-000?logo=next.js) ![React](https://img.shields.io/badge/React-19-61DAFB?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss) ![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?logo=greensock)

> **Live:** [sanyam121r.vercel.app](https://sanyam121r.vercel.app/)

---

## 📁 Project Structure

```
portfolio/
├── app/                          # Next.js App Router (routes & layouts)
│   ├── globals.css               # Global styles (Tailwind v4 + theme)
│   ├── layout.tsx                # Root layout (metadata, fonts, cursor, nav)
│   └── page.tsx                  # Home page (composes all sections)
│
├── components/                   # Shared UI components
│   ├── CursorCanvas.tsx          # Custom trailing cursor (canvas-based)
│   ├── DraggableNav.tsx          # Draggable floating navigation menu
│   ├── sections/                 # Page sections
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Work.tsx
│   │   ├── Experience.tsx
│   │   ├── SectionStack.tsx
│   │   └── Footer.tsx
│   └── TechStack/                # Tech stack visualization
│       ├── index.tsx             # Main TechStack section
│       ├── TechList.tsx          # Tech item list (left column)
│       ├── CenterNode.tsx        # Center SVG node
│       ├── ConnectionLines.tsx   # SVG connection lines between panels
│       ├── OverviewPanel.tsx     # Overview panel (right column)
│       ├── SkillPanel.tsx        # Skill detail panel (right column)
│       └── TechCard.tsx          # Individual tech card
│
├── lib/                          # Utilities, configs, & data
│   ├── fonts.ts                  # Font configuration (Inter + local fonts)
│   ├── gsapConfig.ts             # GSAP plugin registration
│   └── techStackData.ts          # Tech stack items & metadata
│
├── public/                       # Static assets (served at root `/`)
│   ├── fonts/
│   │   ├── Montreuil Signature.otf
│   │   └── Weird Words.otf
│   ├── assets/
│   │   ├── About me.png
│   │   ├── card_bg.jpeg
│   │   ├── black-bg.jpeg
│   │   ├── black-background.jpeg
│   │   ├── experience.png
│   │   ├── work laptop.png
│   │   ├── work notepade.png
│   │   ├── arik_personal_intro.html
│   │   ├── NoiseTexture.png
│   │   ├── canvas imgs/
│   │   ├── favicon.png
│   │   └── other-favicon.png
│   └── next.svg
│
├── next.config.ts                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
├── postcss.config.mjs            # PostCSS config (Tailwind v4)
├── eslint.config.mjs             # ESLint flat config
├── package.json                  # Dependencies & scripts
├── bun.lock                      # Bun lockfile
├── next-env.d.ts                 # Next.js TypeScript declarations
├── .gitignore
└── README.md
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


### Curosr

cursor: url('https://cdn.cursors-4u.net/previews/paper-airplane-19477b19-32.webp') 28 28, auto !important; 
cursor: url('https://cdn.cursors-4u.net/previews/batman-536f0ffc-32.webp') 32 32, auto !important; 
cursor: url('https://cdn.cursors-4u.net/previews/chrome-pointer-4db561db-32.webp') 34 34, auto !important; 
cursor: url('https://cdn.cursors-4u.net/previews/batman-logo-5093138d-32.webp') 32 32, auto !important;

Tailwind style
cursor-[url('https://cdn.cursors-4u.net/previews/paper-airplane-19477b19-32.webp')_32_32,_auto] !important
cursor-[url('https://cdn.cursors-4u.net/previews/batman-logo-5093138d-32.webp')_32_32,_auto] !important