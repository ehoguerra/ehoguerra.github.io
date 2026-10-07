---
name: Artur Guerra — The Line
description: A daylight assembly hall where one scroll runs a product from architecture to shipment; graphite ink and safety yellow on concrete grey.
colors:
  floor: "#e2e3de"
  floor-deep: "#d5d7d1"
  plate: "#f3f4f0"
  plate-edge: "#c9cbc4"
  paper-label: "#fbfbf7"
  ink: "#141517"
  ink-2: "#3f4247"
  ink-3: "#5a5e64"
  rule: "rgba(20, 21, 23, 0.14)"
  rule-strong: "rgba(20, 21, 23, 0.3)"
  signal: "#ffc61a"
  signal-hi: "#ffd54f"
  signal-deep: "#c99400"
  steel: "#1b1d20"
  steel-2: "#26292d"
  steel-ink: "#e9eae5"
  steel-ink-2: "#a9aca6"
  lamp-go: "#1f9d55"
typography:
  display:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 6.3vw, 6rem)"
    fontWeight: 820
    lineHeight: 0.92
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 112"
  headline:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 4.6vw, 4rem)"
    fontWeight: 790
    lineHeight: 0.96
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 110"
  title:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.3vw, 2.125rem)"
    fontWeight: 760
    lineHeight: 1.04
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 108"
  lead:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.35vw, 1.3125rem)"
    fontWeight: 420
    lineHeight: 1.5
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 420
    lineHeight: 1.6
  label:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 660
    lineHeight: 1.1
    letterSpacing: "0.08em"
    fontVariation: "'wdth' 125"
  data-condensed:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 560
    fontVariation: "'wdth' 75"
  counter:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.75rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 112"
rounded:
  label-paper: "3px"
  chip: "4px"
  plate: "6px"
  lamp: "999px"
spacing:
  shell-gutter: "clamp(1rem, 3.6vw, 2.75rem)"
  section-y: "clamp(5.5rem, 11vw, 10rem)"
  header-h: "4.25rem"
components:
  button-signal:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
    height: "3.25rem"
    padding: "0 1.3rem"
  button-signal-hover:
    backgroundColor: "{colors.signal-hi}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
    height: "3.25rem"
    padding: "0 1.3rem"
  button-outline-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.floor}"
  plate:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
    padding: "28px 24px 24px"
  shipping-label:
    backgroundColor: "{colors.paper-label}"
    textColor: "{colors.ink}"
    rounded: "{rounded.label-paper}"
    padding: "20px 20px"
  station-number-tag:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.signal}"
    rounded: "{rounded.chip}"
  tool-chip:
    textColor: "{colors.ink-2}"
    rounded: "{rounded.chip}"
    padding: "4px 8px"
  nav-active-tag:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.ink}"
    rounded: "{rounded.chip}"
    padding: "8px 12px"
  steel-chapter:
    backgroundColor: "{colors.steel}"
    textColor: "{colors.steel-ink}"
  status-lamp:
    backgroundColor: "{colors.lamp-go}"
    rounded: "{rounded.lamp}"
    size: "8px"
---

# Design System: Artur Guerra — The Line

## Overview

**Creative North Star: "The Production Line"**

The site is a daylight assembly hall. One fixed 3D stage sits behind every chapter and the scroll is the factory tour: a product is built station by station (architecture, data, API, AI, interface, tests, ship), then real systems leave the line with their numbers, then the line waits for the next order. The floor is concrete grey, the ink is graphite, and safety yellow is the painted line and the material of anything that must be pressed or noticed. Content is physical: machined alloy plates with screws for what the machine says, white paper shipping labels with heavy black rules for what has shipped.

Density is calm and generous: one idea per full-height chapter, copy on the left half of a wide screen and the 3D line on the right, with the floor colour shared between page and scene fog so the stage dissolves into the page rather than sitting in a box. There is one typeface; hierarchy comes from width, weight and case, not from decoration. The direction refuses the dark glowing-blob developer hero and the card-grid resume (direction contract, `layout.tsx`).

