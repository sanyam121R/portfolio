"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import { useCharacterState } from "@/hooks/useCharacterState";
import { journeyMeta, experienceChapters } from "@/data/experience";
import { useAppReady } from "@/components/ClientShell";
import JourneyIntroPanel from "./JourneyIntroPanel";
import ExperienceChapterCard from "./ExperienceChapterCard";
import PromotionMilestoneNode from "./PromotionMilestoneNode";
import JourneyOutroPanel from "./JourneyOutroPanel";
import JourneyTimeline from "./JourneyTimeline";
import JourneyCharacter from "./JourneyCharacter";
import ArchitectureMiniFlow from "./ArchitectureMiniFlow";

/**
 * The single "Experience" section.
 *
 * Desktop (>= md, motion allowed):
 *   - Section is made tall (100vh + horizontal travel). A CSS `position:
 *     sticky` inner stage stays in view while the track translates on X as
 *     you scroll. Uses NO GSAP `pin`, so it never collides with the existing
 *     LetsTalk vertical ScrollTrigger pin.
 *   - A narrative character runs while scrolling, idles when stopped, and
 *     locks into a composed "final" pose at the end.
 *   - Bottom glowing timeline fills with progress.
 *
 * Mobile / reduced-motion:
 *   - A vertical stacked narrative preserves chapter/milestone storytelling.
 *   - The character appears once at the end in its final pose.
 */
export default function CareerJourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Responsive + reduced-motion detection.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setIsDesktop(mq.matches);
      setReducedMotion(rm.matches);
    };
    update();
    mq.addEventListener("change", update);
    rm.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      rm.removeEventListener("change", update);
    };
  }, []);

  const { state, setProgress: setCharProgress } = useCharacterState(0.94);
  const { preloaderDone } = useAppReady();

  const disabled = !isDesktop || reducedMotion;

  useHorizontalScroll({
    sectionRef,
    trackRef,
    disabled,
    onProgress: (p) => {
      setProgress(p);
      setCharProgress(p);
    },
  });

  // Coordinate a SINGLE ScrollTrigger refresh once layout settles. This
  // recomputes the LetsTalk vertical pin AND our (non-pinning) horizontal
  // trigger together so positions stay consistent.
  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });

    let raf = 0;
    const doRefresh = () => ScrollTrigger.refresh();

    if (preloaderDone) {
      raf = requestAnimationFrame(() => requestAnimationFrame(doRefresh));
    }
    const fallback = window.setTimeout(doRefresh, 1200);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(fallback);
    };
  }, [preloaderDone, disabled]);

  // Build the horizontal item sequence: intro, chapters (+ milestone), outro.
  const items = useMemo(() => {
    const list: React.ReactNode[] = [];
    experienceChapters.forEach((ch, i) => {
      list.push(
        <div key={ch.id} className="flex h-full items-center px-6">
          <ExperienceChapterCard chapter={ch} emphasis={0.8} index={i} />
          {ch.featured && ch.architectureFlow && (
            <div className="ml-6 w-[360px]">
              <ArchitectureMiniFlow steps={ch.architectureFlow} />
            </div>
          )}
        </div>
      );
      if (ch.milestone) {
        list.push(
          <PromotionMilestoneNode
            key={`${ch.id}-milestone`}
            milestone={ch.milestone}
            index={i}
          />
        );
      }
    });
    return list;
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      aria-label="Career journey"
    >
      {/* ---------------- Desktop: pinned horizontal ---------------- */}
      {!disabled ? (
        <div className="relative z-30 h-svh w-full">
          <div
            ref={trackRef}
            className="flex h-full w-max items-center will-change-transform"
          >
            <JourneyIntroPanel meta={journeyMeta} />
            {items}
            <JourneyOutroPanel meta={journeyMeta} />
          </div>

          {/* Narrative character */}
          <div className="pointer-events-none absolute bottom-16 left-1/2 z-20 -translate-x-1/2">
            <JourneyCharacter state={state} progress={progress} />
          </div>

          <JourneyTimeline chapters={experienceChapters} progress={progress} />
        </div>
      ) : (
        /* ---------------- Mobile / reduced-motion: vertical ---------------- */
        <div className="relative mx-auto max-w-[680px] px-5 py-20">
          <div className="mb-12">
            <JourneyIntroPanel meta={journeyMeta} />
          </div>

          <div className="relative space-y-10 border-l border-amber-500/20 pl-6">
            {experienceChapters.map((ch, i) => (
              <div key={ch.id} className="relative">
                <span className="absolute left-[-31px] top-2 h-3 w-3 rounded-full border border-amber-400 bg-amber-500 shadow-[0_0_10px_rgba(255,122,24,0.8)]" />
                <ExperienceChapterCard chapter={ch} emphasis={1} index={i} />
                {ch.featured && ch.architectureFlow && (
                  <div className="mt-4">
                    <ArchitectureMiniFlow steps={ch.architectureFlow} />
                  </div>
                )}
                {ch.milestone && (
                  <div className="mt-6">
                    <PromotionMilestoneNode
                      milestone={ch.milestone}
                      index={i}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12">
            <JourneyOutroPanel meta={journeyMeta} />
            <div className="mt-8 flex justify-center">
              <JourneyCharacter state="final" progress={1} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}