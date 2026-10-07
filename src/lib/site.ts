/**
 * Locale-independent site data: links, stations, products, stacks.
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
/* The line: build stations, in order                                  */
/* ------------------------------------------------------------------ */

export type StationId =
  | "architecture"
  | "data"
  | "api"
  | "intelligence"
  | "interface"
  | "quality"
  | "ship";

export interface StationMeta {
  readonly id: StationId;
  readonly tools: readonly string[];
}

export const STATIONS: readonly StationMeta[] = [
  {
    id: "architecture",
    tools: ["Clean Architecture", "Multi-tenant SaaS", "RBAC", "Domain modelling"],
  },
  { id: "data", tools: ["PostgreSQL", "Redis", "MySQL", "SQLAlchemy", "asyncpg"] },
  { id: "api", tools: ["FastAPI", "Celery", "WebSockets", "Flask", "PHP 8.3 · Slim"] },
  {
    id: "intelligence",
    tools: ["OpenAI", "Claude", "Gemini", "Tool-use agents", "OCR", "Prompt caching"],
  },
  {
    id: "interface",
    tools: ["React", "Next.js", "TypeScript", "React Native", "Expo", "Angular", "Ionic"],
  },
  { id: "quality", tools: ["Test suites", "GitHub Actions", "OWASP", "HMAC", "Tenacity"] },
  { id: "ship", tools: ["Docker", "GitHub Actions", "AWS", "Oracle Cloud", "Cloudflare"] },
] as const;

/* ------------------------------------------------------------------ */
/* Shipped products                                                    */
/* ------------------------------------------------------------------ */

export type ProjectId =
  | "vivi"
  | "evosolar"
  | "zelo"
  | "fantasy"
  | "br1"
  | "cesh"
  | "pecci";

export interface ProjectMeta {
  readonly id: ProjectId;
  /** Only set when a source says it runs in production. */
  readonly production: boolean;
  readonly live: string | null;
  /** Public repository or docs, when one exists. */
  readonly repo: string | null;
  readonly stack: readonly string[];
}

/** Order matches the pallet in the 3D scene: index 0 is the case on top. */
export const PROJECTS: readonly ProjectMeta[] = [
  {
    id: "vivi",
    production: true,
    live: "https://vivi.visol.app",
    repo: null,
    stack: ["Python", "FastAPI", "OpenAI", "Claude", "Gemini", "Tenacity", "GitHub Actions"],
  },
  {
    id: "evosolar",
    production: false,
    live: null,
    repo: null,
    stack: ["FastAPI", "React", "React Native", "PostgreSQL", "Redis", "Celery", "Docker"],
  },
  {
    id: "zelo",
    production: false,
    live: null,
    repo: "https://github.com/ehoguerra/zelo_docs",
    stack: ["FastAPI", "React Native", "Expo", "PostgreSQL", "Redis", "Celery"],
  },
  {
    id: "fantasy",
    production: false,
    live: null,
    repo: null,
    stack: ["FastAPI", "Next.js", "TypeScript", "Tailwind", "PostgreSQL", "Redis"],
  },
  {
    id: "br1",
    production: false,
    live: null,
    repo: null,
    stack: ["Flask", "PostgreSQL", "Bootstrap", "Chart.js", "ReportLab"],
  },
  {
    id: "cesh",
    production: false,
    live: null,
    repo: null,
    stack: ["PHP 8.3", "Slim 4", "MySQL", "Docker", "AWS S3"],
  },
  {
    id: "pecci",
    production: true,
    live: null,
    repo: null,
    stack: ["Flask", "PostgreSQL", "Bootstrap", "JavaScript"],
  },
] as const;

/* ------------------------------------------------------------------ */
/* Track record                                                        */
/* ------------------------------------------------------------------ */

export type ExperienceId = "visol" | "freelance" | "cefet";

export interface ExperienceMeta {
  readonly id: ExperienceId;
  readonly tags: readonly string[];
}

export const EXPERIENCE: readonly ExperienceMeta[] = [
  { id: "visol", tags: ["Python", "FastAPI", "LLMs", "PHP", "Angular", "Ionic"] },
  {
    id: "freelance",
    tags: ["FastAPI", "React", "React Native", "PostgreSQL", "Multi-tenant"],
  },
  { id: "cefet", tags: ["Information Systems"] },
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
