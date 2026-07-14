import { useEffect, useRef, useState } from "react";

/**
 * Detects whether the user is actively scrolling.
 *
 * Listens to Lenis (if present on `window.__lenis`) or the native window
 * scroll event. Flips `isScrolling` to true immediately, then settles back to
 * false after a short idle window — this is what drives the character between
 * its "running" and "idle" poses.
 *
 * Returns both a ref (for per-frame reads without re-renders) and a state
 * value (for components that want to react).
 */
export function useScrollActivity(idleMs = 140) {
  const [isScrolling, setIsScrolling] = useState(false);
  const isScrollingRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    let active = true;

    const markScrolling = () => {
      if (!active) return;
      isScrollingRef.current = true;
      setIsScrolling(true);

      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        if (!active) return;
        isScrollingRef.current = false;
        setIsScrolling(false);
      }, idleMs);
    };

    const lenis = (window as any).__lenis;
    if (lenis?.on) {
      lenis.on("scroll", markScrolling);
    }
    window.addEventListener("scroll", markScrolling, { passive: true });
    window.addEventListener("wheel", markScrolling, { passive: true });
    window.addEventListener("touchmove", markScrolling, { passive: true });
    window.addEventListener("keydown", markScrolling);

    return () => {
      active = false;
      const l = (window as any).__lenis;
      if (l?.off) l.off("scroll", markScrolling);
      window.removeEventListener("scroll", markScrolling);
      window.removeEventListener("wheel", markScrolling);
      window.removeEventListener("touchmove", markScrolling);
      window.removeEventListener("keydown", markScrolling);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [idleMs]);

  return { isScrolling, isScrollingRef };
}