"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useExperience } from "./ExperienceContext";
import { hReveal, float } from "./sceneFx";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const TAG_CLASS =
  "free-metric py-1 px-2.5 sm:px-3 border border-primary-border rounded-2xl smooth-corners whitespace-nowrap";

const STACK = [
  "Next.js",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Redis",
  "BullMQ",
  "LLM Tool Calling",
];

const CAPABILITIES = [
  "Anomaly detection, ",
  "Transaction categorization, ",
  "Forecasting & what-if scenarios, ",
  "AI-generated financial reports",
];

/** A faint, self-drawing time-series chart — the dashboard as scenery. */
function SignalChart() {
  const width = 480;
  const height = 240;
  const points = Array.from({ length: 25 }, (_, i) => {
    const x = (i / 24) * width;
    const trend = height * 0.78 - i * 6.2;
    const wave = Math.sin(i * 0.9) * 18 + Math.cos(i * 0.37) * 10;
    return { x: Number(x.toFixed(2)), y: Number((trend + wave).toFixed(2)) };
  });
  const line = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x} ${p.y}`).join(" ");
  const area = `${line} L${width} ${height} L0 ${height} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full text-primary" fill="none">
      <defs>
        <linearGradient id="freeArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.14" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g stroke="currentColor" strokeOpacity="0.07">
        {Array.from({ length: 6 }, (_, i) => (
          <line key={i} x1="0" x2={width} y1={(i / 5) * height} y2={(i / 5) * height} />
        ))}
      </g>

      {points.map((p, i) => (
        <rect
          key={i}
          x={p.x - 3}
          y={height - (i % 5) * 10 - 18}
          width="6"
          height={(i % 5) * 10 + 18}
          fill="currentColor"
          opacity="0.08"
        />
      ))}

      <path d={area} fill="url(#freeArea)" />
      <path d={line} stroke="currentColor" strokeOpacity="0.8" strokeWidth="1.4" />

      {points
        .filter((_, i) => i % 6 === 3)
        .map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="2.4" fill="currentColor">
            <animate attributeName="opacity" values="0.2;1;0.2" dur={`${2.4 + i * 0.6}s`} repeatCount="indefinite" />
          </circle>
        ))}
    </svg>
  );
}

export default function SceneFreelance() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { containerAnimation } = useExperience();

  useGSAP(
    () => {
      if (!containerAnimation) return;
      const reveal = hReveal(containerAnimation);
      gsap.from(".free-rise", {
        y: 50,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
        immediateRender: false,
        scrollTrigger: reveal,
      });
      float(".free-chart", { distance: 10, duration: 8 });

      const onResize = () => ScrollTrigger?.refresh();
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    },
    { scope: rootRef, dependencies: [containerAnimation] }
  );

  return (
    <div
      ref={rootRef}
      className="relative flex h-full w-[200vw] sm:w-[150vw] md:w-[110vw] lg:w-[85vw] shrink-0 items-center overflow-hidden px-5 sm:px-8 md:px-12 lg:px-24"
    >
      <div
        className="
          free-chart pointer-events-none absolute
          right-[4%] top-[58%] h-[26vh] w-[52vh] -translate-y-1/2 opacity-60
          sm:right-[6%] sm:top-1/2 sm:h-[32vh] sm:w-[64vh] sm:opacity-75
          md:h-[38vh] md:w-[76vh]
          lg:h-[44vh] lg:w-[88vh] lg:opacity-85
        "
      >
        <SignalChart />
      </div>

      <div className="relative z-10 max-w-2xl">
        <p className="free-rise mb-4 sm:mb-6 text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.4em] md:tracking-[0.5em] text-tertiary">
          Chapter 04
        </p>
        <h2 className="free-rise font-weird-word text-[clamp(2rem,10vw,6rem)] leading-[0.95] text-primary">
          Freelance
        </h2>
        <div className="free-rise mt-4 flex flex-wrap items-center gap-2 sm:gap-3">
          <p className="text-base sm:text-lg font-light italic text-secondary">Full Stack Developer</p>
          <span className="py-1 px-2.5 sm:px-3 border border-primary-border rounded-2xl smooth-corners whitespace-nowrap text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-tertiary">
            Builder
          </span>
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-tertiary">
            Apr 2026 – Present · Remote
          </span>
        </div>

        <p className="free-rise mt-5 sm:mt-6 max-w-lg text-sm sm:text-base leading-relaxed text-tertiary">
          Architecting a multi-tenant, AI-powered financial analytics SaaS — dashboards
          for revenue, cash flow, net worth, budgets and investments, with RBAC and
          workspace-level data isolation. On top sits an LLM Financial Copilot that
          reasons over tenant-scoped data through tool-based orchestration.
        </p>

        <div className="free-rise mt-6 sm:mt-8 max-w-[540px] border border-primary-border rounded-4xl smooth-corners bg-background/15 px-4 sm:px-5 py-3 sm:py-4 backdrop-blur-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4">
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.24em] sm:tracking-[0.28em] text-secondary">
              Financial Copilot
            </p>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.24em] text-tertiary">
              Ask → Tools → Insight
            </span>
          </div>
          <div className="mt-3 sm:mt-4 h-px w-full bg-primary-border/60" />
          <div className="mt-3 sm:mt-4 flex flex-wrap gap-2 sm:gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.18em] text-tertiary">
            {CAPABILITIES.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
        </div>

        <p className="free-rise mt-5 max-w-lg text-xs sm:text-sm leading-relaxed text-tertiary">
          Also: structured technical prompts and evaluation of long-horizon full-stack
          code generation for RLHF-based model alignment.
        </p>

        <div className="free-rise mt-6 flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-3 text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.25em] text-secondary">
          {STACK.map((t) => (
            <span key={t} className={TAG_CLASS}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
