---
name: Artur Guerra — Spatial Workspace
description: Shipped products running as frosted-glass app windows in a dusk-lit room over the Serra Fluminense; one scroll walks the camera from window to window, dusk to night to dawn.
colors:
  night: "#07080f"
  night-2: "#0d0f1d"
  ember: "#ff8a4c"
  amber: "#ffc477"
  ink: "#f6f3ee"
  ink-2: "#d2cee3"
  ink-3: "#a29dbb"
  glass: "rgba(26, 28, 52, 0.46)"
  glass-strong: "rgba(17, 19, 38, 0.74)"
  glass-edge: "rgba(255, 255, 255, 0.14)"
  glass-rim: "rgba(255, 255, 255, 0.34)"
  window-pane: "rgba(22, 24, 48, 0.72)"
  live: "#5fe3a0"
  vivi: "#ffb547"
  evosolar: "#ff7a3d"
  zelo: "#42dcc0"
  fantasy: "#a2ea6c"
  br1: "#ff6b7a"
  cesh: "#a093ff"
  pecci: "#7cc0ff"
typography:
  display:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 6.1vw, 5.75rem)"
    fontWeight: 760
    lineHeight: 0.94
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 108"
  headline:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 4.3vw, 3.75rem)"
    fontWeight: 740
    lineHeight: 0.98
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 106"
  title:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.625rem, 2.4vw, 2.25rem)"
    fontWeight: 720
    lineHeight: 1.04
    letterSpacing: "-0.022em"
    fontVariation: "'wdth' 104"
  lead:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.3vw, 1.3125rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.62
  label:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 560
    lineHeight: 1.3
    letterSpacing: "0.01em"
  number:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 700
    letterSpacing: "-0.03em"
    fontFeature: "'tnum'"
    fontVariation: "'wdth' 110"
  trace:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontWeight: 400
rounded:
  window: "34px"
  panel: "26px"
  inner: "22px"
  pill: "999px"
spacing:
  gutter: "clamp(1rem, 3.6vw, 2.75rem)"
  header: "4.75rem"
  shell: "1440px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.night}"
    rounded: "{rounded.pill}"
    padding: "0 1.5rem"
    height: "3.125rem"
  button-primary-hover:
    backgroundColor: "#ffffff"
  button-glass:
    backgroundColor: "rgba(255, 255, 255, 0.09)"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 1.5rem"
    height: "3.125rem"
  button-glass-hover:
    backgroundColor: "rgba(255, 255, 255, 0.16)"
  chip:
    backgroundColor: "rgba(255, 255, 255, 0.07)"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.pill}"
    padding: "0 0.8rem"
    height: "1.875rem"
  panel:
    backgroundColor: "{colors.glass}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
  app-window:
    backgroundColor: "{colors.window-pane}"
    textColor: "{colors.ink}"
    rounded: "{rounded.window}"
  nav-capsule:
    backgroundColor: "{colors.glass}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "3.75rem"
---

# Design System: Artur Guerra — Spatial Workspace

## Overview

**Creative North Star: "The Dusk Workspace"**

The portfolio is a room, not a page of project cards. Artur's shipped products run as glass app windows floating at staggered depths over the ridgelines of the Serra Fluminense, and the visitor walks that room by scrolling: the camera stops in front of each product while its chapter is read, cranes up into the night sky for the long reading chapters, and comes back down to the whole workspace at dawn for the close. Every window is a working simulation of the real product (an AI chat failing over between LLM providers, OCR reading a medicine box, a franchise dashboard settling royalties), always tagged as synthetic data.

Light carries the narrative and glass is the only material. The DOM floats over a fixed WebGL stage; copy sits on frosted panels on the left, the camera frames the subject on the right. One family, Mona Sans, carries every voice by moving along its width axis.

**Key Characteristics:**
- A fixed 3D room behind every chapter; chapters declare a camera frame, scrolling flies between them.
- Products shown working, not described: seven live app-window simulations.
- Three lights only: ember dusk, deep night, dawn.
- Frosted glass with a lit top rim as the single surface treatment.
- Warm-white ink and pills; color lives in the sky and inside each product's own window.

## Colors

The palette is the room's light plus one accent per product. Interface chrome is neutral glass and warm white, so the sky and the products are the only sources of color.

