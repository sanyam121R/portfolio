'use client'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";
import WaveText from "../WaveText";

gsap.registerPlugin(ScrollTrigger);

const work_be_data = [
    {
        id: "01",
        title: "Salesforce CDC Saga Orchestrator",
        description: "Event-driven saga layer on BullMQ + MongoDB handling Salesforce Change Data Capture — optimistic locking, idempotency, retry topology.",
        techstack: ["Node.js", "TypeScript", "Redis BullMQ", "MongoDB", "AWS Lambda"],
        effect: [
            { figure: "99%", of: "delivery reliability" },
            { figure: "75%", of: "overhead reduction" },
        ],
        caseStudy: "#",
    },
    {
        id: "02",
        title: "Jira—Halo / Jira—ServiceNow Two Way Sync Engine",
        description: "Bidirectional sync between two ITSM systems via AWS Lambda — conflict resolution, field mapping, web-hook handling, zero source-of-truth coupling.",
        techstack: ["Node.js", "TypeScript", "AWS Lambda", "AWS API Gateway"],
        effect: [{ figure: "80%", of: "manual sync eliminated" }],
        caseStudy: "#",
    },
    {
        id: "03",
        title: "Conversation Session Service",
        description: "A service powering conversation sessions and their events for a Voice AI platform. It exposes APIs to create/upsert sessions, append immutable events, fetch a session with its events (with pagination), and complete a session.",
        techstack: ["Node.js", "Nest.js", "TypeScript", "MongoDB"],
        // effect: [{ figure: "5 min", of: "Time to live" }],
        caseStudy: "https://github.com/sanyam121R/conversation-session-service",
    },
    {
        id: "04",
        title: "OTP Verification",
        description: "Verify user login otp",
        techstack: ["Node.js", "Nest.js", "Redis", "TypeScript", "MongoDB"],
        effect: [{ figure: "5 min", of: "Time to live" }],
        caseStudy: "#",
    }
];

