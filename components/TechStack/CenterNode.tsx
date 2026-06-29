"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export function CenterNode() {
  const pulseRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  useGSAP(() => {
    if (prefersReducedMotion || !pulseRef.current) return;
    gsap.to(pulseRef.current, {
      scale: 1.03,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, { dependencies: [prefersReducedMotion] });

  return (
    /*
      Responsive size wrapper — this is what centerRef points to.
      The SVG hexagon fills it, content sits on top.
    */
    <div
      ref={pulseRef}
      className="relative flex items-center justify-center w-[160px] h-[180px] sm:w-[185px] sm:h-[205px] lg:w-[210px] lg:h-[235px]"
    >
      {/* ── Hexagon SVG background ── */}
      <svg
        viewBox="0 0 210 235"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        <defs>
          {/* Gradient for selective face highlights */}
          <linearGradient id="hex-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
            <stop offset="10%" stopColor="rgba(255,255,255,0.06)" />
            <stop offset="30%" stopColor="rgba(255,255,255,0.02)" />
          </linearGradient>

          {/* Clip path for the hex shape */}
          <clipPath id="hex-clip">
            <path d={hexPath(105, 117, 98, 14)} />
          </clipPath>
        </defs>

        {/* Fill */}
        <path
          d={hexPath(105, 117, 98, 14)}
          fill="#111"
        />

        {/* Gradient overlay — top-left faces brighter */}
        <path
          d={hexPath(105, 117, 98, 14)}
          fill="url(#hex-grad)"
        />
      </svg>

      {/* ── Inner content ── */}
      <div className="relative z-10 flex flex-col items-center gap-1.5 sm:gap-2.5 px-2 sm:px-3">
        <p className="font-inter font-bold text-foreground text-[15px] sm:text-[17px] lg:text-[20px] text-center leading-snug">
          Full Stack Engineer
        </p>
        <span className="text-center">
        <p className="text-tertiary text-[8px] sm:text-[9px] lg:text-[10px] font-inter tracking-wide leading-relaxed">
          Designing • Building • Scaling
        </p>
        <p className="text-tertiary text-[8px] sm:text-[9px] lg:text-[10px] font-inter tracking-wide leading-relaxed">
          End-to-end digital solutions
        </p>
        </span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────
   Helpers — generate smooth hexagon path
   with rounded corners using arc commands
────────────────────────────────────── */
function hexPoints(cx: number, cy: number, r: number): [number, number][] {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 180) * (60 * i - 30);
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
  });
}

function hexPath(cx: number, cy: number, r: number, radius: number): string {
  const pts = hexPoints(cx, cy, r);
  const n = pts.length;
  let d = "";

  pts.forEach((pt, i) => {
    const prev = pts[(i - 1 + n) % n];
    const next = pts[(i + 1) % n];

    const dxIn = pt[0] - prev[0];
    const dyIn = pt[1] - prev[1];
    const lenIn = Math.hypot(dxIn, dyIn);
    const dxOut = next[0] - pt[0];
    const dyOut = next[1] - pt[1];
    const lenOut = Math.hypot(dxOut, dyOut);

    const r2 = Math.min(radius, lenIn / 2, lenOut / 2);

    const x1 = pt[0] - (dxIn / lenIn) * r2;
    const y1 = pt[1] - (dyIn / lenIn) * r2;
    const x2 = pt[0] + (dxOut / lenOut) * r2;
    const y2 = pt[1] + (dyOut / lenOut) * r2;

    if (i === 0) {
      d += `M ${x1} ${y1}`;
    } else {
      d += ` L ${x1} ${y1}`;
    }
    d += ` Q ${pt[0]} ${pt[1]} ${x2} ${y2}`;
  });

  return d + " Z";
}

function hexEdges(cx: number, cy: number, r: number, _radius: number) {
  const pts = hexPoints(cx, cy, r);
  return pts.map((pt, i) => {
    const next = pts[(i + 1) % pts.length];
    return { x1: pt[0], y1: pt[1], x2: next[0], y2: next[1] };
  });
}