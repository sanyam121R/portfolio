'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import 'splitting/dist/splitting.css';
import { useAppReady } from '@/components/ClientShell';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const fullStackRef = useRef<HTMLHeadingElement>(null);
  const sDRef = useRef<HTMLHeadingElement>(null);
  const pRef = useRef<HTMLDivElement>(null);
  const { preloaderDone } = useAppReady();

  useGSAP(
    () => {
      let isActive = true;

      const run = async () => {
        if (!preloaderDone || !isActive) return;

        const { default: Splitting } = await import('splitting');

        if (!isActive) return;

        const targets = [fullStackRef.current, sDRef.current].filter(Boolean) as HTMLElement[];
        if (!targets.length) return;

        Splitting({ target: targets, by: 'chars' });

        gsap.set(rootRef.current, { autoAlpha: 1 });

        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          onComplete: () => ScrollTrigger.refresh(true),
        });

        targets.forEach((title, index) => {
          const chars = title.querySelectorAll('.char');

          tl.fromTo(
            chars,
            {
              y: 48,
              scale: 0.85,
              rotation: () => gsap.utils.random(-8, 8),
              filter: 'blur(10px)',
              opacity: 0,
            },
            {
              y: 0,
              scale: 1,
              rotation: 0,
              filter: 'blur(0px)',
              opacity: 1,
              duration: 1,
              stagger: {
                amount: 0.3,
                from: 'center',
              },
              overwrite: 'auto',
            },
            index === 0 ? 0 : '-=0.55'
          );
        });

        tl.fromTo(
          pRef.current,
          { y: 20, opacity: 0, filter: 'blur(8px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.8,
          },
          '-=0.35'
        );

        ScrollTrigger.create({
          trigger: rootRef.current,
          start: 'top top',
          onEnterBack: () => {
            const chars = rootRef.current?.querySelectorAll('.char');
            if (!chars?.length) return;

            gsap.fromTo(
              chars,
              {
                y: 24,
                opacity: 0,
                filter: 'blur(6px)',
              },
              {
                y: 0,
                opacity: 1,
                filter: 'blur(0px)',
                duration: 0.75,
                stagger: 0.015,
                overwrite: 'auto',
              }
            );
          },
        });
      };

      run();

      return () => {
        isActive = false;
      };
    },
    { scope: rootRef, dependencies: [preloaderDone] }
  );

  return (
    <div ref={rootRef} id="hero" className="h-svh w-svw flex justify-center text-center hero-prehide">
      <section className="flex w-svw flex-col gap-6 md:gap-8 justify-end p-6 mb-70 md:mb-48">
        <div className="flex flex-col justify-center text-center">
          <h1 ref={fullStackRef} className="font-weird-word text-4xl md:text-7xl">
            Full-Stack
          </h1>
          <h2 ref={sDRef} className="font-thin italic text-2xl/2 md:text-4xl/2">
            Software Developer
          </h2>
        </div>

        <div ref={pRef} className="text-secondary text-xs md:text-sm">
          <p>Systems that scale, Interfaces that don't ask users to think.</p>
          <p>Building event-driven architecture and the interfaces that sit on top of them.</p>
          <p className="font-extrabold italic mt-3 md:mt-4">— you call it, I design it.</p>
        </div>
      </section>
    </div>
  );
}