// import type { ExperienceChapter, JourneyMeta } from "@/types/experience";

// // ---------------------------------------------------------------------------
// // PASTE YOUR REAL EXPERIENCE HERE.
// // Each object is a "chapter" of your professional journey.
// // Order them oldest -> newest (chapterNumber 1 is the far-left origin).
// // Set `featured: true` on the dominant chapter and `current: true` on the
// // ongoing one. The promotion milestone sits on the chapter where it happened.
// // ---------------------------------------------------------------------------

// export const journeyMeta: JourneyMeta = {
//   title: "The journey so far",
//   range: "2019 — Present",
//   intro:
//     "A career told as a mission log — chapter by chapter, from first commits to systems at scale. Scroll to travel the timeline.",
//   outro: "The journey continues.",
//   outroSub: "Still building. Still learning. The next chapter is unwritten.",
// };

// export const experienceChapters: ExperienceChapter[] = [
//   {
//     id: "origins",
//     chapterNumber: 1,
//     missionNumber: "M-01",
//     company: "Persistent Systems",
//     role: "Aspiring Developer",
//     duration: "Dec 2021 — Sept 2022",
//     startDate: "2021-12",
//     endDate: "2022-09",
//     locationOrMode: "Remote",
//     summary:
//       "Where the foundations were laid — first production code, first broken deploys, first real users. The origin node of the journey.",
//     achievements: [
//       "Shipped first client websites end-to-end",
//       "Learned Git, REST APIs and the cost of bad schema design",
//       "Built a small open-source CLI used by a few hundred devs",
//     ],
//     techStack: ["JavaScript", "Node.js", "HTML/CSS", "Git", "MySQL"],
//     metrics: [
//       { label: "Projects shipped", value: "12+" },
//       { label: "First users", value: "300+" },
//     ],
//   },
//   {
//     id: "first-role",
//     chapterNumber: 2,
//     missionNumber: "M-02",
//     company: "Infohub Innovations",
//     role: "Software Engineer I",
//     duration: "2021 — 2022",
//     startDate: "2021-01",
//     endDate: "2022-06",
//     locationOrMode: "Hybrid",
//     summary:
//       "First full-time engineering role. Learned to build inside a team, own features, and ship under real deadlines.",
//     achievements: [
//       "Owned the billing service migration to event-driven architecture",
//       "Reduced p95 API latency by 38% via query & caching work",
//       "Introduced component tests that cut regression bugs in half",
//     ],
//     techStack: ["TypeScript", "React", "Express", "PostgreSQL", "Redis", "Docker"],
//     metrics: [
//       { label: "Latency cut", value: "−38%" },
//       { label: "Services owned", value: "4" },
//     ],
//   },
//   {
//     id: "growth",
//     chapterNumber: 3,
//     missionNumber: "M-03",
//     company: "Northwind Labs",
//     role: "Software Engineer",
//     duration: "2022 — 2023",
//     startDate: "2022-07",
//     endDate: "2023-08",
//     locationOrMode: "Hybrid",
//     summary:
//       "Took on larger surface area — led modules, mentored juniors, and started owning architecture decisions end-to-end.",
//     achievements: [
//       "Designed the multi-tenant data isolation model",
//       "Led a 3-engineer squad for the analytics platform rewrite",
//       "Drove CI/CD improvements cutting deploy time from 22m to 4m",
//     ],
//     techStack: ["TypeScript", "Next.js", "NestJS", "Kafka", "AWS", "Terraform"],
//     metrics: [
//       { label: "Deploy time", value: "22m → 4m" },
//       { label: "Team led", value: "3" },
//     ],
//     // A milestone node breaks the rhythm of the timeline here.
//     milestone: {
//       title: "PROMOTION",
//       description: "Promoted to Senior Engineer after leading the analytics rewrite.",
//     },
//   },
//   {
//     id: "current",
//     chapterNumber: 4,
//     missionNumber: "M-04",
//     company: "Helios Systems",
//     role: "Senior Software Engineer",
//     duration: "2023 — Present",
//     startDate: "2023-09",
//     endDate: null,
//     locationOrMode: "Remote",
//     current: true,
//     featured: true,
//     summary:
//       "The dominant chapter. Architecting distributed systems, owning the platform vision, and scaling engineering quality across teams.",
//     achievements: [
//       "Architected a multi-region event platform handling 2B+ events/month",
//       "Built the internal platform SDK adopted by 9 product teams",
//       "Established SLOs and on-call culture that halved incident MTTR",
//       "Mentored 6 engineers; 2 promoted within a year",
//     ],
//     techStack: [
//       "TypeScript",
//       "Next.js",
//       "Go",
//       "Kubernetes",
//       "gRPC",
//       "Kafka",
//       "PostgreSQL",
//       "AWS",
//     ],
//     metrics: [
//       { label: "Events / month", value: "2B+" },
//       { label: "Teams served", value: "9" },
//       { label: "MTTR", value: "−54%" },
//       { label: "Uptime", value: "99.98%" },
//     ],
//     rolePhases: [
//       {
//         title: "Senior Software Engineer",
//         duration: "2023 — 2024",
//         summary: "Owned core services and the first platform SDK.",
//       },
//       {
//         title: "Staff Engineer (acting)",
//         duration: "2024 — Present",
//         summary: "Driving cross-team architecture and platform strategy.",
//       },
//     ],
//     architectureFlow: [
//       { label: "Edge / Clients", detail: "Next.js + gRPC-Web" },
//       { label: "API Gateway", detail: "AuthN/Z, rate limit" },
//       { label: "Event Bus", detail: "Kafka, 2B+ events/mo" },
//       { label: "Services", detail: "Go microservices" },
//       { label: "Storage", detail: "PostgreSQL + caches" },
//     ],
//   },
// ];





