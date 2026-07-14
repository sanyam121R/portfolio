"use client";

import { motion } from "framer-motion";
import type { CharacterState } from "@/types/experience";

interface JourneyCharacterProps {
  state: CharacterState;
  /** 0..1 progress through the journey, used to drift the character. */
  progress: number;
  className?: string;
}

/**
 * The symbolic avatar of the journey. Driven by scroll activity:
 *  - running : legs cycle while the user scrolls
 *  - idle    : standing, subtle breathing
 *  - final   : arms folded, composed, looking ahead
 *
 * Implemented with layered SVG parts + CSS transform loops (no sprite assets
 * required). Kept minimal and cinematic — restrained, not cartoonish.
 */
export default function JourneyCharacter({
  state,
  progress,
  className = "",
}: JourneyCharacterProps) {
  const isRunning = state === "running";
  const isFinal = state === "final";

  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none select-none ${className}`}
      initial={false}
      animate={{
        y: isRunning ? [0, -3, 0] : 0,
      }}
      transition={
        isRunning
          ? { duration: 0.5, repeat: Infinity, ease: "easeInOut" }
          : { duration: 0.4 }
      }
      style={{ width: 64, height: 120 }}
    >
      <svg
        viewBox="0 0 64 120"
        className="h-full w-full overflow-visible"
        role="img"
        aria-label="Journey avatar"
      >
        <defs>
          <linearGradient id="charGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffb066" />
            <stop offset="100%" stopColor="#ff7a18" />
          </linearGradient>
        </defs>

        <g fill="url(#charGlow)">
          {/* Head */}
          <circle cx="32" cy="16" r="9" />

          {/* Torso */}
          <rect x="24" y="26" width="16" height="40" rx="7" />

          {/* Arms — crossed when final, swinging otherwise */}
          {isFinal ? (
            <g>
              <rect x="18" y="34" width="28" height="7" rx="3.5" transform="rotate(-12 32 37)" />
              <rect x="18" y="34" width="28" height="7" rx="3.5" transform="rotate(12 32 37)" />
            </g>
          ) : (
            <g
              className={isRunning ? "char-arm-swing" : "char-arm-idle"}
              style={{ transformOrigin: "32px 30px" }}
            >
              <rect x="20" y="30" width="6" height="30" rx="3" />
              <rect x="38" y="30" width="6" height="30" rx="3" />
            </g>
          )}

          {/* Legs */}
          {isFinal ? (
            <g>
              <rect x="26" y="64" width="7" height="44" rx="3.5" />
              <rect x="31" y="64" width="7" height="44" rx="3.5" />
            </g>
          ) : (
            <>
              <rect
                className={isRunning ? "char-leg-a" : ""}
                style={{ transformOrigin: "29px 64px" }}
                x="26"
                y="64"
                width="7"
                height="44"
                rx="3.5"
              />
              <rect
                className={isRunning ? "char-leg-b" : ""}
                style={{ transformOrigin: "35px 64px" }}
                x="31"
                y="64"
                width="7"
                height="44"
                rx="3.5"
              />
            </>
          )}
        </g>

        {/* Glow ring at the feet */}
        <ellipse
          cx="32"
          cy="112"
          rx="20"
          ry="4"
          fill="#ff7a18"
          opacity={0.25}
        />
      </svg>
    </motion.div>
  );
}