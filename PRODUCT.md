# Product

<!-- impeccable:product-schema 1 -->

> Inferred, not interviewed: written during an unattended `/goal` run from repository
> evidence (`LINKEDIN.md`, `cv/*.html`, `src/lib/i18n.ts`, `src/lib/site.ts`,
> `src/app/layout.tsx`). Facts marked *(inferred)* still need Artur's confirmation.

## Platform

web

## Users

- **Founders, CTOs and small-business owners** who need a product built end to end
  (contract work through his company). They arrive from LinkedIn, GitHub, a CV link or
  a referral and decide in under a minute whether he can build what they need.
  *(inferred from the site's "Available for new projects" copy)*
- **Recruiters and hiring managers** for full-time or remote roles: Full Stack,
  Backend, AI Engineer, Python, React / React Native (`LINKEDIN.md:49`, `:191`). They
  verify claims, scan shipped work and stack, and download the CV.
- Audience is bilingual: Brazilian (PT-BR) and international (EN).

## Product Purpose

Personal portfolio of Artur Guerra that doubles as the public landing page of his
company, Artur Guerra Desenvolvimento de Software LTDA (CNPJ 67.557.039/0001-85), at
arturguerra.com. Success: a qualified visitor emails him or downloads the CV.

## Positioning

A solo builder who takes real products from architecture to production, with applied AI
running in production (multi-provider LLM chains with fallback, OCR, tool-using agents),
proved by shipped systems with hard numbers rather than demos.

## Operating Context

- Visitors evaluate on a laptop during work hours, or on a phone straight from LinkedIn.
- Static site on GitHub Pages (Next.js `output: "export"`), custom domain.
- CV PDFs exist in EN and PT and swap with the locale.

## Capabilities and Constraints

- Static export only: no server, no form backend. Contact = mailto, copy-email, socials.
- Bilingual EN / PT-BR. All copy lives in `src/lib/i18n.ts`; links, stacks and ordering
  in `src/lib/site.ts`.
- The legal identity (legal name, CNPJ, domain, `"@type": "Organization"` JSON-LD) must
  stay in `layout.tsx`, `Footer.tsx` (`t.company`) and `i18n.ts`; enforced by
  `tests/company-identity.test.mjs`.
- Most products are private repositories with no public screenshots, so the site shows
  each product as an authored simulation with synthetic data. Every simulation stays
  tagged as synthetic; every claim outside the windows stays real.

## Brand Commitments

- Name Artur Guerra; domain arturguerra.com; GitHub `ehoguerra`; LinkedIn
  `artur-guerra-dev`; email arturpvguerra@gmail.com.
- Voice (existing copy): first person, direct, concrete — "Not demos. Production."
- The mark is two stacked app windows over a grabber (nav and favicon), drawn with the
  spatial-workspace design; not a registered logo.

## Evidence on Hand

Numbers are quoted exactly from the sources.

- **Vivi AI** (Visol, in production, vivi.visol.app): Python/FastAPI microservice with
  multi-provider LLM orchestration (OpenAI, Claude, Gemini) and automatic fallback,
  tool-use agent, state-machine onboarding; 1,900+ automated tests (99.9% pass); serves
  the Angular web app and the Ionic mobile app. Source: CV, LINKEDIN.md.
- **Visol security hardening** (PHP core): SQL injection, IDOR, SSRF, HMAC on webhooks,
  CSRF on OAuth, secrets moved to env, CAPTCHA; OWASP-guided. Source: CV, LINKEDIN.md.
- **EvoSolar Franquias**: multi-tenant franchise management SaaS for solar energy, solo
  creator; FastAPI, React, React Native, PostgreSQL, Redis, Celery, Docker; 34 modules /
  83k+ LOC; Google Ads + Meta API over OAuth; Gemini agents; WebSocket chat with SLA;
  automated royalties.
- **Zelo App** (healthtech): medication management for families caring for elderly and
  chronic patients; FastAPI, React Native, Expo, PostgreSQL, Celery; 38 endpoints,
  15 service domains, 3 LLM providers; OCR against the ANVISA catalog; LGPD.
- **Fantasy Picks**: survivor-style fantasy sports; FastAPI, Next.js, TypeScript,
  Tailwind, PostgreSQL; 12+ leagues via football-data.org; dual-balance wallet; asyncpg.
- **BR1 Sports Academy**: sports academy management; Flask, PostgreSQL, Chart.js,
  ReportLab; 6-level RBAC; 17k+ lines of Python; PDF generation and merge; bioimpedance.
- **Cesh**: academic social network for CEFET students; PHP 8.3, Slim 4, MySQL, Docker,
  AWS S3; 190+ PHP files (PSR-4); zero-credential sync via browser extension; Copilot
  Chat via OAuth Device Flow.
- **Pecci Cuidado Integrado**: clinic management for a client, in production; Flask,
  PostgreSQL; freelance.
- **Experience**: Zelo, Founder, 2026–present; Visol, Full Stack Developer, 2025–present
  (intern 2025–Sep 2026, hired Sep 2026; also works with Rust and Redis there);
  Freelance / Independent Full Stack & SaaS Developer, 2024–present; B.Sc. Information
  Systems, CEFET/RJ Nova Friburgo, 2025–2028 (in progress).
- **Open source** (github.com/ehoguerra): kimi-plugin-cc, ultimate-claude-content-gen,
  encurta-ai, nestjs-clean-arch, erp_system, zelo_docs.
- **CV PDFs**: `public/cv/Artur_Guerra_CV_EN.pdf`, `public/cv/Artur_Guerra_CV_PT.pdf`
  (sources in `cv/`).

Absent, never to be fabricated: product screenshots, photos, logos, testimonials, client
names beyond Visol and Pecci, user or revenue metrics, prices.

## Product Principles

1. Proof over adjectives: every claim sits next to a number, a stack or a shipped system.
2. Production, not demos: show systems as they run — layers, flows, architecture.
3. Two doors, one page: a client and a recruiter each reach their action (email / CV)
   within seconds.
4. Bilingual parity: every word exists in EN and PT-BR.
5. Ambition never costs access: content stays readable without WebGL, with reduced
   motion, and on a mid-range phone.

## Accessibility & Inclusion

WCAG 2.2 AA text contrast, full keyboard access, `prefers-reduced-motion` honored (static
scene, native scroll), and no content gated behind WebGL. *(inferred standard)*
