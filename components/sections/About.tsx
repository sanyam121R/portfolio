'use client';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function DotGrid() {
    return (
        <div className="absolute -bottom-1 right-3 grid grid-cols-11 grid-rows-3 gap-[1.3rem]">
            {Array.from({ length: 33 }, (_, i) => (
                <span key={i} className="bg-primary h-1 w-1" />
            ))}
        </div>
    );
}

export default function About() {
    const personality = [
        "☘️ Charming", "⚡️ Completion-oriented", "✨ Aesthetics-aware",
        "🚀 Quick learner", "🧑🏻\u200d🎨 Sketch artist", "Backend depth", "Frontend calm"
    ];

    const sectionRef = useRef<HTMLDivElement | null>(null);
    const line1Ref = useRef<HTMLParagraphElement>(null);
    const line2Ref = useRef<HTMLParagraphElement>(null);
    const line3Ref = useRef<HTMLParagraphElement>(null);
    const blockquoteRef = useRef<HTMLQuoteElement>(null);

    const lineRefs = [line1Ref, line2Ref, line3Ref, blockquoteRef];

    useGSAP(() => {
        const elements = lineRefs.map(ref => ref.current).filter(Boolean);
        elements.forEach((el) => {
            gsap.set(el, { opacity: 0, y: 4, filter: "blur(6px)" });
        });
        gsap.to(elements, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.2,
            stagger: 0.22,
            ease: "power3.out",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play reverse play reverse",
            },
        });
    }, { scope: sectionRef });

    return (
        <div id="about" className="h-auto md:h-svh w-svw p-8 pt-20 flex flex-col gap-10">
            <h1 className="
                font-weird-word
                bg-[linear-gradient(0deg,#000_11%,#fff_57%)]
                bg-clip-text [-webkit-background-clip:text]
                text-transparent [-webkit-text-fill-color:transparent]
                text-4xl text-center tracking-normal leading-normal whitespace-nowrap">
                About me.
            </h1>

            <div className="flex flex-col md:flex-row justify-center items-center gap-10">
                <section className="relative w-70 h-86.25 lg:w-95 lg:h-118.25 md:h-auto">
                    <Image
                        src='/assets/About me.png'
                        width={375}
                        height={473}
                        alt="Photo of Sanyam Rathore"
                        className="relative z-1"
                        loading="lazy"
                    />
                    <DotGrid />
                </section>
                <section ref={sectionRef} className="flex flex-col sm:w-75 lg:w-202.5 md:w-125 max-w-full gap-6">
                    <h2 className="font-normal text-secondary text-base tracking-[0.03px]">
                        <span className="pb-2">Hi, I'm{" "}</span>
                        <span className="font-mont-sign text-[64px]/[48px] tracking-[0.08px] pl-1">
                            Sanyam Rathore.
                        </span>
                    </h2>

                    <div className="font-normal text-sm tracking-[0.03px] leading-6 text-tertiary">
                        <p className="mb-5" ref={line1Ref}>
                            For me,{" "}
                            <span className="text-secondary">engineering is not playing with tools</span>
                            {" "}— its like giving thoughts an{" "}
                            <span className="text-secondary">ART</span>{" "}
                            <span className="text-secondary">form</span>
                            . I care about how things look because, I care about how things{" "}
                            <em className="text-secondary italic">feel{" "}</em>
                            {" "}to use.
                        </p>

                        <p className="mb-5" ref={line2Ref}>
                            <span className="text-secondary">+4 years </span> in, I've shipped systems that move data between enterprise
                            platforms at scale, handle real-time events reliably, and give teams back
                            hours they used to lose, to manual work. My stack lives mostly in React,
                            TypeScript, Node.js, and cloud infrastructure — but the{" "}
                            <span className="text-secondary">
                                tools matter less to me than the problem being solved
                            </span>
                            .
                        </p>

                        <p className="mb-5" ref={line3Ref}>
                            I'm drawn to systems that hold up and interfaces that feel{" "}
                            <span className="text-secondary">inevitable</span>
                            {" "}— the kind of work where nothing is wasted and nothing is half-done.
                        </p>

                        <blockquote ref={blockquoteRef} className=" border-l-2 border-l-toggle italic text-secondary content-center">
                            <p className="pl-4">
                                Faith keeps me grounded. Curiosity keeps me moving. The two don't
                                fight — they push each other.
                            </p>
                        </blockquote>
                    </div>

                    <svg width="100%" height="6" viewBox="0 0 434 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M-3.26633e-05 2.88678L2.88672 5.77353L5.77347 2.88678L2.88672 2.83718e-05L-3.26633e-05 2.88678ZM433.773 2.88678L430.887 2.83718e-05L428 2.88678L430.887 5.77353L433.773 2.88678ZM2.88672 2.88678V3.38678H430.887V2.88678V2.38678H2.88672V2.88678Z" fill="white" />
                    </svg>

                    <div className="grid grid-flow-row md:grid-flow-col gap-2 items-center mt-[0.55rem]">
                        <div className="italic text-#e1e1e1-500 w-max">Personality at a glance: </div>

                        <div className="flex flex-row gap-1.5 flex-wrap justify-start">
                            {personality.map((spec) => (
                                <div
                                    aria-label="Decorative glass"
                                    className="w-max py-1 px-3 italic text-sm-200 h-7 rounded-xl smooth-corners text-secondary backdrop-blur-[1.5px] backdrop-brightness-100 backdrop-saturate-100 [-webkit-backdrop-filter:blur(1.5px)_brightness(100.0%)_saturate(100.0%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.40),inset_1px_0_0_rgba(255,255,255,0.32),inset_0_-1px_1px_rgba(0,0,0,0.13),inset_-1px_0_1px_rgba(0,0,0,0.11)] bg-[linear-gradient(180deg,rgba(0,0,0,0.2)_0%,rgba(102,102,102,0.2)_100%),linear-gradient(0deg,rgba(44,44,44,0.2)_0%,rgba(44,44,44,0.2)_100%)]"
                                    key={spec}
                                >
                                    {spec}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}