import type { ComponentType } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiPostgresql,
  SiRedis,
  SiMongodb,
} from "react-icons/si";
import { LiaAws } from "react-icons/lia";

export interface FeaturedProject {
  name: string;
  tech: string;
}

export interface TechItem {
  id: string;
  name: string;
  category: string;
  icon: ComponentType<{ size?: number; color?: string; className?: string }>;
  color: string;
  description: string;
  stats: {
    yearsExp: number;
    projects: number;
    proficiency: number;
  };
  expertiseAreas: string[];
  tools: string[];
  featuredProjects: FeaturedProject[];
}

export const techItems: TechItem[] = [
  {
    id: "react",
    name: "React",
    category: "UI Development",
    icon: SiReact,
    color: "#61DAFB",
    description:
      "Building high-performance enterprise dashboards, internal tools, and interactive user interfaces with React and TypeScript, with strong focus on UX, rendering efficiency, and complex data-heavy components.",
    stats: { yearsExp: 4, projects: 3, proficiency: 95 },
    expertiseAreas: [
      "Component Architecture",
      "Complex Dashboard UI",
      "Performance Optimization",
      "Reusable UI Systems",
      "State Management",
    ],
    tools: [
      "React Hooks",
      "TanStack Query",
      "Redux",
      "Tailwind CSS",
      "JavaScript",
      "Figma to UI",
    ],
    featuredProjects: [
      { name: "Budget vs Variance Analytics Table", tech: "React + TypeScript" },
      { name: "Enterprise Resource Management UI", tech: "React" },
      { name: "SSO-based Internal Dashboard", tech: "React + Azure AD" },
    ],
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "Full Stack Framework",
    icon: SiNextdotjs,
    color: "#ffffff",
    description:
      "Developing full-stack applications with Next.js, focusing on modern routing, scalable UI architecture, and production-ready frontend experiences.",
    stats: { yearsExp: 2, projects: 2, proficiency: 88 },
    expertiseAreas: [
      "App Router Architecture",
      "Server-side Rendering",
      "Frontend Performance",
      "Full-stack Product Development",
      "SEO-friendly UI Delivery",
    ],
    tools: [
      "App Router",
      "Server Components",
      "Tailwind CSS",
      "Clerk",
      "TypeScript",
      "Electron Integration",
    ],
    featuredProjects: [
      { name: "StreamSync", tech: "Next.js + PostgreSQL" },
      { name: "Portfolio Platform", tech: "Next.js" },
    ],
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Type Safety",
    icon: SiTypescript,
    color: "#3178C6",
    description: "Writing scalable frontend and backend applications with strong typing, reusable contracts, and maintainable abstractions across React, Next.js, and Node.js systems.",
    stats: { yearsExp: 4, projects: 10, proficiency: 94 },
    expertiseAreas: [
      "Strict Type Safety",
      "API Contracts",
      "Reusable Interfaces & Types",
      "Frontend + Backend Codebases",
      "Maintainable Refactoring",
    ],
    tools: [
      "TSConfig",
      "ESLint",
      "React + TypeScript",
      "Node.js + TypeScript",
      "Next.js",
      "Express.js",
    ],
    featuredProjects: [
      { name: "Automation Platform", tech: "Node.js + TypeScript" },
      { name: "Analytics Dashboard", tech: "React + TypeScript" },
      { name: "StreamSync", tech: "Next.js + TypeScript" },
    ],
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "Language",
    icon: SiJavascript,
    color: "#F7DF1E",
    description:
      "Building interactive frontend experiences and scalable backend applications with modern JavaScript across React, Next.js, and Node.js ecosystems.",
    stats: { yearsExp: 4, projects: 4, proficiency: 90 },
    expertiseAreas: [
      "ES6+ Fundamentals",
      "Asynchronous Programming",
      "DOM & Browser APIs",
      "Frontend + Backend Development",
      "Code Readability & Refactoring",
    ],
    tools: [
      "ESLint",
      "React + JavaScript",
      "Node.js + JavaScript",
      "Next.js",
      "Express.js",
      "Async/Await",
    ],
    featuredProjects: [
      { name: "Automation Platform", tech: "Node.js + JavaScript" },
      { name: "Analytics Dashboard", tech: "React + JavaScript" },
      { name: "HALO ITSM ↔ Jira Integration", tech: "AWS Lambda + Node.js" },
      { name: "ServiceNow ↔ Jira Integration", tech: "AWS Lambda + Node.js" },
    ],
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "Backend Runtime",
    icon: SiNodedotjs,
    color: "#339933",
    description:
      "Building scalable backend systems, integrations, and event-driven services with Node.js, including distributed workflows, queue-based processing, and enterprise automation.",
    stats: { yearsExp: 4, projects: 8, proficiency: 93 },
    expertiseAreas: [
      "REST API Design",
      "Event-Driven Architecture",
      "Distributed Systems",
      "System Integrations",
      "Authentication & Authorization",
    ],
    tools: [
      "Express.js",
      "BullMQ",
      "Redis",
      "OAuth2",
      "Clerk",
      "Webhooks",
    ],
    featuredProjects: [
      { name: "Salesforce CDC Automation Platform", tech: "Node.js + BullMQ" },
      { name: "HALO ITSM ↔ Jira Integration", tech: "AWS Lambda + Node.js" },
      { name: "ServiceNow ↔ Jira Integration", tech: "AWS Lambda + Node.js" },
    ],
  },
  {
    id: "aws",
    name: "AWS",
    category: "Cloud Services",
    icon: LiaAws,
    color: "#FF9900",
    description:
      "Deploying and integrating cloud-based backend workflows using AWS services, especially Lambda and API Gateway for serverless enterprise automation.",
    stats: { yearsExp: 2, projects: 2, proficiency: 85 },
    expertiseAreas: [
      "Serverless Integrations",
      "Lambda-based Automation",
      "API Gateway",
      "CloudFront Delivery",
      "Backend Deployment Patterns",
    ],
    tools: [
      "AWS Lambda",
      "API Gateway",
      "CloudFront",
      "Node.js",
      "Serverless APIs",
      "Enterprise Integrations",
    ],
    featuredProjects: [
      { name: "HALO ITSM ↔ Jira Integration", tech: "Lambda + API Gateway" },
      { name: "ServiceNow ↔ Jira Integration", tech: "Lambda + API Gateway" },
    ],
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "Relational Database",
    icon: SiPostgresql,
    color: "#336791",
    description:
      "Working with PostgreSQL for relational data modeling, querying, and backend persistence across enterprise systems and SaaS applications.",
    stats: { yearsExp: 2, projects: 2, proficiency: 84 },
    expertiseAreas: [
      "Schema Design",
      "SQL Querying",
      "Relational Modeling",
      "Backend Persistence",
      "Analytical Data Workloads",
    ],
    tools: [
      "Prisma",
      "PostgreSQL",
      "SQL",
      "Database Debugging",
    ],
    featuredProjects: [
      { name: "StreamSync", tech: "PostgreSQL + Prisma" },
      { name: "Enterprise Backend Services", tech: "PostgreSQL" },
    ],
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "NoSQL Database",
    icon: SiMongodb,
    color: "#47A248",
    description:
      "Using MongoDB for scalable document-based persistence in event-driven systems, saga orchestration, and full-stack web applications.",
    stats: { yearsExp: 3, projects: 3, proficiency: 88 },
    expertiseAreas: [
      "Document Modeling",
      "Saga State Management",
      "Event-driven Persistence",
      "Query Optimization",
      "Scalable Backend Storage",
    ],
    tools: [
      "MongoDB",
      "Node.js",
      "Saga Orchestrator",
      "Aggregation Pipelines",
      "Indexes",
    ],
    featuredProjects: [
      { name: "Saga Orchestrator", tech: "MongoDB" },
      { name: "Enterprise SSO Web App", tech: "MongoDB" },
      { name: "Automation Platform", tech: "MongoDB + Node.js" },
    ],
  },
  {
    id: "redis",
    name: "Redis",
    category: "Caching & Queueing",
    icon: SiRedis,
    color: "#DC382D",
    description:
      "Using Redis for queueing, fast state handling, and resilient background job processing in distributed event-driven systems.",
    stats: { yearsExp: 2, projects: 3, proficiency: 85 },
    expertiseAreas: [
      "Queue-backed Architectures",
      "BullMQ Processing",
      "Retry Strategies",
      "Transient Failure Handling",
      "High-throughput Event Flows",
      "Rate Limiting",
      "Distributed Locks",
    ],
    tools: [
      "Redis",
      "BullMQ",
      "Job Queues",
      "Retry Policies",
      "Worker Coordination",
      "Idempotency Patterns",
    ],
    featuredProjects: [
      { name: "Salesforce CDC Queue Pipeline", tech: "Redis + BullMQ" },
      { name: "Distributed Worker System", tech: "BullMQ" },
      { name: "API Rate Limiter", tech: "Redis" },
    ],
  },
];
  // {
  //   id: "docker",
  //   name: "Docker",
  //   category: "Containerization",
  //   icon: SiDocker,
  //   color: "#2496ED",
  //   description:
  //     "Containerizing applications for consistent dev/prod parity, building multi-stage Dockerfiles, and orchestrating services with Docker Compose.",
  //   stats: { yearsExp: 3, projects: 12, proficiency: 85 },
  //   expertiseAreas: [
  //     "Dockerfile Optimization",
  //     "Multi-Stage Builds",
  //     "Docker Compose",
  //     "Networking & Volumes",
  //     "Container Security",
  //   ],
  //   tools: [
  //     "Docker Compose", "BuildKit", "Trivy",
  //     "Docker Hub", "Distroless", "Hadolint",
  //   ],
  //   featuredProjects: [
  //     { name: "Microservice Stack", tech: "Compose" },
  //     { name: "CI Pipeline", tech: "Docker" },
  //     { name: "Dev Environment", tech: "DevContainer" },
  //   ],
  // },
  // {
  //   id: "graphql",
  //   name: "GraphQL",
  //   category: "API Query Language",
  //   icon: SiGraphql,
  //   color: "#E10098",
  //   description:
  //     "Designing type-safe GraphQL schemas, implementing resolvers, and building efficient data-fetching layers with code-first and schema-first approaches.",
  //   stats: { yearsExp: 2, projects: 7, proficiency: 83 },
  //   expertiseAreas: [
  //     "Schema Design",
  //     "Resolvers & Dataloaders",
  //     "Apollo Client",
  //     "Subscriptions",
  //     "Federation",
  //   ],
  //   tools: [
  //     "Apollo Server", "Apollo Client", "GraphQL Codegen",
  //     "Pothos", "Hasura", "urql",
  //   ],
  //   featuredProjects: [
  //     { name: "Federated API", tech: "Apollo" },
  //     { name: "Real-time Feed", tech: "Subscriptions" },
  //     { name: "CMS Layer", tech: "Hasura" },
  //   ],
  // },