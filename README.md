# ehoguerra.github.io — The Line

Personal portfolio of **Artur Guerra**, Full Stack Developer & AI Engineer, and the
public page of Artur Guerra Desenvolvimento de Software LTDA. Built with Next.js 16
(App Router, static export), TypeScript, Tailwind CSS v4, react-three-fiber and Lenis.

## Concept

The page is a production line. One fixed WebGL scene sits behind every chapter, and
scrolling flies the camera down the conveyor while a product is assembled layer by layer
(architecture, data, API & workers, intelligence, interface), passes a quality gate, is
sealed in a case and lands on the pallet with the other shipped products.

- **Scroll-driven camera.** Each section declares `data-cam="<key>"`. `LineScene`
  measures them and blends between keyframes: it dwells at each station and arcs up on
  long moves. The same scroll position sets the product's place on the belt, so
  scrolling back un-builds it.
- **Procedural 3D.** No model files: the conveyor, gantries, product layers, cases and
  labels are three.js primitives plus canvas textures lettered in the self-hosted
  Archivo face.
- **Budgeted.** The scene mounts on idle after first paint, caps and steps down the
  pixel ratio under load, drops shadows on touch devices and stops rendering while
  opaque chapters cover it. Without WebGL (or with Save-Data) the page keeps a painted
  floor line and every piece of content.
- **Reduced motion.** No smooth scroll; the camera cuts between chapters instead of
  flying, and counters land without rolling.
- **Bilingual.** EN / PT-BR, persisted and seeded from the browser language; the CV
  download follows the locale.

`PRODUCT.md` records the product context and `DESIGN.md` the design system.

## Structure

```
src/
├── app/                  layout (font, metadata, JSON-LD, direction contract), globals.css, icon.svg
├── components/
│   ├── three/            LineStage (lazy mount, pause, fallback), LineScene (scene + camera rig)
│   ├── ui/               Odometer (mechanical counter), brand icons
│   └── *.tsx             chapters: Hero, Line, Shipped, TrackRecord, OpenSource, Contact, Navbar, Footer
└── lib/
    ├── i18n.ts           all copy, EN + PT
    ├── site.ts           stations, products, experience, repos, links
    ├── line.ts           geometry and live state shared by the DOM and the scene
    ├── scroll.ts         Lenis smooth scroll
    └── hooks.ts          media-query hooks
```

Copy lives only in `i18n.ts`; links, stacks and ordering live only in `site.ts`. Adding
a product means one entry in `PROJECTS` and its copy in both locales.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm test         # company-identity check
npm run e2e      # static build + Playwright end-to-end suite (HTML report in tests/e2e/report)
npm run build    # static export into ./out
```

## Deployment

`next.config.ts` uses `output: "export"`, so `npm run build` emits a fully static site
into `out/`. The `Deploy to GitHub Pages` workflow builds and publishes that directory on
every push to `main`.
