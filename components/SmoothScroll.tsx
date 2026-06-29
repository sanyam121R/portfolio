'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Initialises Lenis smooth-scrolling and wires it into GSAP's ticker
 * so that ScrollTrigger stays in sync.
 *
 * Exposes the Lenis instance via a ref so sibling components (e.g.
 * DraggableNav) can call `lenisRef.current.scrollTo(…)`.
 */
export const lenisRef = { current: null as Lenis | null };

export function scrollToSection(sectionId: string) {
  const lenis = (window as any).__lenis as Lenis | undefined;
  if (!lenis) return;

  // Try ScrollTrigger-based position first
  const trigger = ScrollTrigger.getById(sectionId);
  if (trigger) {
      lenis.scrollTo(trigger.start, {
          duration: 1.4,
          easing: (t) => 1 - Math.pow(1 - t, 3),
      });
      return;
  }

  // Fallback for normal sections
  const el = document.getElementById(sectionId);
  if (!el) return;

  lenis.scrollTo(el, {
      offset: 0,
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
  });
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      syncTouch: true,
      syncTouchLerp: 0.1,
      touchMultiplier: 1.5,
    });

    // Expose globally for other components
    lenisRef.current = lenis;
    (window as any).__lenis = lenis;

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Tell GSAP to use Lenis's RAF instead of its own
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      delete (window as any).__lenis;
    };
  }, []);

  return (
    <div ref={wrapperRef} style={{ position: 'relative' }}>
      {children}
    </div>
  );
}