import type { ExperienceChapter, JourneyMeta } from "@/types/experience";

export const journeyMeta: JourneyMeta = {
  title: "The journey so far",
  range: "2021 — Present",
  intro:
    "From writing SQL queries to designing distributed systems, constantly building, learning and solving real-world problems.",
  outro: "The journey continues...",
  outroSub: "Still building. Still learning. The next chapter is unwritten.",
};

export const experienceChapters: ExperienceChapter[] = [
  {
    id: "persistent",
    chapterNumber: 1,
    missionNumber: "MISSION 01",
    company: "Persistent Systems",
    role: "Database Apprentice",
    duration: "Dec 2021 — Aug 2022",
    startDate: "2021-12",
    endDate: "2022-08",
    locationOrMode: "Remote",
    summary:
      "Started the journey by working on IBM Netezza data warehouse appliances, understanding SQL workloads and learning the foundations of large-scale systems.",
    achievements: [
      "Worked with IBM Netezza data warehouse appliances.",
      "Monitored SPUs and optimized SQL workloads.",
      "Learned PostgreSQL internals and database tooling.",
      "Gained hands-on exposure to Docker and enterprise data infrastructure."
    ],
    techStack: [
      "IBM Netezza",
      "PostgreSQL",
      "nzcli",
      "nzsql",
      "Docker",
      "SQL"
    ],
    metrics: [],
  },

  {
    id: "infohub",
    chapterNumber: 2,
    missionNumber: "MISSION 02",
    company: "InfoHub Innovations",
    role: "Software Engineer I",
    duration: "Aug 2022 — Dec 2022",
    startDate: "2022-08",
    endDate: "2022-12",
    locationOrMode: "Remote",
    summary:
      "Built secure backend services, automated CMS ingestion pipelines and optimized frontend performance while shipping production software.",
    achievements: [
      "Engineered OAuth 2.0 secured backend services.",
      "Automated ingestion for 4,000+ monthly articles.",
      "Reduced data errors by 60%.",
      "Improved React performance with better LCP and CLS."
    ],
    techStack: [
      "Node.js",
      "OAuth 2.0",
      "React.js",
      "CMS",
      "Web Performance"
    ],
    metrics: [
      {
        label: "Articles Processed",
        value: "4000+",
      },
      {
        label: "Error Reduction",
        value: "60%",
      },
      {
        label: "LCP Improvement",
        value: "10%",
      },
    ],
  },

  {
    id: "cloudeq",
    chapterNumber: 3,
    missionNumber: "MISSION 03",
    company: "CloudEQ",
    role: "Software Engineer I → Software Engineer II",
    duration: "Jan 2023 — April 2026",
    startDate: "2023-01",
    endDate: "2026-04",
    locationOrMode: "Hybrid",
    featured: true,
    summary:
      "One company. Two milestones. From enterprise integrations to architecting distributed event-driven systems at scale.",
    achievements: [
      "Built HALO ↔ Jira and ServiceNow ↔ Jira integrations.",
      "Designed scalable AWS Lambda based automation.",
      "Architected Salesforce CDC event-driven platform.",
      "Implemented Saga Orchestrator using BullMQ, Redis and MongoDB.",
      "Automated Microsoft Teams & SharePoint provisioning.",
      "Built complex React analytics dashboards from Figma."
    ],
    techStack: [
      "React.js",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "AWS Lambda",
      "BullMQ",
      "Redis",
      "Salesforce CDC",
      "Azure AD"
    ],
    metrics: [
      {
        label: "Reliability",
        value: "99%",
      },
      {
        label: "Intake Reduction",
        value: "75%",
      },
      {
        label: "Events",
        value: "500+",
      },
      {
        label: "Manual Work Removed",
        value: "80%",
      },
      {
        label: "Enterprise Users",
        value: "450+",
      },
    ],
    milestone: {
      title: "PROMOTED",
      description:
        "Promoted from Software Engineer I to Software Engineer II in August 2025.",
    },
    rolePhases: [
      {
        title: "Software Engineer I",
        duration: "Jan 2023 — Aug 2025",
        summary:
          "Built enterprise integrations between HALO ITSM, Jira and ServiceNow while modernizing internal React applications and AWS serverless platforms.",
      },
      {
        title: "Software Engineer II",
        duration: "Aug 2025 — Present",
        summary:
          "Architecting Salesforce CDC event-driven automation using Saga patterns, BullMQ, Redis and MongoDB while leading large-scale platform initiatives.",
      },
    ],
    architectureFlow: [
      {
        label: "Salesforce CDC",
        detail: "Event Stream",
      },
      {
        label: "Node.js",
        detail: "Ingestion Layer",
      },
      {
        label: "BullMQ",
        detail: "Queue",
      },
      {
        label: "Saga",
        detail: "Orchestrator",
      },
      {
        label: "MongoDB",
        detail: "State Store",
      },
      {
        label: "Redis",
        detail: "Cache",
      },
      {
        label: "Workers",
        detail: "Scalable Consumers",
      },
    ],
  },
];