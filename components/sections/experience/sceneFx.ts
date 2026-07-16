import gsap from "gsap";

type ContainerAnim = gsap.core.Tween | null;

/**
 * ScrollTrigger config that ties a reveal to the *horizontal* world scroll
 * instead of the document's vertical scroll. Elements emerge as they slide
 * into the viewport from the right.
 */
export function hReveal(containerAnimation: ContainerAnim, opts?: {
  start?: string;
  end?: string;
}) {
  return {
    containerAnimation: containerAnimation ?? undefined,
    start: opts?.start ?? "left 85%",
    end: opts?.end ?? "left 45%",
    toggleActions: "play none none reverse",
  };
}

/**
 * Slow, perpetual ambient float. Keeps the world "breathing" even when the
 * user has stopped scrolling. Mature easing, no bounce.
 */
export function float(
  target: gsap.TweenTarget,
  opts?: { distance?: number; duration?: number; delay?: number }
) {
  const { distance = 14, duration = 7, delay = 0 } = opts ?? {};
  return gsap.to(target, {
    y: `-=${distance}`,
    duration,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    delay,
  });
}

/**
 * Perpetual slow rotation for wireframe / constellation structures.
 */
export function drift(
  target: gsap.TweenTarget,
  opts?: { duration?: number; rotation?: number }
) {
  const { duration = 60, rotation = 360 } = opts ?? {};
  return gsap.to(target, {
    rotation,
    duration,
    ease: "none",
    repeat: -1,
  });
}