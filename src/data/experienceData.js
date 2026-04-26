export const experienceData = [
  {
    id: 1,
    companyName: "CloudEQ",
    location: "Chandigarh, India (Hybrid)",
    designation: "Software Engineer II",
    experience: "3 yrs 4 months",
    expToandFrom: "Aug 2025 - Present",
    stacks: [
      "Node.js",
      "Salesforce CDC",
      "Redis",
      "BullMQ",
      "MongoDB",
      "React",
      "TypeScript"
    ],
    highlights: [
      "Architected an event-driven automation platform on Salesforce CDC with a stateless Node.js ingestion layer, Redis/BullMQ queue partitioned by opportunityId, and a MongoDB-backed Saga Orchestrator with compensating transactions, idempotency guards, and Jira webhook approvals, cutting project intake overhead by 75% across Jira, Teams, and SharePoint.",
      "Engineered a fault-tolerant distributed system with scalable worker tiers, BullMQ exponential-backoff retries for transient 5xx failures, and MongoDB saga state as source of truth, ensuring zero duplicate resource creation with 99% reliability at 500+ events.",
      "Integrated Microsoft Graph API to automate Teams channel creation and SharePoint migration of 2,000+ documents, improving cross-platform collaboration efficiency by 40%.",
      "Designed and built a custom budget-vs-variance analytics table from Figma in React and TypeScript (without table libraries) with fixed + scrollable columns, expandable multi-level rows, multi-range date comparison, and windowed loading via TanStack Query for fast large-dataset interactions."
    ]
  },
  {
    id: 2,
    companyName: "CloudEQ",
    location: "Chandigarh, India (Hybrid)",
    designation: "Software Engineer I",
    experience: "2 yrs 8 months",
    expToandFrom: "Jan 2023 - Aug 2025",
    stacks: ["React.js", "TypeScript", "Node.js", "MongoDB", "AWS Lambda", "Azure AD", "Jira"],
    highlights: [
      "Built event-triggered AWS Lambda (Node.js) integrations between HALO ITSM and Jira plus ServiceNow and Jira, accelerating ticket resolution by 25% and eliminating about 80% of manual ticket synchronization.",
      "Developed scalable web applications using React.js, TypeScript, Node.js, and MongoDB with robust Azure AD SSO for 450 enterprise users.",
      "Optimized a custom Resource and Project Management UI, reducing page load time by 800ms, improving Core Web Vitals, and increasing user engagement by 10%."
    ]
  },
  {
    id: 3,
    companyName: "InfoHub Innovations",
    location: "Mumbai, India (Remote)",
    designation: "Software Engineer I",
    experience: "5 months",
    expToandFrom: "Aug 2022 - Dec 2022",
    stacks: ["Node.js", "OAuth 2.0", "CMS", "React.js", "Web Performance"],
    highlights: [
      "Engineered secure Node.js backend services with OAuth 2.0 and automated CMS data ingestion for 4,000+ monthly articles, reducing data errors by 60%.",
      "Refactored React.js frontend architecture, improving LCP by 10% and CLS from 0.23 to 0.12."
    ]
  },
  {
    id: 4,
    companyName: "Persistent System",
    location: "Nagpur, India (Remote)",
    designation: "Software Developer (Intern & FTE)",
    experience: "8 months",
    expToandFrom: "Dec 2021 - Aug 2022",
    stacks: ["IBM Netezza", "nzcli", "nzsql", "PostgreSQL", "Docker", "SQL"],
    highlights: [
      "Worked on IBM Netezza data-warehouse appliances using nzcli and nzsql on top of PostgreSQL to monitor and maintain SPUs and debug SQL workloads.",
      "Gained hands-on exposure to containerization with Docker and large-scale analytical database environments."
    ]
  }
];
