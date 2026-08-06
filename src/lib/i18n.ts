import type { ExperienceId, PipelineId, ProjectId, RepoId } from "./site";

export type Locale = "en" | "pt";

const en = {
  nav: {
    about: "About",
    work: "Work",
    ai: "AI",
    open: "Open Source",
    contact: "Contact",
    resume: "Résumé",
  },

  hero: {
    availability: "Available for new projects",
    greeting: "Artur Guerra",
    roles: [
      "Full Stack Developer",
      "Product Builder",
      "Applied AI Engineer",
      "Systems Architect",
    ],
    headlineLead: "I build",
    headlineAccent: "real products",
    headlineTail: "end to end.",
    subtitle:
      "From architecture to deployment — multi-tenant SaaS, healthtech and automation platforms with AI woven into every layer. Not demos. Production.",
    cta: "Explore the work",
    contact: "Get in touch",
    resume: "Download CV",
    scroll: "Scroll",
  },

  about: {
    label: "About",
    title: "Engineering meets product vision",
    lead: "I don't just write code — I ship products.",
    p1: "I'm a Full Stack Developer and Information Systems student at CEFET/RJ, focused on building complete systems that solve real business problems. Currently a Full Stack Development Intern at Visol, working with PHP and Angular, where I integrated the franchise hub with the company's core platform.",
    p2: "Every project I take on is approached with a product mindset: understanding the domain, designing for scale, and shipping features that create real impact. I've built multi-tenant SaaS platforms, healthcare systems, sports management tools, and gaming platforms — all from scratch.",
    p3: "What sets me apart is the practical integration of AI into real systems: OCR pipelines, multi-provider LLM chains with fallback, intelligent agents, and automated workflows that run in production.",
    stats: [
      { value: "6", suffix: "+", label: "Products shipped" },
      { value: "83", suffix: "k+", label: "Lines in one platform" },
      { value: "5", suffix: "", label: "Industries served" },
      { value: "3", suffix: "", label: "LLM providers in prod" },
    ],
  },

  experience: {
    label: "Trajectory",
    title: "Where I've been building",
    items: {
      visol: {
        role: "Full Stack Development Intern",
        org: "Visol",
        period: "Current",
        description:
          "Building with PHP and Angular on the company's core platform, where I integrated the franchise hub with the main system.",
      },
      founder: {
        role: "Solo Creator & Developer",
        org: "EvoSolar Franquias · Zelo App · Fantasy Picks",
        period: "Ongoing",
        description:
          "Designing, building and operating full SaaS products end to end — architecture, backend, mobile, AI integration and infrastructure.",
      },
      cefet: {
        role: "BSc Information Systems",
        org: "CEFET/RJ",
        period: "In progress",
        description:
          "Systems architecture, databases, distributed computing and software engineering fundamentals.",
      },
      freelance: {
        role: "Freelance Developer",
        org: "Pecci Cuidado Integrado",
        period: "Delivered",
        description:
          "Clinical management platform for an integrated care clinic — deployed and running in production.",
      },
    } satisfies Record<ExperienceId, ExperienceCopy>,
  },

  specialties: {
    label: "Capabilities",
    title: "What I build",
    subtitle:
      "Six disciplines that compound into complete, production-grade products.",
    items: [
      {
        title: "Full Stack Engineering",
        description:
          "End-to-end development with Python, FastAPI, Flask, React, Next.js and TypeScript. From database design to responsive UIs.",
      },
      {
        title: "Systems Architecture",
        description:
          "Multi-tenant SaaS, Clean Architecture, async-first backends, role-based access control and production infrastructure with Docker.",
      },
      {
        title: "Applied AI",
        description:
          "Multi-provider LLM integration (OpenAI, Claude, Gemini) with fallback chains, OCR pipelines and AI-powered data extraction in production systems.",
      },
      {
        title: "Agents & Automation",
        description:
          "Celery-driven background jobs, scheduled tasks, real-time sync pipelines, push notification systems and workflow orchestration.",
      },
      {
        title: "API & Integrations",
        description:
          "Google Ads, Meta Graph API, Firebase, OneSignal, football-data.org, SharePoint, ANVISA — deep third-party integration experience.",
      },
      {
        title: "SaaS & Product",
        description:
          "From MVP to production: multi-tenant architectures, payment flows, analytics dashboards, onboarding systems and retention mechanics.",
      },
    ],
  },

  projects: {
    label: "Selected work",
    title: "Products I've shipped",
    subtitle:
      "Real systems running in production — built solo, from the first migration to the last deploy.",
    stackLabel: "Stack",
    highlightsLabel: "Highlights",
    roleLabel: "Role",
    viewCode: "View code",
    viewLive: "Live site",
    privateRepo: "Private repository",
    items: {
      evosolar: {
        title: "EvoSolar Franquias",
        domain: "Solar Energy · SaaS",
        description:
          "Multi-tenant franchise management platform for solar energy companies. Handles onboarding, KPI tracking, royalty calculations, ad campaigns and internal communication across franchise units.",
        highlights: [
          "34 backend modules with 83k+ lines of code",
          "Google Ads & Meta API integration with OAuth",
          "Google Gemini agents for conversational intelligence",
          "WebSocket real-time chat with SLA tracking",
          "Automated royalty calculations and financial sync",
        ],
        metrics: [
          { value: "34", label: "backend modules" },
          { value: "83k+", label: "lines of code" },
          { value: "2", label: "ad platforms" },
        ],
        role: "Solo Creator & Developer",
      },
      zelo: {
        title: "Zelo App",
        domain: "HealthTech · SaaS",
        description:
          "Medication management platform for families with elderly and chronic patients. Centralizes drug scheduling, caregiver coordination, dose tracking, stock management and adherence analytics.",
        highlights: [
          "Multi-provider AI chain (OpenAI, Claude, Gemini) with automatic fallback",
          "OCR medication extraction enriched with the ANVISA drug catalog",
          "Timezone-aware scheduling for multi-caregiver coordination",
          "38 specialized API endpoints across 15 service domains",
          "LGPD compliance architecture with encryption and audit trails",
        ],
        metrics: [
          { value: "38", label: "API endpoints" },
          { value: "15", label: "service domains" },
          { value: "3", label: "LLM providers" },
        ],
        role: "Solo Creator & Developer",
      },
      fantasy: {
        title: "Fantasy Picks",
        domain: "Sports & Gaming · SaaS",
        description:
          "Fantasy sports platform with survivor-style pick mechanics. Users buy picks to enter real football championships, select teams weekly and compete for prizes based on match results.",
        highlights: [
          "Async-first architecture with asyncpg for high concurrency",
          "Pick lineage tracking with complex business rule validation",
          "football-data.org integration across 12+ leagues",
          "Dual-balance wallet system (picks + prize BRL)",
          "Clean Architecture with repository pattern and service layers",
        ],
        metrics: [
          { value: "12+", label: "leagues covered" },
          { value: "2", label: "wallet balances" },
          { value: "100%", label: "async I/O" },
        ],
        role: "Solo Creator & Developer",
      },
      br1: {
        title: "BR1 Sports Academy",
        domain: "Sports Management",
        description:
          "Sports academy management system handling the complete lifecycle of young athletes — from initial interest through advanced training with multi-role staff coordination.",
        highlights: [
          "Six-level role-based access (admin, coach, doctor, psychologist, trainer)",
          "Automated PDF generation and merging pipeline for player reports",
          "Bioimpedance integration with advanced body composition metrics",
          "Interested-to-athlete CRM pipeline for prospect management",
          "17k+ lines of production Python",
        ],
        metrics: [
          { value: "6", label: "role levels" },
          { value: "17k+", label: "lines of Python" },
          { value: "auto", label: "PDF reports" },
        ],
        role: "Solo Creator & Developer",
      },
      cesh: {
        title: "Cesh",
        domain: "Education · Social Platform",
        description:
          "Academic social network for CEFET students. Centralizes institutional data (schedules, grades, directory) into a modern platform with social features and intelligent portal synchronization.",
        highlights: [
          "Zero-credential portal sync via browser extension and userscript",
          "GitHub Copilot Chat integration with OAuth Device Flow",
          "Adaptive CSS/XPath selectors that auto-recalibrate on portal changes",
          "Privacy-first architecture with granular data revocation",
          "190+ PHP files with PSR-4 namespace structure",
        ],
        metrics: [
          { value: "190+", label: "PHP files" },
          { value: "0", label: "credentials stored" },
          { value: "PSR-4", label: "namespacing" },
        ],
        role: "Solo Creator & Developer",
      },
      pecci: {
        title: "Pecci Cuidado Integrado",
        domain: "HealthTech · Clinic Management",
        description:
          "Clinical management platform for healthcare professionals. Enables data storage, appointment management and patient evolution tracking for an integrated care clinic.",
        highlights: [
          "Full appointment and patient evolution management",
          "Professional-focused data management interface",
          "Deployed and running in production",
        ],
        metrics: [{ value: "live", label: "in production" }],
        role: "Freelance Developer",
      },
    } satisfies Record<ProjectId, ProjectCopy>,
  },

  openSource: {
    label: "Open Source",
    title: "Code in the open",
    subtitle:
      "Tooling, experiments and reference architectures I keep public on GitHub.",
    cta: "See all repositories",
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
        description:
          "URL shortener with an AI layer for smart slugs and link intelligence.",
      },
      nestClean: {
        description:
          "Reference implementation of Clean Architecture in NestJS — layered, testable, framework-agnostic.",
      },
      erpSystem: {
        description:
          "ERP foundation covering core business entities, inventory and operational flows.",
      },
      zeloDocs: {
        description:
          "Public product and API documentation for the Zelo healthtech platform.",
      },
    } satisfies Record<RepoId, RepoCopy>,
  },

  aiSection: {
    label: "AI & Automation",
    title: "AI that ships in production",
    subtitle:
      "I integrate AI where it creates real value — not as a buzzword, but as a core system capability.",
    pipelineLabel: "How it runs",
    pipeline: {
      ingest: {
        title: "Ingest",
        description:
          "OCR, third-party APIs and portal scraping normalized into typed domain models.",
      },
      reason: {
        title: "Reason",
        description:
          "Multi-provider LLM chain with automatic fallback, token accounting and prompt caching.",
      },
      orchestrate: {
        title: "Orchestrate",
        description:
          "Celery workers, schedules and circuit breakers turning model output into business actions.",
      },
      ship: {
        title: "Ship",
        description:
          "Streamed responses, push notifications and dashboards — observable and rate-limited.",
      },
    } satisfies Record<PipelineId, PipelineCopy>,
    capabilities: [
      {
        title: "Multi-Provider LLM Chains",
        description:
          "Production systems with OpenAI, Claude and Gemini featuring automatic fallback, token tracking and prompt caching for reliability and cost control.",
      },
      {
        title: "OCR & Document Intelligence",
        description:
          "Computer vision pipelines that extract structured data from medication labels, enriched with ANVISA catalog matching for validation.",
      },
      {
        title: "Conversational Agents",
        description:
          "Gemini-powered agents with tool use, stream-based responses and circuit breaker patterns for graceful degradation.",
      },
      {
        title: "Intelligent Automation",
        description:
          "Celery workflows: ad metrics sync every 30 minutes, SLA breach detection every 5 minutes, nightly royalty calculations and CRM sync.",
      },
      {
        title: "AI-Assisted Development",
        description:
          "GitHub Copilot Chat integration via OAuth with context-aware prompt building, conversation persistence and rate-limited access.",
      },
      {
        title: "Image Generation",
        description:
          "fal.ai integration for on-demand image generation inside SaaS platforms, as part of real business workflows.",
      },
    ],
  },

  impact: {
    label: "Impact",
    title: "Domains I've built for",
    items: [
      {
        title: "HealthTech",
        description:
          "Medication management with AI-powered OCR, clinic management systems and LGPD-compliant patient data architecture.",
      },
      {
        title: "Solar Energy",
        description:
          "Multi-tenant franchise management with automated royalty calculations, ad campaign orchestration and financial sync.",
      },
      {
        title: "Sports & Gaming",
        description:
          "Fantasy sports SaaS with real-time match integration, and academy management with multi-role athlete tracking.",
      },
      {
        title: "Education",
        description:
          "Academic social platform with intelligent portal synchronization, AI chat integration and privacy-first data architecture.",
      },
      {
        title: "Enterprise SaaS",
        description:
          "Production multi-tenant platforms with role-based access, real-time communication and automated business workflows.",
      },
    ],
  },

  contact: {
    label: "Contact",
    title: "Let's build something together",
    subtitle:
      "Open to new projects, opportunities and collaborations — whether you need a full product built from scratch or AI integrated into systems you already run.",
    email: "arturpvguerra@gmail.com",
    cta: "Send me an email",
    copy: "Copy address",
    copied: "Copied",
    github: "GitHub",
    linkedin: "LinkedIn",
    resume: "Download CV",
  },

  footer: {
    built: "Built with Next.js, TypeScript, Tailwind & WebGL",
    rights: "All rights reserved.",
    backToTop: "Back to top",
    company:
      "Artur Guerra Desenvolvimento de Software LTDA · CNPJ 67.557.039/0001-85 · Brazil",
  },
};