**Key Characteristics:**
- One light theme; no dark mode. Page colour equals 3D floor and fog colour (`#e2e3de`).
- Yellow is a field or material, never ink on a light ground.
- Two surface families: alloy plates (machine side) and paper labels (shipped side).
- Status is shown by physical lamps in bezels, not by glows.
- One scroll-driven camera flight with a dwell at each station.
- Proof is numeric and mechanical: odometer counters, tabular figures.

## Colors

A restrained industrial palette: neutral concrete and graphite carry ~90% of every screen, one safety yellow marks the line, the CTA and active state, and a single green exists only as an "in production" lamp.

### Primary
- **Safety Signal Yellow** (`signal`): the painted floor line, primary button fill, active nav tag, selection highlight, station-number text on ink tiles, belt cue, the 3D hazard stripes and status-active lamp. Hover lifts to Hi-Vis Yellow (`signal-hi`); the button border and inset shadow use Amber Edge (`signal-deep`).

### Neutral
- **Concrete Floor** (`floor`): page background, scrollbar track, 3D floor and fog, theme-color. Pressed/hover areas deepen to Wet Concrete (`floor-deep`).
- **Alloy Plate** (`plate`) with edge **Plate Edge** (`plate-edge`): machined-plate surface (station cards, contact card, HUD), idle lamp fill.
- **Shipping Paper** (`paper-label`): the shipped-product labels only.
- **Graphite Ink** (`ink`): headings, borders of paper labels, outline buttons, focus ring, heavy 2px rules. Body copy steps down to `ink-2`; quiet metadata to `ink-3`.
- **Hairline Rules** (`rule` 14%, `rule-strong` 30% of ink): dividers and chip borders.
- **Steel Chapter** (`steel`, `steel-2`) with text `steel-ink` / `steel-ink-2`: the opaque dark chapters (experience, footer). Hairlines on steel are translucent white (12% and 20%).

### Tertiary
- **Go Lamp Green** (`lamp-go`): "in production" lamp, copied-confirmation check. Nothing else.

### Named Rules
**The Field-Not-Ink Rule.** Yellow is a surface or material (button fill, nav tag, floor line, hazard stripe, belt). On the light ground it is never a text colour. Yellow text is allowed only on ink or steel (station numbers, AG-xx tags, experience periods).

**The Shared Floor Rule.** The page background, the 3D floor and the fog are one colour. Do not introduce a second background tone behind scene-facing copy on wide screens; on narrow screens a floor-coloured wash fades the copy in from the scene.

**The Lamp Rule.** Green means live in production, yellow means the current station, grey means idle. No other status colours exist.

## Typography

**Display / Headline / Body / Label Font:** Archivo (variable, `wdth` axis, with `ui-sans-serif, system-ui` fallback)
**Mono:** the system monospace stack, used only for repository names in the open-source list.

**Character:** One family in three widths. Expanded (wdth 108 to 125) is the nameplate: headings, buttons, labels, counters. Normal (100) is for reading. Condensed (wdth 75) is for dense data: tool chips, stack lines, repo tags.

### Hierarchy
- **Display** (820, `clamp(2.6rem, 6.3vw, 6rem)`, 0.92, wdth 112, -0.035em): the single hero claim.
- **Headline** (790, `clamp(2.1rem, 4.6vw, 4rem)`, 0.96, wdth 110): chapter titles.
- **Title** (760, `clamp(1.5rem, 2.3vw, 2.125rem)`, 1.04, wdth 108): station and product names. Experience roles use 1.5rem / 760 / wdth 112; the mobile menu uses 2rem / 780.
- **Lead** (420, `clamp(1.125rem, 1.35vw, 1.3125rem)`, 1.5, `ink-2`): one-paragraph chapter intros.
- **Body** (420, 1.0625rem, 1.6; `ink-2`, capped at 65ch): reading text.
- **Label / Nameplate** (660, 0.75rem, 0.08em, uppercase, wdth 125): plate captions, nav brand, field names, scroll cue, HUD readout. Buttons share the form at 0.8125rem / 720 / 0.07em / wdth 118.
- **Counter** (800, 2.75rem on stations, 1.75rem on labels, -0.03em / -0.02em, wdth 112, tabular): proof numbers.

