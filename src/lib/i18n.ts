import type { Sims } from "@/components/windows";
import type { DisciplineId, ExperienceId, ProjectId, RepoId } from "./site";

export type Locale = "en" | "pt";

const en = {
  meta: {
    skip: "Skip to content",
    home: "Artur Guerra, back to top",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
  },

  nav: {
    work: "Work",
    build: "How I build",
    record: "Experience",
    open: "Open source",
    contact: "Contact",
    cv: "CV",
  },

  hero: {
    title: "I build real products end to end.",
    lead: "Full stack developer and AI engineer. Multi-tenant SaaS, healthtech and LLM systems, from the first architecture sketch to the deploy, with AI wired into every layer. Not demos. Production.",
    primary: "Start a project",
    secondary: "Download CV",
    status: "Available for new projects",
    place: "Nova Friburgo, Brazil · remote",
    scroll: "Scroll to walk the workspace",
  },

  build: {
    title: "How I build",
    lead: "Seven disciplines, one builder, nothing handed off. Every one of them has shipped in a product above.",
    tools: "Tools",
    items: {
      architecture: {
        title: "Architecture",
        body: "Every build starts with the domain, not the framework. I map the business into modules, tenants and permissions, then set the boundaries that keep a codebase changeable past 80,000 lines.",
        proof: {
          value: "34",
          label: "modules in one multi-tenant platform",
          source: "EvoSolar Franquias · 83k+ lines",
        },
      },
      data: {
        title: "Data",
        body: "PostgreSQL as the source of truth, Redis where speed matters, and access rules designed into the model from the first migration, so permissions never become an afterthought.",
        proof: {
          value: "6",
          label: "role levels, from admin to doctor and coach",
          source: "BR1 Sports Academy",
        },
      },
      api: {
        title: "API & workers",
        body: "Async FastAPI services, plus background workers that keep going when nobody is watching: schedules, retries, webhooks and real-time chat.",
        proof: {
          value: "38",
          label: "API endpoints across 15 service domains",
          source: "Zelo App",
        },
      },
      intelligence: {
        title: "Intelligence",
        body: "AI wired in as a system component, not bolted on as a demo: multi-provider LLM chains with automatic fallback, OCR pipelines and agents that call real tools.",
        proof: {
          value: "3",
          label: "LLM providers in production, with automatic fallback",
          source: "Vivi AI · Zelo App",
        },
      },
      interface: {
        title: "Interface",
        body: "Web and mobile front ends people use every day: React and Next.js on the web, React Native and Expo on phones, Angular and Ionic where the platform already lives.",
        proof: {
          value: "2",
          label: "client apps served by one AI backend",
          source: "Vivi AI · Angular web and Ionic mobile",
        },
      },
      quality: {
        title: "Quality gate",
        body: "Nothing leaves without passing the gate: automated test suites, CI on every push, retries with backoff, and security reviews against OWASP.",
        proof: {
          value: "1,900+",
          label: "automated tests, 99.9% passing",
          source: "Vivi AI",
        },
      },
      ship: {
        title: "Ship",
        body: "Containerised with Docker and deployed through CI to the cloud. Then the next product starts.",
        proof: {
          value: "7",
          label: "products built and shipped end to end",
          source: "Listed above",
        },
      },
    } satisfies Record<DisciplineId, DisciplineCopy>,
  },

  work: {
    title: "Shipped and running",
    lead: "Seven systems designed, built and shipped, most of them solo, from the first migration to the last deploy. Each window runs a simulation of what its product does.",
    sim: "Simulation · synthetic data",
    more: {
      title: "Also shipped",
      lead: "Three more systems, from a sports academy to a clinic running in production.",
    },
    role: "Role",
    stack: "Stack",
    manifest: "Full manifest",
    production: "Running in production",
    live: "Open the live product",
    docs: "Read the public docs",
    privateCode: "Private codebase",
    items: {
      vivi: {
        title: "Vivi AI",
        sector: "AI assistant · Solar-energy SaaS",
        description:
          "Visol's production conversational assistant. A Python/FastAPI microservice that orchestrates OpenAI, Claude and Gemini with automatic fallback, runs an intent-handling agent with tool use and guides onboarding through a state machine, serving the company's Angular web app and Ionic mobile app.",
        highlights: [
          "Multi-provider LLM orchestration with automatic fallback",
          "Intent-handling agent with tool use and multi-turn memory",
          "State-machine guided onboarding",
          "Retry and backoff with Tenacity, plus a permission layer over Visol's licensing model",
          "CI/CD on GitHub Actions",
        ],
        metrics: [
          { value: "1,900+", label: "automated tests" },
          { value: "99.9%", label: "pass rate" },
          { value: "3", label: "LLM providers" },
        ],
        role: "Designed and built it at Visol",
      },
      evosolar: {
        title: "EvoSolar Franquias",
        sector: "Solar energy · SaaS",
        description:
          "Multi-tenant franchise management platform for solar energy companies. Handles onboarding, KPI tracking, royalty calculations, ad campaigns and internal communication across franchise units.",
        highlights: [
          "34 backend modules with 83k+ lines of code",
          "Google Ads and Meta API integration over OAuth",
          "Google Gemini agents for conversational intelligence",
          "WebSocket real-time chat with SLA tracking",
          "Automated royalty calculations and financial sync",
        ],
        metrics: [
          { value: "34", label: "backend modules" },
          { value: "83k+", label: "lines of code" },
          { value: "2", label: "ad platforms" },
        ],
        role: "Solo creator and developer",
      },
      zelo: {
        title: "Zelo App",
        sector: "Healthtech · SaaS",
        description:
          "Medication management for families caring for elderly and chronic patients. Centralises drug schedules, caregiver coordination, dose tracking, stock and adherence analytics.",
        highlights: [
          "Multi-provider AI chain (OpenAI, Claude, Gemini) with automatic fallback",
          "OCR medication extraction enriched with the ANVISA drug catalogue",
          "Timezone-aware scheduling for multi-caregiver coordination",
          "38 specialised API endpoints across 15 service domains",
          "LGPD compliance architecture with encryption and audit trails",
        ],
        metrics: [
          { value: "38", label: "API endpoints" },
          { value: "15", label: "service domains" },
          { value: "3", label: "LLM providers" },
        ],
        role: "Solo creator and developer",
      },
      fantasy: {
        title: "Fantasy Picks",
        sector: "Sports & gaming · SaaS",
        description:
          "Fantasy sports with survivor-style pick mechanics. Players buy picks to enter real football championships, choose teams each round and compete for prizes on real match results.",
        highlights: [
          "Async-first architecture with asyncpg for high concurrency",
          "Pick lineage tracking with complex business-rule validation",
          "football-data.org integration across 12+ leagues",
          "Dual-balance wallet (picks and prize money in BRL)",
          "Clean Architecture with repositories and service layers",
        ],
        metrics: [
          { value: "12+", label: "leagues covered" },
          { value: "2", label: "wallet balances" },
          { value: "100%", label: "async I/O" },
        ],
        role: "Solo creator and developer",
      },
      br1: {
        title: "BR1 Sports Academy",
        sector: "Sports management",
        description:
          "Academy management for young athletes, covering the whole lifecycle from first interest to advanced training, with coaches, doctors and psychologists working in one system.",
        highlights: [
          "Six-level role-based access (admin, coach, doctor, psychologist, trainer)",
          "Automated PDF generation and merging for player reports",
          "Bioimpedance integration with body-composition metrics",
          "Prospect-to-athlete CRM pipeline",
          "17k+ lines of production Python",
        ],
        metrics: [
          { value: "6", label: "role levels" },
          { value: "17k+", label: "lines of Python" },
        ],
        role: "Solo creator and developer",
      },
      cesh: {
        title: "Cesh",
        sector: "Education · Social platform",
        description:
          "Academic social network for CEFET students. Pulls institutional data (schedules, grades, directory) into a modern platform with social features and automatic portal sync.",
        highlights: [
          "Zero-credential portal sync through a browser extension and userscript",
          "GitHub Copilot Chat integration over OAuth Device Flow",
          "Adaptive CSS/XPath selectors that recalibrate when the portal changes",
          "Privacy-first architecture with granular data revocation",
          "190+ PHP files in a PSR-4 namespace structure",
        ],
        metrics: [
          { value: "190+", label: "PHP files" },
          { value: "0", label: "credentials stored" },
        ],
        role: "Solo creator and developer",
      },
      pecci: {
        title: "Pecci Cuidado Integrado",
        sector: "Healthtech · Clinic management",
        description:
          "Clinical management for an integrated care clinic: appointments, patient records and evolution tracking for the professionals who use it every day.",
        highlights: [
          "Appointment and patient-evolution management",
          "Interface designed around the clinic's professionals",
          "Deployed and running in production",
        ],
        metrics: [],
        role: "Freelance developer, for a client",
      },
    } satisfies Record<ProjectId, ProjectCopy>,
  },

  record: {
    title: "Track record",
    lead: "Now: founder of Zelo, full stack developer at Visol and Information Systems student at CEFET/RJ.",
    now: "now",
    items: {
      zelo: {
        period: "2026 – now",
        role: "Founder",
        org: "Zelo · medication-care healthtech",
        body: "Founded Zelo and build the product end to end: a FastAPI backend with 38 endpoints across 15 service domains, a React Native app on Expo, OCR that reads medicine boxes against the ANVISA catalogue, a three-provider LLM chain with fallback, and LGPD compliance.",
      },
      visol: {
        period: "2025 – now",
        role: "Full Stack Developer",
        org: "Visol · solar-energy SaaS and CRM",
        phases: "Intern from 2025 to Sep 2026, hired in Sep 2026",
        body: "Designed and shipped Vivi AI, the company's production assistant. Led the OWASP security hardening of the PHP core (SQL injection, IDOR, SSRF, webhook HMAC, OAuth CSRF) and integrated the franchise hub across the Angular CRM and the Ionic app. Day to day I also work with Rust and Redis.",
      },
      freelance: {
        period: "2024 – now",
        role: "Full Stack & SaaS Developer",
        org: "Freelance and independent products",
        body: "Solo-built multi-tenant SaaS across healthtech, solar energy, sports and education: architecture, backend, web, mobile, deploy and integrations with Google Ads, Meta Graph API, Firebase, OneSignal and ANVISA. Delivered Pecci Cuidado Integrado to a clinic, in production.",
      },
      cefet: {
        period: "2025 – 2028",
        role: "B.Sc. Information Systems",
        org: "CEFET/RJ · Nova Friburgo",
        body: "In progress: systems architecture, databases, distributed computing and software engineering.",
      },
    } satisfies Record<ExperienceId, ExperienceCopy>,
  },

  openSource: {
    title: "Open source",
    lead: "Tooling, experiments and reference architectures I keep in public.",
    cta: "All repositories on GitHub",
    items: {
      kimiPlugin: {
        description:
          "Plugin that wires an alternative model provider into the Claude Code CLI workflow.",
      },
      contentGen: {
        description:
          "LLM-driven content generation pipeline with prompt orchestration and reusable presets.",
      },
      encurtaAi: {
        description: "URL shortener with an AI layer for smart slugs and link intelligence.",
      },
      nestClean: {
        description:
          "Reference implementation of Clean Architecture in NestJS: layered, testable, framework-agnostic.",
      },
      erpSystem: {
        description:
          "ERP foundation covering core business entities, inventory and operational flows.",
      },
      zeloDocs: {
        description: "Public product and API documentation for the Zelo healthtech platform.",
      },
    } satisfies Record<RepoId, RepoCopy>,
  },

  contact: {
    title: "Your product could be the next window here.",
    lead: "Open to new projects, full-time roles and collaborations, whether you need a whole product built from scratch or AI wired into systems you already run.",
    primary: "Email me",
    copy: "Copy email address",
    copied: "Email address copied",
    cv: "Download CV",
  },

  sims: {
    vivi: {
      sub: "Visol · AI assistant",
      live: "In production",
      question: "How much did plant #2187 generate in September?",
      intent: "generation_report",
      tool: "get_generation(plant=2187, month=9)",
      answer: "September: 4,218 kWh, 6% above August. The best day was the 14th.",
      chain: "Model chain",
      trying: "Trying",
      timeout: "Timed out",
      answered: "Answered",
      standby: "Standby",
      fallback: "Automatic fallback",
      latency: "end to end",
      ask: "Ask Vivi",
    },
    zelo: {
      sub: "Medication care",
      reading: "Reading the box",
      read: "Text recognised",
      match: "Matched in the ANVISA catalogue",
      drug: "Losartan potassium 50 mg",
      form: "Coated tablet · oral",
      doses: "Doses",
      daily: "Every day",
      synced: "Caregivers in sync",
    },
    evosolar: {
      fmt: "en-US",
      sub: "Franchise network",
      units: "Units",
      month: "October",
      leads: "Leads",
      contracts: "Contracts",
      royalties: "Royalties",
      auto: "Royalties calculated automatically",
      installed: "kWp installed per month",
      sla: "Support chat SLA",
      onTime: "On time",
    },
    fantasy: {
      fmt: "en-US",
      sub: "Survivor fantasy football",
      round: "Brasileirão · Round 28",
      pick: "Your pick",
      live: "Live",
      ft: "Full time",
      survived: "Survived",
      alive: "Players still in",
      wallet: "Wallet",
      picks: "Picks",
      prize: "Prize balance",
    },
    br1: {
      sub: "Academy management",
      athleteMeta: "U-15 · Midfielder",
      bio: "Bioimpedance",
      lean: "Lean mass",
      leanValue: "41.2 kg",
      fat: "Body fat",
      fatValue: "13.8%",
      hydration: "Hydration",
      hydrationValue: "62%",
      who: "Who sees this",
      coach: "Coach",
      doctor: "Doctor",
      psychologist: "Psychologist",
      trainer: "Trainer",
      granted: "Access",
      report: "Athlete report",
      generating: "Merging sections…",
      ready: "3 pages merged · PDF ready",
      sections: ["Profile", "Body composition", "Evaluation"],
    },
    cesh: {
      sub: "Academic social network",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      calc: "Calc II",
      databases: "Databases",
      networks: "Networks",
      physics: "Physics II",
      syncing: "Syncing with the portal…",
      synced: "Synced by the browser extension · no password stored",
      deviceStep: "Authorize on github.com",
      authorized: "Authorized",
      question: "Explain question 3 of the list",
      answer: "Question 3 uses integration by parts. Choose u and dv, then apply uv minus the integral of v du.",
    },
    pecci: {
      sub: "Integrated-care clinic",
      live: "In production",
      physio: "Physiotherapy",
      psych: "Psychology",
      nutrition: "Nutrition",
      speech: "Speech therapy",
      now: "Now",
      selectHint: "Select an appointment",
      evolution: "Evolution note",
      role: "Speech therapist",
      note: "Good tolerance to the new articulation exercises. Clear progress on /r/ in words. Keep the home routine and review in two weeks.",
      saved: "Saved to the record",
      progress: "Progress over sessions",
    },
  } satisfies Sims,

  footer: {
    built: "Designed and built by Artur Guerra with Next.js and Three.js.",
    rights: "All rights reserved.",
    backToTop: "Back to top",
    company:
      "Artur Guerra Desenvolvimento de Software LTDA · CNPJ 67.557.039/0001-85 · Brazil",
  },
};

