'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { useRef } from 'react'
import WaveText from '../WaveText'

gsap.registerPlugin(ScrollTrigger)

const project_data = [
  {
    id: '01',
    title: 'Salesforce CDC Saga Orchestrator',
    description:
      'Event-driven saga layer on BullMQ + MongoDB handling Salesforce Change Data Capture — optimistic locking, idempotency, retry topology.',
    techstack: ['Node.js', 'TypeScript', 'Redis BullMQ', 'MongoDB', 'AWS Lambda'],
    effect: [
      { figure: '99%', of: 'delivery reliability' },
      { figure: '75%', of: 'overhead reduction' },
    ],
    caseStudy: '/blogs/deep-customer-problem',
  },
  {
    id: '02',
    title: 'Jira—Halo / Jira—ServiceNow Two Way Sync Engine',
    description:
      'Bidirectional sync between two ITSM systems via AWS Lambda — conflict resolution, field mapping, web-hook handling, zero source-of-truth coupling.',
    techstack: ['Node.js', 'TypeScript', 'AWS Lambda', 'AWS API Gateway'],
    effect: [{ figure: '80%', of: 'manual sync eliminated' }],
    caseStudy: '#',
  },
  {
    id: '03',
    title: 'Conversation Session Service',
    description:
      'A service powering conversation sessions and their events for a Voice AI platform. It exposes APIs to create/upsert sessions, append immutable events, fetch a session with its events (with pagination), and complete a session.',
    techstack: ['Node.js', 'Nest.js', 'TypeScript', 'MongoDB'],
    caseStudy: 'https://github.com/sanyam121R/conversation-session-service',
  },
  {
    id: '04',
    title: 'OTP Verification',
    description: 'Verify user login otp',
    techstack: ['Node.js', 'Nest.js', 'Redis', 'TypeScript', 'MongoDB'],
    effect: [{ figure: '5 min', of: 'Time to live' }],
    caseStudy: '#',
  },
]

export default function Project() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>('.project-card')

      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: i * 0.06,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 92%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    },
    { scope: containerRef }
  )

  return (
    <div
      id="project"
      className="min-h-svh w-svw p-8 pt-16 flex flex-col gap-12 items-center"
    >
      <section className="relative w-full">
        <div className="flex flex-col items-center relative">
          <h1
            className="
              font-weird-word
              bg-[linear-gradient(0deg,#000_11%,#fff_57%)]
              bg-clip-text [-webkit-background-clip:text]
              text-transparent [-webkit-text-fill-color:transparent]
              text-[40px] text-center tracking-normal leading-normal whitespace-nowrap
            "
          >
            Projects.
          </h1>
          <p className="text-secondary text-[10px] md:text-sm">
            that I have built over the years of learning.
          </p>
        </div>

        <Image
          src={'/assets/work notepade.png'}
          alt="project notepad"
          height={140}
          width={140}
          className="absolute -right-8 top-20 md:right-20 md:top-10 h-[100px] w-[100px] md:h-auto md:w-auto z-10"
        />
      </section>

      <section
        ref={containerRef}
        className="w-full md:w-[calc(100%-340px)]"
      >
        <div
          className="
            grid gap-5
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-3
            2xl:grid-cols-3
          "
        >
          {project_data.map((proj, index) => (
            <article
              key={index}
              className="
                project-card ggroup flex
                min-h-[300px]
                border border-primary-border rounded-3xl smooth-corners
                p-6
                bg-[#111]
                transition-all duration-300 ease-out
                hover:shadow-[0_0_10px_4px] hover:shadow-toggle
                hover:-translate-y-1
                hover:border-tertiary
                flex-col justify-between gap-6
              "
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-tertiary text-[14px]">{proj.id}</span>

                  <a
                    href={proj.caseStudy}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-label={`Open case study for ${proj.title}`}
                  >
                    <svg
                      width="17"
                      height="16"
                      viewBox="0 0 19 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                    >
                      <path
                        d="M9.10156 9.58136L9.65136 10.0915V10.0915L9.10156 9.58136ZM16.1131 0.532157C15.9927 0.135835 15.5738 -0.0878291 15.1775 0.0325919L8.71901 1.99496C8.32269 2.11538 8.09903 2.53428 8.21945 2.9306C8.33987 3.32693 8.75877 3.55059 9.1551 3.43017L14.8959 1.68584L16.6403 7.42669C16.7607 7.82301 17.1796 8.04668 17.5759 7.92626C17.9722 7.80584 18.1959 7.38693 18.0755 6.99061L16.1131 0.532157ZM0.395508 16.7502L0.790659 17.3877C4.59104 15.0319 6.61017 13.3692 9.65136 10.0915L9.10156 9.58136L8.55176 9.07124C5.60182 12.2507 3.68671 13.8276 0.000356641 16.1127L0.395508 16.7502ZM9.10156 9.58136L9.65136 10.0915C12.5757 6.93964 14.0321 4.89621 16.0571 1.10344L15.3955 0.750198L14.7339 0.396951C12.7696 4.07596 11.3884 6.01394 8.55176 9.07124L9.10156 9.58136Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                </div>

                <div className="flex flex-col gap-3">
                  <h3 className="text-[16px] md:text-[20px] leading-tight">
                    {proj.title}
                  </h3>
                  <p className="text-tertiary text-[14px] leading-6">
                    {proj.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <div className="flex flex-wrap gap-2">
                  {proj.techstack.map((ts, tsIndex) => (
                    <span
                      key={tsIndex}
                      className="text-tertiary text-[12px] md:text-[13px] py-1 px-3 border border-primary-border rounded-2xl smooth-corners whitespace-nowrap"
                    >
                      {ts}
                    </span>
                  ))}
                </div>

                {!!proj.effect?.length && (
                  <div className="flex flex-wrap gap-4 pt-1">
                    {proj.effect.map((ef, efIndex) => (
                      <div key={efIndex} className="flex flex-col">
                        <span className="text-[20px] md:text-[26px] leading-none">
                          {ef.figure}
                        </span>
                        <span className="text-tertiary text-xs md:text-sm">
                          {ef.of}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <a
                  href={proj.caseStudy}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-max text-sm md:text-base hover:underline flex items-center gap-2"
                >
                  <WaveText text="Case Study" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}