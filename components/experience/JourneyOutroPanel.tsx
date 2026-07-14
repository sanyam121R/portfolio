"use client";

import type { JourneyMeta } from "@/types/experience";

interface OutroPanelProps {
  meta: JourneyMeta;
}

/** Far-right ending panel — forward-looking, "to be continued". */
export default function JourneyOutroPanel({ meta }: OutroPanelProps) {
  return (
    <section
      className="flex h-full w-[460px] shrink-0 flex-col justify-center px-12"
      aria-label="Journey continuation"
    >
      <div className="text-[11px] uppercase tracking-[0.4em] text-amber-400/80">
        Next
      </div>
      <h2 className="mt-4 font-weird-word text-5xl leading-[1.05] text-white">
        {meta.outro}
      </h2>
      {meta.outroSub && (
        <p className="mt-6 max-w-sm text-base leading-relaxed text-white/55">
          {meta.outroSub}
        </p>
      )}

      <div className="mt-10 font-doto text-7xl leading-none text-amber-500/30">
        …
      </div>
    </section>
  );
}