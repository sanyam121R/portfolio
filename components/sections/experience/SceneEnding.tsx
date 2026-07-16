"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useExperience } from "./ExperienceContext";
import { hReveal, float } from "./sceneFx";

gsap.registerPlugin(useGSAP);

/**
 * Scene 05 — Journey Ending.
 * The world quiets. Less interface, less noise. Large typography, emotional
 * closure without implying the journey is finished.
 */
export default function SceneEnding() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { containerAnimation } = useExperience();

  useGSAP(
    () => {
      if (!containerAnimation) return;
      const reveal = hReveal(containerAnimation);
      gsap.from(".end-rise", {
        y: 50,
        opacity: 0,
        filter: "blur(12px)",
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.14,
        immediateRender: false,
        scrollTrigger: reveal,
      });
      float(".end-glow", { distance: 10, duration: 10 });
    },
    { scope: rootRef, dependencies: [containerAnimation] }
  );

  return (
    <div
      ref={rootRef}
      className="relative flex h-full w-screen shrink-0 items-center justify-center px-10"
    >
      <div className="end-glow pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.05),transparent_70%)]" />

      <div className="relative z-10 max-w-3xl text-center">
        <p className="end-rise mb-8 text-[11px] uppercase tracking-[0.5em] text-tertiary">
          Systems Engineer
        </p>
        <h2 className="end-rise font-weird-word text-[clamp(2.5rem,7vw,6rem)] leading-[1.05] text-primary">
          From SQL Queries
          <br />
          <span className="text-tertiary">To</span> Distributed Systems
        </h2>
        <p className="end-rise mt-10 text-sm tracking-[0.3em] text-secondary">
          2021 — Present
        </p>
        <p className="end-rise mx-auto mt-8 max-w-sm text-base leading-relaxed text-tertiary">
          The journey continues.
        </p>
      </div>
    </div>
  );
}