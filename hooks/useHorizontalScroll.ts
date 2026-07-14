import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseHorizontalScrollOptions {
  /** Section that is pinned and whose height becomes the scroll track. */
  sectionRef: RefObject<HTMLElement | null>;
  /** Inner track that translates horizontally. */
  trackRef: RefObject<HTMLElement | null>;
  /** Called on every progress update with value 0..1. */
  onProgress?: (p: number) => void;
  /** When true, pinning is disabled (mobile / reduced motion fallback). */
  disabled?: boolean;
}

/**
 * Pinned horizontal scroll via GSAP ScrollTrigger `pin`.
 *
 * The section is pinned in place; vertical scroll progress is mapped to the
 * track's horizontal `translateX`. This is the most robust "sticks in place"
 * behaviour.
 *
 * It intentionally does NOT call ScrollTrigger.refresh() itself — doing so
 * independently fights with other pinned sections (the LetsTalk vertical
 * pin). A single coordinated refresh is triggered once from
 * CareerJourneySection (on preloaderDone), which recomputes ALL triggers
 * together. `invalidateOnRefresh` recomputes the travel distance during that
 * refresh.
 */
export function useHorizontalScroll({
  sectionRef,
  trackRef,
  onProgress,
  disabled = false,
}: UseHorizontalScrollOptions) {
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track || disabled) return;

    const ctx = gsap.context(() => {
      const getDistance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth);

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + getDistance(),
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
          // Earlier pin on the page must refresh FIRST so its pin-spacer is
          // established before later pinned sections (e.g. LetsTalk) compute
          // their start positions. Otherwise later pins can begin pinning at a
          // scroll position that now falls inside an earlier section.
          refreshPriority: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            onProgress?.(self.progress);
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }, section);

    return () => {
      ctx.revert();
    };
  }, [sectionRef, trackRef, onProgress, disabled]);
}