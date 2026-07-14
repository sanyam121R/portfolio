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

  // Try ScrollTrigger-based position first
  const trigger = ScrollTrigger.getById(sectionId);
  if (trigger) {
    if (lenis) {
      lenis.scrollTo(trigger.start, {
        duration: 1.4,
        easing: (t) => 1 - Math.pow(1 - t, 3),
      });
    }
    return;
  }

  // Fallback for normal sections
  const el = document.getElementById(sectionId);
  if (el) {
    if (lenis) {
      lenis.scrollTo(el, {
        offset: 0,
        duration: 1.2,
        easing: (t) => 1 - Math.pow(1 - t, 3),
      });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    return;
  }

  // The section doesn't exist on this route (e.g. we're on /blogs).
  // Navigate to the homepage and deep-link to the section via the hash.
  if (window.location.pathname !== '/') {
    window.location.href = `/#${sectionId}`;
  }
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

    // Disable the browser's native scroll restoration so a full reload
    // always starts at the top (the hero) instead of restoring the last
    // scroll position (e.g. deep in the LetsTalk section).
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    lenis.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Tell GSAP to use Lenis's RAF instead of its own
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Deep-link: if the URL arrived with a hash (e.g. /#about from another route),
    // scroll to that section once the preloader has cleared.
    const hash = window.location.hash.replace(/^#/, '');
    const timers: number[] = [];
    if (hash) {
      timers.push(
        window.setTimeout(() => {
          const target = document.getElementById(hash);
          if (target) {
            lenis.scrollTo(target, {
              offset: 0,
              duration: 1.2,
              easing: (t) => 1 - Math.pow(1 - t, 3),
            });
          }
        }, 2200)
      );
    }

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
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
