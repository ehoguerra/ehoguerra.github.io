/**
 * E2E suite for the "spatial workspace" portfolio: one fixed WebGL room (dusk
 * sky + mountain ridges) with seven product app windows rendered as HTML in the
 * 3D scene, and a camera that moves between chapters as the page scrolls.
 * Runs against the static export in ./out (npm run e2e builds first).
 *
 * Failure modes covered, one test each:
 *  1. Page throws: any pageerror or console error during load and a full slow scroll.
 *  2. Room never mounts or renders blank (one sized canvas, screenshot > 20 kB, 7 windows).
 *  3. Scroll does not move the camera (canvas at top differs from canvas at the zelo chapter).
 *  4. Focus does not follow the chapter (dim/undim per top, zelo, more).
 *  5. The chapter's simulation never plays (vivi answer becomes visible at the vivi chapter).
 *  6. Dimmed windows show an empty state (dimmed vivi keeps its finished answer at zelo).
 *  7. Nav anchors do not land on their section (desktop): Work, Contact.
 *  8. Language switch does not apply, persist or restore, or window copy ignores it.
 *  9. CV files missing from the build (EN and PT PDFs).
 * 10. Mobile horizontal overflow at the top and at key sections.
 * 11. Mobile menu: dialog, focus trap, Escape + focus return, anchor navigation.
 * 12. Mobile: the chapter's window hides behind its own panel.
 * 13. Reduced motion: no Lenis, content visible, counters not stuck, room appears with no scroll.
 * 14. No WebGL: no canvas, no page error, all content still rendered.
 * 15. Counters land on real values (1,900+ in EN) after scrolling into view.
 * 16. Counters jumped past (instant jump to #contact) stay at zero.
 * 17. Copy email does not reach the clipboard or is not announced (desktop).
 * 18. Legal identity missing from the footer.
 * 19. Design contract (seed 87648a41) lost in the build output.
 * 20. Project manifest does not expand.
 * 21. External links without rel="noopener".
 * 22. A Portuguese-language browser with no stored choice still gets English.
 * 23. Social card missing or wrong: og:image absent, not a 200 JPEG, or not 1200x630.
 * 24. Track record out of date: Zelo missing or not first as the current role (Founder,
 *     2026 – now); Visol still listed as an internship or without Rust and Redis; the
 *     timeline's "now" ticks misaligned across rows, or a current span with no width.
 * Plus: "evidence" screenshots (hero, vivi, zelo, more, build, contact) per project.
 */
import { expect, test, type Page, type TestInfo } from "@playwright/test";
import { readFileSync } from "node:fs";
import path from "node:path";

const SETTLE = 2500;
/** Multiplies every poll timeout; raise it (E2E_TIME_SCALE=3) on a machine with slow software WebGL. */
const SCALE = Number(process.env.E2E_TIME_SCALE ?? 1);
/** The camera eases for ~1.5 s and focus flips mid-transition: always poll. */
const FOCUS_TIMEOUT = 20_000 * SCALE;
const WINDOWS = ["vivi", "evosolar", "zelo", "fantasy", "br1", "cesh", "pecci"] as const;

const VIVI_ANSWER_EN = "September: 4,218 kWh, 6% above August. The best day was the 14th.";

async function open(page: Page) {
  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
  await page.waitForTimeout(1500);
}

/** Open and wait until the room has mounted its windows, so chapter timings start from a live scene. */
async function openRoom(page: Page) {
  await open(page);
  await expect(page.locator("[data-win]"), "expected 7 product windows mounted").toHaveCount(7, {
    timeout: 60_000 * SCALE,
  });
}

/** Scroll an element to the middle of the viewport. */
async function scrollToMiddle(page: Page, sel: string, wait = 800) {
  await page.evaluate((s) => {
    const el = document.querySelector(s)!;
    const r = el.getBoundingClientRect();
    window.scrollTo(0, window.scrollY + r.top - (innerHeight - Math.min(r.height, innerHeight)) / 2);
  }, sel);
  await page.waitForTimeout(wait);
}

/** Scroll an element's top to the top of the viewport. */
async function scrollToTop(page: Page, sel: string, wait = 800) {
  await page.evaluate((s) => {
    const el = document.querySelector(s)!;
    window.scrollTo(0, window.scrollY + el.getBoundingClientRect().top);
  }, sel);
  await page.waitForTimeout(wait);
}

