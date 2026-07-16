"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useExperience } from "./ExperienceContext";
import { hReveal, float } from "./sceneFx";

gsap.registerPlugin(useGSAP);

/**
 * Scene 01 — Journey Introduction.
 * Calm, editorial, mostly empty space. The title drifts in from the right as
 * the world scrolls horizontally. A single faint horizon line breathes below.
 */
export default function SceneIntro() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { containerAnimation } = useExperience();

  useGSAP(
    () => {
      if (!containerAnimation) return;
      const reveal = hReveal(containerAnimation);
      gsap.from(".intro-rise", {
        y: 60,
        opacity: 0,
        filter: "blur(12px)",
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        immediateRender: false,
        scrollTrigger: reveal,
      });
      float(".intro-horizon", { distance: 8, duration: 9 });
    },
    { scope: rootRef, dependencies: [containerAnimation] }
  );

  return (
    <div
      ref={rootRef}
      className="relative flex h-full w-screen shrink-0 items-center justify-center px-10"
    >
      <div className="intro-horizon absolute bottom-[22%] left-[12%] h-px w-[76%] bg-linear-to-r from-transparent via-primary-border to-transparent" />

      <div className="max-w-4xl text-center">
        <p className="intro-rise mb-10 text-[11px] uppercase tracking-[0.5em] text-tertiary">
          A Visual Journey
        </p>
        <h2 className="intro-rise font-weird-word text-[clamp(3rem,9vw,8rem)] leading-[0.95] tracking-tight text-primary">
          The Journey
          <br />
          So Far
        </h2>
        <p className="intro-rise mt-10 text-sm tracking-[0.3em] text-secondary">
          2021 — Present
        </p>
        <p className="intro-rise mx-auto mt-8 max-w-md text-base leading-relaxed text-tertiary">
          A visual passage through my engineering career — told as a world you
          travel through, not a list you read.
        </p>
      </div>
    </div>
  );
}