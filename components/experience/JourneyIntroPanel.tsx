"use client";

import type { JourneyMeta } from "@/types/experience";

interface IntroPanelProps {
  meta: JourneyMeta;
}

/** Far-left entry panel — the origin node of the journey. */
export default function JourneyIntroPanel({ meta }: IntroPanelProps) {
  return (
    <section
      className="flex h-full w-[460px] shrink-0 flex-col justify-center px-12"
      aria-label="Journey introduction"
    >
      <div className="text-[11px] uppercase tracking-[0.4em] text-amber-400/80">
        Mission Log
      </div>
      <h2 className="mt-4 font-weird-word text-5xl leading-[1.05] text-white">
        {meta.title}
      </h2>
      <div className="mt-3 font-doto text-sm text-white/50">{meta.range}</div>

      <p className="mt-6 max-w-sm text-base leading-relaxed text-white/60">
        {meta.intro}
      </p>

      <div className="mt-10 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/40">
        <span className="h-px w-10 bg-amber-500/60" />
        Scroll to begin
      </div>
    </section>
  );
}