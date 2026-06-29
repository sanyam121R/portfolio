"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// DrawSVGPlugin requires GSAP Club license.
// If available, import: import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
// and add to registerPlugin call below.

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

export { gsap, ScrollTrigger, MotionPathPlugin };