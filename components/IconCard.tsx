"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Skill } from "./SkillCard";

interface IconCardProps {
  skill: Skill;
  side: "left" | "right";
  isHovered: boolean;
  isOtherHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const IconCard = React.forwardRef<HTMLDivElement, IconCardProps>(
  ({ skill, side, isHovered, isOtherHovered, onMouseEnter, onMouseLeave }, ref) => {
    return (
      // Outer wrapper defines bounds for ConnectionPaths ref measurement
      <div
        ref={ref}
        className="relative"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {/* Icon square card */}
        <motion.div
          animate={{
            opacity: isOtherHovered ? 0.3 : 1,
            scale: isHovered ? 1.08 : 1,
            borderColor: isHovered
              ? "rgba(255,255,255,0.22)"
              : "rgba(255,255,255,0.08)",
            boxShadow: isHovered
              ? "0 0 22px rgba(74, 222, 128, 0.12), inset 0 0 12px rgba(255,255,255,0.03)"
              : "0 4px 16px rgba(0,0,0,0.6)",
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="w-[72px] h-[72px] rounded-xl bg-[#0f0f0f] border border-white/8 flex items-center justify-center cursor-pointer relative overflow-hidden"
        >
          {/* Subtle green glow inset on hover */}
          <div
            className={`absolute inset-0 bg-gradient-to-br from-green-500/[0.07] to-transparent transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
          <skill.icon
            style={{
              width: 28,
              height: 28,
              color: isHovered ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.65)",
              transition: "color 0.25s",
            }}
          />
        </motion.div>

        {/* Tooltip — appears on inner side (between card and hub) */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: side === "left" ? -6 : 6, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: side === "left" ? -6 : 6, scale: 0.97 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className={`absolute top-1/2 -translate-y-1/2 z-50 w-52 pointer-events-none ${
                // Left-side cards → tooltip to the RIGHT (toward hub)
                // Right-side cards → tooltip to the LEFT (toward hub)
                side === "left"
                  ? "left-[calc(100%+10px)]"
                  : "right-[calc(100%+10px)]"
              }`}
            >
              <div className="relative p-3.5 rounded-xl bg-[#111]/95 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.7)]">
                {/* Green accent line */}
                <div
                  className={`absolute top-3 bottom-3 w-[2px] bg-green-500/60 rounded-full ${
                    side === "left" ? "left-0" : "right-0"
                  }`}
                />

                <div
                  className={`flex items-center gap-2.5 mb-2 ${
                    side === "left" ? "pl-3" : "pr-3"
                  }`}
                >
                  <skill.icon style={{ width: 16, height: 16, color: "rgba(255,255,255,0.8)" }} />
                  <span
                    style={{ fontSize: "16px" }}
                    className="font-semibold text-white/90 tracking-wide leading-tight"
                  >
                    {skill.name}
                  </span>
                </div>

                <p
                  style={{ fontSize: "12px" }}
                  className={`text-white/45 leading-snug mb-3 ${
                    side === "left" ? "pl-3" : "pr-3"
                  }`}
                >
                  {skill.description}
                </p>

                <div
                  className={`flex items-center gap-2 ${
                    side === "left" ? "pl-3" : "pr-3"
                  }`}
                >
                  <div className="flex-1 h-[3px] bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.proficiency}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="h-full bg-green-400/80 rounded-full"
                    />
                  </div>
                  <span
                    style={{ fontSize: "12px" }}
                    className="text-green-400/80 font-medium tabular-nums"
                  >
                    {skill.proficiency}%
                  </span>
                  <span
                    style={{ fontSize: "10px" }}
                    className="text-white/30 uppercase tracking-widest font-semibold"
                  >
                    · {skill.years}+ yrs
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

IconCard.displayName = "IconCard";
