"use client";

import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import "@/lib/gsapConfig";

import { TechList } from "./TechList";
import { CenterNode } from "./CenterNode";
import { ConnectionLines } from "./ConnectionLines";
import { SkillPanel } from "./SkillPanel";
import { OverviewPanel } from "./OverviewPanel";
import { techItems, type TechItem } from "@/lib/techStackData";

export default function TechStack() {
  const [activeSkill, setActiveSkill] = useState<TechItem | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const centerRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const activeIndex = activeSkill
    ? techItems.findIndex(t => t.id === activeSkill.id)
    : -1;

  useGSAP(
    () => {
      if (prefersReducedMotion || !sectionRef.current) return;
      const ctx = gsap.context(() => {
        gsap.from(".tech-entrance-item", {
          opacity: 0,
          y: 0,
          stagger: 0.055,
          duration: 0.55,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        });
        gsap.from(".center-node-wrap", {
          scale: 0.6,
          opacity: 0,
          duration: 0.7,
          ease: "back.out(1.6)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        });
      }, sectionRef);
      return () => ctx.revert();
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      id="stack"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden py-14 px-6 md:px-10"
    >
      {/* Watermark */}
      {/* <span
        className="pointer-events-none select-none absolute inset-0 flex items-center justify-center
          font-weird-word text-[clamp(4rem,13vw,10rem)] text-white opacity-[0.04]
          tracking-widest uppercase whitespace-nowrap z-0"
        aria-hidden="true"
      >
        TECH STACK
      </span> */}


      {/* <span
        className="pointer-events-none select-none absolute inset-0 flex items-center justify-center
          font-weird-word text-[clamp(4rem,15vw,12rem)] text-transparent opacity-[0.15]
          tracking-widest uppercase whitespace-nowrap z-0
          bg-[linear-gradient(0deg,#000_11%,#fff_57%)]
          bg-clip-text [-webkit-background-clip:text]
          [-webkit-text-fill-color:transparent]
          text-4xl text-center leading-normal"
        aria-hidden="true"
      >
        TECHSTACK
      </span> */}

      {/*
        Three-column grid.
        The SVG layer is positioned absolute relative to this grid wrapper,
        so we need the wrapper itself to be position:relative.
      */}
      <div
        className="relative z-10 grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,auto)_minmax(0,0.9fr)] gap-x-4 gap-y-0"
      >
        {/* ── Left column ── */}

        <TechList
          items={techItems}
          activeId={activeSkill?.id ?? ""}
          cardRefs={cardRefs}
          onHover={setActiveSkill}
          onLeave={() => setActiveSkill(null)}
        />

        {/* ── Center column ── */}
        <div className="h-full flex flex-col items-center justify-end gap-25 pr-5 pb-5">
          <div className="center-node-wrap" ref={centerRef}>
            <CenterNode />
          </div>

          {/* Quote block */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className=" relative rounded-xl border border-primary-border p-4 text-center max-w-[230px] z-10"
          >
            <span className="absolute top-[-10px] left-1/2 -translate-x-1/2 block text-2xl text-tertiary mb-1.5 font-serif leading-none">❝</span>
            <p className="text-secondary text-xs italic font-inter leading-relaxed">
              I don&apos;t just use technologies, I integrate them to create seamless,{" "}
              <strong className="text-foreground not-italic font-semibold">high-impact</strong>{" "}
              products.
            </p>
          </motion.div>
        </div>

        {/* ── Right column ── */}
        <div ref={rightPanelRef} className="flex flex-col justify-center h-full">
          <AnimatePresence mode="wait">
            {activeSkill ? (
              <SkillPanel
                key={activeSkill.id}
                skill={activeSkill}
                onClose={() => setActiveSkill(null)}
              />
            ) : (
              <OverviewPanel key="overview" />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/*
        SVG layer spans the FULL section (not just the center column)
        so paths can cross column boundaries freely.
      */}
      <ConnectionLines
        cardRefs={cardRefs}
        centerRef={centerRef}
        rightPanelRef={rightPanelRef}
        sectionRef={sectionRef}
        itemCount={techItems.length}
        activeIndex={activeIndex}
      />

      {/* Bottom bar */}
      <div className="relative z-10 mt-10 text-center items-center w-full flex justify-center">
        <p className="w-max text-tertiary text-sm font-inter font-thin flex gap-3 justify-center py-2 px-6 smooth-corners rounded-4xl border border-primary-border">
          <span>✦</span>
          <span>Continuous Learner</span>
          <span>•</span>
          <span>Problem Solver</span>
          <span>•</span>
          <span className="text-foreground italic font-light">Builder</span>
          <span>•</span>
          <span>Innovator</span>
        </p>
      </div>
    </section>
  );
}