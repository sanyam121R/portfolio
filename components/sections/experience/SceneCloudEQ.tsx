"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useExperience } from "./ExperienceContext";
import { hReveal } from "./sceneFx";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="ceq-rise min-w-[90px] sm:min-w-[110px] md:min-w-[120px]">
      <p className="text-2xl sm:text-3xl md:text-4xl font-light text-primary">{value}</p>
      <p className="mt-1 text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.25em] md:tracking-[0.3em] text-tertiary">
        {label}
      </p>
    </div>
  );
}

/* Wave component unchanged */
function Wave() {
  const cols = 26;
  const rows = 16;
  const cellW = 18;
  const cellH = 18;
  const width = cols * cellW;
  const height = rows * cellH;
  const rippleCx = width * 0.62;
  const rippleCy = height * 0.86;
  const round = (n: number, d = 3) => Number(n.toFixed(d));
  const points: { x: number; y: number; r: number; o: number; delay: number; dur: number }[] = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const baseX = col * cellW;
      const baseY = row * cellH;
      const ridge =
        Math.sin((col * 0.34 - row * 0.22) * 0.9) * 26 +
        Math.sin((col * 0.14 + row * 0.3) * 0.6) * 14;
      const dx = baseX - rippleCx;
      const dy = baseY - rippleCy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const ripple = Math.cos(dist * 0.16) * Math.max(0, 30 - dist * 0.12);
      const y = baseY - ridge * 0.5 + ripple * 0.15;
      const depth = 1 - Math.min(1, Math.hypot(col / cols - 0.85, row / rows - 0.15));
      const heightBoost = Math.max(0, (ridge + 40) / 80);
      const r = Math.min(2.2, 0.6 + heightBoost * 1.1 + depth * 0.6);
      const o = Math.min(1, 0.12 + heightBoost * 0.55 + depth * 0.25);
      points.push({
        x: round(baseX, 2),
        y: round(y, 3),
        r: round(r, 3),
        o: round(o, 3),
        delay: round((row + col) * 0.03, 2),
        dur: round(3.2 + ((row * cols + col) % 7) * 0.35, 2),
      });
    }
  }

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full text-primary" fill="none">
      <defs>
        <radialGradient id="waveFade" cx="72%" cy="30%" r="75%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="waveMask">
          <rect width={width} height={height} fill="url(#waveFade)" />
        </mask>
      </defs>
      <g mask="url(#waveMask)">
        {points.map((p, i) => {
          const oLow = round(p.o * 0.4, 3);
          const oMid = round(p.o * 0.5, 3);
          return (
            <circle key={i} cx={p.x} cy={p.y} r={p.r} fill="white" opacity={p.o}>
              <animate
                attributeName="opacity"
                values={`${oLow};${p.o};${oMid};${p.o};${oLow}`}
                dur={`${p.dur}s`}
                begin={`${p.delay}s`}
                repeatCount="indefinite"
              />
            </circle>
          );
        })}
      </g>
    </svg>
  );
}