async function slowScrollToBottom(page: Page) {
  for (let i = 0; i < 400; i++) {
    const atBottom = await page.evaluate(() => {
      window.scrollBy(0, innerHeight * 0.5);
      return window.scrollY + innerHeight >= document.documentElement.scrollHeight - 2;
    });
    if (atBottom) break;
    await page.waitForTimeout(100);
  }
  await page.waitForTimeout(500);
}

async function attachPng(testInfo: TestInfo, name: string, body: Buffer) {
  await testInfo.attach(name, { body, contentType: "image/png" });
}

/** Which windows are dimmed right now, by id. */
async function dimMap(page: Page) {
  return page.evaluate(() =>
    Object.fromEntries(
      [...document.querySelectorAll("[data-win]")].map((w) => [w.getAttribute("data-win")!, w.getAttribute("data-dim") === "true"]),
    ) as Record<string, boolean>,
  );
}

/** Expected dim map when only the given windows are undimmed. */
function onlyUndimmed(ids: readonly string[]) {
  return Object.fromEntries(WINDOWS.map((id) => [id, !ids.includes(id)]));
}

/**
 * Visibility of a piece of text inside a window: the product of computed
 * opacity from the text's element up to (but not including) the [data-win]
 * frame, whose own dim opacity is a separate concern. Hidden simulation steps
 * use opacity 0 on wrapper divs, which Playwright's toBeVisible ignores.
 * Returns -1 when the text is not in the window at all.
 */
async function textOpacity(page: Page, winId: string, text: string) {
  return page.evaluate(
    ([id, needle]) => {
      const win = document.querySelector(`[data-win="${id}"]`);
      if (!win) return -1;
      const walker = document.createTreeWalker(win, NodeFilter.SHOW_TEXT);
      for (let n = walker.nextNode(); n; n = walker.nextNode()) {
        if (!n.nodeValue?.includes(needle)) continue;
        let product = 1;
        for (let el = n.parentElement; el && el !== win; el = el.parentElement) {
          product *= parseFloat(getComputedStyle(el).opacity);
        }
        return product;
      }
      return -1;
    },
    [winId, text] as const,
  );
}

/**
 * Samples textOpacity inside the page every 50 ms and keeps the maximum, so a
 * slow main thread (software WebGL) cannot make the test miss a short-lived beat.
 */
async function trackTextOpacity(page: Page, winId: string, text: string) {
  await page.evaluate(
    ([id, needle]) => {
      const w = window as unknown as { __maxOpacity: number };
      w.__maxOpacity = 0;
      setInterval(() => {
        const win = document.querySelector(`[data-win="${id}"]`);
        if (!win) return;
        const walker = document.createTreeWalker(win, NodeFilter.SHOW_TEXT);
        for (let n = walker.nextNode(); n; n = walker.nextNode()) {
          if (!n.nodeValue?.includes(needle)) continue;
          let product = 1;
          for (let el = n.parentElement; el && el !== win; el = el.parentElement) {
            product *= parseFloat(getComputedStyle(el).opacity);
          }
          w.__maxOpacity = Math.max(w.__maxOpacity, product);
          return;
        }
      }, 50);
    },
    [winId, text] as const,
  );
}

test("1. no page errors or console errors through a full slow scroll", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(`console.error: ${m.text()}`);
  });
  await open(page);
  await slowScrollToBottom(page);
  expect(errors, `Runtime errors during load/scroll:\n${errors.join("\n")}`).toEqual([]);
});

test("2. the room mounts: one sized canvas, non-blank, 7 windows", async ({ page }, testInfo) => {
  await open(page);
  await expect(page.locator("canvas"), "expected exactly one canvas").toHaveCount(1);
  const box = await page.locator("canvas").boundingBox();
  expect(box?.width ?? 0, "canvas width is zero").toBeGreaterThan(0);
  expect(box?.height ?? 0, "canvas height is zero").toBeGreaterThan(0);

  let shot: Buffer = Buffer.alloc(0);
  await expect
    .poll(
      async () => {
        shot = await page.locator("canvas").screenshot();
        return shot.length;
      },
      { message: "canvas screenshot is <= 20 kB: scene is blank or flat", timeout: 30_000 * SCALE },
    )
    .toBeGreaterThan(20_000);
  await attachPng(testInfo, "canvas-top", shot);

  await expect(page.locator("[data-win]"), "expected 7 product windows mounted").toHaveCount(7, {
    timeout: FOCUS_TIMEOUT,
  });
});

