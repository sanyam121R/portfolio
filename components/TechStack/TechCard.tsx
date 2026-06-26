"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import type { TechItem } from "@/lib/techStackData";

interface TechCardProps {
  item:     TechItem;
  isActive: boolean;
  index:    number;
  onHover:  (item: TechItem) => void;
  onLeave:  () => void;
}


export const TechCard = forwardRef<HTMLDivElement, TechCardProps>(
  ({ item, isActive, index, onHover, onLeave }, ref) => {
    const Icon = item.icon;

    return (
      <motion.div
        ref={ref}
        className={`tech-entrance-item relative flex items-center gap-2.5
          rounded-xl border px-2.5 py-2 cursor-pointer select-none
          transition-colors duration-150
          ${isActive
            ? "border-white/25 hover:bg-[#1e1e1e]"
            : "border-primary-border hover:border-white/15"
          }`}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.975 }}
        transition={{ type: "spring" as const, stiffness: 380, damping: 28 }}
        onHoverStart={() => onHover(item)}
        onHoverEnd={onLeave}
        style={
          isActive
            ? { boxShadow: "0 0 10px 1px rgba(255,255,255,0.05)" }
            : undefined
        }
      >
        {/* Right-edge anchor dot (SVG line connects here) */}
        <span
          className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2
            h-[7px] w-[7px] rounded-full border z-10 transition-colors duration-150
            ${isActive
              ? "bg-white border-white/50"
              : "bg-[#333] border-white/15"
            }`}
        />

        {/* Icon box */}
        <div className="shrink-0 w-7 h-7 flex items-center justify-center
          rounded-lg">
          <Icon size={24} color="#ffffff" />
        </div>

        {/* Labels */}
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-primary font-inter text-xs leading-tight truncate">{item.name}</span>
          <span className="text-tertiary font-inter text-[10px] leading-tight truncate">{item.category}</span>
        </div>
      </motion.div>
    );
  }
);

TechCard.displayName = "TechCard";