export default function SceneCloudEQ() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { containerAnimation } = useExperience();

  useGSAP(
    () => {
      if (!containerAnimation) return;
      const reveal = hReveal(containerAnimation);
      gsap.from(".ceq-rise", {
        y: 50,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1,
        ease: "power3.out",
        stagger: 0.08,
        immediateRender: false,
        scrollTrigger: reveal,
      });
      gsap.from(".promo-rise", {
        y: 40,
        opacity: 0,
        filter: "blur(14px)",
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.12,
        immediateRender: false,
        scrollTrigger: {
          ...reveal,
          start: "left 70%",
          end: "left 35%",
        },
      });

      // Recalculate ScrollTrigger positions when viewport size/orientation changes
      const onResize = () => ScrollTrigger?.refresh();
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    },
    { scope: rootRef, dependencies: [containerAnimation] }
  );

  return (
    <div
      ref={rootRef}
      className="relative flex h-full w-[420vw] sm:w-[300vw] md:w-[230vw] lg:w-[181vw] shrink-0 items-center overflow-hidden"
    >
      {/* ---------- Act One : Software Engineer I ---------- */}
      <div className="relative flex h-full w-[110vw] sm:w-[75vw] md:w-[56vw] lg:w-[46vw] shrink-0 items-center px-5 sm:px-8 md:px-12 lg:px-24">
        <div className="relative z-10 max-w-xl">
          <p className="ceq-rise mb-4 sm:mb-6 text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.4em] md:tracking-[0.5em] text-tertiary">
            Chapter 03 · Act One
          </p>
          <h2 className="ceq-rise font-weird-word text-[clamp(2rem,10vw,6rem)] leading-[0.95] text-primary">
            CloudEQ
          </h2>
          <div className="ceq-rise mt-4 flex flex-wrap items-center gap-2 sm:gap-3">
            <p className="text-base sm:text-lg font-light italic text-secondary">Software Engineer I</p>
            <span className="ceq-metric py-1 px-2.5 sm:px-3 border border-primary-border rounded-2xl smooth-corners whitespace-nowrap text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-tertiary">
              Integrator
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-tertiary">
              Jan 2023 – Aug 2025
            </span>
          </div>

          <p className="ceq-rise mt-6 sm:mt-8 max-w-xl text-sm sm:text-base leading-relaxed text-tertiary">
            Enterprise integrations across React, AWS Lambda, ServiceNow, HALO,
            Azure AD and Jira — connecting systems that the business runs on.
          </p>

          <div className="ceq-rise mt-8 sm:mt-10 flex flex-wrap gap-x-6 sm:gap-x-10 gap-y-4 sm:gap-y-6">
            <StatBlock value="40%" label="Collab Efficiency" />
            <StatBlock value="80%" label="Manual Sync Removed" />
            <StatBlock value="800ms" label="Load Time Cut" />
            <StatBlock value="25%" label="Faster Ticket Resolution" />
          </div>

          <div className="ceq-rise mt-8 sm:mt-10 flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-3 text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.25em] text-secondary">
            <span className="ceq-metric py-1 px-2.5 sm:px-3 border border-primary-border rounded-2xl smooth-corners whitespace-nowrap">Node.js</span>
            <span className="ceq-metric py-1 px-2.5 sm:px-3 border border-primary-border rounded-2xl smooth-corners whitespace-nowrap">Typescript</span>
            <span className="ceq-metric py-1 px-2.5 sm:px-3 border border-primary-border rounded-2xl smooth-corners whitespace-nowrap">React</span>
            <span className="ceq-metric py-1 px-2.5 sm:px-3 border border-primary-border rounded-2xl smooth-corners whitespace-nowrap">AWS Lambda</span>
            <span className="ceq-metric py-1 px-2.5 sm:px-3 border border-primary-border rounded-2xl smooth-corners whitespace-nowrap">Jira</span>
            <span className="ceq-metric py-1 px-2.5 sm:px-3 border border-primary-border rounded-2xl smooth-corners whitespace-nowrap">Microsoft Graph API</span>
            <span className="ceq-metric py-1 px-2.5 sm:px-3 border border-primary-border rounded-2xl smooth-corners whitespace-nowrap">Figma → React</span>
          </div>

          <div className="ceq-rise mt-8 sm:mt-10 max-w-[540px] border border-primary-border rounded-4xl smooth-corners bg-background/15 px-4 sm:px-5 py-3 sm:py-4 backdrop-blur-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4">
              <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.24em] sm:tracking-[0.28em] text-secondary">
                Enterprise Integration Flow
              </p>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.24em] text-tertiary">
                ITSM → Identity → Delivery
              </span>
            </div>
            <div className="mt-3 sm:mt-4 h-px w-full bg-primary-border/60" />
            <div className="mt-3 sm:mt-4 flex flex-wrap gap-2 sm:gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.18em] text-tertiary">
              <span>Ticket routing, </span>
              <span>HALO ↔ Jira · ServiceNow ↔ Jira, </span>
              <span>Teams + Jira automation, </span>
              <span>Time Tracking Calendar, </span>
              <span>Windowed budget-variance table</span>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Act Two : Promotion (environmental transition) ---------- */}
      <div className="relative flex h-full w-[130vw] sm:w-[95vw] md:w-[72vw] lg:w-[60vw] shrink-0 items-center justify-center px-5 sm:px-0">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-100">
          <div className="relative h-[40vh] sm:h-[48vh] md:h-[56vh] w-[2px] bg-linear-to-b from-transparent via-primary-border to-transparent" />
          <div className="absolute aspect-square w-[70vw] sm:w-[46vw] md:w-[32vw] rounded-full border border-primary-border/60" />
          <div className="absolute aspect-square w-[46vw] sm:w-[28vw] md:w-[20vw] rounded-full border border-primary-border/50" />
        </div>

        <div className="relative z-10 text-center">
          <p className="promo-rise mb-3 sm:mb-4 text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.5em] md:tracking-[0.6em] text-tertiary">
            August 2025
          </p>

          <div className="promo-rise mb-4 sm:mb-6 flex items-center justify-center gap-2 sm:gap-4 text-[9px] sm:text-[10px] uppercase tracking-[0.22em] sm:tracking-[0.28em] text-tertiary">
            <span>CloudEQ</span>
            <span className="h-px w-6 sm:w-10 bg-primary-border/40" />
            <span>Milestone</span>
            <span className="h-px w-6 sm:w-10 bg-primary-border/40" />
            <span>Career Growth</span>
          </div>

          <h2 className="promo-rise font-weird-word text-[clamp(1.75rem,11vw,6rem)] leading-none text-primary">
            PROMOTED
          </h2>

          <p className="promo-rise mt-6 sm:mt-8 text-lg sm:text-xl font-light italic text-secondary">
            Software Engineer II
          </p>

          <p className="promo-rise mt-4 sm:mt-6 text-xs sm:text-sm leading-relaxed text-tertiary">
            Transitioned from enterprise integrations to ownership of event-driven systems,
          </p>
          <p className="promo-rise text-xs sm:text-sm leading-relaxed text-tertiary">
            reliability, and workflow architecture.
          </p>
        </div>
      </div>

      {/* ---------- Act Three : Software Engineer II ---------- */}
      <div className="relative flex h-full w-[180vw] sm:w-[130vw] md:w-[95vw] lg:w-[75vw] shrink-0 items-center overflow-hidden px-5 sm:px-8 md:px-12 lg:px-24">
      <div className="
  ceq-wave absolute
  right-[2%] top-[55%] h-[30vh] w-[32vh]
  -translate-y-1/2 opacity-70
  sm:right-[0%] sm:top-1/2 sm:h-[38vh] sm:w-[38vh] sm:opacity-80
  md:h-[48vh] md:w-[48vh] md:opacity-85
  lg:h-[64vh] lg:w-[62vh] lg:opacity-90
