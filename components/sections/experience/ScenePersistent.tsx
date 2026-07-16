"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useExperience } from "./ExperienceContext";
import { hReveal, float, drift } from "./sceneFx";

gsap.registerPlugin(useGSAP);

/**
 * Scene 02 — Persistent Systems.
 * Foundation / learning / databases. Architectural wireframe cubes, a faint
 * database grid, thin technical lines. Floating metric labels, unboxed.
 */
function WireCube({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={`text-primary-border ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.75"
    >
      <path d="M30 20 L90 20 L90 80 L30 80 Z" />
      <path d="M30 20 L50 8 L110 8 L90 20" />
      <path d="M90 80 L110 68 L110 8" />
      <path d="M50 8 L50 68 L110 68" />
      <path d="M50 68 L30 80" />
    </svg>
  );
}

export default function ScenePersistent() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { containerAnimation } = useExperience();

  useGSAP(
    () => {
      if (!containerAnimation) return;
      const reveal = hReveal(containerAnimation);
      gsap.from(".pers-rise", {
        y: 50,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
        immediateRender: false,
        scrollTrigger: reveal,
      });
      float(".pers-cube", { distance: 18, duration: 8, delay: 0.4 });
      float(".pers-metric", { distance: 12, duration: 6, delay: 0.8 });
      drift(".pers-grid", { duration: 90 });
    },
    { scope: rootRef, dependencies: [containerAnimation] }
  );

  return (
    <div
      ref={rootRef}
      className="relative flex h-full w-[85vw] shrink-0 items-center overflow-hidden px-12 md:px-24"
    >
      {/* Wireframe cubes */}
      <WireCube className="pers-cube absolute right-[14%] top-[20%] h-40 w-40 opacity-100" />
      <WireCube className="pers-cube absolute right-[8%] bottom-[16%] h-24 w-24 opacity-100" />

      {/* Faint database grid */}
      <div
        className="pers-grid pointer-events-none absolute inset-y-0 right-[6%] w-[40%] opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />


      <div className="relative z-10 max-w-2xl">
        <p className="pers-rise mb-6 text-[11px] uppercase tracking-[0.5em] text-tertiary">
          Chapter 01
        </p>
        <h2 className="pers-rise font-weird-word text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] text-primary">
          Persistent
          <br />
          Systems
        </h2>
        <p className="pers-rise mt-3 text-lg font-light italic text-secondary">
          Database Apprentice
        </p>
        <p className="pers-rise mt-8 max-w-md text-base leading-relaxed text-tertiary">
          Learning enterprise systems and data infrastructure — where reliable
          foundations are quietly built, one query at a time.
        </p>

        <div className="pers-rise mt-12 flex flex-wrap gap-x-6 gap-y-4 text-sm uppercase tracking-[0.25em] text-secondary">
          <span className="pers-metric py-1 px-3 border border-primary-border rounded-2xl smooth-corners whitespace-nowrap">SQL</span>
          <span className="pers-metric py-1 px-3 border border-primary-border rounded-2xl smooth-corners whitespace-nowrap">Docker</span>
          <span className="pers-metric py-1 px-3 border border-primary-border rounded-2xl smooth-corners whitespace-nowrap">PostgreSQL</span>
          <span className="pers-metric py-1 px-3 border border-primary-border rounded-2xl smooth-corners whitespace-nowrap">IBM Netezza</span>
        </div>
      </div>
    </div>
  );
}