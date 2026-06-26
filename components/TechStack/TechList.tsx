"use client";

import type { RefObject } from "react";
import { TechCard } from "./TechCard";
import type { TechItem } from "@/lib/techStackData";

interface TechListProps {
  items:    TechItem[];
  activeId: string;
  cardRefs: RefObject<(HTMLDivElement | null)[]>;
  onHover:  (item: TechItem) => void;
  onLeave:  () => void;
}

export function TechList({ items, activeId, cardRefs, onHover, onLeave }: TechListProps) {
  return (
    <div className="flex flex-col gap-2">
      {/* Badge — full width */}
      <div className="tech-entrance-item inline-flex items-center gap-2 rounded-xl smooth-corners border border-primary-border px-3 py-1.5 w-fit mb-1">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
        </span>
        <span className="text-[10px] tracking-widest uppercase">
          Engineering Ecosystem
        </span>
      </div>

      {/* Hero copy — intentionally NOT constrained, fills column */}
      <div className="tech-entrance-item mb-0.5">
        <h2 className="text-[clamp(1.35rem,2.5vw,2rem)] leading-snug">
          Technologies converge.
        </h2>
        <h2 className="text-[clamp(1.35rem,2.5vw,2rem)] leading-snug">
          Engineering <span className="italic font-thin">comes to life.</span>
        </h2>
      </div>

      {/* Subtext */}
      <p className="tech-entrance-item text-tertiary text-xs font-inter leading-relaxed mb-2 max-w-[260px]">
        I combine the right technologies to build scalable, performant and impactful solutions.
      </p>

      {/* Cards — constrained width */}
      <div className="flex flex-col gap-2 max-w-[220px] ml-10">
        {items.map((item, index) => (
          <TechCard
            key={item.id}
            item={item}
            isActive={item.id === activeId}
            index={index}
            ref={(el) => { cardRefs.current[index] = el; }}
            onHover={onHover}
            onLeave={onLeave}
          />
        ))}
      </div>
    </div>
  );
}