test("3. scrolling moves the camera (canvas differs top vs zelo chapter)", async ({ page }, testInfo) => {
  await open(page);
  const top = await page.locator("canvas").screenshot();
  await scrollToMiddle(page, 'article[data-cam="zelo"]', SETTLE);
  const zelo = await page.locator("canvas").screenshot();
  await attachPng(testInfo, "canvas-top", top);
  await attachPng(testInfo, "canvas-zelo", zelo);
  expect(Buffer.compare(top, zelo), "canvas pixels identical: camera did not move with scroll").not.toBe(0);
});

test("4. focus follows the chapter (top, zelo, more)", async ({ page }) => {
  await open(page);
  await expect
    .poll(() => dimMap(page), { message: "top: expected no window dimmed", timeout: FOCUS_TIMEOUT })
    .toEqual(onlyUndimmed(WINDOWS));

  await scrollToMiddle(page, 'article[data-cam="zelo"]', 500);
  await expect
    .poll(() => dimMap(page), { message: "zelo chapter: expected only zelo undimmed", timeout: FOCUS_TIMEOUT })
    .toEqual(onlyUndimmed(["zelo"]));

  await scrollToMiddle(page, 'article[data-cam="more"]', 500);
  await expect
    .poll(() => dimMap(page), {
      message: "more chapter: expected only br1, cesh, pecci undimmed",
      timeout: FOCUS_TIMEOUT,
    })
    .toEqual(onlyUndimmed(["br1", "cesh", "pecci"]));
});

test("5. the chapter's simulation plays (vivi answer becomes visible)", async ({ page }) => {
  await openRoom(page);
  await scrollToMiddle(page, 'article[data-cam="vivi"]', 500);
  // Focus flipping remounts the window and restarts its story; only watch from there on,
  // so a beat left over from the wide shot cannot satisfy the test.
  await expect
    .poll(() => dimMap(page), { message: "vivi chapter: expected only vivi undimmed", timeout: FOCUS_TIMEOUT })
    .toEqual(onlyUndimmed(["vivi"]));
  await trackTextOpacity(page, "vivi", VIVI_ANSWER_EN);
  await expect
    .poll(() => page.evaluate(() => (window as unknown as { __maxOpacity: number }).__maxOpacity), {
      message: "vivi answer never reached opacity-product > 0.9 at its chapter",
      timeout: FOCUS_TIMEOUT,
      intervals: [250],
    })
    .toBeGreaterThan(0.9);
});

test("6. dimmed windows hold their finished state, not an empty one", async ({ page }) => {
  await openRoom(page);
  await scrollToMiddle(page, 'article[data-cam="zelo"]', 500);
  await expect
    .poll(async () => (await dimMap(page)).vivi, { message: "vivi window never dimmed at zelo", timeout: FOCUS_TIMEOUT })
    .toBe(true);
  await expect
    .poll(() => textOpacity(page, "vivi", VIVI_ANSWER_EN), {
      message: "dimmed vivi window shows an empty state: answer opacity-product <= 0.9",
      timeout: FOCUS_TIMEOUT,
      intervals: [250],
    })
    .toBeGreaterThan(0.9);
});

test("7. nav anchors land on their section (desktop)", async ({ page }) => {
  test.skip(test.info().project.name !== "desktop", "header links are desktop only");
  await open(page);
  for (const [label, id] of [
    ["Work", "work"],
    ["Contact", "contact"],
  ] as const) {
    await page.locator("header").getByRole("link", { name: label, exact: true }).click();
    await page.waitForTimeout(1500);
    const box = await page.locator(`#${id}`).boundingBox();
    expect(box, `#${id} not found`).not.toBeNull();
    const y = box!.y;
    // #contact is the last full-height section; it can't scroll above the page end.
    expect(y, `#${id} top at y=${y}`).toBeGreaterThanOrEqual(-10);
    expect(y, `#${id} top at y=${y}`).toBeLessThanOrEqual(200);
  }
});

