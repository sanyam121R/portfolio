"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import type { TechItem } from "@/lib/techStackData";

interface TechCardProps {
  item:     TechItem;
  isActive: boolean;
  isFixed:  boolean;
  index:    number;
  onHover:  (item: TechItem) => void;
  onLeave:  () => void;
  onClick:  () => void;
}


export const TechCard = forwardRef<HTMLDivElement, TechCardProps>(
  ({ item, isActive, isFixed, index, onHover, onLeave, onClick }, ref) => {
    const Icon = item.icon;

    return (
      <motion.div
        ref={ref}
        className={`tech-entrance-item relative flex items-center gap-2 sm:gap-2.5
          rounded-3xl smooth-corners border px-2 sm:px-2.5 py-1.5 sm:py-2 select-none
          transition-colors duration-150
          cursor-[url('https://cdn.cursors-4u.net/previews/tiny-finger-point-c1336353-32.webp')_32_32,auto]
          ${isFixed
            ? "border-white/40 bg-[#1e1e1e]"
            : isActive
              ? "border-white/25 hover:bg-[#1e1e1e]"
              : "border-primary-border hover:border-white/15"
          }`}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.975 }}
        transition={{ type: "spring" as const, stiffness: 380, damping: 28 }}
        onHoverStart={() => onHover(item)}
        onHoverEnd={onLeave}
        onClick={onClick}
        style={
          isFixed
            ? { boxShadow: `0 0 14px 2px ${item.color}40` }
            : isActive
              ? { boxShadow: "0 0 10px 1px rgba(255,255,255,0.05)" }
              : undefined
        }
      >
        {/* Right-edge anchor dot (SVG line connects here) */}
        <span
          className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2
            h-[6px] w-[6px] sm:h-[7px] sm:w-[7px] rounded-full border z-10 transition-colors duration-150
            ${isFixed
              ? "bg-white border-white/80"
              : isActive
                ? "bg-white border-white/50"
                : "bg-[#333] border-white/15"
            }`}
          style={isFixed ? { boxShadow: `0 0 6px 2px ${item.color}60` } : undefined}
        />

        {/* Icon box */}
        <div className="shrink-0 w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center
          rounded-lg">
          <Icon size={20} className="sm:w-[24px] sm:h-[24px]" color="#ffffff" />
        </div>

        {/* Labels */}
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-primary font-inter text-[11px] sm:text-xs leading-tight truncate">{item.name}</span>
          <span className="text-tertiary font-inter text-[9px] sm:text-[10px] leading-tight truncate">{item.category}</span>
        </div>
      </motion.div>
    );
  }
);

TechCard.displayName = "TechCard";