### Named Rules
**The Three Widths Rule.** Never add a second family. Change width before you change font: expanded to name, normal to read, condensed to list.

**The Tabular Figures Rule.** Every number that counts or indexes (counters, station 01/07, AG-01, periods) is tabular-nums.

## Layout

A single 1440px shell with a fluid gutter (`clamp(1rem, 3.6vw, 2.75rem)`) holds every chapter. Chapters are either full-viewport stations (`min-h-100svh`, content bottom-anchored on phones and vertically centred from 1024px up) or rhythm sections with `clamp(5.5rem, 11vw, 10rem)` vertical padding. Scene-facing content sits left in a bounded column (hero 40 to 44rem, station plates 29rem, contact plate 36rem, label stack 46rem); the right half stays free for the line. Opaque chapters (experience, open source, footer) use a 12-column grid: title in 4, content in 8, separated by a 2px rule on top. A fixed 4.25rem header carries brand, anchors, language switch and CV; below 1024px it collapses to a full-screen menu sheet that opens by clip-path.

Breakpoint behavior is by 1024px (`lg`): below it the scene runs behind the text and a floor wash backs it; in portrait the camera pulls back and lifts the subject above the copy. The station HUD is desktop only.

## Elevation & Depth

Depth is material, not atmospheric. Plates and labels are the only raised objects and their shadows are soft, low-offset, layered like a part resting on a table: an inset white top highlight, a tight contact shadow, and a long diffuse drop. The signal button adds an inset bottom edge and a warm amber drop; pressing shifts it down 1px. Everything else is flat. Status lamps use a two-ring bezel (`0 0 0 2px plate`, `0 0 0 3px rule-strong`) instead of any glow. In 3D, depth comes from real lighting, fog to the floor colour, and clearcoat on the product layers.

### Shadow Vocabulary
- **Plate** (`inset 0 1px 0 rgba(255,255,255,.75), 0 2px 6px -2px rgba(20,21,23,.12), 0 22px 44px -28px rgba(20,21,23,.42)`): alloy plates.
- **Label** (`0 2px 6px -2px rgba(20,21,23,.14), 0 26px 48px -30px rgba(20,21,23,.5)`): paper labels.
- **Signal button** (`inset 0 1px 0 rgba(255,255,255,.55), inset 0 -2px 0 rgba(0,0,0,.12), 0 12px 26px -14px rgba(150,105,0,.75)`).

### Named Rules
**The Lamp-Not-Glow Rule.** A state is a lamp in a bezel. No blurred coloured halos on UI.

**The Resting-Part Rule.** Shadows are negative-spread and mostly downward; they ground an object, they never float it.

## Shapes

Machined, not soft. Corners are small and consistent: 6px on plates, buttons and the menu toggle; 4px on chips, tags, nav items and icon buttons; 3px on paper labels and their AG tags; fully round only on lamps and the belt cue. Edges are drawn with 1px hairlines on plates, 1.5px on outline buttons and 2px solid ink on labels and list heads. Each plate carries four countersunk screws, one per corner, painted as radial gradients at 9px insets. Cells inside a label are divided by 2px ink rules, never by space alone. Hazard stripes (ink and signal diagonal) belong to the 3D quality gate and gantry, and the yellow belt cue mimics a moving belt.

## Components

### Buttons
- **Shape:** 6px corners, 3.25rem minimum height, expanded uppercase label (0.8125rem, 720, wdth 118), icon arrow that nudges 3px right on hover.
- **Primary (signal):** yellow fill, ink text, Amber Edge border; hover brightens to Hi-Vis Yellow; active presses 1px down.
- **Outline:** 1.5px ink border, ink text; hover inverts to ink fill with floor text. On steel it flips to steel-ink border and text.
- **Compact:** the header CV button is 2.25rem high at 0.75rem. The mobile menu email button drops uppercase to show the address.
- **Focus:** global 2px ink outline, 3px offset; yellow on steel.

### Alloy Plate (signature)
Light alloy, 1px hairline, 6px corners, four screws. Holds a station (title with ink number tile in yellow, body, a hairline, a counter plus its label and source line, condensed tool chips) and the contact card. Plate means the machine is speaking.

