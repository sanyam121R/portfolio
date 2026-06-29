"use client";

import { useEffect, useRef } from "react";

// ─── helpers ──────────────────────────────────────────────────────────────────

function computeOffset(
  eyeCXRatio: number,  // eye horizontal center as fraction of face width
  eyeCYRatio: number,  // eye vertical center as fraction of face height
  faceEl: HTMLElement,
  mx: number,
  my: number,
  maxPx: number
): [number, number] {
  const r = faceEl.getBoundingClientRect();
  const ex = r.left + r.width * eyeCXRatio;
  const ey = r.top + r.height * eyeCYRatio;
  const dx = mx - ex;
  const dy = my - ey;
  const d = Math.sqrt(dx * dx + dy * dy);
  if (d < 1) return [0, 0];
  const angle = Math.atan2(dy, dx);
  const strength = Math.min(d / 14, maxPx);
  return [Math.cos(angle) * strength, Math.sin(angle) * strength];
}

// ─── component ────────────────────────────────────────────────────────────────

/**
 * FollowFace
 *
 * Drop this anywhere in your Next.js app. The face sits centered on a
 * full-screen black canvas and the eyes smoothly track the cursor (or
 * finger on touch devices).
 *
 * Eye positions (ratios of face width / height):
 *   Left  → cx 0.31, cy 0.585
 *   Right → cx 0.635, cy 0.585
 *
 * Tweak FACE_W / FACE_H and EYE_W / EYE_H to resize.
 */
export default function FaceWithEyes() {
  const faceRef = useRef<HTMLDivElement>(null);
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);

  // Use refs so animation loop never triggers re-renders
  const target = useRef({ lx: 0, ly: 0, rx: 0, ry: 0 });
  const current = useRef({ lx: 0, ly: 0, rx: 0, ry: 0 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const MAX_OFFSET = 10; // px – max eye travel distance
    const LERP = 0.13;     // smoothing factor (0 = frozen, 1 = instant)

    // ── animation loop ──────────────────────────────────────────────────────
    function tick() {
      const t = target.current;
      const c = current.current;

      c.lx += (t.lx - c.lx) * LERP;
      c.ly += (t.ly - c.ly) * LERP;
      c.rx += (t.rx - c.rx) * LERP;
      c.ry += (t.ry - c.ry) * LERP;

      const lx = c.lx.toFixed(2);
      const ly = c.ly.toFixed(2);
      const rx = c.rx.toFixed(2);
      const ry = c.ry.toFixed(2);

      if (leftEyeRef.current)
        leftEyeRef.current.style.transform = `translate(${lx}px,${ly}px)`;
      if (rightEyeRef.current)
        rightEyeRef.current.style.transform = `translate(${rx}px,${ry}px)`;

      raf.current = requestAnimationFrame(tick);
    }

    raf.current = requestAnimationFrame(tick);

    // ── pointer handler ─────────────────────────────────────────────────────
    function update(mx: number, my: number) {
      if (!faceRef.current) return;
      const [lx, ly] = computeOffset(0.31, 0.585, faceRef.current, mx, my, MAX_OFFSET);
      const [rx, ry] = computeOffset(0.635, 0.585, faceRef.current, mx, my, MAX_OFFSET);
      target.current = { lx, ly, rx, ry };
    }

    const onMouse = (e: MouseEvent) => update(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) update(t.clientX, t.clientY);
    };

    window.addEventListener("mousemove", onMouse);
    window.addEventListener("touchmove", onTouch, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
     className="flex items-center justify-center cursor-none"
    >
      {/*
        Face: 380 × 260 px oval.
        Eye centre positions (px from face top-left):
          Left  → (118, 152)  →  left: 92,  top: 120
          Right → (241, 152)  →  left: 215, top: 120
      */}
      <div
        ref={faceRef}
        className="smooth-corners rounded-[100%] relative w-[52px] h-[28px] bg-foreground"
      >
        {/* Left eye */}
        <div ref={leftEyeRef} className="absolute w-[8px] h-[12px] bg-background rounded-[50%] will-change-transform left-[32px] top-[8px]"/>

        {/* Right eye */}
        <div ref={rightEyeRef} className="absolute w-[8px] h-[12px] bg-background rounded-[50%] will-change-transform left-[14px] top-[8px]"/>
      </div>
    </div>
  );
}