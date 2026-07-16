import { type RefObject } from "react";

export default function ProgressRail({
  progressFillRef,
}: {
  progressFillRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="pointer-events-none absolute bottom-8 left-1/2 z-30 w-[min(60vw,640px)] -translate-x-1/2">
      <div className="h-px w-full bg-primary-border/60">
        <div
          ref={progressFillRef}
          className="h-px w-full origin-left scale-x-0 bg-primary"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
      <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.35em] text-tertiary">
        <span>Journey</span>
        <span>2021 — Present</span>
      </div>
    </div>
  );
}