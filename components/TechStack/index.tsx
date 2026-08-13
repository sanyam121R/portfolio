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
  const [fixedSkill, setFixedSkill] = useState<TechItem | null>(null);

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
      className="relative min-h-screen w-full overflow-hidden py-16 px-4 md:py-24 lg:py-40 lg:w-[calc(100%-300px)] md:m-auto"
    >
      {/*
        Three-column grid on desktop, stacked on mobile.
        The SVG layer is positioned absolute relative to this grid wrapper,
        so we need the wrapper itself to be position:relative.
      */}
      <div
        className="relative z-10 flex flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,auto)_minmax(0,0.9fr)] gap-y-10 lg:gap-y-0 lg:gap-x-4"
      >
        {/* ── Left column ── */}
        <div className="order-1 lg:order-1">
          <TechList
            items={techItems}
            activeId={activeSkill?.id ?? ""}
            cardRefs={cardRefs}
            onHover={(item) => {
              if (fixedSkill && fixedSkill.id !== item.id) {
                setFixedSkill(null);
              }
              setActiveSkill(item);
            }}
            onLeave={() => {
              if (!fixedSkill) {
                setActiveSkill(null);
              }
            }}
            onClick={(item) => {
              if (fixedSkill?.id === item.id) {
                setFixedSkill(null);
                setActiveSkill(null);
              } else {
                setFixedSkill(item);
                setActiveSkill(item);
              }
            }}
            fixedSkill={fixedSkill}
          />
        </div>

        {/* ── Center column ── */}
        <div className="order-2 lg:order-2 h-full flex-col items-center justify-end gap-6 lg:gap-14 lg:pr-5 lg:pb-5 md:flex hidden lg:h-162.5">
          <div className="center-node-wrap md:inline hidden" ref={centerRef}>
            <CenterNode />
          </div>

          {/* Quote block */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="relative rounded-3xl smooth-corners border border-primary-border p-4 text-center max-w-57.5 z-10"
          >
            <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 block text-2xl text-tertiary mb-1.5 font-serif leading-none">❝</span>
            <p className="text-secondary text-xs italic font-inter leading-relaxed">
              I don't just use technologies, I integrate them to create seamless,{" "}
              <strong className="text-foreground not-italic font-semibold">high-impact</strong>{" "}
              products.
            </p>
          </motion.div>
        </div>

        {/* ── Right column ── */}
        <div ref={rightPanelRef} className="order-3 lg:order-3 flex flex-col justify-center h-full">
          <AnimatePresence mode="wait">
            {activeSkill ? (
              <SkillPanel
                key={activeSkill.id}
                skill={activeSkill}
                isFixed={fixedSkill?.id === activeSkill.id}
                onClose={() => {
                  setActiveSkill(null);
                  setFixedSkill(null);
                }}
              />
            ) : (
              <OverviewPanel key="overview" />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/*
        SVG layer — hidden on mobile/tablet where layout is stacked.
        Only shown on lg+ where the three-column layout is active.
      */}
      <div className="hidden lg:block">
        <ConnectionLines
          cardRefs={cardRefs}
          centerRef={centerRef}
          rightPanelRef={rightPanelRef}
          sectionRef={sectionRef}
          itemCount={techItems.length}
          activeIndex={activeIndex}
        />
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 mt-8 text-center items-center w-full flex justify-center">
        <p className="w-max text-tertiary text-xs sm:text-sm font-inter font-thin flex flex-wrap gap-2 sm:gap-3 justify-center py-2 px-4 sm:px-6 smooth-corners rounded-4xl border border-primary-border">
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
