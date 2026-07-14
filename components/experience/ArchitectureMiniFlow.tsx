"use client";

import type { ArchitectureFlowStep } from "@/types/experience";

interface ArchitectureMiniFlowProps {
  steps: ArchitectureFlowStep[];
}

/** Compact system-flow block shown inside the featured chapter. */
export default function ArchitectureMiniFlow({ steps }: ArchitectureMiniFlowProps) {
  return (
    <div className="mt-4 rounded-xl border border-amber-500/20 bg-black/40 p-4">
      <div className="mb-3 text-[10px] uppercase tracking-[0.3em] text-amber-400/70">
        System Flow
      </div>
      <div className="flex flex-wrap items-stretch gap-2">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="rounded-lg border border-white/10 bg-white/4 px-3 py-2">
              <div className="text-[12px] font-medium text-white/85">{step.label}</div>
              {step.detail && (
                <div className="text-[10px] text-white/40">{step.detail}</div>
              )}
            </div>
            {i < steps.length - 1 && (
              <span className="text-amber-500/60" aria-hidden>
                →
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}