# ehoguerra.github.io — Portfolio V2

Personal portfolio of **Artur Guerra** — Full Stack Developer & Product Builder.
Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Framer Motion
and a hand-written WebGL layer on react-three-fiber.

## Highlights

- **WebGL hero** — a displaced icosahedron driven by a custom simplex-noise
  vertex shader with an iridescent fresnel fragment shader, an additive
  wireframe shell and a 520-point starfield. Lazy-mounted on idle, paused when
  scrolled out of view, and skipped entirely on phones and low-core devices in
  favour of a pure-CSS aurora.
- **3D interaction** — perspective tilt cards with cursor-tracked spotlight and
  specular sheen, magnetic buttons, layered project cover art in real 3D
  transforms.
- **Motion system** — scroll-linked parallax, staggered blur reveals, line-wipe
  headlines, scroll-progress rail, scramble nav labels, animated counters and an
  intro curtain. Everything degrades under `prefers-reduced-motion`.
- **Bilingual** — full EN/PT-BR content, persisted in `localStorage` and seeded
  from the browser language; swaps the downloadable CV with the locale.
- **SEO** — Open Graph, Twitter card and `Person` JSON-LD.

## Structure

```
src/
├── app/                  layout (fonts, metadata, JSON-LD), globals.css tokens
├── components/
│   ├── three/            HeroCanvas (shaders + scene), HeroStage (lazy mount)
│   ├── ui/               TiltCard, Magnetic, Reveal, TextFX, Marquee, Cursor…
│   └── *.tsx             page sections
└── lib/
    ├── i18n.ts           all copy, EN + PT, keyed by the ids in site.ts
    └── site.ts           locale-independent data: links, projects, repos, stack
```

Copy lives only in `i18n.ts`; URLs, stack lists and ordering live only in
`site.ts`. Adding a project means adding one entry to `PROJECTS` and its copy to
both locales.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build    # static export into ./out
```

## Deployment

`next.config.ts` uses `output: "export"`, so `npm run build` emits a fully static
site into `out/`. The `Deploy to GitHub Pages` workflow builds and publishes that
directory on every push to `main`.
