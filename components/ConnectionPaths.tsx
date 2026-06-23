"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion, useAnimationFrame } from "framer-motion";

interface ConnectionPathsProps {
  hubRef: React.RefObject<HTMLDivElement | null>;
  cardRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  hoveredCardId: string | null;
  skills: { id: string; side: "left" | "right" }[];
}

interface PathData {
  id: string;
  d: string;
  side: "left" | "right";
}

// Glowing particle that travels along an SVG path element
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
  const [pos, setPos] = useState({ x: 0, y: 0, visible: false });

  useAnimationFrame((_, delta) => {
    const pathEl = document.getElementById(pathId) as SVGPathElement | null;
    if (!pathEl) return;
    tRef.current = (tRef.current + (delta / 1000) * speed) % 1;
    const pt = pathEl.getPointAtLength(tRef.current * pathEl.getTotalLength());
    setPos({ x: pt.x, y: pt.y, visible: true });
  });

  if (!pos.visible) return null;

  return (
    <circle
      cx={pos.x}
      cy={pos.y}
      r={active ? 2.5 : 1.5}
      fill="white"
      opacity={active ? 0.9 : 0.4}
      filter="url(#particleGlow)"
    />
  );
}

export function ConnectionPaths({
  hubRef,
  cardRefs,
  containerRef,
  hoveredCardId,
  skills,
}: ConnectionPathsProps) {
  const [paths, setPaths] = useState<PathData[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const calculatePaths = useCallback(() => {
    if (!hubRef.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const hubRect = hubRef.current.getBoundingClientRect();

    // Hub vertical center (shared by all paths)
    const hubMidY = hubRect.top - containerRect.top + hubRect.height / 2;

    // Hub horizontal connection points:
    // Left cards connect to hub's LEFT edge; right cards connect to hub's RIGHT edge
    const hubLeftX  = hubRect.left  - containerRect.left;
    const hubRightX = hubRect.right - containerRect.left;

    const newPaths: PathData[] = [];

    skills.forEach((skill) => {
      const cardEl = cardRefs.current[skill.id];
      if (!cardEl) return;

      const cardRect = cardEl.getBoundingClientRect();
      const cardMidY = cardRect.top - containerRect.top + cardRect.height / 2;

      let startX: number;
      let endX: number;
      let d: string;

      if (skill.side === "left") {
        // Hub left edge → card right edge
        startX = hubLeftX;
        endX   = cardRect.right - containerRect.left;

        const hDist  = Math.abs(endX - startX);
        const tension = hDist * 0.5;

        // Cubic bezier: both control points pulled horizontally
        // so all left paths BUNDLE near the hub and FAN OUT toward cards
        d = `M ${startX} ${hubMidY} C ${startX - tension} ${hubMidY}, ${endX + tension} ${cardMidY}, ${endX} ${cardMidY}`;
      } else {
        // Hub right edge → card left edge
        startX = hubRightX;
        endX   = cardRect.left - containerRect.left;

        const hDist  = Math.abs(endX - startX);
        const tension = hDist * 0.5;

        d = `M ${startX} ${hubMidY} C ${startX + tension} ${hubMidY}, ${endX - tension} ${cardMidY}, ${endX} ${cardMidY}`;
      }

      newPaths.push({ id: skill.id, d, side: skill.side });
    });

    setPaths(newPaths);
    setDimensions({ width: containerRect.width, height: containerRect.height });
  }, [hubRef, cardRefs, containerRef, skills]);

  useEffect(() => {
    calculatePaths();
    window.addEventListener("resize", calculatePaths);
    let observer: ResizeObserver | null = null;
    if (containerRef.current) {
      observer = new ResizeObserver(calculatePaths);
      observer.observe(containerRef.current);
    }
    return () => {
      window.removeEventListener("resize", calculatePaths);
      if (observer) observer.disconnect();
    };
  }, [calculatePaths, containerRef]);

  if (paths.length === 0 || dimensions.width === 0) return null;

  return (
    <svg
      className="absolute top-0 left-0 pointer-events-none z-0"
      width={dimensions.width}
      height={dimensions.height}
      style={{ overflow: "visible" }}
    >
      <defs>
        {/* Outer bloom — wide soft halo */}
        <filter id="bloom-outer" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="16" result="blur" />
          <feComponentTransfer in="blur">
            <feFuncA type="linear" slope="0.55" />
          </feComponentTransfer>
        </filter>

        {/* Mid bloom */}
        <filter id="bloom-mid" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feComponentTransfer in="blur">
            <feFuncA type="linear" slope="0.7" />
          </feComponentTransfer>
        </filter>

        {/* Inner tight glow */}
        <filter id="bloom-inner" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComponentTransfer in="blur">
            <feFuncA type="linear" slope="0.9" />
          </feComponentTransfer>
        </filter>

        {/* Particle glow */}
        <filter id="particleGlow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {paths.map((path, i) => {
        const isActive      = hoveredCardId === path.id;
        const isOtherActive = hoveredCardId !== null && hoveredCardId !== path.id;

        const groupOpacity  = isOtherActive ? 0.1  : 1;

        // Idle → active intensity escalation
        const outerOpacity  = isActive ? 0.50 : 0.12;
        const outerWidth    = isActive ? 26   : 14;
        const midOpacity    = isActive ? 0.65 : 0.18;
        const midWidth      = isActive ? 11   : 6;
        const innerOpacity  = isActive ? 0.80 : 0.28;
        const innerWidth    = isActive ? 4.5  : 2;
        const coreOpacity   = isActive ? 1.00 : 0.50;
        const coreWidth     = isActive ? 1.2  : 0.7;

        const color   = isActive ? "#ffffff" : "#b0bcd4";
        const pathEId = `path-${path.id}`;

        return (
          <motion.g
            key={path.id}
            animate={{ opacity: groupOpacity }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Hidden reference path for particle getPointAtLength */}
            <path id={pathEId} d={path.d} fill="none" stroke="transparent" strokeWidth={0} />

            {/* Layer 1 — Outer bloom */}
            <motion.path
              d={path.d}
              fill="none"
              stroke={color}
              strokeLinecap="round"
              filter="url(#bloom-outer)"
              animate={{ opacity: outerOpacity, strokeWidth: outerWidth }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />

            {/* Layer 2 — Mid bloom */}
            <motion.path
              d={path.d}
              fill="none"
              stroke={color}
              strokeLinecap="round"
              filter="url(#bloom-mid)"
              animate={{ opacity: midOpacity, strokeWidth: midWidth }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />

            {/* Layer 3 — Inner tight glow */}
            <motion.path
              d={path.d}
              fill="none"
              stroke={color}
              strokeLinecap="round"
              filter="url(#bloom-inner)"
              animate={{ opacity: innerOpacity, strokeWidth: innerWidth }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />

            {/* Layer 4 — Crisp white core */}
            <motion.path
              d={path.d}
              fill="none"
              stroke="#ffffff"
              strokeLinecap="round"
              animate={{ opacity: coreOpacity, strokeWidth: coreWidth }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />

            {/* Travelling particles */}
            <PathParticle
              pathId={pathEId}
              speed={isActive ? 0.40 : 0.15}
              active={isActive}
              delay={(i * 0.38) % 1}
            />
            <PathParticle
              pathId={pathEId}
              speed={isActive ? 0.28 : 0.11}
              active={isActive}
              delay={(i * 0.71 + 0.5) % 1}
            />
          </motion.g>
        );
      })}
    </svg>
  );
}
