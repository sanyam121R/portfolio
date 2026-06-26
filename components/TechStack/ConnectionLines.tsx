
"use client";

import {
  useEffect, useState, useCallback, useRef,
  type RefObject,
} from "react";
import { motion, useAnimationFrame } from "framer-motion";
import { techItems } from "@/lib/techStackData";

/* ─────────────────────────────────────────────────────────
   PathParticle — Framer's useAnimationFrame keeps this at
   60fps without GSAP and without triggering React re-renders
   on the parent (it only writes to its own state).
───────────────────────────────────────────────────────── */
function PathParticle({
  pathId,
  speed,
  active,
  delay,
}: {
  pathId: string;
  speed: number;
  active: boolean;
  delay: number;
}) {
  const tRef = useRef<number>(delay);
  const [pos, setPos] = useState<{ x: number; y: number; visible: boolean }>({
    x: 0, y: 0, visible: false,
  });

  useAnimationFrame((_, delta) => {
    const pathEl = document.getElementById(pathId) as SVGPathElement | null;
    if (!pathEl) return;
    tRef.current = (tRef.current + (delta / 1000) * speed) % 1;
    const len = pathEl.getTotalLength();
    const pt = pathEl.getPointAtLength(tRef.current * len);
    setPos({ x: pt.x, y: pt.y, visible: true });
  });

  if (!pos.visible) return null;

  return (
    <circle
      cx={pos.x}
      cy={pos.y}
      r={active ? 2.5 : 1.6}
      fill="white"
      opacity={active ? 0.95 : 0.35}
      filter="url(#particleGlow)"
    />
  );
}

/* ─────────────────────────────────────────────────────────
   Main component
───────────────────────────────────────────────────────── */
interface Props {
  cardRefs: RefObject<(HTMLDivElement | null)[]>;
  centerRef: RefObject<HTMLDivElement | null>;
  rightPanelRef: RefObject<HTMLDivElement | null>;
  sectionRef: RefObject<HTMLElement | null>;
  itemCount: number;
  activeIndex: number;
}

interface PathData {
  id: string;
  d: string;
  kind: "card" | "arrow";
}