">
  <Wave />
</div>

        <div className="relative z-10 max-w-2xl">
          <p className="ceq-rise mb-4 sm:mb-6 text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.4em] md:tracking-[0.5em] text-tertiary">
            Chapter 03 · Act Three
          </p>
          <h2 className="ceq-rise font-weird-word text-[clamp(1.9rem,9vw,5rem)] leading-[0.95] text-primary">
            CloudEQ
          </h2>
          <div className="ceq-rise mt-4 flex flex-wrap items-center gap-2 sm:gap-3">
            <p className="text-base sm:text-lg font-light italic text-secondary">Software Engineer II</p>
            <span className="py-1 px-2.5 sm:px-3 border border-primary-border rounded-2xl smooth-corners whitespace-nowrap text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-tertiary">
              Architect
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-tertiary">
              Aug 2025 – Present
            </span>
          </div>
          <p className="ceq-rise mt-6 sm:mt-8 max-w-md text-sm sm:text-base leading-relaxed text-tertiary">
            Event-driven Salesforce CDC pipeline with saga orchestration, compensating
            transactions, and human-in-the-loop approval — reliable by design.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-wrap gap-x-8 sm:gap-x-12 gap-y-4 sm:gap-y-6">
            <StatBlock value="99%" label="Reliability" />
            <StatBlock value="75%" label="Reduce Manual Project-Intake" />
            <StatBlock value="500+" label="Events" />
          </div>

          <div className="ceq-rise mt-8 sm:mt-10 flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-3 text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.25em] text-secondary">
            <span className="ceq-metric py-1 px-2.5 sm:px-3 border border-primary-border rounded-2xl smooth-corners whitespace-nowrap">Saga Orchestration</span>
            <span className="ceq-metric py-1 px-2.5 sm:px-3 border border-primary-border rounded-2xl smooth-corners whitespace-nowrap">Idempotency Guards</span>
            <span className="ceq-metric py-1 px-2.5 sm:px-3 border border-primary-border rounded-2xl smooth-corners whitespace-nowrap">Exponential Backoff</span>
            <span className="ceq-metric py-1 px-2.5 sm:px-3 border border-primary-border rounded-2xl smooth-corners whitespace-nowrap">Jira Approval Gates</span>
            <span className="ceq-metric py-1 px-2.5 sm:px-3 border border-primary-border rounded-2xl smooth-corners whitespace-nowrap">BullMQ</span>
            <span className="ceq-metric py-1 px-2.5 sm:px-3 border border-primary-border rounded-2xl smooth-corners whitespace-nowrap">Redis</span>
            <span className="ceq-metric py-1 px-2.5 sm:px-3 border border-primary-border rounded-2xl smooth-corners whitespace-nowrap">MongoDB</span>
            <span className="ceq-metric py-1 px-2.5 sm:px-3 border border-primary-border rounded-2xl smooth-corners whitespace-nowrap">Salesforce CDC</span>
            <span className="ceq-metric py-1 px-2.5 sm:px-3 border border-primary-border rounded-2xl smooth-corners whitespace-nowrap">TypeScript</span>
            <span className="ceq-metric py-1 px-2.5 sm:px-3 border border-primary-border rounded-2xl smooth-corners whitespace-nowrap">React</span>
            <span className="ceq-metric py-1 px-2.5 sm:px-3 border border-primary-border rounded-2xl smooth-corners whitespace-nowrap">Azure</span>
            <span className="ceq-metric py-1 px-2.5 sm:px-3 border border-primary-border rounded-2xl smooth-corners whitespace-nowrap">Node.js</span>
          </div>
        </div>
      </div>
    </div>
  );
}