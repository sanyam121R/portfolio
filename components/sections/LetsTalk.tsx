'use client';

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const CENTER_IMAGES = [
  "/assets/lets talk/1.png",
  "/assets/lets talk/2.png",
  "/assets/lets talk/3.png",
  "/assets/lets talk/4.png",
];

const T = {
  img1In: 0,
  img2In: 1.1,
  img3In: 2.2,
  img4In: 3.3,
  finalHold: 3.9,
  end: 4.5,
} as const;

export function Marquee({ text }: { text: string }) {
  return (
    <div className="absolute bottom-1 left-0 right-0 z-40 overflow-hidden border-y border-primary">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-background to-transparent" />

<div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-background to-transparent" />

      <div className="marquee-track">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          aria-hidden={i !== 0}
          className="shrink-0 whitespace-nowrap pl-1 text-[10px] tracking-wide text-secondary md:text-sm"
        >
          { text}
        </div>
      ))}
    </div>
    </div>
  );
}

export default function LetsTalk() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftHandRef = useRef<HTMLDivElement>(null);
  const rightHandRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);

  const note = "I'm currently open to Senior Full-Stack, Backend and AI Engineering roles • Product companies building at scale • Early-stage startups with strong engineering culture •";

  useGSAP(
    () => {
      const imgs = imgRefs.current;
      if (
        !sectionRef.current ||
        !leftHandRef.current ||
        !rightHandRef.current ||
        imgs.some((r) => !r)
      ) return;

      gsap.set(imgs, { opacity: 0, scale: 1 });
      gsap.set(imgs[0]!, { scale: 0.5 });
      gsap.set(leftHandRef.current, { x: "-115%", opacity: 0 });
      gsap.set(rightHandRef.current, { x: "115%", opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          id: "lets-talk",

          trigger: sectionRef.current,
          start: "top top",
          // end: "+=4200",
          end: () => `+=${window.innerHeight * 5}`,

          pin: true,
          scrub: 0.9,
          // ✅ FIX 1: pinSpacing ensures the spacer expands properly
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl
        .to(leftHandRef.current!, {
          x: "0%", duration: T.img4In, ease: "none",
        }, 0)
        .to(rightHandRef.current!, {
          x: "0%", duration: T.img4In, ease: "none",
        }, 0)
        .to(leftHandRef.current!, { opacity: 1, duration: 0.35 }, 0)
        .to(rightHandRef.current!, { opacity: 1, duration: 0.35 }, 0)

        .to(imgs[0]!, {
          opacity: 1, scale: 1,
          duration: 0.55, ease: "back.out(1.4)",
        }, T.img1In)

        .to(imgs[0]!, { opacity: 0, scale: 0.85, duration: 0.25 }, T.img2In)
        .fromTo(
          imgs[1]!,
          { scale: 1.15 },
          { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" },
          T.img2In + 0.1
        )

        .to(imgs[1]!, { opacity: 0, scale: 0.85, duration: 0.25 }, T.img3In)
        .fromTo(
          imgs[2]!,
          { scale: 1.15 },
          { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" },
          T.img3In + 0.1
        )

        .to(imgs[2]!, { opacity: 0, scale: 0.85, duration: 0.25 }, T.img4In)
        .fromTo(
          imgs[3]!,
          { scale: 1.15 },
          { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" },
          T.img4In + 0.1
        )

        .to({}, { duration: 0.6 }, T.finalHold);
    },
    { scope: sectionRef }
  );

  return (
    // ✅ FIX 2: removed min-h-screen, overflow-hidden, w-svw, flex, flex-col
    // The section must be a plain block so pin-spacer can freely set its height.
    // overflow-hidden was clipping the spacer; flex-col was fighting it.
    <section
      id="lets-talk"
      ref={sectionRef}
      className="relative w-full"
    >
      {/* ── Main visual area — now drives its own height via h-screen ── */}
      {/* ✅ FIX 3: use h-screen instead of min-h-screen + flex-1 */}
      <div className="relative flex h-screen items-center justify-center overflow-hidden">

        {/* Tagline — top right */}
        <section
          className="
            absolute top-40 right-53 md:top-40 md:right-53 z-30
            text-right font-mansalva text-2xl md:text-[44px]
            text-secondary leading-relaxed
          "
        >
          <p className="relative left-[-200px]">
            if not ME, then WHO?
          </p>
          <p className="relative top-[-23px]">
            if not NOW, then WHEN!
          </p>
        </section>

        {/* ── Hands + center image ─────────────────────────────────── */}
        <div className="flex items-center justify-center w-full h-full">

          {/* Left Hand */}
          <div
            ref={leftHandRef}
            className="
              relative z-10 flex-1
              h-[38vh] md:h-[50vh] lg:h-[calc(100vh-20px)]
            "
          >
            <Image
              src="/assets/lets connect/left hand.png"
              alt=""
              fill
              sizes="50vw"
              className="object-contain object-right"
              priority
              draggable={false}
            />
          </div>

          {/* Center image stack */}
          <div className="absolute top-1/2 left-1/2 translate-x-[-30%] -translate-y-1/2 z-20 shrink-0 w-24 h-24 md:w-30 md:h-30 lg:w-38 lg:h-38">
            {CENTER_IMAGES.map((src, idx) => (
              <div
                key={src}
                ref={(el) => { imgRefs.current[idx] = el; }}
                className="absolute inset-0"
              >
                <Image
                  src={src}
                  alt={`Stage ${idx + 1}`}
                  fill
                  className="object-contain"
                  priority
                  draggable={false}
                />
              </div>
            ))}
          </div>

          {/* Right Hand */}
          <div
            ref={rightHandRef}
            className="
              relative z-10 flex-1
              h-[38vh] md:h-[50vh] lg:h-[calc(100vh-20px)]
            "
          >
            <Image
              src="/assets/lets connect/right hand.png"
              alt=""
              fill
              sizes="50vw"
              className="object-contain object-left"
              priority
              draggable={false}
            />
          </div>
        </div>

        {/* CTA — bottom left */}
        <div className="absolute bottom-8 left-8 md:bottom-36 md:left-56 z-30">
          <h2
            className="
              font-doto md:text-7xl lg:text-8xl/[110px]
              bg-[linear-gradient(0deg,#000_10%,#fff_40%)]
              bg-clip-text [-webkit-background-clip:text]
              text-transparent [-webkit-text-fill-color:transparent]
              text-4xl text-center tracking-normal leading-normal whitespace-nowrap
            "
          >
            Hire Me.
          </h2>
          <p className="font-mansalva text-2xl md:text-3xl lg:text-[34px]">
            LET&apos;S CONNECT!
          </p>
        </div>
      </div>

      {/* ── Marquee ──────────────────────────────────────────────────── */}
      {/* ✅ FIX 4: marquee lives inside the section but OUTSIDE the 
          h-screen div, so it renders below the pinned visual area */}
      <Marquee text={note} />
    </section>
  );
}