import type { ComponentType } from "react";
import {
  SiReact, SiNextdotjs, SiTypescript, SiNodedotjs,
//   SiAmazonwebservices, 
  SiPostgresql, SiRedis, SiDocker, SiGraphql,
} from "react-icons/si";

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
      "Building interactive, accessible and high performance user interfaces with component-based architecture.",
    stats: { yearsExp: 4, projects: 12, proficiency: 95 },
    expertiseAreas: [
      "Component Architecture",
      "State Management (Redux, Zustand)",
      "Performance Optimization",
      "UI/UX Implementation",
      "Testing (Jest, RTL, Cypress)",
    ],
    tools: [
      "React Hooks", "React Query", "Redux Toolkit",
      "Tailwind CSS", "Framer Motion", "Material UI",
    ],
    featuredProjects: [
      { name: "SaaS Dashboard", tech: "React" },
      { name: "E-commerce Platform", tech: "Next.js" },
      { name: "Design System", tech: "Storybook" },
    ],
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "Full Stack Framework",
    icon: SiNextdotjs,
    color: "#ffffff",
    description:
      "Leveraging the App Router for hybrid rendering strategies — SSR, SSG, ISR — and building full-stack applications with API routes and server actions.",
    stats: { yearsExp: 3, projects: 10, proficiency: 92 },
    expertiseAreas: [
      "App Router & Server Components",
      "SSR / SSG / ISR Strategies",
      "API Routes & Server Actions",
      "Image & Font Optimization",
      "Middleware & Edge Functions",
    ],
    tools: [
      "App Router", "Server Components", "Next Auth",
      "Vercel", "Edge Runtime", "Turbopack",
    ],
    featuredProjects: [
      { name: "Portfolio Site", tech: "Next.js" },
      { name: "E-commerce Platform", tech: "Next.js" },
      { name: "Blog Engine", tech: "MDX" },
    ],
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Type Safety",
    icon: SiTypescript,
    color: "#3178C6",
    description:
      "Writing robust, self-documenting code with advanced type patterns, generics, and strict mode across every layer of the stack.",
    stats: { yearsExp: 4, projects: 18, proficiency: 93 },
    expertiseAreas: [
      "Strict Mode & Config",
      "Generics & Utility Types",
      "Discriminated Unions",
      "Type Guards & Narrowing",
      "Declaration Files",
    ],
    tools: [
      "TSConfig", "ts-node", "Zod",
      "tRPC", "ESLint + TypeScript", "Type-Fest",
    ],
    featuredProjects: [
      { name: "API SDK", tech: "TypeScript" },
      { name: "Component Library", tech: "Storybook" },
      { name: "CLI Tool", tech: "Node.js" },
    ],
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "Backend Runtime",
    icon: SiNodedotjs,
    color: "#339933",
    description:
      "Building scalable server-side applications, REST/GraphQL APIs, and event-driven microservices with Node.js and the Express/Fastify ecosystem.",
    stats: { yearsExp: 4, projects: 14, proficiency: 90 },
    expertiseAreas: [
      "REST API Design",
      "Event-Driven Architecture",
      "Microservices",
      "Authentication & Authorization",
      "Streaming & WebSockets",
    ],
    tools: [
      "Express", "Fastify", "Prisma",
      "Bull/BullMQ", "Socket.io", "JWT",
    ],
    featuredProjects: [
      { name: "Real-time Chat", tech: "Socket.io" },
      { name: "Job Queue System", tech: "BullMQ" },
      { name: "REST API Gateway", tech: "Express" },
    ],
  },
