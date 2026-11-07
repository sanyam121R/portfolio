import { ArrowUpRight, GraduationCap, BadgeCheck } from 'lucide-react'

type Certification = {
  title: string
  issuer: string
  href?: string
}

const certifications: Certification[] = [
  {
    title: 'MongoDB Overview: Core Concepts and Architecture',
    issuer: 'MongoDB',
    href: 'https://www.credly.com/users/sanyam-rathore/badges/credly',
  },
  {
    title: 'Azure Fundamentals (AZ-900)',
    issuer: 'Microsoft Certified',
    href: 'https://www.credly.com/badges/b2cd6a6e-2b38-4177-b802-2420444af406',
  },
  {
    title: 'Power Platform Developer Associate (PL-400)',
    issuer: 'Microsoft Certified',
  },
]

const CARD_CLASS =
  'flex flex-col gap-4 border border-primary-border rounded-3xl smooth-corners p-6 bg-[#111] transition-all duration-300 ease-out hover:border-tertiary'

export default function Credentials() {
  return (
    <div id="credentials" className="w-svw flex flex-col items-center gap-12 px-8 py-24">
      <div className="flex flex-col items-center text-center">
        <h1
          className="
            font-weird-word
            bg-[linear-gradient(0deg,#000_11%,#fff_57%)]
            bg-clip-text [-webkit-background-clip:text]
            text-transparent [-webkit-text-fill-color:transparent]
            text-[40px] tracking-normal leading-normal whitespace-nowrap
          "
        >
          Credentials.
        </h1>
        <p className="text-secondary text-[10px] md:text-sm">
          the foundations, and the paper trail.
        </p>
      </div>

      <section className="w-full md:w-[calc(100%-340px)] grid gap-5 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <article className={CARD_CLASS}>
          <div className="flex items-center gap-2 text-tertiary text-[10px] uppercase tracking-[0.3em]">
            <GraduationCap size={14} aria-hidden="true" />
            Education
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-[16px] md:text-[20px] leading-tight">
              B.Tech — Computer Science and Engineering
            </h3>
            <p className="text-tertiary text-[14px] leading-6">
              Lakshmi Narain College of Technology, Bhopal
            </p>
          </div>
          <div className="mt-auto flex flex-wrap gap-6 pt-1">
            <div className="flex flex-col">
              <span className="text-[20px] md:text-[26px] leading-none">8.57</span>
              <span className="text-tertiary text-xs md:text-sm">GPA</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[20px] md:text-[26px] leading-none">2018 – 2022</span>
              <span className="text-tertiary text-xs md:text-sm">Aug – June</span>
            </div>
          </div>
        </article>

        <article className={CARD_CLASS}>
          <div className="flex items-center gap-2 text-tertiary text-[10px] uppercase tracking-[0.3em]">
            <BadgeCheck size={14} aria-hidden="true" />
            Certifications &amp; Badges
          </div>
          <ul className="flex flex-col divide-y divide-primary-border" role="list">
            {certifications.map((cert) => {
              const body = (
                <>
                  <div className="flex flex-col gap-1">
                    <span className="text-[15px] md:text-base text-primary">{cert.title}</span>
                    <span className="text-tertiary text-xs">{cert.issuer}</span>
                  </div>
                  {cert.href && (
                    <ArrowUpRight
                      size={16}
                      aria-hidden="true"
                      className="shrink-0 text-tertiary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                    />
                  )}
                </>
              )
              return (
                <li key={cert.title} className="py-4 first:pt-0 last:pb-0">
                  {cert.href ? (
                    <a
                      href={cert.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${cert.title} badge`}
                      className="group flex items-start justify-between gap-4"
                    >
                      {body}
                    </a>
                  ) : (
                    <div className="flex items-start justify-between gap-4">{body}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </article>
      </section>
    </div>
  )
}
