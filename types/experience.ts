// ---------------------------------------------------------------------------
// Strongly typed data model for the "Career Journey" / Experience section.
// Replace the sample content in `data/experience.ts` with your real story.
// ---------------------------------------------------------------------------

/** A single phase inside a chapter (used by the featured / promoted chapter). */
export interface RolePhase {
  /** e.g. "Software Engineer" */
  title: string;
  /** e.g. "2021 — 2023" */
  duration: string;
  /** Optional one-line description of the phase. */
  summary?: string;
}

/** A node in the optional architecture / system-flow mini diagram. */
export interface ArchitectureFlowStep {
  label: string;
  detail?: string;
}

/** A measurable impact metric shown on a chapter card. */
export interface ExperienceMetric {
  label: string;
  value: string;
}

/** Optional milestone / promotion marker attached to a chapter. */
export interface ChapterMilestone {
  /** e.g. "PROMOTION" */
  title: string;
  description: string;
}

export interface ExperienceChapter {
  id: string;
  /** Sequential chapter number, 1-based. */
  chapterNumber: number;
  /** Mission label, e.g. "M-01" — pure narrative flavor. */
  missionNumber: string;
  company: string;
  role: string;
  /** Human readable duration, e.g. "Jan 2020 — Dec 2021". */
  duration: string;
  /** ISO date (YYYY-MM) used to anchor the timeline. */
  startDate: string;
  /** ISO date or null when this is the current / ongoing role. */
  endDate: string | null;
  /** Optional "remote / on-site / hybrid" or mode of work. */
  locationOrMode?: string;
  /** Short narrative summary of the chapter. */
  summary: string;
  /** Bullet achievements / problems solved. */
  achievements: string[];
  /** Tech stack chips. */
  techStack: string[];
  /** Optional key metrics. */
  metrics?: ExperienceMetric[];
  /** Optional architecture / system flow block. */
  architectureFlow?: ArchitectureFlowStep[];
  /** Optional milestone (promotion / inflection). */
  milestone?: ChapterMilestone;
  /** Multi-phase role progression (used by featured chapter). */
  rolePhases?: RolePhase[];
  /** Marks the most recent / ongoing role. */
  current?: boolean;
  /** Marks the dominant, larger chapter. */
  featured?: boolean;
}

export interface JourneyMeta {
  /** Section eyebrow / title, e.g. "The journey so far". */
  title: string;
  /** Overall time range, e.g. "2019 — Present". */
  range: string;
  /** Intro panel narrative copy. */
  intro: string;
  /** Outro panel forward-looking copy. */
  outro: string;
  /** Outro secondary line. */
  outroSub?: string;
}

export type CharacterState = "running" | "idle" | "final";