/* ------------------------------------------------------------------ */
/* Shape helpers                                                       */
/* ------------------------------------------------------------------ */

interface ExperienceCopy {
  role: string;
  org: string;
  period: string;
  description: string;
}

interface ProjectCopy {
  title: string;
  domain: string;
  description: string;
  highlights: string[];
  metrics: { value: string; label: string }[];
  role: string;
}

interface RepoCopy {
  description: string;
}

interface PipelineCopy {
  title: string;
  description: string;
}

export type Translations = typeof en;

/* ------------------------------------------------------------------ */
/* Português                                                           */
/* ------------------------------------------------------------------ */

const pt: Translations = {
  nav: {
    about: "Sobre",
    work: "Projetos",
    ai: "IA",
    open: "Open Source",
    contact: "Contato",
    resume: "Currículo",
  },

  hero: {
    availability: "Disponível para novos projetos",
    greeting: "Artur Guerra",
    roles: [
      "Desenvolvedor Full Stack",
      "Product Builder",
      "Engenheiro de IA Aplicada",
      "Arquiteto de Sistemas",
    ],
    headlineLead: "Eu construo",
    headlineAccent: "produtos reais",
    headlineTail: "de ponta a ponta.",
    subtitle:
      "Da arquitetura ao deploy — SaaS multi-tenant, healthtech e plataformas de automação com IA integrada em cada camada. Não são demos. É produção.",
    cta: "Ver os projetos",
    contact: "Falar comigo",
    resume: "Baixar CV",
    scroll: "Rolar",
  },

  about: {
    label: "Sobre",
    title: "Engenharia encontra visão de produto",
    lead: "Eu não escrevo só código — eu entrego produtos.",
    p1: "Sou Desenvolvedor Full Stack e estudante de Sistemas de Informação no CEFET/RJ, focado em construir sistemas completos que resolvem problemas reais de negócio. Atualmente sou Estagiário de Desenvolvimento Full Stack na Visol, trabalhando com PHP e Angular, onde integrei o hub de franquias à plataforma principal da empresa.",
    p2: "Cada projeto que assumo é tratado com mentalidade de produto: entender o domínio, projetar para escala e entregar features que geram impacto real. Já construí plataformas SaaS multi-tenant, sistemas de saúde, ferramentas de gestão esportiva e plataformas de gaming — todas do zero.",
    p3: "O que me diferencia é a integração prática de IA em sistemas reais: pipelines de OCR, cadeias de LLM multi-provider com fallback, agentes inteligentes e workflows automatizados rodando em produção.",
    stats: [
      { value: "6", suffix: "+", label: "Produtos entregues" },
      { value: "83", suffix: "k+", label: "Linhas em uma plataforma" },
      { value: "5", suffix: "", label: "Setores atendidos" },
      { value: "3", suffix: "", label: "Provedores de LLM em prod" },
    ],
  },

  experience: {
    label: "Trajetória",
    title: "Onde venho construindo",
    items: {
      visol: {
        role: "Estagiário de Desenvolvimento Full Stack",
        org: "Visol",
        period: "Atual",
        description:
          "Desenvolvimento com PHP e Angular na plataforma principal da empresa, onde integrei o hub de franquias ao sistema central.",
      },
      founder: {
        role: "Criador & Desenvolvedor Solo",
        org: "EvoSolar Franquias · Zelo App · Fantasy Picks",
        period: "Em andamento",
        description:
          "Concepção, construção e operação de produtos SaaS completos — arquitetura, backend, mobile, integração de IA e infraestrutura.",
      },
      cefet: {
        role: "Bacharelado em Sistemas de Informação",
        org: "CEFET/RJ",
        period: "Em curso",
        description:
          "Arquitetura de sistemas, bancos de dados, computação distribuída e fundamentos de engenharia de software.",
      },
      freelance: {
        role: "Desenvolvedor Freelancer",
        org: "Pecci Cuidado Integrado",
        period: "Entregue",
        description:
          "Plataforma de gestão clínica para uma clínica de cuidado integrado — implantada e rodando em produção.",
      },
    },
  },

  specialties: {
    label: "Competências",
    title: "O que eu construo",
    subtitle:
      "Seis disciplinas que se somam em produtos completos e prontos para produção.",
    items: [
      {
        title: "Engenharia Full Stack",
        description:
          "Desenvolvimento ponta a ponta com Python, FastAPI, Flask, React, Next.js e TypeScript. Do design do banco até interfaces responsivas.",
      },
      {
        title: "Arquitetura de Sistemas",
        description:
          "SaaS multi-tenant, Clean Architecture, backends async-first, controle de acesso por roles e infraestrutura de produção com Docker.",
      },
      {
        title: "IA Aplicada",
        description:
          "Integração de LLMs multi-provider (OpenAI, Claude, Gemini) com cadeias de fallback, pipelines de OCR e extração de dados em produção.",
      },
      {
        title: "Agentes & Automação",
        description:
          "Jobs em background com Celery, tarefas agendadas, pipelines de sincronização em tempo real, push notifications e orquestração de workflows.",
      },
      {
        title: "APIs & Integrações",
        description:
          "Google Ads, Meta Graph API, Firebase, OneSignal, football-data.org, SharePoint, ANVISA — experiência profunda em integrações.",
      },
      {
        title: "SaaS & Produto",
        description:
          "Do MVP à produção: arquiteturas multi-tenant, fluxos de pagamento, dashboards de analytics, onboarding e mecânicas de retenção.",
      },
    ],
  },

  projects: {
    label: "Projetos selecionados",
    title: "Produtos que eu entreguei",
    subtitle:
      "Sistemas reais rodando em produção — construídos sozinho, da primeira migration ao último deploy.",
    stackLabel: "Stack",
    highlightsLabel: "Destaques",
    roleLabel: "Papel",
    viewCode: "Ver código",
    viewLive: "Ver site",
    privateRepo: "Repositório privado",
    items: {
      evosolar: {
        title: "EvoSolar Franquias",
        domain: "Energia Solar · SaaS",
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
        role: "Criador & Desenvolvedor Solo",
      },
      zelo: {
        title: "Zelo App",
        domain: "HealthTech · SaaS",
        description:
          "Plataforma de gestão de medicamentos para famílias com idosos e pacientes crônicos. Centraliza agendamento de doses, coordenação de cuidadores, estoque e analytics de adesão.",
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
        role: "Criador & Desenvolvedor Solo",
      },
      fantasy: {
        title: "Fantasy Picks",
        domain: "Esportes & Gaming · SaaS",
        description:
          "Plataforma de fantasy sports com mecânica survivor de picks. Usuários compram picks para entrar em campeonatos reais de futebol, escolhem times toda semana e competem por prêmios.",
        highlights: [
          "Arquitetura async-first com asyncpg para alta concorrência",
          "Rastreamento de linhagem de picks com validação de regras de negócio complexas",
          "Integração football-data.org cobrindo mais de 12 ligas",
          "Sistema de carteira com saldo duplo (picks + prêmios em BRL)",
          "Clean Architecture com repository pattern e camadas de serviço",
        ],
        metrics: [
          { value: "12+", label: "ligas cobertas" },
          { value: "2", label: "saldos na carteira" },
          { value: "100%", label: "I/O assíncrono" },
        ],
        role: "Criador & Desenvolvedor Solo",
      },
      br1: {
        title: "BR1 Sports Academy",
        domain: "Gestão Esportiva",
        description:
          "Sistema de gestão de academia esportiva que cobre todo o ciclo de vida de jovens atletas — do interesse inicial ao treino avançado, com coordenação de equipe multidisciplinar.",
        highlights: [
          "Acesso baseado em seis níveis de papel (admin, técnico, médico, psicólogo, preparador)",
          "Pipeline automatizado de geração e mesclagem de PDFs para relatórios de atletas",
          "Integração de bioimpedância com métricas avançadas de composição corporal",
          "Pipeline de CRM de interessado a atleta para gestão de prospects",
          "Mais de 17 mil linhas de Python em produção",
        ],
        metrics: [
          { value: "6", label: "níveis de acesso" },
          { value: "17k+", label: "linhas de Python" },
          { value: "auto", label: "relatórios em PDF" },
        ],
        role: "Criador & Desenvolvedor Solo",
      },
      cesh: {
        title: "Cesh",
        domain: "Educação · Plataforma Social",
        description:
          "Rede social acadêmica para estudantes do CEFET. Centraliza dados institucionais (horários, notas, diretório) em uma plataforma moderna com recursos sociais e sincronização inteligente do portal.",
        highlights: [
          "Sincronização do portal sem armazenar credenciais, via extensão e userscript",
          "Integração GitHub Copilot Chat com OAuth Device Flow",
          "Seletores CSS/XPath adaptativos que se recalibram quando o portal muda",
          "Arquitetura privacy-first com revogação granular de dados",
          "Mais de 190 arquivos PHP com estrutura de namespaces PSR-4",
        ],
        metrics: [
          { value: "190+", label: "arquivos PHP" },
          { value: "0", label: "credenciais armazenadas" },
          { value: "PSR-4", label: "namespaces" },
        ],
        role: "Criador & Desenvolvedor Solo",
      },
      pecci: {
        title: "Pecci Cuidado Integrado",
        domain: "HealthTech · Gestão Clínica",
        description:
          "Plataforma de gestão clínica para profissionais de saúde. Permite armazenamento de dados, gestão de consultas e acompanhamento da evolução dos pacientes.",
        highlights: [
          "Gestão completa de consultas e evolução de pacientes",
          "Interface de gestão de dados voltada ao profissional",
          "Implantado e rodando em produção",
        ],
        metrics: [{ value: "live", label: "em produção" }],
        role: "Desenvolvedor Freelancer",
      },
    },
  },

  openSource: {
    label: "Open Source",
    title: "Código aberto",
    subtitle:
      "Ferramentas, experimentos e arquiteturas de referência que mantenho públicos no GitHub.",
    cta: "Ver todos os repositórios",
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
          "Implementação de referência de Clean Architecture em NestJS — em camadas, testável e agnóstica de framework.",
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

  aiSection: {
    label: "IA & Automação",
    title: "IA que chega à produção",
    subtitle:
      "Integro IA onde ela gera valor real — não como buzzword, mas como capacidade central do sistema.",
    pipelineLabel: "Como funciona",
    pipeline: {
      ingest: {
        title: "Ingestão",
        description:
          "OCR, APIs de terceiros e sincronização de portais normalizados em modelos de domínio tipados.",
      },
      reason: {
        title: "Raciocínio",
        description:
          "Cadeia de LLMs multi-provider com fallback automático, contagem de tokens e cache de prompts.",
      },
      orchestrate: {
        title: "Orquestração",
        description:
          "Workers Celery, agendamentos e circuit breakers transformando a saída do modelo em ações de negócio.",
      },
      ship: {
        title: "Entrega",
        description:
          "Respostas em streaming, push notifications e dashboards — observáveis e com rate limiting.",
      },
    },
    capabilities: [
      {
        title: "Cadeias de LLM Multi-Provider",
        description:
          "Sistemas em produção com OpenAI, Claude e Gemini, com fallback automático, rastreio de tokens e cache de prompts para confiabilidade e custo.",
      },
      {
        title: "OCR & Inteligência Documental",
        description:
          "Pipelines de visão computacional que extraem dados estruturados de rótulos de medicamentos, validados contra o catálogo da ANVISA.",
      },
      {
        title: "Agentes Conversacionais",
        description:
          "Agentes com Gemini usando ferramentas, respostas em stream e circuit breakers para degradação controlada.",
      },
      {
        title: "Automação Inteligente",
        description:
          "Workflows Celery: sync de métricas de ads a cada 30 minutos, detecção de quebra de SLA a cada 5 minutos, royalties noturnos e sync de CRM.",
      },
      {
        title: "Desenvolvimento Assistido por IA",
        description:
          "Integração GitHub Copilot Chat via OAuth com prompts context-aware, persistência de conversas e controle de acesso com rate limiting.",
      },
      {
        title: "Geração de Imagens",
        description:
          "Integração fal.ai para geração de imagens sob demanda dentro de plataformas SaaS, como parte de workflows de negócio.",
      },
    ],
  },

  impact: {
    label: "Impacto",
    title: "Domínios onde construí",
    items: [
      {
        title: "HealthTech",
        description:
          "Gestão de medicamentos com OCR e IA, sistemas de gestão clínica e arquitetura de dados de pacientes em conformidade com a LGPD.",
      },
      {
        title: "Energia Solar",
        description:
          "Gestão multi-tenant de franquias com cálculo automatizado de royalties, orquestração de campanhas e sincronização financeira.",
      },
      {
        title: "Esportes & Gaming",
        description:
          "SaaS de fantasy sports com integração de partidas em tempo real e gestão de academia com acompanhamento multi-papel de atletas.",
      },
      {
        title: "Educação",
        description:
          "Plataforma social acadêmica com sincronização inteligente de portal, chat com IA e arquitetura privacy-first.",
      },
      {
        title: "SaaS Empresarial",
        description:
          "Plataformas multi-tenant em produção com controle de acesso por papéis, comunicação em tempo real e workflows automatizados.",
      },
    ],
  },

  contact: {
    label: "Contato",
    title: "Vamos construir algo juntos",
    subtitle:
      "Aberto a novos projetos, oportunidades e colaborações — seja para construir um produto completo do zero ou integrar IA aos sistemas que você já opera.",
    email: "arturpvguerra@gmail.com",
    cta: "Me envie um email",
    copy: "Copiar endereço",
    copied: "Copiado",
    github: "GitHub",
    linkedin: "LinkedIn",
    resume: "Baixar CV",
  },

  footer: {
    built: "Construído com Next.js, TypeScript, Tailwind & WebGL",
    rights: "Todos os direitos reservados.",
    backToTop: "Voltar ao topo",
    company:
      "Artur Guerra Desenvolvimento de Software LTDA · CNPJ 67.557.039/0001-85 · Brasil",
  },
};

export const translations: Record<Locale, Translations> = { en, pt };