test("8. language switch applies, persists and restores; window copy follows", async ({ page }) => {
  const PT = "Eu construo produtos reais, de ponta a ponta.";
  const EN = "I build real products end to end.";
  const cv = page.locator("#top a[download]");
  const vivi = page.locator('[data-win="vivi"]');
  await open(page);
  await expect(page.locator("h1")).toHaveText(EN);
  await expect(vivi).toContainText("Ask Vivi", { timeout: FOCUS_TIMEOUT });

  await page.getByRole("button", { name: "PT", exact: true }).click();
  await expect(page.getByRole("button", { name: "PT", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("h1")).toHaveText(PT);
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(cv).toHaveAttribute("href", /Artur_Guerra_CV_PT\.pdf$/);
  await expect(vivi, "vivi window copy did not switch to PT").toContainText("Pergunte à Vivi", { timeout: FOCUS_TIMEOUT });

  await page.reload();
  await expect(page.locator("h1")).toHaveText(PT);
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(vivi, "vivi window copy lost PT after reload").toContainText("Pergunte à Vivi", { timeout: FOCUS_TIMEOUT });

  await page.getByRole("button", { name: "EN", exact: true }).click();
  await expect(page.locator("h1")).toHaveText(EN);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(cv).toHaveAttribute("href", /Artur_Guerra_CV_EN\.pdf$/);
  await expect(vivi, "vivi window copy did not switch back to EN").toContainText("Ask Vivi", { timeout: FOCUS_TIMEOUT });
});

test("9. CV PDFs are served", async ({ request }) => {
  for (const lang of ["EN", "PT"]) {
    const res = await request.get(`/cv/Artur_Guerra_CV_${lang}.pdf`);
    expect(res.status(), `CV ${lang} status`).toBe(200);
    const type = res.headers()["content-type"] ?? "";
    const head = (await res.body()).subarray(0, 5).toString("latin1");
    expect(type.includes("pdf") || head.startsWith("%PDF"), `CV ${lang} is not a PDF (${type})`).toBe(true);
  }
});

test("10. no horizontal overflow on mobile", async ({ page }) => {
  test.skip(test.info().project.name !== "mobile", "mobile only");
  await open(page);
  const overflow = () =>
    page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: window.innerWidth }));
  let m = await overflow();
  expect(m.sw, `top: scrollWidth ${m.sw} > innerWidth ${m.iw}`).toBeLessThanOrEqual(m.iw);
  for (const id of ["work", "experience", "contact"]) {
    await scrollToTop(page, `#${id}`, 1000);
    m = await overflow();
    expect(m.sw, `#${id}: scrollWidth ${m.sw} > innerWidth ${m.iw}`).toBeLessThanOrEqual(m.iw);
  }
});

test("11. mobile menu: dialog, focus trap, Escape, navigation", async ({ page }) => {
  test.skip(test.info().project.name !== "mobile", "mobile only");
  await open(page);
  const menuBtn = page.locator('button[aria-controls="menu-sheet"]');
  const dialog = page.getByRole("dialog");
  const inDialog = () =>
    page.evaluate(() => !!document.activeElement?.closest('[role="dialog"]'));

  await menuBtn.tap();
  await expect(dialog).toBeVisible();
  await expect.poll(inDialog, { message: "focus not inside dialog after open" }).toBe(true);

  for (let i = 0; i < 8; i++) {
    await page.keyboard.press("Tab");
    expect(await inDialog(), `focus escaped the dialog after Tab #${i + 1}`).toBe(true);
  }

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(menuBtn, "focus did not return to the menu button").toBeFocused();

  await menuBtn.tap();
  await expect(dialog).toBeVisible();
  await dialog.getByRole("link", { name: "Experience", exact: true }).tap();
  await expect(dialog).toBeHidden({ timeout: FOCUS_TIMEOUT });
  await page.waitForTimeout(2000);
  const box = await page.locator("#experience").boundingBox();
  expect(box).not.toBeNull();
  expect(box!.y, `#experience top at y=${box!.y}`).toBeGreaterThanOrEqual(-10);
  expect(box!.y, `#experience top at y=${box!.y}`).toBeLessThanOrEqual(300);
});

test("12. mobile: the chapter's window is not hidden behind its own panel", async ({ page }, testInfo) => {
  test.skip(test.info().project.name !== "mobile", "mobile only");
  await openRoom(page);
  await page.evaluate(() => {
    const el = document.querySelector('article[data-cam="zelo"]')!;
    window.scrollTo(0, window.scrollY + el.getBoundingClientRect().top - innerHeight * 0.08);
  });

  const measure = () =>
    page.evaluate(() => {
      const win = document.querySelector('[data-win="zelo"]')!.getBoundingClientRect();
      const panel = document.querySelector('article[data-cam="zelo"] .glass')!.getBoundingClientRect();
      return { top: win.top, bottom: win.bottom, left: win.left, right: win.right, panelTop: panel.top, vw: innerWidth };
    });
  const fits = (m: Awaited<ReturnType<typeof measure>>) =>
    m.top >= 0 && m.bottom <= m.panelTop + 8 && m.left >= -4 && m.right <= m.vw + 4;

  let last = await measure();
  try {
    await expect
      .poll(async () => fits((last = await measure())), { timeout: FOCUS_TIMEOUT, intervals: [250] })
      .toBe(true);
  } catch (e) {
    await attachPng(testInfo, "zelo-window-vs-panel", await page.screenshot());
    throw new Error(
      `zelo window does not fit above its panel: ${JSON.stringify(last)} (need top>=0, bottom<=panelTop+8, left>=-4, right<=vw+4)`,
      { cause: e },
    );
  }
});