### Primary
- **Warm Paper White** (`ink`): every heading, the primary pill's fill, focus outlines. The one solid in the interface.

### Secondary
- **Ember** (`ember`) and **Late Amber** (`amber`): the sun under the ridge. They appear as light, never as fills: the no-WebGL dusk, the text caret, the selection highlight, the primary pill's glow, and amber as the text color of dates in the track record.

### Tertiary
- **Product accents**, one per shipped product: Vivi honey (`vivi`), EvoSolar flare (`evosolar`), Zelo mint (`zelo`), Fantasy pitch-lime (`fantasy`), BR1 coral (`br1`), Cesh lavender (`cesh`), Pecci sky (`pecci`). Each lights its app-icon tile, its in-window highlights and its chapter's bullet dots.
- **Live Green** (`live`): the production lamp and "in production" pills.

### Neutral
- **Night** (`night`, `night-2`): page ground and theme color; the deepest sky.
- **Mist Ink** (`ink-2`, `ink-3`): secondary and tertiary text, tinted violet from the sky so they never read as grey on glass.
- **Glass family** (`glass`, `glass-strong`, `glass-edge`, `glass-rim`, `window-pane`): panel fill, opaque-leaning panel fill, hairline edge, top rim light, app-window pane.

The scene itself interpolates three light states (sky zenith → mid → horizon, plus sun glow and star density): dusk `#070920 → #33276a → #ff8650`, night `#03040b → #101433 → #3a2f6c` with full stars, dawn `#0b1636 → #4c4589 → #ffad78`. Five ridge layers recede from near-black to haze violet as aerial perspective.

**The Three Lights Rule.** The room has exactly three lights, dusk at the hero, night for the reading chapters, dawn at the contact, and scroll blends between them. A new chapter takes one of these phases; it never introduces a fourth light.

**The Own-Window Rule.** A product accent appears only inside that product's window and its chapter. No accent is used for interface chrome, links or section headings.

**The Live Rule.** Live Green means "running in production" and nothing else.

## Typography

**Display Font:** Mona Sans (variable, width axis), with ui-sans-serif fallback
**Body Font:** Mona Sans
**Trace Font:** JetBrains Mono, only for machine traces inside windows (intent and tool-call lines)

One family carries the whole hierarchy. Steps grow wider as they grow larger instead of switching faces, so the display voice is condensed-bold-wide without a second display family.

### Hierarchy
- **Display** (760, clamp 2.75–5.75rem, line-height 0.94, wdth 108): the hero claim only.
- **Headline** (740, clamp 2.1–3.75rem, 0.98, wdth 106): section titles and the closing card.
- **Title** (720, clamp 1.625–2.25rem, 1.04, wdth 104): product names in chapter panels.
- **Lead** (400, clamp 1.125–1.3125rem, 1.5): the paragraph under a display or headline.
- **Body** (400, 1.0625rem, 1.62, 65ch max): product descriptions and discipline text.
- **Label** (560, 0.8125rem, 1.3, +0.01em): metric captions, roles, metadata lines.
- **Number** (700, tabular, wdth 110): every metric; metrics roll in as odometers.

**The Width-Axis Rule.** Hierarchy is expressed through weight and the width axis together (wdth 104 → 110). Never add a second display family for emphasis.

**The Real-Number Rule.** Metrics use tabular numerals and render their real value server-side; the odometer only animates from zero to that value, and a screen reader always gets the final number.

## Layout

A fixed stage (one large-viewport tall) sits behind every chapter; the page scrolls over it. Content lives in a centered shell (max 1440px) with fluid gutters (clamp 1rem–2.75rem). On desktop (≥1024px), copy panels sit on the left (33–38rem wide) and the camera's lens shift pushes the framed windows into the right half. Product chapters are one viewport tall each, so the camera holds on a product while its panel is read.

The camera blends between frames across a window equal to 80% of the viewport, centered on each chapter's top edge; long moves arc upward and back. Reduced motion cuts between frames at the midpoint instead of flying.

**The Open-Half Rule.** On phones the top half of each product chapter stays empty (panels start at 50svh, the hero copy at 42svh) so the chapter's window is seen before its panel slides over it. The camera steps back until the subject fits the width and lifts it into that half.

**The One-Room Rule.** All seven windows live in one continuous space; a chapter changes where the camera stands, never swaps in a new scene.

## Elevation & Depth

