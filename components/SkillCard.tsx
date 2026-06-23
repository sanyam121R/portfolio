"use client";

import React, { forwardRef } from "react";
import { motion } from "framer-motion";

export interface Skill {
  id: string;
  name: string;
  description: string;
  years: number;
  proficiency: number;
  icon: React.ElementType;
}

interface SkillCardProps {
  skill: Skill;
  isHovered: boolean;
  isOtherHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onFocus: () => void;
  onBlur: () => void;
}

export const SkillCard = forwardRef<HTMLDivElement, SkillCardProps>(
  (
    { skill, isHovered, isOtherHovered, onMouseEnter, onMouseLeave, onFocus, onBlur },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
        tabIndex={0}
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: isOtherHovered ? 0.55 : 1,
          scale: isHovered ? 1.03 : 1,
          boxShadow: isHovered
            ? "0 0 24px rgba(74, 222, 128, 0.12), inset 0 0 16px rgba(255,255,255,0.04)"
            : "0 8px 24px rgba(0,0,0,0.4)",
          borderColor: isHovered
            ? "rgba(74, 222, 128, 0.28)"
            : "rgba(255, 255, 255, 0.07)",
          y: 0,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative flex flex-col justify-between p-4 rounded-xl bg-[#0d0d0d]/85 backdrop-blur-xl border border-white/5 overflow-hidden cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-green-400"
      >
        {/* Green glow overlay on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-green-500/[0.06] to-transparent transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Top row: icon + name/desc + years */}
        <div className="relative z-10 flex items-start gap-3">
          <div className="flex-shrink-0 p-2 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
            <skill.icon style={{ width: 18, height: 18, color: "rgba(255,255,255,0.85)" }} />
          </div>

          <div className="flex-1 min-w-0">
            {/* 16px – skill name */}
            <h3
              style={{ fontSize: "16px" }}
              className="font-semibold text-white/90 tracking-wide leading-tight truncate"
            >
              {skill.name}
            </h3>
            {/* 12px – description */}
            <p
              style={{ fontSize: "12px" }}
              className="text-white/45 mt-0.5 leading-snug line-clamp-2"
            >
              {skill.description}
            </p>
          </div>

          {/* Years badge */}
          <div className="flex-shrink-0 flex flex-col items-end">
            {/* 18px – years number */}
            <span style={{ fontSize: "18px" }} className="font-bold text-white/90 leading-none">
              {skill.years}+
            </span>
            {/* 10px – YEARS label */}
            <span
              style={{ fontSize: "10px" }}
              className="uppercase tracking-wider text-white/35 font-semibold mt-0.5"
            >
              Yrs
            </span>
          </div>
        </div>

        {/* Proficiency bar */}
        <div className="relative z-10 mt-3 flex items-center gap-2">
          <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${skill.proficiency}%` }}
              transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
              className={`h-full rounded-full ${
                isHovered ? "bg-green-400" : "bg-green-500/65"
              }`}
            />
          </div>
          {/* 14px – proficiency percentage */}
          <span style={{ fontSize: "14px" }} className="font-medium text-green-400/75 tabular-nums">
            {skill.proficiency}%
          </span>
        </div>
      </motion.div>
    );
  }
);

SkillCard.displayName = "SkillCard";