### Shipping Label (signature)
Paper stock with a 2px ink border and 3px corners; header (title, sector, ink AG-xx tag in yellow), optional green lamp for production, then fields separated by 2px ink rules: description, equal-width metric cells with odometers (value over its caption), role and stack, a collapsible manifest whose plus rotates 45 degrees, and links underlined with a rule that darkens on hover. Label means a product has shipped.

### Status Lamp
8px circle with a two-ring bezel. Default green (live), yellow (`data-state="active"`), grey (idle). Used in the hero availability line, label headers and the station HUD.

### Station HUD
A fixed plate at bottom-right (desktop): one lamp per station as anchor links, then "01 / 07 · title" in label type. It appears only while a station crosses the middle band.

### Navigation
Floor-coloured header at 95% with a hairline appearing on scroll. Brand is a yellow 14px square plus the nameplate. Items are 0.9375rem / 560; the active item gets a yellow 4px-radius tag that slides between items by spring (instant under reduced motion). Language switch is a 6px-radius segmented control with label-type buttons.

### Odometer
Each digit is a 1em window onto a 0 to 9 strip that rolls in 1.15s on the line ease, staggered 80ms per digit, when the number first scrolls into view. Server render holds the final value; screen readers get the plain number.

### Opaque Chapters
Experience on steel (periods in yellow, translucent-white chips), open-source on floor (monospace repo name, 2px ink top rule, row hover floor-deep at 60%), footer on steel. These carry `data-opaque` and pause the 3D stage while they cover the viewport.

### Motion Grammar
- **Easing:** one curve, `cubic-bezier(0.16, 1, 0.3, 1)`, for entrances, counters, icon nudges, sheet and focus moves.
- **Camera:** one scroll-driven flight through 12 keyframes (hero, line intro, seven stations, shipped, rest, contact). Each chapter holds its frame, then blends across a window of 0.75 viewports centred on the chapter edge using a smootherstep. Long moves arc up and out like a crane shot. The camera damps toward target and takes a small pointer parallax.
- **Entrance:** hero title rises by clip-path (1.1s), the rest fades up 14px staggered 90ms. Nothing else animates on load.
- **Stage:** fixed canvas fades in after its first frame and stops rendering while opaque chapters cover the viewport; a painted floor line is the fallback when WebGL or data-saver prevents it.
- **Reduced motion:** cuts between chapters instead of flying (snap at the midpoint), no pointer parallax, demand-only rendering, no entrance or belt animation, counters show the final value.

## Do's and Don'ts

### Do:
- **Do** use `floor` as the only page background and keep copy left of the 3D line on wide screens.
- **Do** use yellow as a filled field (button, tag, line, stripe) with ink text on top.
- **Do** put machine-side content on alloy plates with four screws, and shipped products on paper labels with 2px ink rules between fields.
- **Do** set names in expanded Archivo, reading text in normal width, lists and stacks in wdth 75.
- **Do** show every state of a thing as a bezelled lamp: green live, yellow current, grey idle.
- **Do** put any new number into an Odometer with tabular figures, and give it a label and source.
- **Do** mark chapters that fully cover the viewport with `data-opaque` so the stage pauses; give scene-facing chapters a `data-cam` key.
- **Do** keep content readable with WebGL off and motion reduced.

### Don't:
- **Don't** set text in yellow on `floor`, `plate` or paper; its contrast belongs to ink and steel grounds only.
- **Don't** add dark mode, a second typeface or a second accent hue; green is a lamp only.
- **Don't** replace a lamp with a coloured glow or blurred halo.
- **Don't** turn plates or labels into a uniform grid of identical cards; a plate is one station, a label is one shipped product.
- **Don't** introduce a hard 2px-offset or other hard-edge drop shadow; plate and label shadows are soft and negative-spread.
- **Don't** fly the camera under reduced motion; cut.
- **Don't** put hazard stripes into the DOM UI; they exist natively at the quality gate and gantry in 3D.

**Not canonized:** the build carries no craft-floor defect (no eyebrow or kicker text, gradient text, glass, or hard offset shadows). The remaining gradients are materials (screws, belt cue, mobile floor wash), and the `.t-plate` uppercase labels are captions on plates, not kickers above headings.
