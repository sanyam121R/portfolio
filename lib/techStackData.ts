import type { ComponentType } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiPostgresql,
  SiApachekafka,
  SiMongodb,
} from "react-icons/si";
import { LiaAws } from "react-icons/lia";
import { VscAzure } from "react-icons/vsc";
import { TbBrain } from "react-icons/tb";

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
      "Building high-performance enterprise dashboards, data grids, and interactive interfaces with React and TypeScript — with a strong focus on UX, rendering efficiency, accessibility, and complex data-heavy components.",
    stats: { yearsExp: 4, projects: 5, proficiency: 95 },
    expertiseAreas: [
      "Component Architecture",
      "Complex Dashboard UI",
      "Performance & Core Web Vitals",
      "Virtualization & Code Splitting",
      "Accessibility (WCAG)",
    ],
    tools: [
      "TanStack Query",
      "Redux",
      "Zustand",
      "Tailwind CSS",
      "Vitest",
      "Figma to UI",
    ],
    featuredProjects: [
      { name: "react-finance-grid", tech: "React + TypeScript" },
      { name: "Project-Tracking Dashboard", tech: "React + TypeScript" },
      { name: "Resource Management UI", tech: "React" },
    ],
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "Full Stack Framework",
    icon: SiNextdotjs,
    color: "#ffffff",
    description:
      "Shipping full-stack SaaS products with Next.js — App Router architecture, server rendering, multi-tenant dashboards, and production-ready frontend experiences.",
    stats: { yearsExp: 2, projects: 3, proficiency: 88 },
    expertiseAreas: [
      "App Router Architecture",
      "Server-side Rendering",
      "Multi-tenant SaaS",
      "Frontend Performance",
      "SEO-friendly UI Delivery",
    ],
    tools: [
      "App Router",
      "Server Components",
      "Tailwind CSS",
      "Clerk",
      "Prisma",
      "Electron Integration",
    ],
    featuredProjects: [
      { name: "AI Financial Analytics SaaS", tech: "Next.js + PostgreSQL" },
      { name: "StreamSync", tech: "Next.js + Electron" },
      { name: "Portfolio Platform", tech: "Next.js" },
    ],
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Languages",
    icon: SiTypescript,
    color: "#3178C6",
    description:
      "Writing scalable frontend and backend code with strong typing, reusable contracts, and maintainable abstractions — alongside modern JavaScript (ES6+), SQL, and Python.",
    stats: { yearsExp: 4, projects: 10, proficiency: 94 },
    expertiseAreas: [
      "Strict Type Safety",
      "API Contracts",
      "ES6+ & Async Patterns",
      "Frontend + Backend Codebases",
      "Maintainable Refactoring",
    ],
    tools: [
      "TypeScript",
      "JavaScript (ES6+)",
      "SQL",
      "Python",
      "ESLint",
      "Vitest",
    ],
    featuredProjects: [
      { name: "AI Workflow Orchestrator", tech: "Node.js + TypeScript" },
      { name: "react-finance-grid", tech: "React + TypeScript" },
      { name: "StreamSync", tech: "Next.js + TypeScript" },
    ],
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "Backend Runtime",
    icon: SiNodedotjs,
    color: "#339933",
    description:
      "Building scalable backend services, integrations, and event-driven systems with Node.js, Express and NestJS — distributed workflows, queue-based processing, and enterprise automation.",
    stats: { yearsExp: 4, projects: 8, proficiency: 93 },
    expertiseAreas: [
      "REST & GraphQL APIs",
      "Event-Driven Architecture",
      "Saga & Distributed Workflows",
      "System Integrations",
      "Authentication & Authorization",
    ],
    tools: [
      "Express.js",
      "NestJS",
      "GraphQL",
      "OAuth 2.0 / JWT",
      "Clerk",
      "Webhooks",
    ],
    featuredProjects: [
      { name: "AI Workflow Orchestrator", tech: "Node.js + Kafka" },
      { name: "HALO ITSM ↔ Jira Integration", tech: "AWS Lambda + Node.js" },
      { name: "Conversation Session Service", tech: "NestJS + MongoDB" },
    ],
  },
  {
    id: "ai",
    name: "AI / LLM",
    category: "AI Engineering",
    icon: TbBrain,
    color: "#C084FC",
    description:
      "Integrating LLMs into automation and user-facing products — tool-calling copilots over live data, human-in-the-loop workflows with confidence-based routing, and guardrails that keep AI from executing critical operations on its own.",
    stats: { yearsExp: 2, projects: 3, proficiency: 86 },
    expertiseAreas: [
      "LLM API Integration",
      "Tool / Function Calling",
      "Human-in-the-loop Workflows",
      "Guardrails & Validation",
      "Prompt Engineering",
    ],
    tools: [
      "LLM APIs",
      "Tool Calling",
      "Whisper AI",
      "Claude Code",
      "RLHF Evaluation",
      "AI-assisted Dev",
    ],
    featuredProjects: [
      { name: "Financial Copilot", tech: "LLM + Tool Orchestration" },
      { name: "AI Project Copilot", tech: "LLM + Jira Data" },
      { name: "StreamSync Transcripts", tech: "Whisper AI" },
    ],
  },
  {
    id: "aws",
    name: "AWS",
    category: "Cloud Services",
    icon: LiaAws,
    color: "#FF9900",
    description:
      "Deploying and integrating cloud backend workflows on AWS — event-triggered Lambda integrations, API Gateway, queues, storage, monitoring, and global content delivery.",
    stats: { yearsExp: 3, projects: 3, proficiency: 85 },
    expertiseAreas: [
      "Serverless Integrations",
      "Lambda-based Automation",
      "API Gateway",
      "Queues & Storage",
      "Monitoring & Delivery",
    ],
    tools: [
      "Lambda",
      "API Gateway",
      "CloudWatch",
      "S3",
      "EC2",
      "SQS",
      "CloudFront",
      "GitHub Actions",
    ],
    featuredProjects: [
      { name: "HALO ITSM ↔ Jira Integration", tech: "Lambda + API Gateway" },
      { name: "ServiceNow ↔ Jira Integration", tech: "Lambda + API Gateway" },
      { name: "StreamSync", tech: "CloudFront" },
    ],
  },
  {
    id: "azure",
    name: "Azure",
    category: "Cloud & Power Platform",
    icon: VscAzure,
    color: "#0089D6",
    description:
      "Running workloads on Azure Functions, VMs, and Container Instances, and shipping enterprise Power Apps with custom PCF React/TypeScript components. AZ-900 and PL-400 certified.",
    stats: { yearsExp: 2, projects: 3, proficiency: 80 },
    expertiseAreas: [
      "Azure Functions",
      "VMs & Container Instances",
      "Power Apps Canvas Apps",
      "PCF React Components",
      "Solution-version Rollbacks",
    ],
    tools: [
      "Azure Functions",
      "Azure VM",
      "ACI",
      "Power Apps",
      "PCF",
      "Microsoft Graph",
    ],
    featuredProjects: [
      { name: "Enterprise Power Apps", tech: "PCF + React" },
      { name: "SSO-based Internal Dashboard", tech: "React + Azure AD" },
    ],
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "Relational Database",
    icon: SiPostgresql,
    color: "#336791",
    description:
      "Designing relational schemas and persistence for multi-tenant SaaS and event-driven systems — including transactional outbox tables for reliable event publishing.",
    stats: { yearsExp: 3, projects: 4, proficiency: 86 },
    expertiseAreas: [
      "Schema Design",
      "Multi-tenant Data Isolation",
      "Transactional Outbox",
      "SQL Querying",
      "Analytical Workloads",
    ],
    tools: [
      "PostgreSQL",
      "Prisma",
      "SQL",
      "IBM Netezza",
      "Database Debugging",
    ],
    featuredProjects: [
      { name: "AI Financial Analytics SaaS", tech: "PostgreSQL" },
      { name: "AI Workflow Orchestrator", tech: "PostgreSQL + Kafka" },
      { name: "StreamSync", tech: "PostgreSQL + Prisma" },
    ],
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "NoSQL Database",
    icon: SiMongodb,
    color: "#47A248",
    description:
      "Using MongoDB for document-based persistence in event-driven services, session stores, and full-stack web applications.",
    stats: { yearsExp: 3, projects: 3, proficiency: 85 },
    expertiseAreas: [
      "Document Modeling",
      "Event-driven Persistence",
      "Query Optimization",
      "Aggregation Pipelines",
      "Scalable Backend Storage",
    ],
    tools: [
      "MongoDB",
      "Node.js",
      "Aggregation Pipelines",
      "Indexes",
    ],
    featuredProjects: [
      { name: "Conversation Session Service", tech: "NestJS + MongoDB" },
      { name: "OTP Verification Service", tech: "MongoDB + Redis" },
    ],
  },
  {
    id: "messaging",
    name: "Kafka & Redis",
    category: "Messaging & Queueing",
    icon: SiApachekafka,
    color: "#DC382D",
    description:
      "Building resilient event pipelines with Kafka, and fast state, caching, and background job processing with Redis and BullMQ — retries, DLQs, idempotency, and worker coordination.",
    stats: { yearsExp: 3, projects: 4, proficiency: 86 },
    expertiseAreas: [
      "Event Streaming",
      "Queue-backed Architectures",
      "Retries & DLQs",
      "Idempotency Patterns",
      "Rate Limiting & Locks",
    ],
    tools: [
      "Kafka",
      "Redis",
      "BullMQ",
      "Salesforce CDC",
      "Retry Policies",
      "Worker Coordination",
    ],
    featuredProjects: [
      { name: "AI Workflow Orchestrator", tech: "Kafka + Redis" },
      { name: "Financial Analytics Jobs", tech: "Redis + BullMQ" },
      { name: "OTP Verification Service", tech: "Redis TTL" },
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