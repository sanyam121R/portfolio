"use client";

import { motion } from "framer-motion";
import type { ChapterMilestone } from "@/types/experience";

interface MilestoneNodeProps {
  milestone: ChapterMilestone;
  index: number;
}

/**
 * A special rhythmic break in the timeline — promotion / inflection point.
 * Visually diverges from the standard chapter cards with a vertical accent
 * and a glowing inflection marker.
 */
export default function PromotionMilestoneNode({
  milestone,
  index,
}: MilestoneNodeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, delay: index * 0.04 }}
      className="flex h-full w-[240px] shrink-0 flex-col items-center justify-center text-center"
      aria-label={`Milestone: ${milestone.title}`}
    >
      <div className="relative flex h-16 w-16 items-center justify-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-amber-500/20" />
        <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-amber-500/60 bg-black/60 text-amber-400 shadow-[0_0_30px_-4px_rgba(255,122,24,0.6)]">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2l2.5 5 5.5.8-4 3.9 1 5.5-5-2.7-5 2.7 1-5.5-4-3.9 5.5-.8z" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      <div className="mt-5 text-xs uppercase tracking-[0.35em] text-amber-400">
        {milestone.title}
      </div>
      <p className="mt-3 max-w-[220px] text-sm leading-relaxed text-white/55">
        {milestone.description}
      </p>
    </motion.div>
  );
}