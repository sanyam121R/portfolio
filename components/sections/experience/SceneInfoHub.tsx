"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useExperience } from "./ExperienceContext";
import { hReveal } from "./sceneFx";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function ParticleAccelerator() {
  const orbits = [
    { rx: 210, ry: 62, rotate: -18, dash: "3 14", speed: 9, opacity: 0.9 },
    { rx: 190, ry: 54, rotate: -16, dash: "2 16", speed: 11, opacity: 0.75 },
    { rx: 168, ry: 46, rotate: -14, dash: "4 12", speed: 7.5, opacity: 0.8 },
    { rx: 148, ry: 40, rotate: -20, dash: "2 18", speed: 13, opacity: 0.55 },
    { rx: 128, ry: 34, rotate: -12, dash: "3 15", speed: 10, opacity: 0.65 },
    { rx: 108, ry: 28, rotate: -22, dash: "2 20", speed: 15, opacity: 0.4 },
    { rx: 226, ry: 70, rotate: -10, dash: "1.5 22", speed: 17, opacity: 0.35 },
  ];

  const cx = 280;
  const cy = 120;

  return (
    <svg viewBox="0 0 560 240" className="h-full w-full text-primary" fill="none">
      <defs>
        <filter id="accelGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>
      </defs>

      <g stroke="currentColor" strokeOpacity="0.08" strokeWidth="1">
        {orbits.map((o, i) => (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx={o.rx}
            ry={o.ry}
            transform={`rotate(${o.rotate} ${cx} ${cy})`}
          />
        ))}
      </g>

      <g className="text-primary">
        {orbits.map((o, i) => (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx={o.rx}
            ry={o.ry}
            transform={`rotate(${o.rotate} ${cx} ${cy})`}
            stroke="currentColor"
            strokeWidth={i % 2 === 0 ? 1.4 : 1}
            strokeOpacity={o.opacity}
            strokeDasharray={o.dash}
            strokeLinecap="round"
            filter="url(#accelGlow)"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to={i % 2 === 0 ? "-800" : "800"}
              dur={`${o.speed}s`}
              repeatCount="indefinite"
            />
          </ellipse>
        ))}
      </g>

      <g className="text-primary">
        <circle r="2.2" fill="currentColor" filter="url(#accelGlow)">
          <animateMotion
            dur="9s"
            repeatCount="indefinite"
            path={`M${cx + orbits[0].rx} ${cy} A${orbits[0].rx} ${orbits[0].ry} 0 1 1 ${cx - orbits[0].rx} ${cy} A${orbits[0].rx} ${orbits[0].ry} 0 1 1 ${cx + orbits[0].rx} ${cy}`}
            rotate="auto"
          />
        </circle>
        <circle r="1.8" fill="currentColor" opacity="0.8" filter="url(#accelGlow)">
          <animateMotion
            dur="17s"
            repeatCount="indefinite"
            path={`M${cx + orbits[6].rx} ${cy} A${orbits[6].rx} ${orbits[6].ry} 0 1 1 ${cx - orbits[6].rx} ${cy} A${orbits[6].rx} ${orbits[6].ry} 0 1 1 ${cx + orbits[6].rx} ${cy}`}
            rotate="auto"
          />
        </circle>
      </g>

      <circle cx={cx} cy={cy} r="26" fill="currentColor" opacity="0.05" filter="url(#accelGlow)" />
    </svg>
  );
}

export default function SceneInfoHub() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { containerAnimation } = useExperience();

  useGSAP(
    () => {
      if (!containerAnimation) return;
      const reveal = hReveal(containerAnimation);
      gsap.from(".info-rise", {
        y: 50,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
        immediateRender: false,
        scrollTrigger: reveal,
      });

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

      <div className="
        info-network absolute
        top-[50%] right-[20%] translate-y-[-70%]
        h-[40vh] w-[40vh]
        sm:top-auto sm:right-[6%] sm:bottom-0 sm:translate-y-0
        md:-translate-y-1/4 md:h-[50vh] md:w-[50vh]
        lg:h-[60vh] lg:w-[60vh]
      ">
        <ParticleAccelerator />
      </div>

      <div className="relative z-10 max-w-2xl">
        <p className="info-rise mb-4 sm:mb-6 text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.4em] md:tracking-[0.5em] text-tertiary">
          Chapter 02
        </p>
        <h2 className="info-rise font-weird-word text-[clamp(2rem,10vw,6rem)] leading-[0.95] text-primary">
          InfoHub
          <br />
          Innovations
        </h2>
        <p className="info-rise mt-2 sm:mt-3 text-base sm:text-lg font-light italic text-secondary">
          System Builder
        </p>
        <p className="info-rise mt-6 sm:mt-8 max-w-md text-sm sm:text-base leading-relaxed text-tertiary">
          Shipping production software that moved real content to real users —
          building the products, not just the parts.
        </p>

        <div className="info-rise mt-8 sm:mt-10 flex flex-wrap gap-x-8 sm:gap-x-12 gap-y-4 sm:gap-y-6">
          <div>
            <p className="text-2xl sm:text-3xl md:text-4xl font-light text-primary">4000+</p>
            <p className="mt-1 text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.25em] md:tracking-[0.3em] text-tertiary">
              Articles
            </p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl md:text-4xl font-light text-primary">60%</p>
            <p className="mt-1 text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.25em] md:tracking-[0.3em] text-tertiary">
              Error Reduction
            </p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl md:text-4xl font-light text-primary">10%</p>
            <p className="mt-1 text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.25em] md:tracking-[0.3em] text-tertiary">
              Performance Gain
            </p>
          </div>
        </div>

        <div className="info-rise mt-8 sm:mt-10 flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-3 text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.25em] text-secondary">
          <span className="info-metric py-1 px-2.5 sm:px-3 border border-primary-border rounded-2xl smooth-corners whitespace-nowrap">Node.js</span>
          <span className="info-metric py-1 px-2.5 sm:px-3 border border-primary-border rounded-2xl smooth-corners whitespace-nowrap">OAuth</span>
          <span className="info-metric py-1 px-2.5 sm:px-3 border border-primary-border rounded-2xl smooth-corners whitespace-nowrap">React</span>
          <span className="info-metric py-1 px-2.5 sm:px-3 border border-primary-border rounded-2xl smooth-corners whitespace-nowrap">CMS</span>
          <span className="info-metric py-1 px-2.5 sm:px-3 border border-primary-border rounded-2xl smooth-corners whitespace-nowrap">Web Performance</span>
        </div>
      </div>
    </div>
  );
}