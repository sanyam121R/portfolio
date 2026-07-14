import { useEffect, useRef, useState } from "react";
import type { CharacterState } from "@/types/experience";
import { useScrollActivity } from "./useScrollActivity";

/**
 * Resolves the character's pose from two inputs:
 *  - scroll activity (running vs idle)
 *  - whether the journey has reached its final beat (locks to "final")
 *
 * Priority: final > (scrolling ? running : idle)
 *
 * `progress` (0..1) of the pinned horizontal section is passed in by the
 * horizontal-scroll hook; once it passes `finalThreshold` the character locks
 * into the composed "to be continued" stance.
 */
export function useCharacterState(finalThreshold = 0.94) {
  const { isScrolling, isScrollingRef } = useScrollActivity();
  const [state, setState] = useState<CharacterState>("idle");
  const progressRef = useRef(0);

  useEffect(() => {
    if (progressRef.current >= finalThreshold) {
      setState("final");
      return;
    }
    setState(isScrollingRef.current ? "running" : "idle");
  }, [isScrolling, finalThreshold]);

  const setProgress = (p: number) => {
    progressRef.current = p;
    if (p >= finalThreshold) setState("final");
  };

  return { state, setProgress, isScrollingRef };
}