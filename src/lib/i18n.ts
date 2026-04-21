export type Locale = "en" | "pt";

export const translations = {
  en: {
    nav: {
      about: "About",
      specialties: "Specialties",
      projects: "Projects",
      ai: "AI & Automation",
      contact: "Contact",
    },
    hero: {
      greeting: "Hi, I'm",
      name: "Artur Guerra",
      title: "Full Stack Developer & Product Builder",
      subtitle:
        "I build real products end-to-end — from architecture to deployment — with AI, automation, and intelligent integrations woven into every layer.",
      cta: "See my work",
      contact: "Get in touch",
    },
    about: {
      label: "About",
      title: "Engineering meets product vision",
      p1: "I'm a Full Stack Developer and Information Systems student at CEFET/RJ, focused on building complete systems that solve real business problems. Currently a Full Stack Development Intern at Visol, working with PHP and Angular, where I integrated the franchise hub with the company's core platform.",
      p2: "I don't just write code — I build products. Every project I take on is approached with a product mindset: understanding the domain, designing for scale, and shipping features that create real impact. I've built multi-tenant SaaS platforms, healthcare systems, sports management tools, and gaming platforms — all from scratch.",
      p3: "What sets me apart is the practical integration of AI into real systems: OCR pipelines, multi-provider LLM chains with fallback, intelligent agents, and automated workflows that run in production — not demos.",
    },
    specialties: {
      label: "Specialties",
      title: "What I build",
      items: [
        {
          title: "Full Stack Engineering",
          description:
            "End-to-end development with Python, FastAPI, Flask, React, Next.js, and TypeScript. From database design to responsive UIs.",
        },
        {
          title: "Systems Architecture",
          description:
            "Multi-tenant SaaS, Clean Architecture, async-first backends, role-based access control, and production-grade infrastructure with Docker.",
        },
        {
          title: "Applied AI",
          description:
            "Multi-provider LLM integration (OpenAI, Claude, Gemini) with fallback chains, OCR pipelines, and AI-powered data extraction in production systems.",
        },
        {
          title: "Agents & Automation",
          description:
            "Celery-driven background jobs, scheduled tasks, real-time sync pipelines, push notification systems, and intelligent workflow orchestration.",
        },
        {
          title: "API & Integrations",
          description:
            "Google Ads, Meta Graph API, Firebase, OneSignal, football-data.org, SharePoint, ANVISA — deep third-party integration experience.",
        },
        {
          title: "SaaS & Product Development",
          description:
            "From MVP to production: multi-tenant architectures, payment flows, analytics dashboards, onboarding systems, and user retention mechanics.",
        },
      ],
    },
    projects: {
      label: "Projects",
      title: "Featured work",
      viewProject: "View details",
      items: [
        {
          title: "EvoSolar Franquias",
          domain: "Solar Energy · SaaS",
          description:
            "Multi-tenant franchise management platform for solar energy companies. Manages onboarding, KPI tracking, royalty calculations, ad campaigns, and internal communication across franchise units.",
          stack: [
            "FastAPI",
            "React",
            "React Native",
            "PostgreSQL",
            "Redis",
            "Celery",
            "Docker",
          ],
          highlights: [
            "34 backend modules with 83k+ lines of code",
            "Google Ads & Meta API integration with OAuth",
            "Google Gemini AI agents for conversational intelligence",
            "WebSocket real-time chat with SLA tracking",
            "Automated royalty calculations and financial sync",
          ],
          role: "Solo Creator & Developer",
          ai: true,
        },
        {
          title: "Zelo App",
          domain: "HealthTech · SaaS",
          description:
            "Medication management platform for families with elderly and chronic patients. Centralizes drug scheduling, caregiver coordination, dose tracking, stock management, and adherence analytics.",
          stack: [
            "FastAPI",
            "React Native",
            "Expo",
            "PostgreSQL",
            "Redis",
            "Celery",
          ],
          highlights: [
            "Multi-provider AI chain (OpenAI, Claude, Gemini) with automatic fallback",
            "OCR medication extraction enriched with ANVISA drug catalog",
            "Timezone-aware scheduling for multi-caregiver coordination",
            "38 specialized API endpoints across 15 service domains",
            "LGPD compliance architecture with encryption and audit trails",
          ],
          role: "Solo Creator & Developer",
          ai: true,
        },
        {
          title: "Fantasy Picks",
          domain: "Sports & Gaming · SaaS",
          description:
            "Fantasy sports platform with survivor-style pick mechanics. Users purchase picks to enter real football championships, select teams weekly, and compete for prizes based on match results.",
          stack: [
            "FastAPI",
            "Next.js 14",
            "TypeScript",
            "Tailwind",
            "PostgreSQL",
            "Redis",
          ],
          highlights: [
            "Async-first architecture with asyncpg for high concurrency",
            "Pick lineage tracking with complex business rule validation",
            "football-data.org integration for real-time match data across 12+ leagues",
            "Dual-balance wallet system (picks + prize BRL)",
            "Clean Architecture with repository pattern and service layers",
          ],
          role: "Solo Creator & Developer",
          ai: false,
        },
        {
          title: "BR1 Sports Academy",
          domain: "Sports Management",
          description:
            "Comprehensive sports academy management system handling the complete lifecycle of young athletes — from initial interest through advanced training with multi-role staff coordination.",
          stack: [
            "Flask",
            "PostgreSQL",
            "Bootstrap",
            "Chart.js",
            "ReportLab",
          ],
          highlights: [
            "Six-level role-based access (admin, coach, doctor, psychologist, trainer)",
            "Automated PDF generation and merging pipeline for player reports",
            "Bioimpedance integration with advanced body composition metrics",
            "Interested-to-athlete CRM pipeline for prospect management",
            "17k+ lines of production Python",
          ],
          role: "Solo Creator & Developer",
          ai: false,
        },
        {
          title: "Cesh",
          domain: "Education · Social Platform",
          description:
            "Academic social network for CEFET students. Centralizes institutional data (schedules, grades, directory) into a modern platform with social features and intelligent portal synchronization.",
          stack: [
            "PHP 8.3",
            "Slim 4",
            "MySQL",
            "Docker",
            "Flask",
            "AWS S3",
          ],
          highlights: [
            "Zero-credential portal sync via browser extension and userscript",
            "GitHub Copilot Chat integration with OAuth Device Flow",
            "Adaptive CSS/XPath selectors that auto-recalibrate on portal changes",
            "Privacy-first architecture with granular data revocation",
            "190+ PHP files with PSR-4 namespace structure",
          ],
          role: "Solo Creator & Developer",
          ai: true,
        },
        {
          title: "Pecci Cuidado Integrado",
          domain: "HealthTech · Clinic Management",
          description:
            "Clinical management platform for healthcare professionals. Enables data storage, appointment management, and patient evolution tracking for an integrated care clinic.",
          stack: [
            "Flask",
            "PostgreSQL",
            "Bootstrap",
            "JavaScript ES6+",
          ],
          highlights: [
            "Full appointment and patient evolution management",
            "Professional-focused data management interface",
            "Deployed and running in production",
          ],
          role: "Freelance Developer",
          ai: false,
        },
      ],
    },
    aiSection: {
      label: "AI & Automation",
      title: "AI that ships in production",
      subtitle:
        "I integrate AI where it creates real value — not as a buzzword, but as a core system capability that solves actual problems.",
      capabilities: [
        {
          title: "Multi-Provider LLM Chains",
          description:
            "Production systems with OpenAI, Claude, and Gemini integration featuring automatic fallback, token tracking, and prompt caching for reliability and cost optimization.",
        },
        {
          title: "OCR & Document Intelligence",
          description:
            "Computer vision pipelines that extract structured data from medication labels, enriched with ANVISA catalog matching for accuracy validation.",
        },
        {
          title: "Conversational AI Agents",
          description:
            "Google Gemini-powered agents with tool-use capabilities, stream-based responses, and circuit breaker patterns for graceful degradation.",
        },
        {
          title: "Intelligent Automation",
          description:
            "Celery-driven workflows: ad metrics sync every 30 minutes, SLA breach detection every 5 minutes, nightly royalty calculations, and automated CRM synchronization.",
        },
        {
          title: "AI-Assisted Development",
          description:
            "GitHub Copilot Chat integration via OAuth with context-aware prompt building, conversation persistence, and rate-limited access control.",
        },
        {
          title: "Image Generation",
          description:
            "fal.ai integration for on-demand image generation within SaaS platforms, enabling visual content creation as part of business workflows.",
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
            "Medication management with AI-powered OCR, clinic management systems, and LGPD-compliant patient data architecture.",
        },
        {
          title: "Solar Energy",
          description:
            "Multi-tenant franchise management with automated royalty calculations, ad campaign orchestration, and financial sync.",
        },
        {
          title: "Sports & Gaming",
          description:
            "Fantasy sports SaaS with real-time match integration, and academy management with multi-role athlete tracking.",
        },
        {
          title: "Education",
          description:
            "Academic social platform with intelligent portal synchronization, AI chat integration, and privacy-first data architecture.",
        },
        {
          title: "Enterprise SaaS",
          description:
            "Production-grade multi-tenant platforms with role-based access, real-time communication, and automated business workflows.",
        },
      ],
    },
    contact: {
      label: "Contact",
      title: "Let's build something together",
      subtitle:
        "I'm open to new projects, opportunities, and collaborations. Whether you need a full product built from scratch or AI integrated into your existing systems.",
      email: "arturpvguerra@gmail.com",
      cta: "Send me an email",
      github: "GitHub",
      linkedin: "LinkedIn",
    },
    footer: {
      built: "Built with Next.js, TypeScript & Tailwind CSS",
      rights: "All rights reserved.",
    },
  },
  pt: {
    nav: {
      about: "Sobre",
      specialties: "Especialidades",
      projects: "Projetos",
      ai: "IA & Automação",
      contact: "Contato",
    },
    hero: {
      greeting: "Olá, eu sou",
      name: "Artur Guerra",
      title: "Desenvolvedor Full Stack & Product Builder",
      subtitle:
        "Construo produtos reais de ponta a ponta — da arquitetura ao deploy — com IA, automação e integrações inteligentes em cada camada.",
      cta: "Veja meu trabalho",
      contact: "Entre em contato",
    },
    about: {
      label: "Sobre",
      title: "Engenharia encontra visão de produto",
      p1: "Sou Desenvolvedor Full Stack e estudante de Sistemas de Informação no CEFET/RJ, focado em construir sistemas completos que resolvem problemas reais de negócio. Atualmente sou estagiário de Desenvolvimento Full Stack na Visol, trabalhando com PHP e Angular, onde integrei o hub de franquias com a plataforma principal da empresa.",
      p2: "Eu não apenas escrevo código — eu construo produtos. Cada projeto que assumo é abordado com mentalidade de produto: entender o domínio, projetar para escala e entregar funcionalidades que geram impacto real. Já construí plataformas SaaS multi-tenant, sistemas de saúde, ferramentas de gestão esportiva e plataformas de jogos — todos do zero.",
      p3: "O que me diferencia é a integração prática de IA em sistemas reais: pipelines de OCR, cadeias multi-provider de LLM com fallback, agentes inteligentes e workflows automatizados que rodam em produção — não demos.",
    },
    specialties: {
      label: "Especialidades",
      title: "O que eu construo",
      items: [
        {
          title: "Engenharia Full Stack",
          description:
            "Desenvolvimento de ponta a ponta com Python, FastAPI, Flask, React, Next.js e TypeScript. Do design de banco de dados a interfaces responsivas.",
        },
        {
          title: "Arquitetura de Sistemas",
          description:
            "SaaS multi-tenant, Clean Architecture, backends async-first, controle de acesso baseado em roles e infraestrutura de produção com Docker.",
        },
        {
          title: "IA Aplicada",
          description:
            "Integração multi-provider de LLMs (OpenAI, Claude, Gemini) com cadeias de fallback, pipelines de OCR e extração de dados com IA em sistemas de produção.",
        },
        {
          title: "Agentes & Automação",
          description:
            "Jobs em background com Celery, tarefas agendadas, pipelines de sincronização em tempo real, sistemas de push notifications e orquestração inteligente de workflows.",
        },
        {
          title: "APIs & Integrações",
          description:
            "Google Ads, Meta Graph API, Firebase, OneSignal, football-data.org, SharePoint, ANVISA — experiência profunda em integrações de terceiros.",
        },
        {
          title: "SaaS & Desenvolvimento de Produto",
          description:
            "Do MVP à produção: arquiteturas multi-tenant, fluxos de pagamento, dashboards analíticos, sistemas de onboarding e mecânicas de retenção.",
        },
      ],
    },
    projects: {
      label: "Projetos",
      title: "Trabalhos em destaque",
      viewProject: "Ver detalhes",
      items: [
        {
          title: "EvoSolar Franquias",
          domain: "Energia Solar · SaaS",
          description:
            "Plataforma multi-tenant de gestão de franquias para empresas de energia solar. Gerencia onboarding, acompanhamento de KPIs, cálculo de royalties, campanhas de anúncios e comunicação interna entre unidades.",
          stack: [
            "FastAPI",
            "React",
            "React Native",
            "PostgreSQL",
            "Redis",
            "Celery",
            "Docker",
          ],
          highlights: [
            "34 módulos backend com 83k+ linhas de código",
            "Integração Google Ads & Meta API com OAuth",
            "Agentes IA com Google Gemini para inteligência conversacional",
            "Chat em tempo real com WebSocket e rastreamento de SLA",
            "Cálculo automatizado de royalties e sincronização financeira",
          ],
          role: "Criador & Desenvolvedor Solo",
          ai: true,
        },
        {
          title: "Zelo App",
          domain: "HealthTech · SaaS",
          description:
            "Plataforma de gestão de medicamentos para famílias com pacientes idosos e crônicos. Centraliza agendamento, coordenação de cuidadores, rastreamento de doses, gestão de estoque e analytics de adesão.",
          stack: [
            "FastAPI",
            "React Native",
            "Expo",
            "PostgreSQL",
            "Redis",
            "Celery",
          ],
          highlights: [
            "Cadeia multi-provider de IA (OpenAI, Claude, Gemini) com fallback automático",
            "Extração OCR de medicamentos enriquecida com catálogo ANVISA",
            "Agendamento timezone-aware para coordenação multi-cuidador",
            "38 endpoints especializados em 15 domínios de serviço",
            "Arquitetura de conformidade LGPD com criptografia e audit trails",
          ],
          role: "Criador & Desenvolvedor Solo",
          ai: true,
        },
        {
          title: "Fantasy Picks",
          domain: "Esportes & Gaming · SaaS",
          description:
            "Plataforma de fantasy sports com mecânica de eliminação. Usuários compram picks para entrar em campeonatos reais, selecionam times semanalmente e competem por prêmios baseados nos resultados.",
          stack: [
            "FastAPI",
            "Next.js 14",
            "TypeScript",
            "Tailwind",
            "PostgreSQL",
            "Redis",
          ],
          highlights: [
            "Arquitetura async-first com asyncpg para alta concorrência",
            "Rastreamento de linhagem de picks com validação de regras complexas",
            "Integração football-data.org para dados de partidas em tempo real de 12+ ligas",
            "Sistema de carteira dual (picks + prêmios em BRL)",
            "Clean Architecture com padrão repository e camadas de serviço",
          ],
          role: "Criador & Desenvolvedor Solo",
          ai: false,
        },
        {
          title: "BR1 Sports Academy",
          domain: "Gestão Esportiva",
          description:
            "Sistema abrangente de gestão de academia esportiva que lida com o ciclo completo de jovens atletas — do interesse inicial ao treinamento avançado com coordenação de equipe multidisciplinar.",
          stack: [
            "Flask",
            "PostgreSQL",
            "Bootstrap",
            "Chart.js",
            "ReportLab",
          ],
          highlights: [
            "Controle de acesso em seis níveis (admin, técnico, médico, psicólogo, preparador)",
            "Pipeline automatizado de geração e merge de PDFs para relatórios de atletas",
            "Integração de bioimpedância com métricas avançadas de composição corporal",
            "Pipeline CRM de interessado a atleta para gestão de prospectos",
            "17k+ linhas de Python em produção",
          ],
          role: "Criador & Desenvolvedor Solo",
          ai: false,
        },
        {
          title: "Cesh",
          domain: "Educação · Rede Social",
          description:
            "Rede social acadêmica para estudantes do CEFET. Centraliza dados institucionais (horários, notas, diretório) em uma plataforma moderna com funcionalidades sociais e sincronização inteligente com o portal.",
          stack: [
            "PHP 8.3",
            "Slim 4",
            "MySQL",
            "Docker",
            "Flask",
            "AWS S3",
          ],
          highlights: [
            "Sincronização zero-credencial via extensão de navegador e userscript",
            "Integração GitHub Copilot Chat com OAuth Device Flow",
            "Seletores adaptativos CSS/XPath que se recalibram em mudanças do portal",
            "Arquitetura privacy-first com revogação granular de dados",
            "190+ arquivos PHP com estrutura de namespaces PSR-4",
          ],
          role: "Criador & Desenvolvedor Solo",
          ai: true,
        },
        {
          title: "Pecci Cuidado Integrado",
          domain: "HealthTech · Gestão Clínica",
          description:
            "Plataforma de gestão clínica para profissionais de saúde. Permite armazenamento de dados, gerenciamento de consultas e acompanhamento da evolução dos pacientes em uma clínica de cuidado integrado.",
          stack: [
            "Flask",
            "PostgreSQL",
            "Bootstrap",
            "JavaScript ES6+",
          ],
          highlights: [
            "Gestão completa de consultas e evolução de pacientes",
            "Interface focada em profissionais de saúde",
            "Em produção e funcionando",
          ],
          role: "Desenvolvedor Freelance",
          ai: false,
        },
      ],
    },
    aiSection: {
      label: "IA & Automação",
      title: "IA que roda em produção",
      subtitle:
        "Integro IA onde ela gera valor real — não como buzzword, mas como capacidade central do sistema que resolve problemas reais.",
      capabilities: [
        {
          title: "Cadeias Multi-Provider de LLMs",
          description:
            "Sistemas em produção com integração OpenAI, Claude e Gemini com fallback automático, rastreamento de tokens e cache de prompts para confiabilidade e otimização de custo.",
        },
        {
          title: "OCR & Inteligência de Documentos",
          description:
            "Pipelines de visão computacional que extraem dados estruturados de rótulos de medicamentos, enriquecidos com matching do catálogo ANVISA para validação de precisão.",
        },
        {
          title: "Agentes Conversacionais com IA",
          description:
            "Agentes com Google Gemini com capacidades de tool-use, respostas stream-based e padrões circuit breaker para degradação graciosa.",
        },
        {
          title: "Automação Inteligente",
          description:
            "Workflows com Celery: sync de métricas de ads a cada 30min, detecção de violação de SLA a cada 5min, cálculos noturnos de royalties e sincronização automatizada de CRM.",
        },
        {
          title: "Desenvolvimento Assistido por IA",
          description:
            "Integração GitHub Copilot Chat via OAuth com construção de prompts context-aware, persistência de conversas e controle de acesso com rate limiting.",
        },
        {
          title: "Geração de Imagens",
          description:
            "Integração fal.ai para geração de imagens on-demand dentro de plataformas SaaS, habilitando criação de conteúdo visual como parte de workflows de negócio.",
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
            "Gestão de medicamentos com OCR e IA, sistemas de gestão clínica e arquitetura de dados de pacientes em conformidade com LGPD.",
        },
        {
          title: "Energia Solar",
          description:
            "Gestão multi-tenant de franquias com cálculos automatizados de royalties, orquestração de campanhas de ads e sincronização financeira.",
        },
        {
          title: "Esportes & Gaming",
          description:
            "SaaS de fantasy sports com integração de partidas em tempo real, e gestão de academia com rastreamento multi-role de atletas.",
        },
        {
          title: "Educação",
          description:
            "Plataforma social acadêmica com sincronização inteligente de portal, integração de chat com IA e arquitetura privacy-first.",
        },
        {
          title: "SaaS Empresarial",
          description:
            "Plataformas multi-tenant de produção com controle de acesso baseado em roles, comunicação em tempo real e workflows de negócio automatizados.",
        },
      ],
    },
    contact: {
      label: "Contato",
      title: "Vamos construir algo juntos",
      subtitle:
        "Estou aberto a novos projetos, oportunidades e colaborações. Se você precisa de um produto completo construído do zero ou IA integrada aos seus sistemas existentes.",
      email: "arturpvguerra@gmail.com",
      cta: "Me envie um email",
      github: "GitHub",
      linkedin: "LinkedIn",
    },
    footer: {
      built: "Construído com Next.js, TypeScript & Tailwind CSS",
      rights: "Todos os direitos reservados.",
    },
  },
} as const;

export type Translations = (typeof translations)["en"];