test("13. reduced motion: no Lenis, content visible, counters not stuck, room appears unscrolled", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await open(page);
  await expect(page.locator("html")).not.toHaveClass(/lenis/);
  await expect(page.locator("h1")).toBeVisible();

  // No scrolling yet: the room must still come up on its own.
  await expect
    .poll(async () => (await page.locator("canvas").boundingBox())?.width ?? 0, {
      message: "reduced motion: canvas missing or narrower than 300 px without any scroll",
      timeout: FOCUS_TIMEOUT,
    })
    .toBeGreaterThan(300);
  await expect(page.locator("[data-win]"), "reduced motion: expected 7 windows without scrolling").toHaveCount(7, {
    timeout: FOCUS_TIMEOUT,
  });

  await scrollToMiddle(page, '[data-index="0"]', 1500);
  const state = await page.locator('[data-index="0"] .odo').first().getAttribute("data-state");
  expect(state, "odometer stuck at data-state=reset").not.toBe("reset");
});

test("14. without WebGL: no canvas, no errors, content visible", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.addInitScript(() => {
    HTMLCanvasElement.prototype.getContext = function () {
      return null;
    } as typeof HTMLCanvasElement.prototype.getContext;
  });
  await open(page);
  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(page.locator("h1")).toBeVisible();
  await scrollToTop(page, "#work", 500);
  await expect(page.locator("#work h2")).toBeVisible();
  await scrollToTop(page, "#contact", 500);
  await expect(page.locator("#contact h2")).toBeVisible();
  expect(errors, `Page errors without WebGL:\n${errors.join("\n")}`).toEqual([]);
});

test("15. counters land on real values", async ({ page }) => {
  await open(page);
  // The odometer itself, not the chapter: on phones the metrics sit low in a tall panel.
  await scrollToMiddle(page, '[data-index="0"] .odo', 2000);
  const odo = page.locator('[data-index="0"] .odo').first();
  const state = await odo.getAttribute("data-state");
  expect(state, "odometer did not leave reset").not.toBe("reset");
  await expect(odo.locator("xpath=preceding-sibling::*[contains(@class,'sr-only')]")).toHaveText("1,900+");
});

test("16. counters jumped past do not stay at zero", async ({ page }) => {
  await open(page);
  // Jump only after hydration: below-the-fold counters announce themselves by entering "reset".
  await page.locator('.odo[data-state="reset"]').first().waitFor({ state: "attached", timeout: FOCUS_TIMEOUT });
  await page.evaluate(() => document.querySelector("#contact")!.scrollIntoView());
  await page.waitForTimeout(1000);
  for (const sel of ["#build .odo", 'article[data-cam="more"] .odo']) {
    const states = await page.locator(sel).evaluateAll((els) => els.map((e) => e.getAttribute("data-state")));
    expect(states.length, `no odometers found for ${sel}`).toBeGreaterThan(0);
    expect(states.filter((s) => s === "reset"), `${sel}: odometers stuck at reset after jumping past`).toEqual([]);
  }
});

test("17. copy email reaches the clipboard and is announced (desktop)", async ({ page, context }) => {
  test.skip(test.info().project.name !== "desktop", "clipboard check is desktop only");
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await open(page);
  await scrollToMiddle(page, "#contact", 800);
  await page.getByRole("button").filter({ hasText: "arturpvguerra@gmail.com" }).click();
  await expect(page.locator('#contact [role="status"]')).toHaveText("Email address copied");
  const clip = await page.evaluate(() => navigator.clipboard.readText());
  expect(clip).toBe("arturpvguerra@gmail.com");
});

test("18. legal identity is rendered in the footer", async ({ page }) => {
  await open(page);
  const footer = page.locator("footer");
  await expect(footer).toContainText("Artur Guerra Desenvolvimento de Software LTDA");
  await expect(footer).toContainText("67.557.039/0001-85");
});

