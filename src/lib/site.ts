/**
 * Locale-independent site data: links, project metadata, tech stack.
 * All translatable copy lives in `i18n.ts`, keyed by the ids declared here.
 */

export const SOCIALS = {
  github: "https://github.com/ehoguerra",
  linkedin: "https://www.linkedin.com/in/artur-guerra-dev/",
  email: "arturpvguerra@gmail.com",
} as const;

export const CV = {
  en: "/cv/Artur_Guerra_CV_EN.pdf",
  pt: "/cv/Artur_Guerra_CV_PT.pdf",
} as const;

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export type ProjectId =
  | "evosolar"
  | "zelo"
  | "fantasy"
  | "br1"
  | "cesh"
  | "pecci";

export interface ProjectMeta {
  readonly id: ProjectId;
  readonly index: string;
  /** Repo URL when the source is public, otherwise null. */
  readonly repo: string | null;
  readonly live: string | null;
  readonly source: "public" | "private";
  readonly ai: boolean;
  readonly featured: boolean;
  /** Two hues used for the card's gradient signature. */
  readonly hues: readonly [string, string];
  readonly stack: readonly string[];
}

export const PROJECTS: readonly ProjectMeta[] = [
  {
    id: "evosolar",
    index: "01",
    repo: null,
    live: null,
    source: "private",
    ai: true,
    featured: true,
    hues: ["#f59e6b", "#b45cf5"],
    stack: [
      "FastAPI",
      "React",
      "React Native",
      "PostgreSQL",
      "Redis",
      "Celery",
      "Docker",
    ],
  },
  {
    id: "zelo",
    index: "02",
    repo: "https://github.com/ehoguerra/zelo_docs",
    live: null,
    source: "private",
    ai: true,
    featured: true,
    hues: ["#2dd4d4", "#6d5ef8"],
    stack: [
      "FastAPI",
      "React Native",
      "Expo",
      "PostgreSQL",
      "Redis",
      "Celery",
    ],
  },
  {
    id: "fantasy",
    index: "03",
    repo: null,
    live: null,
    source: "private",
    ai: false,
    featured: false,
    hues: ["#4ade80", "#2dd4d4"],
    stack: [
      "FastAPI",
      "Next.js",
      "TypeScript",
      "Tailwind",
      "PostgreSQL",
      "Redis",
    ],
  },
  {
    id: "br1",
    index: "04",
    repo: null,
    live: null,
    source: "private",
    ai: false,
    featured: false,
    hues: ["#f472b6", "#b45cf5"],
    stack: ["Flask", "PostgreSQL", "Bootstrap", "Chart.js", "ReportLab"],
  },
  {
    id: "cesh",
    index: "05",
    repo: null,
    live: null,
    source: "private",
    ai: true,
    featured: false,
    hues: ["#6d5ef8", "#2dd4d4"],
    stack: ["PHP 8.3", "Slim 4", "MySQL", "Docker", "Flask", "AWS S3"],
  },
  {
    id: "pecci",
    index: "06",
    repo: null,
    live: null,
    source: "private",
    ai: false,
    featured: false,
    hues: ["#38bdf8", "#6d5ef8"],
    stack: ["Flask", "PostgreSQL", "Bootstrap", "JavaScript ES6+"],
  },
] as const;

/* ------------------------------------------------------------------ */
/* Open source                                                         */
/* ------------------------------------------------------------------ */

export type RepoId =
  | "kimiPlugin"
  | "contentGen"
  | "encurtaAi"
  | "nestClean"
  | "erpSystem"
  | "zeloDocs";

export interface RepoMeta {
  readonly id: RepoId;
  readonly name: string;
  readonly url: string;
  readonly tags: readonly string[];
}

export const OPEN_SOURCE: readonly RepoMeta[] = [
  {
    id: "kimiPlugin",
    name: "kimi-plugin-cc",
    url: "https://github.com/ehoguerra/kimi-plugin-cc",
    tags: ["Claude Code", "Plugin", "TypeScript"],
  },
  {
    id: "contentGen",
    name: "ultimate-claude-content-gen",
    url: "https://github.com/ehoguerra/ultimate-claude-content-gen",
    tags: ["LLM", "Content", "Automation"],
  },
  {
    id: "encurtaAi",
    name: "encurta-ai",
    url: "https://github.com/ehoguerra/encurta-ai",
    tags: ["Python", "AI", "Web"],
  },
  {
    id: "nestClean",
    name: "nestjs-clean-arch",
    url: "https://github.com/ehoguerra/nestjs-clean-arch",
    tags: ["NestJS", "Clean Architecture", "TypeScript"],
  },
  {
    id: "erpSystem",
    name: "erp_system",
    url: "https://github.com/ehoguerra/erp_system",
    tags: ["Python", "ERP", "Backend"],
  },
  {
    id: "zeloDocs",
    name: "zelo_docs",
    url: "https://github.com/ehoguerra/zelo_docs",
    tags: ["Docs", "Product", "HealthTech"],
  },
] as const;

/* ------------------------------------------------------------------ */
/* Misc                                                                */
/* ------------------------------------------------------------------ */

export const TECH_MARQUEE = [
  "Python",
  "FastAPI",
  "TypeScript",
  "Next.js",
  "React",
  "React Native",
  "PostgreSQL",
  "Redis",
  "Celery",
  "Docker",
  "Flask",
  "PHP",
  "Angular",
  "Tailwind",
  "OpenAI",
  "Claude",
  "Gemini",
  "WebSockets",
  "AWS S3",
  "Expo",
  "Clean Architecture",
  "OAuth 2.0",
] as const;

export type ExperienceId = "visol" | "founder" | "cefet" | "freelance";

export interface ExperienceMeta {
  readonly id: ExperienceId;
  readonly tags: readonly string[];
  readonly current: boolean;
}

export const EXPERIENCE: readonly ExperienceMeta[] = [
  { id: "visol", tags: ["PHP", "Angular", "Integrations"], current: true },
  {
    id: "founder",
    tags: ["FastAPI", "React Native", "LLM", "Multi-tenant"],
    current: true,
  },
  { id: "cefet", tags: ["Information Systems"], current: true },
  {
    id: "freelance",
    tags: ["Flask", "PostgreSQL", "HealthTech"],
    current: false,
  },
] as const;

/* AI pipeline stages rendered as an animated diagram. */
export type PipelineId = "ingest" | "reason" | "orchestrate" | "ship";

export const PIPELINE: readonly PipelineId[] = [
  "ingest",
  "reason",
  "orchestrate",
  "ship",
] as const;
