"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useAppReady } from "@/components/ClientShell";
import { ExperienceContext } from "./ExperienceContext";
import WorldTrack from "./WorldTrack";
import ProgressRail from "./ProgressRail";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const { preloaderDone } = useAppReady();

  // The master horizontal tween, shared with every scene through context.
  const [containerAnimation, setContainerAnimation] =
    useState<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      if (!preloaderDone) return;
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const getScrollAmount = () =>
        Math.max(0, track.scrollWidth - section.offsetWidth);
      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 1,
          onToggle: (self) => {
            section.style.zIndex = self.isActive ? "45" : "";
          },
          onRefresh: (self) => {
            // eslint-disable-next-line no-console
            console.log(
              "[EXP] scrollAmount=",
              getScrollAmount(),
              "track.scrollWidth=",
              track.scrollWidth,
              "progress=",
              self.progress
            );
          },
          onUpdate: (self) => {
            if (progressFillRef.current) {
              progressFillRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });

      setContainerAnimation(tween);

      const refresh = () => ScrollTrigger.refresh();
      const timers = [
        window.setTimeout(refresh, 300),
        window.setTimeout(refresh, 1200),
      ];
      window.addEventListener("load", refresh);

      return () => {
        timers.forEach((t) => window.clearTimeout(t));
        window.removeEventListener("load", refresh);
        section.style.zIndex = "";
        setContainerAnimation(null);
      };
    },
    { scope: sectionRef, dependencies: [preloaderDone] }
  );

  return (
    <ExperienceContext.Provider value={{ containerAnimation }}>
      <section
        ref={sectionRef}
        id="experience"
        className="relative h-screen w-full overflow-hidden"
        aria-label="Experience — a visual journey through my engineering career"
      >
        <WorldTrack ref={trackRef} />
        <ProgressRail progressFillRef={progressFillRef} />
      </section>
    </ExperienceContext.Provider>
  );
}