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

// Optimized timing for smoother animation
const T = {
  img1In: 0,
  img2In: 0.8,
  img3In: 1.6,
  img4In: 2.4,
  finalHold: 3.0,
  end: 3.5,
} as const;

export function Marquee({ text }: { text: string }) {
  return (
    <div className="absolute bottom-1 left-0 right-0 z-40 overflow-hidden border-y border-primary">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 md:w-50 bg-linear-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 md:w-50 bg-linear-to-l from-background to-transparent" />

      <div className="marquee-track">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            aria-hidden={i !== 0}
            className="shrink-0 whitespace-nowrap pl-1 text-[10px] tracking-wide text-secondary md:text-sm"
          >
            {text}
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
  const hireMeRefs = useRef<HTMLDivElement>(null);
  const everyGreatProdRefs = useRef<HTMLElement>(null);
  // Ref for ripple effect container
  const rippleRef = useRef<HTMLDivElement>(null);

  const note = "I'm currently open to Senior Full-Stack, Backend and AI Engineering roles • Product companies building at scale • Early-stage startups with strong engineering culture •";

  useGSAP(
    () => {
      const imgs = imgRefs.current;
      const rippleDots = rippleRef.current
        ? gsap.utils.toArray<HTMLDivElement>(rippleRef.current.querySelectorAll(".ripple-dot"))
        : [];
  
      if (
        !sectionRef.current ||
        !leftHandRef.current ||
        !rightHandRef.current ||
        imgs.some((r) => !r)
      ) return;
  
      gsap.set(imgs, { opacity: 0, scale: 1 });
      gsap.set(rippleDots, {
        x: 0,
        y: 0,
        scale: 0,
        opacity: 0,
      });
      gsap.set(imgs[0]!, { scale: 0.5 });
      gsap.set(leftHandRef.current, { x: "-115%", opacity: 0 });
      gsap.set(rightHandRef.current, { x: "115%", opacity: 0 });
      gsap.set(hireMeRefs.current, { opacity: 0, y: 4, filter: "blur(6px)" });
      gsap.set(everyGreatProdRefs.current, { opacity: 0, y: 4, filter: "blur(6px)" });
  
      
  
      gsap.to(everyGreatProdRefs.current, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        stagger: 0.22,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          toggleActions: "play none reverse none",
        },
      });
  
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "lets-talk",
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 3}`,
          pin: true,
          scrub: 0.5,
          pinSpacing: true,
          anticipatePin: 0.5,
          invalidateOnRefresh: true,
          onLeave: () => {
            gsap.to(sectionRef.current, { opacity: 1, duration: 0.3 });
          },
          onEnterBack: () => {
            gsap.to(sectionRef.current, { opacity: 1, duration: 0.3 });
          },
        },
      });
  
      tl
        .to(leftHandRef.current!, {
          x: "0%",
          duration: T.img4In,
          ease: "none",
        }, 0)
        .to(rightHandRef.current!, {
          x: "0%",
          duration: T.img4In,
          ease: "none",
        }, 0)
        .to(leftHandRef.current!, { opacity: 1, duration: 0.35 }, 0)
        .to(rightHandRef.current!, { opacity: 1, duration: 0.35 }, 0)
  
        .to(imgs[0]!, {
          opacity: 1,
          scale: 1,
          duration: 0.55,
          ease: "back.out(1.4)",
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
          { scale: 1.15, zIndex:"10" },
          { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" },
          T.img4In + 0.1
        )
  
        .fromTo(
          rippleDots,
          {
            x: 0,
            y: 0,
            scale: 0,
            opacity: 0,
          },
          {
            x: () => gsap.utils.random(-100, 100),
            y: () => gsap.utils.random(-120, 120),
            scale: () => gsap.utils.random(0.8, 1.5),
            opacity: 1,
            duration: 0.22,
            stagger: {
              each: 0.02,
              from: "center",
            },
            ease: "power2.out",
            zIndex:0,
          },
          T.img4In + 0.1
        )
        .to(
          rippleDots,
          {
            opacity: 0,
            scale: 0,
            duration: 0.3,
            stagger: 0.02,
            ease: "power2.in",
            zIndex:0
          },
          T.img4In + 0.8
        )
  
        .to({}, { duration: 0.6 }, T.finalHold)
        .to(hireMeRefs.current, {
          opacity: 1,
          y: 0,
          zIndex:10,
          filter: "blur(0px)",
          stagger: 0.22,
          ease: "power3.out",
          duration: 0.6,
        }, T.img4In + 0.1);
    },
    { scope: sectionRef }
  );
  // useGSAP(
  //   () => {
  //     const imgs = imgRefs.current;
  //     if (
  //       !sectionRef.current ||
  //       !leftHandRef.current ||
  //       !rightHandRef.current ||
  //       imgs.some((r) => !r)
  //     ) return;

  //     gsap.set(imgs, { opacity: 0, scale: 1 });
  //     gsap.set(imgs[0]!, { scale: 0.5 });
  //     gsap.set(leftHandRef.current, { x: "-115%", opacity: 0 });
  //     gsap.set(rightHandRef.current, { x: "115%", opacity: 0 });
  //     gsap.set(hireMeRefs.current, { opacity: 0, y: 4, filter: "blur(6px)" });
  //     gsap.set(everyGreatProdRefs.current, { opacity: 0, y: 4, filter: "blur(6px)" });
      
  //     gsap.to(everyGreatProdRefs.current, {
  //       opacity: 1,
  //       y: 0,
  //       filter: "blur(0px)",
  //       duration: 1.2,
  //       stagger: 0.22,
  //       ease: "power3.out",
  //       scrollTrigger: {
  //         trigger: sectionRef.current,
  //         start: "top 50%",
  //         toggleActions: "play none reverse none",
  //       },
  //     });

  //     const tl = gsap.timeline({
  //       scrollTrigger: {
  //         id: "lets-talk",
  //         trigger: sectionRef.current,
  //         start: "top top",
  //         // Reduced from 5x to 3x viewport height for smoother scroll
  //         end: () => `+=${window.innerHeight * 3}`,
  //         pin: true,
  //         // Lower scrub value for more responsive feel (was 0.9)
  //         scrub: 0.5,
  //         pinSpacing: true,
  //         // Reduced anticipatePin to prevent jump (was 1)
  //         anticipatePin: 0.5,
  //         invalidateOnRefresh: true,
  //         // Add smooth end transition
  //         onLeave: () => {
  //           gsap.to(sectionRef.current, { opacity: 1, duration: 0.3 });
  //         },
  //         onEnterBack: () => {
  //           gsap.to(sectionRef.current, { opacity: 1, duration: 0.3 });
  //         },
  //       },
  //     });

  //     tl
  //       .to(leftHandRef.current!, {
  //         x: "0%", duration: T.img4In, ease: "none",
  //       }, 0)
  //       .to(rightHandRef.current!, {
  //         x: "0%", duration: T.img4In, ease: "none",
  //       }, 0)
  //       .to(leftHandRef.current!, { opacity: 1, duration: 0.35 }, 0)
  //       .to(rightHandRef.current!, { opacity: 1, duration: 0.35 }, 0)

  //       .to(imgs[0]!, {
  //         opacity: 1, scale: 1,
  //         duration: 0.55, ease: "back.out(1.4)",
  //       }, T.img1In)

  //       .to(imgs[0]!, { opacity: 0, scale: 0.85, duration: 0.25 }, T.img2In)
  //       .fromTo(
  //         imgs[1]!,
  //         { scale: 1.15 },
  //         { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" },
  //         T.img2In + 0.1
  //       )

  //       .to(imgs[1]!, { opacity: 0, scale: 0.85, duration: 0.25 }, T.img3In)
  //       .fromTo(
  //         imgs[2]!,
  //         { scale: 1.15 },
  //         { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" },
  //         T.img3In + 0.1
  //       )

  //       .to(imgs[2]!, { opacity: 0, scale: 0.85, duration: 0.25 }, T.img4In)
  //       .fromTo(
  //         imgs[3]!,
  //         { scale: 1.15 },
  //         { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" },
  //         T.img4In + 0.1
  //       )
  //       // Ripple effect after the fourth image appears
  //       .add(() => {
  //         const rippleDots = rippleRef.current?.querySelectorAll('.ripple-dot') as NodeListOf<HTMLElement>;
  //         if (rippleDots?.length) {
  //           const distance = 80; // radius in pixels
  //           gsap.set(rippleDots, { opacity: 1, scale: 1 });
  //           gsap.to(rippleDots, {
  //             x: i => Math.cos(i / rippleDots.length * Math.PI * 2) * distance,
  //             y: i => Math.sin(i / rippleDots.length * Math.PI * 2) * distance,
  //             opacity: 0,
  //             scale: 0.5,
  //             duration: 0.8,
  //             ease: "power2.out",
  //             stagger: 0.05,
  //           });
  //         }
  //       }, T.img4In + 0.2)

  //       .to({}, { duration: 0.6 }, T.finalHold)
  //       .to(hireMeRefs.current, {
  //         opacity: 1,
  //         y: 0,
  //         filter: "blur(0px)",
  //         stagger: 0.22,
  //         ease: "power3.out", duration: 0.6
  //       }, T.img4In + 0.1);
  //   },
  //   { scope: sectionRef }
  // );

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
        {/* <section
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
        </section> */}
        <section
          ref={everyGreatProdRefs}
          className="
            absolute top-36 right-20 md:top-40 md:left-[55%] z-30
            flex flex-col gap-2.5 text-xl md:text-[32px]
            text-secondary leading-relaxed
          "
        >
          <div>
            <p className=" text-xl md:text-[32px]/[26px]">Every great product</p>
            <p className="">starts with a conversation.</p>
          </div>
          <div className="w-12 h-px bg-tertiary rounded-2xl"></div>
          <div className="text-tertiary text-base">
            Ideas. People. Purpose.
          </div>

        </section>

        {/* ── Hands + center image ─────────────────────────────────── */}
        <div className="flex items-center justify-center w-full h-full">

          {/* Left Hand */}
          <div
            ref={leftHandRef}
            className="
              relative z-10 flex-1
              h-[38vh] md:h-[50vh] lg:h-[calc(100vh--70px)]
              will-change-transform
            "
            style={{ transform: 'translateZ(0)' }}
          >
            <Image
              src="/assets/lets talk/left hand.png"
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
                  className="absolute inset-0 will-change-transform"
                  style={{ transform: 'translateZ(0)' }}
                >
                  <Image
                    src={src}
                    alt={`Stage ${idx + 1}`}
                    fill
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                    className="object-contain"
                    priority
                    draggable={false}
                  />
                </div>
              ))}
              {/* Ripple effect container */}
              <div ref={rippleRef} className="absolute inset-0 z-0 pointer-events-none">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div
                    key={i}
                    className="ripple-dot w-1 h-1 bg-primary rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0"
                  />
                ))}
              </div>
            </div>

          {/* Right Hand */}
          <div
            ref={rightHandRef}
            className="
              relative z-10 flex-1
              h-[38vh] md:h-[50vh] lg:h-[calc(100vh--70px)]
              will-change-transform
            "
            style={{ transform: 'translateZ(0)' }}
          >
            <Image
              src="/assets/lets talk/right hand.png"
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
        <div ref={hireMeRefs} className="absolute bottom-32 left-26 md:bottom-40 md:left-69 z-30">
          <h2
            className="
              font-doto font-bold text-[54px] md:text-6xl/[84px] lg:text-7xl/[84px]
              bg-[linear-gradient(0deg,#000_10%,#fff_50%)]
              bg-clip-text [-webkit-background-clip:text]
              text-transparent [-webkit-text-fill-color:transparent]
              text-start tracking-normal leading-normal whitespace-nowrap
            "
          >
            HIRE ME.
          </h2>
          <div className="text-[18px] text-secondary md:text-xl lg:text-[24px]">
            <p >
              Building thoughtful software
            </p>
            <p>
              for ambitious teams.
            </p>
          </div>
        </div>
      </div>

      {/* ── Marquee ──────────────────────────────────────────────────── */}
      {/* ✅ FIX 4: marquee lives inside the section but OUTSIDE the 
          h-screen div, so it renders below the pinned visual area */}
      <Marquee text={note} />
    </section>
  );
}