/* ------------------------------------------------------------------ */
/* Shape helpers                                                       */
/* ------------------------------------------------------------------ */

interface DisciplineCopy {
  title: string;
  body: string;
  proof: { value: string; label: string; source: string };
}

interface ProjectCopy {
  title: string;
  sector: string;
  description: string;
  highlights: string[];
  metrics: { value: string; label: string }[];
  role: string;
}

export interface ExperienceCopy {
  period: string;
  role: string;
  org: string;
  /** How the role changed over time, when it did. */
  phases?: string;
  body: string;
}

interface RepoCopy {
  description: string;
}

export type Translations = typeof en;

/* ------------------------------------------------------------------ */
/* Português                                                           */
/* ------------------------------------------------------------------ */

const pt: Translations = {
  meta: {
    skip: "Pular para o conteúdo",
    home: "Artur Guerra, voltar ao topo",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    language: "Idioma",
  },

  nav: {
    work: "Projetos",
    build: "Como construo",
    record: "Trajetória",
    open: "Open source",
    contact: "Contato",
    cv: "CV",
  },

  hero: {
    title: "Eu construo produtos reais, de ponta a ponta.",
    lead: "Desenvolvedor full stack e engenheiro de IA. SaaS multi-tenant, healthtech e sistemas com LLM, do primeiro rascunho de arquitetura ao deploy, com IA integrada em cada camada. Nada de demo. Produção.",
    primary: "Começar um projeto",
    secondary: "Baixar CV",
    status: "Disponível para novos projetos",
    place: "Nova Friburgo, Brasil · remoto",
    scroll: "Role para percorrer o espaço",
  },

  build: {
    title: "Como eu construo",
    lead: "Sete disciplinas, um construtor, nada terceirizado. Cada uma delas já foi entregue em um dos produtos acima.",
    tools: "Ferramentas",
    items: {
      architecture: {
        title: "Arquitetura",
        body: "Toda construção começa pelo domínio, não pelo framework. Eu mapeio o negócio em módulos, tenants e permissões e defino os limites que mantêm um código alterável além de 80.000 linhas.",
        proof: {
          value: "34",
          label: "módulos em uma única plataforma multi-tenant",
          source: "EvoSolar Franquias · 83k+ linhas",
        },
      },
      data: {
        title: "Dados",
        body: "PostgreSQL como fonte da verdade, Redis onde a velocidade importa e regras de acesso desenhadas no modelo desde a primeira migration, para que permissão nunca vire improviso.",
        proof: {
          value: "6",
          label: "níveis de acesso, de admin a médico e técnico",
          source: "BR1 Sports Academy",
        },
      },
      api: {
        title: "API e workers",
        body: "Serviços FastAPI assíncronos e workers em background que continuam rodando quando ninguém está olhando: agendamentos, retries, webhooks e chat em tempo real.",
        proof: {
          value: "38",
          label: "endpoints de API em 15 domínios de serviço",
          source: "Zelo App",
        },
      },
      intelligence: {
        title: "Inteligência",
        body: "IA integrada como componente do sistema, não como demo colada por cima: cadeias de LLM multi-provider com fallback automático, pipelines de OCR e agentes que chamam ferramentas reais.",
        proof: {
          value: "3",
          label: "provedores de LLM em produção, com fallback automático",
          source: "Vivi AI · Zelo App",
        },
      },
      interface: {
        title: "Interface",
        body: "Front ends web e mobile que as pessoas usam todo dia: React e Next.js na web, React Native e Expo no celular, Angular e Ionic onde a plataforma já vive.",
        proof: {
          value: "2",
          label: "apps cliente atendidos por um único backend de IA",
          source: "Vivi AI · web em Angular e mobile em Ionic",
        },
      },
      quality: {
        title: "Portão de qualidade",
        body: "Nada sai sem passar pelo portão: suítes de testes automatizados, CI a cada push, retries com backoff e revisões de segurança contra o OWASP.",
        proof: {
          value: "1.900+",
          label: "testes automatizados, 99,9% passando",
          source: "Vivi AI",
        },
      },
      ship: {
        title: "Entrega",
        body: "Containerizado com Docker e publicado via CI na nuvem. Depois, começa o próximo produto.",
        proof: {
          value: "7",
          label: "produtos construídos e entregues de ponta a ponta",
          source: "Listados acima",
        },
      },
    },
  },

  work: {
    title: "Entregues e rodando",
    lead: "Sete sistemas projetados, construídos e entregues, a maioria sozinho, da primeira migration ao último deploy. Cada janela roda uma simulação do que o produto faz.",
    sim: "Simulação · dados fictícios",
    more: {
      title: "Também entregues",
      lead: "Mais três sistemas, de uma academia esportiva a uma clínica rodando em produção.",
    },
    role: "Papel",
    stack: "Stack",
    manifest: "Manifesto completo",
    production: "Rodando em produção",
    live: "Abrir o produto no ar",
    docs: "Ler a documentação pública",
    privateCode: "Código privado",
    items: {
      vivi: {
        title: "Vivi AI",
        sector: "Assistente de IA · SaaS de energia solar",
        description:
          "Assistente conversacional em produção da Visol. Um microsserviço Python/FastAPI que orquestra OpenAI, Claude e Gemini com fallback automático, roda um agente de tratamento de intents com tool use e conduz o onboarding por uma máquina de estados, atendendo o app web em Angular e o app mobile em Ionic da empresa.",
        highlights: [
          "Orquestração de LLMs multi-provider com fallback automático",
          "Agente de tratamento de intents com tool use e memória multi-turno",
          "Onboarding guiado por máquina de estados",
          "Retry e backoff com Tenacity, mais uma camada de permissões sobre o modelo de licenciamento da Visol",
          "CI/CD no GitHub Actions",
        ],
        metrics: [
          { value: "1.900+", label: "testes automatizados" },
          { value: "99,9%", label: "taxa de aprovação" },
          { value: "3", label: "provedores de LLM" },
        ],
        role: "Projetei e construí na Visol",
      },
      evosolar: {
        title: "EvoSolar Franquias",
        sector: "Energia solar · SaaS",
        description:
          "Plataforma multi-tenant de gestão de franquias para empresas de energia solar. Cuida de onboarding, KPIs, cálculo de royalties, campanhas de ads e comunicação interna entre as unidades.",
        highlights: [
          "34 módulos de backend com mais de 83 mil linhas de código",
          "Integração com Google Ads e Meta API via OAuth",
          "Agentes Google Gemini para inteligência conversacional",
          "Chat em tempo real via WebSocket com controle de SLA",
          "Cálculo automatizado de royalties e sincronização financeira",
        ],
        metrics: [
          { value: "34", label: "módulos de backend" },
          { value: "83k+", label: "linhas de código" },
          { value: "2", label: "plataformas de ads" },
        ],
        role: "Criador e desenvolvedor solo",
      },
      zelo: {
        title: "Zelo App",
        sector: "Healthtech · SaaS",
        description:
          "Gestão de medicamentos para famílias com idosos e pacientes crônicos. Centraliza agendamento de doses, coordenação de cuidadores, estoque e analytics de adesão.",
        highlights: [
          "Cadeia de IA multi-provider (OpenAI, Claude, Gemini) com fallback automático",
          "Extração de medicamentos por OCR enriquecida com o catálogo da ANVISA",
          "Agendamento com fuso horário para coordenação entre múltiplos cuidadores",
          "38 endpoints especializados distribuídos em 15 domínios de serviço",
          "Arquitetura de conformidade com a LGPD, com criptografia e trilhas de auditoria",
        ],
        metrics: [
          { value: "38", label: "endpoints de API" },
          { value: "15", label: "domínios de serviço" },
          { value: "3", label: "provedores de LLM" },
        ],
        role: "Criador e desenvolvedor solo",
      },
      fantasy: {
        title: "Fantasy Picks",
        sector: "Esportes e gaming · SaaS",
        description:
          "Fantasy sports com mecânica survivor de picks. Usuários compram picks para entrar em campeonatos reais de futebol, escolhem times a cada rodada e competem por prêmios com base em resultados reais.",
        highlights: [
          "Arquitetura async-first com asyncpg para alta concorrência",
          "Rastreamento de linhagem de picks com validação de regras de negócio complexas",
          "Integração football-data.org cobrindo mais de 12 ligas",
          "Carteira com saldo duplo (picks e prêmios em BRL)",
          "Clean Architecture com repository pattern e camadas de serviço",
        ],
        metrics: [
          { value: "12+", label: "ligas cobertas" },
          { value: "2", label: "saldos na carteira" },
          { value: "100%", label: "I/O assíncrono" },
        ],
        role: "Criador e desenvolvedor solo",
      },
      br1: {
        title: "BR1 Sports Academy",
        sector: "Gestão esportiva",
        description:
          "Gestão de academia esportiva para jovens atletas, cobrindo todo o ciclo de vida, do interesse inicial ao treino avançado, com técnicos, médicos e psicólogos trabalhando em um só sistema.",
        highlights: [
          "Acesso baseado em seis níveis de papel (admin, técnico, médico, psicólogo, preparador)",
          "Geração e mesclagem automatizada de PDFs para relatórios de atletas",
          "Integração de bioimpedância com métricas de composição corporal",
          "Pipeline de CRM de interessado a atleta",
          "Mais de 17 mil linhas de Python em produção",
        ],
        metrics: [
          { value: "6", label: "níveis de acesso" },
          { value: "17k+", label: "linhas de Python" },
        ],
        role: "Criador e desenvolvedor solo",
      },
      cesh: {
        title: "Cesh",
        sector: "Educação · Plataforma social",
        description:
          "Rede social acadêmica para estudantes do CEFET. Traz dados institucionais (horários, notas, diretório) para uma plataforma moderna, com recursos sociais e sincronização automática do portal.",
        highlights: [
          "Sincronização do portal sem armazenar credenciais, via extensão de navegador e userscript",
          "Integração GitHub Copilot Chat com OAuth Device Flow",
          "Seletores CSS/XPath adaptativos que se recalibram quando o portal muda",
          "Arquitetura privacy-first com revogação granular de dados",
          "Mais de 190 arquivos PHP com estrutura de namespaces PSR-4",
        ],
        metrics: [
          { value: "190+", label: "arquivos PHP" },
          { value: "0", label: "credenciais armazenadas" },
        ],
        role: "Criador e desenvolvedor solo",
      },
      pecci: {
        title: "Pecci Cuidado Integrado",
        sector: "Healthtech · Gestão clínica",
        description:
          "Gestão clínica para uma clínica de cuidado integrado: consultas, prontuários e acompanhamento da evolução dos pacientes para os profissionais que a usam todos os dias.",
        highlights: [
          "Gestão de consultas e evolução de pacientes",
          "Interface desenhada em torno dos profissionais da clínica",
          "Implantado e rodando em produção",
        ],
        metrics: [],
        role: "Desenvolvedor freelancer, para um cliente",
      },
    },
  },

  record: {
    title: "Trajetória",
    lead: "Hoje: fundador do Zelo, desenvolvedor full stack na Visol e estudante de Sistemas de Informação no CEFET/RJ.",
    now: "hoje",
    items: {
      zelo: {
        period: "2026 – atual",
        role: "Fundador",
        org: "Zelo · healthtech de cuidado com medicamentos",
        body: "Fundei o Zelo e construo o produto de ponta a ponta: backend FastAPI com 38 endpoints em 15 domínios de serviço, app React Native com Expo, OCR que lê caixas de remédio contra o catálogo da ANVISA, cadeia de 3 provedores de LLM com fallback e conformidade com a LGPD.",
      },
      visol: {
        period: "2025 – atual",
        role: "Desenvolvedor Full Stack",
        org: "Visol · SaaS e CRM de energia solar",
        phases: "Estágio de 2025 a set. 2026, efetivado em set. 2026",
        body: "Projetei e entreguei a Vivi AI, o assistente em produção da empresa. Liderei o hardening de segurança OWASP do core PHP (SQL injection, IDOR, SSRF, HMAC de webhook, CSRF em OAuth) e integrei o hub de franquias ao CRM Angular e ao app Ionic. No dia a dia também trabalho com Rust e Redis.",
      },
      freelance: {
        period: "2024 – atual",
        role: "Desenvolvedor Full Stack e SaaS",
        org: "Freelance e produtos independentes",
        body: "Construí sozinho SaaS multi-tenant em healthtech, energia solar, esportes e educação: arquitetura, backend, web, mobile, deploy e integrações com Google Ads, Meta Graph API, Firebase, OneSignal e ANVISA. Entreguei a Pecci Cuidado Integrado a uma clínica, em produção.",
      },
      cefet: {
        period: "2025 – 2028",
        role: "Bacharelado em Sistemas de Informação",
        org: "CEFET/RJ · Nova Friburgo",
        body: "Em curso: arquitetura de sistemas, bancos de dados, computação distribuída e engenharia de software.",
      },
    },
  },

  openSource: {
    title: "Open source",
    lead: "Ferramentas, experimentos e arquiteturas de referência que mantenho públicos.",
    cta: "Todos os repositórios no GitHub",
    items: {
      kimiPlugin: {
        description:
          "Plugin que conecta um provedor de modelo alternativo ao fluxo do Claude Code CLI.",
      },
      contentGen: {
        description:
          "Pipeline de geração de conteúdo com LLM, orquestração de prompts e presets reutilizáveis.",
      },
      encurtaAi: {
        description:
          "Encurtador de URLs com camada de IA para slugs inteligentes e análise de links.",
      },
      nestClean: {
        description:
          "Implementação de referência de Clean Architecture em NestJS: em camadas, testável e agnóstica de framework.",
      },
      erpSystem: {
        description:
          "Base de ERP cobrindo entidades de negócio, estoque e fluxos operacionais.",
      },
      zeloDocs: {
        description:
          "Documentação pública de produto e API da plataforma de healthtech Zelo.",
      },
    },
  },

  contact: {
    title: "O próximo app nesta tela pode ser o seu.",
    lead: "Aberto a novos projetos, vagas full-time e colaborações, seja para construir um produto completo do zero ou integrar IA aos sistemas que você já opera.",
    primary: "Me envie um email",
    copy: "Copiar endereço de email",
    copied: "Endereço de email copiado",
    cv: "Baixar CV",
  },

  sims: {
    vivi: {
      sub: "Visol · assistente de IA",
      live: "Em produção",
      question: "Quanto a usina #2187 gerou em setembro?",
      intent: "generation_report",
      tool: "get_generation(plant=2187, month=9)",
      answer: "Setembro: 4.218 kWh, 6% acima de agosto. O melhor dia foi o 14.",
      chain: "Cadeia de modelos",
      trying: "Tentando",
      timeout: "Tempo esgotado",
      answered: "Respondeu",
      standby: "Reserva",
      fallback: "Fallback automático",
      latency: "de ponta a ponta",
      ask: "Pergunte à Vivi",
    },
    zelo: {
      sub: "Cuidado com medicamentos",
      reading: "Lendo a caixa",
      read: "Texto reconhecido",
      match: "Encontrado no catálogo ANVISA",
      drug: "Losartana potássica 50 mg",
      form: "Comprimido revestido · oral",
      doses: "Doses",
      daily: "Todos os dias",
      synced: "Cuidadores sincronizados",
    },
    evosolar: {
      fmt: "pt-BR",
      sub: "Rede de franquias",
      units: "Unidades",
      month: "Outubro",
      leads: "Leads",
      contracts: "Contratos",
      royalties: "Royalties",
      auto: "Royalties calculados automaticamente",
      installed: "kWp instalados por mês",
      sla: "SLA do chat de suporte",
      onTime: "No prazo",
    },
    fantasy: {
      fmt: "pt-BR",
      sub: "Fantasy survivor de futebol",
      round: "Brasileirão · Rodada 28",
      pick: "Seu pick",
      live: "Ao vivo",
      ft: "Encerrado",
      survived: "Sobreviveu",
      alive: "Jogadores vivos",
      wallet: "Carteira",
      picks: "Picks",
      prize: "Saldo de prêmios",
    },
    br1: {
      sub: "Gestão de academia",
      athleteMeta: "Sub-15 · Meio-campista",
      bio: "Bioimpedância",
      lean: "Massa magra",
      leanValue: "41,2 kg",
      fat: "Gordura corporal",
      fatValue: "13,8%",
      hydration: "Hidratação",
      hydrationValue: "62%",
      who: "Quem vê isto",
      coach: "Treinador",
      doctor: "Médico",
      psychologist: "Psicólogo",
      trainer: "Preparador físico",
      granted: "Acesso",
      report: "Relatório do atleta",
      generating: "Unindo as seções…",
      ready: "3 páginas unidas · PDF pronto",
      sections: ["Perfil", "Composição corporal", "Avaliação"],
    },
    cesh: {
      sub: "Rede social acadêmica",
      days: ["Seg", "Ter", "Qua", "Qui", "Sex"],
      calc: "Cálculo II",
      databases: "Bancos de Dados",
      networks: "Redes",
      physics: "Física II",
      syncing: "Sincronizando com o portal…",
      synced: "Sincronizado pela extensão do navegador · nenhuma senha guardada",
      deviceStep: "Autorize em github.com",
      authorized: "Autorizado",
      question: "Explique a questão 3 da lista",
      answer: "A questão 3 usa integração por partes. Escolha u e dv e aplique uv menos a integral de v du.",
    },
    pecci: {
      sub: "Clínica de cuidado integrado",
      live: "Em produção",
      physio: "Fisioterapia",
      psych: "Psicologia",
      nutrition: "Nutrição",
      speech: "Fonoaudiologia",
      now: "Agora",
      selectHint: "Selecione um atendimento",
      evolution: "Evolução",
      role: "Fonoaudióloga",
      note: "Boa tolerância aos novos exercícios de articulação. Evolução clara do /r/ em palavras. Manter a rotina em casa e revisar em duas semanas.",
      saved: "Salvo no prontuário",
      progress: "Progresso ao longo das sessões",
    },
  },

  footer: {
    built: "Projetado e construído por Artur Guerra com Next.js e Three.js.",
    rights: "Todos os direitos reservados.",
    backToTop: "Voltar ao topo",
    company:
      "Artur Guerra Desenvolvimento de Software LTDA · CNPJ 67.557.039/0001-85 · Brasil",
  },
};

export const translations: Record<Locale, Translations> = { en, pt };