export default function Work() {
    const containerRef = useRef<HTMLDivElement>(null);

    // ─── One-time entrance reveal. No exit/re-entry logic at all — ─────────────
    // this is the key architectural change. A card animates in once, then
    // ScrollTrigger has nothing left to do with it. No more fighting hover.
    useGSAP(
        () => {
            const cards = gsap.utils.toArray<HTMLElement>(".card-item");

            cards.forEach((card, i) => {
                gsap.fromTo(
                    card,
                    { opacity: 0, y: 100 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.5,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 90%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            });
        },
        { scope: containerRef }
    );

    return (
        <div id="work" className="h-fit w-svw p-8 pt-16 flex flex-col gap-12 items-center">
            {/* <section className="h-[calc(100svh-100px)] w-[calc(100%-340px)] border border-primary-border smooth-corners p-5 rounded-4xl text-center">
                Pending - Infinite Canvas
                md:left-20 md:-top-35
            </section> */}

            <section className="relative w-full">
                <Image
                    src={'/assets/work laptop.png'}
                    alt="work laptop"
                    height={206}
                    width={216}
                    className="absolute md:left-20 md:-top-6
                    left-2 -top-12 h-[80px] w-[80px] md:h-auto md:w-auto invisible md:visible"
                />
                <div className="flex flex-col items-center relative">
                    <h1 className="
                        bg-[linear-gradient(0deg,#000_11%,#fff_57%)]
                        bg-clip-text [-webkit-background-clip:text]
                        text-transparent [-webkit-text-fill-color:transparent]
                        text-[40px] text-center tracking-normal leading-normal whitespace-nowrap">
                        Projects.
                    </h1>
                    <p className="text-secondary text-[10px] md:text-sm">
                        that I have built over the years of learning.
                    </p>
                </div>
                <Image
                    src={'/assets/work notepade.png'}
                    alt="work laptop"
                    height={140}
                    width={140}
                    className="absolute -right-8 top-20 md:right-20 md:top-10 
                    h-[100px] w-[100px] md:h-auto md:w-auto"
                />
            </section>

            {/*
                `group/list` lets us use :has() to dim siblings purely in CSS.
                No JS hover handlers, no GSAP tweens to interrupt, no scroll
                conflict possible — the browser owns this interaction entirely.
            */}
            <section
                ref={containerRef}
                className="card-list group/list w-full md:w-[calc(100%-340px)] h-auto border border-primary-border smooth-corners rounded-4xl"
            >
                {work_be_data.map((proj, index) => (
                    <section
                        key={index}
                        className="
                            card-item relative
                            min-h-auto md:min-h-[290px] p-5 md:p-8
                            grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-6
                            border-b border-primary-border first:rounded-t-4xl last:rounded-b-4xl smooth-corners 
                            transition-[opacity,transform,box-shadow] duration-300 ease-out
                            hover:shadow-[0_0_10px_4px] hover:shadow-toggle
                            hover:z-10
                            hover:cursor-crosshair
                            hover:backdrop-blur-2xl
                            group-has-[.card-item:hover]/list:opacity-40
                            will-change-transform"
                            >
                        {/* 0px 0px 13px 6px #110960 */}
                        {/* Accent bar — grows on hover, purely decorative, zero layout cost */}
                        <span
                            className="
                                absolute left-0 top-5 bottom-5 w-[2px] bg-white/0
                                transition-all duration-300 ease-out
                                group-has-[.card-item:hover]/list:bg-white/0"
                        />
                        <span
                            className="
                                absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0
                                bg-white transition-all duration-300 ease-out
                                [.card-item:hover_&]:h-[60%]"
                        />

                        {/* Left Content */}
                        <div className="flex flex-col justify-between gap-4 md:gap-0">
                            <div className="flex flex-col gap-3">
                                <div className="text-tertiary text-[14px]">{proj?.id}</div>
                                <div className="text-[22px] md:text-[28px] leading-tight">{proj?.title}</div>
                                <div className="text-tertiary text-[14px]">{proj?.description}</div>
                            </div>
                            <div className="flex flex-row flex-wrap gap-2 mt-3 md:mt-0">
                                {proj?.techstack?.map((ts, tsIndex) => (
                                    <div
                                        key={tsIndex}
                                        className="text-tertiary text-[12px] md:text-[14px] py-0.5 px-3 border border-primary-border rounded-[6px] whitespace-nowrap"
                                    >
                                        {ts}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Metrics & CTA */}
                        <div className="flex flex-row md:flex-col justify-between md:justify-start gap-4 items-start md:items-end border-t md:border-t-0 border-primary-border/30 pt-4 md:pt-0">
                            <div className="flex flex-row md:flex-col gap-4 flex-wrap md:items-end">
                                {proj?.effect?.map((ef, efIndex) => (
                                    <div key={efIndex} className="flex flex-col items-start md:items-end">
                                        <div className="text-[22px] md:text-[36px] w-fit">{ef?.figure}</div>
                                        <div className="text-tertiary text-xs md:text-sm w-fit text-end">{ef?.of}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="items-center flex flex-row gap-2 md:mt-auto self-center md:self-auto">
                                <a
                                    href={proj?.caseStudy}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-max text-base md:text-lg hover:underline"
                                >
                                    <WaveText text="Case Study"/>
                                </a>
                                <svg
                                    width="17" height="16" viewBox="0 0 19 18" fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform duration-300 [.card-item:hover_&]:translate-x-0.5 [.card-item:hover_&]:-translate-y-0.5"
                                >
                                    <path
                                        d="M9.10156 9.58136L9.65136 10.0915V10.0915L9.10156 9.58136ZM16.1131 0.532157C15.9927 0.135835 15.5738 -0.0878291 15.1775 0.0325919L8.71901 1.99496C8.32269 2.11538 8.09903 2.53428 8.21945 2.9306C8.33987 3.32693 8.75877 3.55059 9.1551 3.43017L14.8959 1.68584L16.6403 7.42669C16.7607 7.82301 17.1796 8.04668 17.5759 7.92626C17.9722 7.80584 18.1959 7.38693 18.0755 6.99061L16.1131 0.532157ZM0.395508 16.7502L0.790659 17.3877C4.59104 15.0319 6.61017 13.3692 9.65136 10.0915L9.10156 9.58136L8.55176 9.07124C5.60182 12.2507 3.68671 13.8276 0.000356641 16.1127L0.395508 16.7502ZM9.10156 9.58136L9.65136 10.0915C12.5757 6.93964 14.0321 4.89621 16.0571 1.10344L15.3955 0.750198L14.7339 0.396951C12.7696 4.07596 11.3884 6.01394 8.55176 9.07124L9.10156 9.58136Z"
                                        fill="white"
                                    />
                                </svg>
                            </div>
                        </div>
                    </section>
                ))}
            </section>
        </div>
    );
}