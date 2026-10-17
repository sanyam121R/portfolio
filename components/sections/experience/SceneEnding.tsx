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
  
  return (
    <div className="relative flex h-full w-screen shrink-0 items-center justify-center px-10">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vh]" />
      <div className="relative z-10 max-w-6xl text-center">
        <p className="end-rise mb-8 text-[11px] uppercase tracking-[0.5em] text-tertiary">
          Systems Engineer
        </p>
        <h2 className="end-rise font-weird-word text-[clamp(2.5rem,7vw,5rem)] leading-[1.05] text-primary">
          <span className="text-tertiary">From</span>
          <br />
          SQL Queries
          <br />
          <span className="text-tertiary">To</span>
          <br />
          Distributed Systems
          <br />
          <span className="text-tertiary">To</span>
          <br />
          SaaS Apps
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