Depth is literal: windows are placed in 3D at staggered distances and seen through a 34° lens. Focus is depth of field: windows outside the current chapter drop back with a 3px blur, 62% brightness and 72% opacity. DOM panels float on the same logic: a frosted fill, a 1px lit rim along the top edge and two soft offset shadows below.

### Shadow Vocabulary
- **Panel float** (`0 28px 60px -32px rgba(0,0,0,0.72), 0 8px 22px -14px rgba(0,0,0,0.5)`): chapter panels, the nav capsule.
- **Window drop** (`0 60px 90px -50px rgba(0,0,0,0.75)`): app windows in the room.
- **Rim light** (`inset 0 1px 0 rgba(255,255,255,0.34)`): top edge of every glass surface.
- **Ember glow** (`0 14px 30px -16px rgba(255,196,119,0.55)`): under the primary pill only.

**The Depth-of-Field Rule.** Only the windows the current chapter is about are sharp; everything else steps back. Wide shots (hero, reading chapters, contact) have no focus and nothing dims.

**The Rim-Light Rule.** Glass is lit from above by a single inset highlight; edges stay hairline. Never outline glass with a bright full border or an outer glow.

## Shapes

Corners are generous and concentric: app windows 34px, chapter panels 26px, inner window panels 22px, controls fully round. Every app window has a grabber pill centered under it (112×10px), and the scroll cue reuses the grabber shape, breathing.

**The Concentric Rule.** An inner surface's radius is its container's radius minus the gap between them; nested corners never look parallel-offset.

## Components

### Buttons
- **Shape:** fully round pills, 50px tall (40px in the nav), icons trailing.
- **Primary:** warm-white fill, night text, ember glow beneath; hover lifts to pure white and nudges the arrow 3px.
- **Glass:** 9% white fill with blur, rim highlight and hairline inner edge; hover raises to 16%.
- **Press:** every pill scales to 97.5% on press.

### Chips
- **Style:** 30px round tags, 7% white fill, hairline inner edge, mist ink. Used only for stacks and tools.

### Cards / Containers
- **Chapter panel:** frosted glass (46% night fill, 30px blur), 26px corners, rim light, panel float. One per chapter; never a grid of cards.
- **Metrics row:** hairline rules above and below, three columns of number over label.
- **Manifest:** a folded disclosure inside the panel; the plus icon turns 45° when open.

### Navigation
- **Capsule:** a floating glass pill (60px tall, max 1180px) with the mark, the section links, a segmented EN/PT control and the CV primary pill. The active section is a lit inner pill that slides between items.
- **Phones:** the links collapse into a full-screen frosted sheet with a focus trap; Escape closes it and returns focus to the trigger.

### App Window (signature component)
A visionOS-style pane (window-pane fill, 26px backdrop blur, 34px corners, window drop) with a 104px title row: a 58px app-icon tile lit in the product's accent (radius 31% of its size), the product name (30px/700) over its sector (19px), and on the right a live pill and the "Simulation · synthetic data" tag, which every window carries. Contents are authored at real-app density and play a looping story in beats; a window replays its story from the first beat when its chapter arrives and holds its finished state while dimmed or under reduced motion.

### Odometer and Lamp
Metric digits roll from zero to their value on first view (1.3s, 70ms stagger, exponential ease-out), including digits the reader jumped past. The lamp is an 8px Live Green point in a 3px translucent ring; it never pulses.

## Do's and Don'ts

### Do:
- **Do** show each product working inside its own window, with synthetic data tagged as such, and keep every claim in the panels real.
- **Do** give every new chapter a camera frame and one of the three lights.
- **Do** keep copy on frosted panels over the room, left on desktop and in the lower half on phones.
- **Do** honor reduced motion with camera cuts, finished windows and static counters.
- **Do** keep the page complete without WebGL: the painted dusk and ridges carry it.

### Don't:
- **Don't** lay products out as a grid of cards or screenshots; the room is the layout.
- **Don't** use a product accent outside its own window and chapter.
- **Don't** add a fourth light or a light-mode variant of the room.
- **Don't** outline glass with bright borders or outer glows.
- **Don't** animate anything on load beyond the hero claim and its staggered lines.
- **Don't** use bounce or elastic easing; the system eases out exponentially (`cubic-bezier(0.16, 1, 0.3, 1)`).
