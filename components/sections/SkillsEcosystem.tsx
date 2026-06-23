"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiGraphql,
} from "react-icons/si";

import { Skill } from "../SkillCard";
import { IconCard } from "../IconCard";
import { ConnectionPaths } from "../ConnectionPaths";

export interface SkillWithSide extends Skill {
  side: "left" | "right";
}

const skillsData: SkillWithSide[] = [
  // Left column — 4 skills
  {
    id: "react",
    name: "React",
    description: "Building interactive user interfaces",
    years: 4,
    proficiency: 95,
    icon: SiReact,
    side: "left",
  },
  {
    id: "nextjs",
    name: "Next.js",
    description: "Full-stack React framework",
    years: 3,
    proficiency: 95,
    icon: SiNextdotjs,
    side: "left",
  },
  {
    id: "typescript",
    name: "TypeScript",
    description: "Type-safe JavaScript development",
    years: 3,
    proficiency: 90,
    icon: SiTypescript,
    side: "left",
  },
  {
    id: "nodejs",
    name: "Node.js",
    description: "Backend runtime environment",
    years: 3,
    proficiency: 90,
    icon: SiNodedotjs,
    side: "left",
  },
  // Right column — 4 skills
  {
    id: "postgresql",
    name: "PostgreSQL",
    description: "Relational database management",
    years: 3,
    proficiency: 85,
    icon: SiPostgresql,
    side: "right",
  },
  {
    id: "redis",
    name: "Redis",
    description: "In-memory data structure store",
    years: 2,
    proficiency: 80,
    icon: SiRedis,
    side: "right",
  },
  {
    id: "docker",
    name: "Docker",
    description: "Containerization platform",
    years: 2,
    proficiency: 80,
    icon: SiDocker,
    side: "right",
  },
  {
    id: "graphql",
    name: "GraphQL",
    description: "Query language for APIs",
    years: 1,
    proficiency: 75,
    icon: SiGraphql,
    side: "right",
  },
];

const leftSkills = skillsData.filter((s) => s.side === "left");
const rightSkills = skillsData.filter((s) => s.side === "right");

export function SkillsEcosystem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-x-hidden"
    >
      {/* SVG connection paths — absolute overlay on section */}
      {isMounted && (
        <ConnectionPaths
          hubRef={hubRef}
          cardRefs={cardRefs}
          containerRef={containerRef}
          hoveredCardId={hoveredCardId}
          skills={skillsData}
        />
      )}

      {/* 3-column layout: left cards | hub | right cards */}
      <div className="relative z-10 flex items-center w-full max-w-5xl px-8">
        {/* ── Left column ── */}
        <div className="flex flex-col gap-6 flex-1 items-end pr-20">
          {leftSkills.map((skill) => (
            <IconCard
              key={skill.id}
              skill={skill}
              side="left"
              ref={(el) => { cardRefs.current[skill.id] = el; }}
              isHovered={hoveredCardId === skill.id}
              isOtherHovered={hoveredCardId !== null && hoveredCardId !== skill.id}
              onMouseEnter={() => setHoveredCardId(skill.id)}
              onMouseLeave={() => setHoveredCardId(null)}
            />
          ))}
        </div>

        {/* ── Central Hub ── */}
        <div
          ref={hubRef}
          className="flex-shrink-0 relative w-44 h-44 rounded-full flex flex-col items-center justify-center bg-[#0d0d0d] border border-white/10 z-20"
          style={{ boxShadow: "0 0 60px rgba(0,0,0,0.8), inset 0 0 40px rgba(0,0,0,0.6)" }}
        >
          {/* Outer spinning ring */}
          <div className="absolute inset-[-3px] rounded-full border border-white/[0.06] animate-[spin_18s_linear_infinite]" />
          {/* Inner dotted texture ring */}
          <div
            className="absolute inset-4 rounded-full opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
              backgroundSize: "8px 8px",
            }}
          />
          {/* Bright crescent arc at top */}
          <div
            className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-4 rounded-full blur-sm"
            style={{
              background:
                "radial-gradient(ellipse, rgba(255,255,255,0.55) 0%, transparent 70%)",
            }}
          />

          <h1
            className="relative z-10 text-[18px] font-bold text-center tracking-wide leading-tight select-none"
            style={{
              background: "linear-gradient(170deg, #ffffff 20%, #444 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            TechStack
          </h1>
        </div>

        {/* ── Right column ── */}
        <div className="flex flex-col gap-6 flex-1 items-start pl-20">
          {rightSkills.map((skill) => (
            <IconCard
              key={skill.id}
              skill={skill}
              side="right"
              ref={(el) => { cardRefs.current[skill.id] = el; }}
              isHovered={hoveredCardId === skill.id}
              isOtherHovered={hoveredCardId !== null && hoveredCardId !== skill.id}
              onMouseEnter={() => setHoveredCardId(skill.id)}
              onMouseLeave={() => setHoveredCardId(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
