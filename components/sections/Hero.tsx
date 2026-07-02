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
// 'use client';

// import { useRef } from 'react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { useGSAP } from '@gsap/react';
// import Splitting from 'splitting';
// import 'splitting/dist/splitting.css';
// Splitting();
// gsap.registerPlugin(ScrollTrigger, useGSAP);

// export default function Hero() {
//   const rootRef = useRef<HTMLDivElement>(null);
//   const fullStackRef = useRef<HTMLHeadingElement>(null);
//   const sDRef = useRef<HTMLHeadingElement>(null);
//   const pRef = useRef<HTMLDivElement>(null);

//   // useGSAP(
//   //   () => {
//   //     const targets = [fullStackRef.current, sDRef.current].filter(Boolean) as HTMLElement[];

//   //     // Splitting({ target: targets, by: 'words' });
//   //     Splitting({ target: targets, by: 'chars' });

//   //     targets.forEach((title) => {
//   //       const words = title.querySelectorAll('.word');

//   //       words.forEach((word) => {
//   //         const chars = word.querySelectorAll('.char');
//   //         const charsTotal = chars.length;

//   //         gsap.fromTo(
//   //           chars,
//   //           {
//   //             willChange: 'transform, filter',
//   //             transformOrigin: '50% 100%',
//   //             scale: (i) => {
//   //               const mid = Math.ceil(charsTotal / 2);
//   //               const factor =
//   //                 i < mid ? i : mid - Math.abs(Math.floor(charsTotal / 2) - i) - 1;

//   //               return gsap.utils.mapRange(0, mid, 0.5, 2.1, factor);
//   //             },
//   //             y: (i) => {
//   //               const mid = Math.ceil(charsTotal / 2);
//   //               const factor =
//   //                 i < mid ? i : mid - Math.abs(Math.floor(charsTotal / 2) - i) - 1;

//   //               return gsap.utils.mapRange(0, mid, 0, 60, factor);
//   //             },
//   //             rotation: (i) => {
//   //               const mid = Math.ceil(charsTotal / 2);
//   //               const factor =
//   //                 i < mid ? i : mid - Math.abs(Math.floor(charsTotal / 2) - i) - 1;

//   //               return i < charsTotal / 2
//   //                 ? gsap.utils.mapRange(0, mid, -4, 0, factor)
//   //                 : gsap.utils.mapRange(0, mid, 0, 4, factor);
//   //             },
//   //             filter: 'blur(12px) opacity(0)',
//   //           },
//   //           {
//   //             ease: 'power2.inOut',
//   //             y: 0,
//   //             rotation: 0,
//   //             scale: 1,
//   //             filter: 'blur(0px) opacity(1)',
//   //             stagger: {
//   //               amount: 0.15,
//   //               from: 'center',
//   //             },
//   //             scrollTrigger: {
//   //               trigger: word,
//   //               start: 'top bottom+=40%',
//   //               end: 'top top+=15%',
//   //               scrub: true,
//   //               markers:true,
//   //             },
//   //           }
//   //         );
//   //       });
//   //     });
//   //   },
//   //   { scope: rootRef }
//   // );

//   // useGSAP(() => {
//   //   const targets = [fullStackRef.current, sDRef.current].filter(Boolean) as HTMLElement[];
  
//   //   // Splitting({ target: targets, by: 'words' });
//   //   Splitting({ target: targets, by: 'chars' });
  
//   //   targets.forEach((title) => {
//   //     const chars = title.querySelectorAll('.char');
  
//   //     gsap.fromTo(
//   //       chars,
//   //       {
//   //         willChange: 'transform, filter',
//   //         y: 40,
//   //         scale: 0.8,
//   //         rotation: () => gsap.utils.random(-8, 8),
//   //         filter: 'blur(10px) opacity(0)',
//   //       },
//   //       {
//   //         y: 0,
//   //         scale: 1,
//   //         rotation: 0,
//   //         filter: 'blur(0px) opacity(1)',
//   //         duration: 1.2,
//   //         ease: 'power3.out',
//   //         stagger: {
//   //           amount: 0.35,
//   //           from: 'center',
//   //         },
//   //       }
//   //     );
//   //   });
//   // });

//   useGSAP(() => {
//     const targets = [fullStackRef.current, sDRef.current].filter(Boolean) as HTMLElement[];
  
//     // Splitting({ target: targets, by: 'words' });
//     Splitting({ target: targets, by: 'chars' });
  
//     targets.forEach((title) => {
//       const chars = title.querySelectorAll('.char');
  
//       const animateChars = () => {
//         gsap.fromTo(
//           chars,
//           {
//             y: 40,
//             scale: 0.8,
//             rotation: () => gsap.utils.random(-8, 8),
//             filter: 'blur(10px) opacity(0)',
//           },
//           {
//             y: 0,
//             scale: 1,
//             rotation: 0,
//             filter: 'blur(0px) opacity(1)',
//             duration: 1,
//             ease: 'power3.out',
//             stagger: {
//               amount: 0.3,
//               from: 'center',
//             },
//             overwrite: 'auto',
//           }
//         );
//       };
  
//       animateChars();
  
//       ScrollTrigger.create({
//         trigger: title,
//         start: 'top 20%',
//         onEnterBack: animateChars,
//       });
//     });
//   });

//   return (
//     <div
//       ref={rootRef}
//       id="hero"
//       className="h-svh w-svw flex justify-center text-center"
//     >
//       <section className="flex w-svw flex-col gap-6 md:gap-8 justify-end p-6 mb-70 md:mb-48">
//         <div className="flex flex-col justify-center text-center">
//           <h1
//             ref={fullStackRef}
//             className="font-weird-word text-4xl md:text-7xl"
//             data-splitting
//           >
//             Full-Stack
//           </h1>

//           <h2
//             ref={sDRef}
//             className="font-thin italic text-2xl/2 md:text-4xl/2"
//             data-splitting
//           >
//             Software Developer
//           </h2>
//         </div>

//         <div ref={pRef} className="text-secondary text-[10px] md:text-[14px]">
//           <p>Systems that scale, Interfaces that don't ask users to think.</p>
//           <p>Building event-driven architecture and the interfaces that sit on top of them.</p>
//           <p className="font-extrabold italic mt-3 md:mt-4">— you call it, I design it.</p>
//         </div>
//       </section>
//     </div>
//   );
// }