//   {
//     id: "aws",
//     name: "AWS",
//     category: "Cloud Services",
//     icon: SiAmazonwebservices,
//     color: "#FF9900",
//     description:
//       "Architecting and deploying cloud-native solutions using EC2, S3, Lambda, RDS, and CI/CD pipelines with AWS CodePipeline and GitHub Actions.",
//     stats: { yearsExp: 3, projects: 8, proficiency: 82 },
//     expertiseAreas: [
//       "EC2 & Auto Scaling",
//       "S3 & CloudFront CDN",
//       "Lambda & Serverless",
//       "RDS & Aurora",
//       "IAM & Security",
//     ],
//     tools: [
//       "EC2", "S3", "Lambda",
//       "CloudFront", "RDS", "CodePipeline",
//     ],
//     featuredProjects: [
//       { name: "Serverless API", tech: "Lambda" },
//       { name: "Static CDN", tech: "S3 + CloudFront" },
//       { name: "Infra Automation", tech: "CDK" },
//     ],
//   },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "Relational Database",
    icon: SiPostgresql,
    color: "#336791",
    description:
      "Designing normalized schemas, writing performant queries, managing migrations, and leveraging advanced features like JSONB, CTEs, and row-level security.",
    stats: { yearsExp: 3, projects: 10, proficiency: 88 },
    expertiseAreas: [
      "Schema Design & Normalization",
      "Query Optimization & Indexes",
      "Migrations with Prisma/Flyway",
      "JSONB & Full-Text Search",
      "Row-Level Security",
    ],
    tools: [
      "Prisma", "pgAdmin", "Flyway",
      "pg", "PostGIS", "Supabase",
    ],
    featuredProjects: [
      { name: "Multi-tenant SaaS", tech: "RLS" },
      { name: "Analytics Dashboard", tech: "PostgreSQL" },
      { name: "Search Engine", tech: "FTS" },
    ],
  },
  {
    id: "redis",
    name: "Redis",
    category: "In-Memory Store",
    icon: SiRedis,
    color: "#DC382D",
    description:
      "Using Redis for high-speed caching, session storage, pub/sub messaging, rate limiting, and distributed locks in production systems.",
    stats: { yearsExp: 2, projects: 6, proficiency: 80 },
    expertiseAreas: [
      "Caching Strategies",
      "Session Management",
      "Pub/Sub Messaging",
      "Rate Limiting",
      "Distributed Locks",
    ],
    tools: [
      "ioredis", "redis-om", "BullMQ",
      "RedisInsight", "Upstash", "Keydb",
    ],
    featuredProjects: [
      { name: "API Rate Limiter", tech: "Redis" },
      { name: "Session Store", tech: "Redis" },
      { name: "Queue Worker", tech: "BullMQ" },
    ],
  },
  {
    id: "docker",
    name: "Docker",
    category: "Containerization",
    icon: SiDocker,
    color: "#2496ED",
    description:
      "Containerizing applications for consistent dev/prod parity, building multi-stage Dockerfiles, and orchestrating services with Docker Compose.",
    stats: { yearsExp: 3, projects: 12, proficiency: 85 },
    expertiseAreas: [
      "Dockerfile Optimization",
      "Multi-Stage Builds",
      "Docker Compose",
      "Networking & Volumes",
      "Container Security",
    ],
    tools: [
      "Docker Compose", "BuildKit", "Trivy",
      "Docker Hub", "Distroless", "Hadolint",
    ],
    featuredProjects: [
      { name: "Microservice Stack", tech: "Compose" },
      { name: "CI Pipeline", tech: "Docker" },
      { name: "Dev Environment", tech: "DevContainer" },
    ],
  },
  {
    id: "graphql",
    name: "GraphQL",
    category: "API Query Language",
    icon: SiGraphql,
    color: "#E10098",
    description:
      "Designing type-safe GraphQL schemas, implementing resolvers, and building efficient data-fetching layers with code-first and schema-first approaches.",
    stats: { yearsExp: 2, projects: 7, proficiency: 83 },
    expertiseAreas: [
      "Schema Design",
      "Resolvers & Dataloaders",
      "Apollo Client",
      "Subscriptions",
      "Federation",
    ],
    tools: [
      "Apollo Server", "Apollo Client", "GraphQL Codegen",
      "Pothos", "Hasura", "urql",
    ],
    featuredProjects: [
      { name: "Federated API", tech: "Apollo" },
      { name: "Real-time Feed", tech: "Subscriptions" },
      { name: "CMS Layer", tech: "Hasura" },
    ],
  },
];