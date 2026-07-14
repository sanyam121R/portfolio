import type { ExperienceChapter } from "@/types/experience";

interface JourneyTimelineProps {
  chapters: ExperienceChapter[];
  progress: number;
}

/**
 * Horizontal journey line with chapter nodes and a glowing progress fill.
 * Sits at the bottom of the pinned stage (desktop).
 */
export default function JourneyTimeline({ chapters, progress }: JourneyTimelineProps) {
  const nodes = chapters.length + 1;

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-6 px-12">
      <div className="relative h-px w-full bg-white/10">
        <div
          className="absolute left-0 top-0 h-px bg-linear-to-r from-amber-500 to-amber-300 shadow-[0_0_12px_rgba(255,122,24,0.8)]"
          style={{ width: `${Math.min(100, progress * 100)}%` }}
        />
        {Array.from({ length: nodes }).map((_, i) => {
          const left = (i / (nodes - 1)) * 100;
          const reached = progress * 100 >= left - 2;
          return (
            <span
              key={i}
              className={`absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-colors duration-300 ${
                reached
                  ? "border-amber-400 bg-amber-500 shadow-[0_0_10px_rgba(255,122,24,0.8)]"
                  : "border-white/20 bg-black"
              }`}
              style={{ left: `${left}%` }}
            />
          );
        })}
      </div>

      <div className="mt-3 flex justify-between font-doto text-[10px] uppercase tracking-widest text-white/40">
        <span>Origin</span>
        <span>{Math.round(progress * 100)}%</span>
        <span>Now</span>
      </div>
    </div>
  );
}