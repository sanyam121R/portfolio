"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useExperience } from "./ExperienceContext";
import { hReveal, float } from "./sceneFx";

gsap.registerPlugin(useGSAP);

/**
 * Scene 03 — InfoHub Innovations.
 * Growth / building products. A minimal network of API nodes with connection
 * lines and moving packets. Floating metrics + editorial tech labels.
 */

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
    <svg
      viewBox="0 0 560 240"
      className="h-full w-full text-primary"
      fill="none"
    >
      <defs>
        <filter id="accelGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>
      </defs>

      {/* faint static ellipse guides */}
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

      {/* moving streaks — each orbit is one path with dashes that animate around it */}
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

      {/* a few brighter lead particles riding the two outer orbits */}
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

      {/* soft core glow at the center of the accelerator */}
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
      // float(".info-network", { distance: 14, duration: 8, delay: 0.3 });
      // float(".info-metric", { distance: 10, duration: 6.5, delay: 0.6 });
    },
    { scope: rootRef, dependencies: [containerAnimation] }
  );

  return (
    <div
      ref={rootRef}
      className="relative flex h-full w-[85vw] shrink-0 items-center overflow-hidden px-12 md:px-24"
    >

      <div className="info-network absolute right-[6%] bottom-0 h-[60vh] w-[60vh] -translate-y-1/4">
        <ParticleAccelerator />
      </div>

      <div className="relative z-10 max-w-2xl">
        <p className="info-rise mb-6 text-[11px] uppercase tracking-[0.5em] text-tertiary">
          Chapter 02
        </p>
        <h2 className="info-rise font-weird-word text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] text-primary">
          InfoHub
          <br />
          Innovations
        </h2>
        <p className="info-rise mt-3 text-lg font-light italic text-secondary">
          System Builder
        </p>
        <p className="info-rise mt-8 max-w-md text-base leading-relaxed text-tertiary">
          Shipping production software that moved real content to real users —
          building the products, not just the parts.
        </p>

        <div className="info-rise mt-10 flex flex-wrap gap-x-12 gap-y-6">
          <div>
            <p className="text-4xl font-light text-primary">4000+</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-tertiary">
              Articles
            </p>
          </div>
          <div>
            <p className="text-4xl font-light text-primary">60%</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-tertiary">
              Error Reduction
            </p>
          </div>
          <div>
            <p className="text-4xl font-light text-primary">10%</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-tertiary">
              Performance Gain
            </p>
          </div>
        </div>

        <div className="info-rise mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm uppercase tracking-[0.25em] text-secondary">
          <span className="info-metric py-1 px-3 border border-primary-border rounded-2xl smooth-corners whitespace-nowrap">Node.js</span>
          <span className="info-metric py-1 px-3 border border-primary-border rounded-2xl smooth-corners whitespace-nowrap">OAuth</span>
          <span className="info-metric py-1 px-3 border border-primary-border rounded-2xl smooth-corners whitespace-nowrap">React</span>
          <span className="info-metric py-1 px-3 border border-primary-border rounded-2xl smooth-corners whitespace-nowrap">CMS</span>
          <span className="info-metric py-1 px-3 border border-primary-border rounded-2xl smooth-corners whitespace-nowrap">Web Performance</span>
        </div>
      </div>
    </div>
  );
}