test("19. design contract survives the build", async () => {
  const html = readFileSync(path.join(process.cwd(), "out", "index.html"), "utf8");
  expect(html).toContain("87648a41");
});

test("20. manifest expands", async ({ page }) => {
  await open(page);
  const manifest = page.locator("details.manifest").first();
  await scrollToMiddle(page, "details.manifest", 800);
  await manifest.locator("summary").click();
  await expect(manifest.locator("li").first()).toBeVisible();
});

test("21. external links carry rel=noopener", async ({ page }) => {
  await open(page);
  const rels = await page
    .locator('a[target="_blank"]')
    .evaluateAll((as) => as.map((a) => ({ href: (a as HTMLAnchorElement).href, rel: a.getAttribute("rel") ?? "" })));
  expect(rels.length, "no target=_blank links found").toBeGreaterThan(0);
  const bad = rels.filter((l) => !l.rel.includes("noopener"));
  expect(bad, `links missing noopener: ${JSON.stringify(bad)}`).toEqual([]);
});

test.describe("Portuguese browser", () => {
  test.use({ locale: "pt-BR" });

  test("22. defaults to PT-BR without a stored choice", async ({ page }) => {
    await open(page);
    await expect(page.locator("h1")).toHaveText("Eu construo produtos reais, de ponta a ponta.");
    await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  });
});

test("23. social card is declared and served as a 1200x630 JPEG", async ({ page, request }) => {
  await page.goto("/");
  const meta = (property: string) =>
    page.locator(`head meta[property="${property}"]`).first().getAttribute("content");
  const image = await meta("og:image");
  expect(image, "no og:image meta in the page head").toBeTruthy();
  expect(await meta("og:image:width"), "og:image:width").toBe("1200");
  expect(await meta("og:image:height"), "og:image:height").toBe("630");

  // The declared URL points at the production origin; fetch the same path from the test server.
  const url = new URL(image!);
  const res = await request.get(url.pathname + url.search);
  expect(res.status(), `GET ${url.pathname}${url.search}`).toBe(200);
  expect(res.headers()["content-type"] ?? "", "og:image content-type").toContain("image/jpeg");
});

test("24. track record: Zelo current, Visol full stack with Rust and Redis, aligned timeline", async ({ page }) => {
  await open(page);
  await scrollToTop(page, "#experience", 1000);
  const rows = page.locator("#experience [data-exp]");
  await expect(rows.first(), "Zelo is not the first experience").toHaveAttribute("data-exp", "zelo");
  await expect(rows.first()).toContainText("Founder");
  await expect(rows.first()).toContainText("2026 – now");

  const visol = page.locator('#experience [data-exp="visol"]');
  await expect(visol.locator("h3"), "Visol role still shows the internship").toHaveText("Full Stack Developer");
  for (const tag of ["Rust", "Redis"]) {
    await expect(visol.locator(".chip").filter({ hasText: new RegExp(`^${tag}$`) }), `Visol stack lacks ${tag}`).toHaveCount(1);
  }

  const ticks = await page
    .locator("#experience [data-now]")
    .evaluateAll((els) => els.map((e) => Math.round(e.getBoundingClientRect().left)));
  expect(ticks.length, "expected one now tick per row").toBe(await rows.count());
  expect(Math.max(...ticks) - Math.min(...ticks), `now ticks misaligned: ${ticks.join(", ")}`).toBeLessThanOrEqual(1);
  const widths = await page
    .locator('#experience [data-kind="now"]')
    .evaluateAll((els) => els.map((e) => e.getBoundingClientRect().width));
  expect(widths.length, "no current spans drawn").toBeGreaterThan(0);
  expect(widths.every((w) => w > 2), `a current span has no width: ${widths.join(", ")}`).toBe(true);
});

test("evidence: viewport screenshots of hero, vivi, zelo, more, build, contact", async ({ page }, testInfo) => {
  await open(page);
  await page.waitForTimeout(3000);
  await attachPng(testInfo, "hero", await page.screenshot());

  for (const [name, sel] of [
    ["vivi", 'article[data-cam="vivi"]'],
    ["zelo", 'article[data-cam="zelo"]'],
    ["more", 'article[data-cam="more"]'],
    ["build", "#build"],
    ["contact", "#contact"],
  ] as const) {
    await scrollToMiddle(page, sel, 3000);
    await attachPng(testInfo, name, await page.screenshot());
  }
});
