'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

// ─── Types ──────────────────────────────────────────────────────────────────────

type Phase = 'in' | 'out' | 'gone';

interface PreLoaderProps {
  /** Minimum time (ms) the loader will show regardless of load state */
  minMs?: number;
  onDone?: () => void;
}

// ─── Readiness guard ───────────────────────────────────────────────────────────

/**
 * Returns a promise that resolves once ALL of these conditions are met:
 *  1. The window `load` event has fired (images, stylesheets, …)
 *  2. The browser font API has resolved (`document.fonts.ready`)
 *  3. Lenis (smooth-scroll) has been initialised (`window.__lenis` exists)
 *  4. At least the above-fold images are loaded
 *
 * A hard timeout (10 s) ensures we never hang.
 */
function waitForPageReady(): Promise<void> {
  const checks: Promise<void>[] = [];

  // 1. Window load
  checks.push(
    new Promise((resolve) => {
      if (document.readyState === 'complete') resolve();
      else window.addEventListener('load', () => resolve(), { once: true });
    }),
  );

  // 2. Fonts ready
  if (document.fonts) {
    checks.push(document.fonts.ready.then(() => {}));
  }

  // 3. Lenis initialised (poll up to 5 s)
  checks.push(
    new Promise<void>((resolve) => {
      if ((window as any).__lenis) {
        resolve();
        return;
      }
      let elapsed = 0;
      const poll = setInterval(() => {
        elapsed += 100;
        if ((window as any).__lenis || elapsed >= 5000) {
          clearInterval(poll);
          resolve();
        }
      }, 100);
    }),
  );

  // 4. Images — wait only for images that have *started* loading already.
  //    Lazy images below the fold are skipped to avoid deadlock.
  checks.push(
    new Promise<void>((resolve) => {
      const imgs = document.querySelectorAll<HTMLImageElement>('img');
      // Only images that are actively loading (not complete, have a src)
      const loading = [...imgs].filter(
        (img) => !img.complete && img.hasAttribute('src') && img.getAttribute('src') !== '',
      );
      if (loading.length === 0) {
        resolve();
        return;
      }
      let loaded = 0;
      const onDone = () => {
        loaded++;
        if (loaded >= loading.length) resolve();
      };
      loading.forEach((img) => {
        img.addEventListener('load', onDone, { once: true });
        img.addEventListener('error', onDone, { once: true });
      });
    }),
  );

  // Safety timeout — never block longer than 10 s
//   const timeout = new Promise<void>((resolve) => setTimeout(resolve, 10_000));

  return Promise.race([Promise.all(checks).then(() => undefined)]);
}

// ─── Renderer ──────────────────────────────────────────────────────────────────

const PI = Math.PI;

/**
 * Draws a procedural wireframe orb with flowing contour lines that ripple
 * across a perfectly spherical surface.  The sphere stays rigid; lines
 * undulate along the surface (angular perturbations on longitude &
 * latitude), creating a water-like flow from pole to pole.
 *
 * Colour palette: black background, grey-to-white lines.
 */