export function ConnectionLines({
  cardRefs,
  centerRef,
  rightPanelRef,
  sectionRef,
  itemCount,
  activeIndex,
}: Props) {
  const [paths, setPaths] = useState<PathData[]>([]);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const rafRef = useRef<number | null>(null);

  /* ── Geometry ─────────────────────────────────── */
  const computePaths = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    // Double rAF — first commits layout, second reads stable values
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = requestAnimationFrame(() => {
        const section = sectionRef.current;
        const hub = centerRef.current;
        if (!section || !hub) return;

        const secRect = section.getBoundingClientRect();
        const hubRect = hub.getBoundingClientRect();

        const toSec = (r: DOMRect) => ({
          left: r.left - secRect.left,
          right: r.right - secRect.left,
          midY: r.top - secRect.top + r.height / 2,
          top: r.top - secRect.top,
        });

        const h = toSec(hubRect);

        // Visual hex edge: ~7% inset from bounding box edges
        const hexLeftX = h.left + hubRect.width * 0.07;
        const hexRightX = h.left + hubRect.width * 0.93;
        const hexMidY = h.midY;

        const newPaths: PathData[] = [];

        // Left cards → hex left edge
        cardRefs.current.forEach((el, i) => {
          if (!el) return;
          const c = toSec(el.getBoundingClientRect());
          const sx = c.right + 3;       // just past the dot
          const sy = c.midY;
          const dx = Math.abs(hexLeftX - sx);
          const t = dx * 0.52;

          newPaths.push({
            id: `path-card-${i}`,
            kind: "card",
            d: `M ${sx} ${sy} C ${sx + t} ${sy}, ${hexLeftX - t} ${hexMidY}, ${hexLeftX} ${hexMidY}`,
          });
        });

        // Hex right edge → right panel
        if (rightPanelRef.current) {
          const p = toSec(rightPanelRef.current.getBoundingClientRect());
          const tx = p.left;
          const ty = p.top + rightPanelRef.current.getBoundingClientRect().height * 0.4412 ;
          const midX = hexRightX + (tx - hexRightX) * 0.5;

          newPaths.push({
            id: "path-arrow",
            kind: "arrow",
            d: `M ${hexRightX} ${hexMidY} C ${midX} ${hexMidY}, ${midX} ${ty}, ${tx} ${ty}`,
          });
        }

        setPaths(newPaths);
        setDims({ w: secRect.width, h: secRect.height });
      });
    });
  }, [cardRefs, centerRef, rightPanelRef, sectionRef]);

  useEffect(() => {
    const ro = new ResizeObserver(computePaths);
    if (sectionRef.current) ro.observe(sectionRef.current);
    window.addEventListener("load", computePaths);
    computePaths();
    return () => {
      ro.disconnect();
      window.removeEventListener("load", computePaths);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [computePaths, itemCount]);

  // Recompute when active panel swap shifts right panel position
  useEffect(() => { computePaths(); }, [activeIndex, computePaths]);

  if (paths.length === 0 || dims.w === 0) return null;

  return (
    <svg
      aria-hidden="true"
      className="absolute top-0 left-0 pointer-events-none z-5"
      width={dims.w}
      height={dims.h}
      style={{ overflow: "visible" }}
    >
      <defs>
        {/* Outer atmospheric bloom */}
        <filter id="bloom-outer" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="14" result="blur" />
          <feComponentTransfer in="blur">
            <feFuncA type="linear" slope="0.5" />
          </feComponentTransfer>
        </filter>

        {/* Mid corona */}
        <filter id="bloom-mid" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComponentTransfer in="blur">
            <feFuncA type="linear" slope="0.65" />
          </feComponentTransfer>
        </filter>

        {/* Tight inner glow */}
        <filter id="bloom-inner" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="2.2" result="blur" />
          <feComponentTransfer in="blur">
            <feFuncA type="linear" slope="0.9" />
          </feComponentTransfer>
        </filter>

        {/* Particle halo */}
        <filter id="particleGlow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Arrowhead */}
        <marker id="arr" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto">
          <path d="M 0 0 L 6 3 L 0 6 z" fill="rgba(255,255,255)" />
        </marker>
      </defs>

      {paths.map((path, i) => {
        const isArrow = path.kind === "arrow";
        const cardIndex = isArrow ? -1 : i;
        const isActive = !isArrow && cardIndex === activeIndex;
        const isOtherActive = activeIndex !== -1 && !isActive;

        // Bloom intensity — dims when another card is active
        const groupOpacity = isOtherActive ? 0.08 : 1;

        const outerOpacity = isActive ? 0.45 : 0.10;
        const outerWidth = isActive ? 24 : 12;
        const midOpacity = isActive ? 0.60 : 0.16;
        const midWidth = isActive ? 10 : 5;
        const innerOpacity = isActive ? 0.78 : 0.25;
        const innerWidth = isActive ? 4 : 1.8;
        const coreOpacity = isActive ? 1.00 : 0.45;
        const coreWidth = isActive ? 1.1 : 0.6;

        const color = isActive ? "#ffffff" : "#8a96a8";

        if (isArrow) {
          return (
            <motion.g
              key={path.id}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <path
                key={path.id}
                d={path.d}
                fill="none"
                stroke="rgba(255,255,255)"
                strokeWidth={0.7}
                markerEnd="url(#arr)"
              />
              <motion.path
                d={path.d}
                fill="none"
                stroke={color}
                strokeLinecap="round"
                filter="url(#bloom-outer)"
                animate={{ strokeWidth: outerWidth }}
                transition={{ duration: 0.32, ease: "easeOut" }}
              />
              {/* Layer 2 — mid corona */}
              <motion.path
                d={path.d}
                fill="none"
                stroke={color}
                strokeLinecap="round"
                filter="url(#bloom-mid)"
                animate={{ opacity: midOpacity, strokeWidth: midWidth }}
                transition={{ duration: 0.32, ease: "easeOut" }}
              />

              {/* Layer 3 — tight inner glow */}
              <motion.path
                d={path.d}
                fill="none"
                stroke={color}
                strokeLinecap="round"
                filter="url(#bloom-inner)"
                animate={{ opacity: innerOpacity, strokeWidth: innerWidth }}
                transition={{ duration: 0.32, ease: "easeOut" }}
              />

              {/* Layer 4 — crisp white core */}
              <motion.path
                d={path.d}
                fill="none"
                stroke="#ffffff"
                strokeLinecap="round"
                animate={{ opacity: coreOpacity, strokeWidth: coreWidth }}
                transition={{ duration: 0.32, ease: "easeOut" }}
              />

              {/* Two staggered particles per path */}
              <PathParticle
                pathId={path.id}
                speed={isActive ? 0.38 : 0.13}
                active={isActive}
                delay={(i * 0.37) % 1}
              />
              <PathParticle
                pathId={path.id}
                speed={isActive ? 0.25 : 0.09}
                active={isActive}
                delay={(i * 0.73 + 0.5) % 1}
              />
            </motion.g>
          );
        }

        return (
          <motion.g
            key={path.id}
            animate={{ opacity: groupOpacity }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            {/* Reference path — invisible, used by PathParticle.getPointAtLength */}
            <path
              id={path.id}
              d={path.d}
              fill="none"
              stroke="transparent"
              strokeWidth={0}
            />

            {/* Layer 1 — outer atmospheric halo */}
            <motion.path
              d={path.d}
              fill="none"
              stroke={color}
              strokeLinecap="round"
              filter="url(#bloom-outer)"
              animate={{ opacity: outerOpacity, strokeWidth: outerWidth }}
              transition={{ duration: 0.32, ease: "easeOut" }}
            />

            {/* Layer 2 — mid corona */}
            <motion.path
              d={path.d}
              fill="none"
              stroke={color}
              strokeLinecap="round"
              filter="url(#bloom-mid)"
              animate={{ opacity: midOpacity, strokeWidth: midWidth }}
              transition={{ duration: 0.32, ease: "easeOut" }}
            />

            {/* Layer 3 — tight inner glow */}
            <motion.path
              d={path.d}
              fill="none"
              stroke={color}
              strokeLinecap="round"
              filter="url(#bloom-inner)"
              animate={{ opacity: innerOpacity, strokeWidth: innerWidth }}
              transition={{ duration: 0.32, ease: "easeOut" }}
            />

            {/* Layer 4 — crisp white core */}
            <motion.path
              d={path.d}
              fill="none"
              stroke="#ffffff"
              strokeLinecap="round"
              animate={{ opacity: coreOpacity, strokeWidth: coreWidth }}
              transition={{ duration: 0.32, ease: "easeOut" }}
            />

            {/* Two staggered particles per path */}
            <PathParticle
              pathId={path.id}
              speed={isActive ? 0.38 : 0.13}
              active={isActive}
              delay={(i * 0.37) % 1}
            />
            <PathParticle
              pathId={path.id}
              speed={isActive ? 0.25 : 0.09}
              active={isActive}
              delay={(i * 0.73 + 0.5) % 1}
            />
          </motion.g>
        );
      })}
    </svg>
  );
}