function renderFrame(
  ctx: CanvasRenderingContext2D,
  t: number,
  W: number,
  H: number,
): void {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, W, H);

  const cx = W / 2;
  const cy = H * 0.46;
  const R  = Math.min(W, H) * 0.14;

  ctx.save();
  ctx.lineCap  = 'round';
  ctx.lineJoin = 'round';

  // ── Grid dimensions ───────────────────────────────────────────────
  const N_RINGS = 18;       // horizontal contour rings
  const PTS     = 72;       // points per ring
  const RIPPLE_WAVES = 1;   // single flow: starts at top, flows down both sides, merges at bottom

  // ── Step 1: compute all vertex positions ON the perfect sphere ─────
  //
  // Each vertex stays exactly at distance R from centre; perturbations
  // only shift latitude & longitude angles (i.e. slide along the surface).
  //
  type Vtx = { x2: number; y2: number; z3d: number };
  const vertices: Vtx[][] = [];

  for (let i = 0; i < N_RINGS; i++) {
    const frac = i / (N_RINGS - 1);       // 0 … 1  (top → bottom)
    const lat0 = (frac - 0.5) * PI;       // -π/2 … +π/2

    const row: Vtx[] = [];

    for (let j = 0; j < PTS; j++) {
      const theta = (j / PTS) * 2 * PI;

      // ── Ripple phase (travels top → bottom over time) ──────────
      const phase = frac * RIPPLE_WAVES * 2 * PI - t * 1.1;

      // ── Latitude wave: points slide up/down along the surface ───
      const latWave =
        Math.sin(phase)                         * 0.09 +
        Math.sin(phase * 1.6 + theta * 2.1 + 0.9) * 0.04 +
        Math.cos(phase * 0.7 - theta * 1.3 - 0.5) * 0.03;

      const lat = lat0 + latWave;

      const ringR = R * Math.cos(lat);
      const yPos  = R * Math.sin(lat);

      // ── Longitude wave: points slide around the ring ───────────
      const lonWave =
        Math.sin(theta * 3.5 + phase * 0.8) * 0.06 +
        Math.cos(theta * 4.2 - phase * 1.1) * 0.04;

      const spin  = t * 0.20;
      const angle = theta + spin + lonWave;

      // ── 3D → 2D (perspective projection) ───────────────────────
      const x3d   = ringR * Math.cos(angle);
      const z3d   = ringR * Math.sin(angle);
      const persp = 1 + z3d / (R * 4.4);
      const x2    = cx + x3d * persp;
      const y2    = cy + yPos * persp;

      row.push({ x2, y2, z3d });
    }
    vertices.push(row);
  }

  // ── Draw contour rings (top → bottom, fixed order, no mesh) ──────
  //
  // Only the horizontal contour lines — no vertical connections.
  for (let i = 0; i < N_RINGS; i++) {
    const frac = i / (N_RINGS - 1);

    const phase  = frac * RIPPLE_WAVES * 2 * PI - t * 1.1;
    const ripple = Math.sin(phase);
    const crest  = Math.max(0, ripple);

    const baseBright = 50 + (1 - Math.abs(frac - 0.5) * 2) * 40;
    const bright     = Math.round(Math.min(255, baseBright + crest * 160));
    const alpha      = 0.30 + frac * 0.20 + crest * 0.40;

    ctx.strokeStyle = `rgb(${bright},${bright},${bright})`;
    ctx.lineWidth   = Math.max(0.7, 2.0 - frac * 0.6);
    ctx.globalAlpha = Math.min(1, alpha);

    ctx.beginPath();
    for (let j = 0; j <= PTS; j++) {
      const p = vertices[i][j % PTS];
      j === 0 ? ctx.moveTo(p.x2, p.y2) : ctx.lineTo(p.x2, p.y2);
    }
    ctx.stroke();

    // Ripple crest highlight
    if (crest > 0.45) {
      const hl = (crest - 0.45) / 0.55;
      ctx.strokeStyle = `rgb(220,220,220)`;
      ctx.lineWidth   = 1.0 + hl * 0.8;
      ctx.globalAlpha = hl * 0.30;

      ctx.beginPath();
      for (let j = 0; j <= PTS; j++) {
        const p = vertices[i][j % PTS];
        j === 0 ? ctx.moveTo(p.x2, p.y2) : ctx.lineTo(p.x2, p.y2);
      }
      ctx.stroke();
    }
  }

  ctx.restore();
}

// ─── Component ─────────────────────────────────────────────────────────────────

export default function PreLoader({ minMs = 2500, onDone }: PreLoaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const [phase, setPhase] = useState<Phase>('in');

  const dismiss = useCallback(() => {
    setPhase('out');

    // Reset scroll to top while fading out, then unlock scroll.
    setTimeout(() => {
      const lenis = (window as any).__lenis;
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
        lenis.start();
      } else {
        window.scrollTo(0, 0);
        document.body.style.overflow = '';
      }
      setPhase('gone');
      onDone?.();
    }, 400);
  }, [onDone]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ── Lock scroll while preloader is visible ─────────────────────
    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.stop();
    } else {
      document.body.style.overflow = 'hidden';
    }

    // ── Canvas setup ───────────────────────────────────────────────
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let startTs: number | null = null;
    const tick = (ts: number): void => {
      if (startTs === null) startTs = ts;
      renderFrame(ctx, (ts - startTs) / 1000, canvas.width, canvas.height);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    // const t0 = Date.now();

    // waitForPageReady().then(() => {
    //   const wait = Math.max(0, minMs - (Date.now() - t0));
    //   setTimeout(dismiss, wait);
    // });

    const t0 = Date.now();
    const go = () => {
      const wait = Math.max(0, minMs - (Date.now() - t0));
      setTimeout(dismiss, wait);
    };

    if (document.readyState === 'complete') {
      go();
    } else {
      window.addEventListener('load', go, { once: true });
    }


    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      if (lenis) lenis.start();
      else document.body.style.overflow = '';
    };
  }, [dismiss, minMs]);

  if (phase === 'gone') return null;

  return (
    <div
      style={{
        position     : 'fixed',
        inset        : 0,
        zIndex       : 9999,
        background   : '#000',
        opacity      : phase === 'out' ? 0 : 1,
        transition   : 'opacity 0.7s cubic-bezier(.4,0,.2,1)',
        pointerEvents: phase === 'out' ? 'none' : 'auto',
      }}
    >
      <canvas ref={canvasRef} style={{ display: 'block' }} />

      {/* Remove the span below if you don't want the loading label */}
      <span className="absolute bottom-[30%] left-1/2 -translate-x-1/2 text-[10px] tracking-[0.45em] opacity-55 select-none whitespace-nowrap">
        LOADING...
      </span>
    </div>
  );
}