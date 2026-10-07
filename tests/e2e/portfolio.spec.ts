/**
 * E2E suite for the scroll-driven 3D "production line" portfolio.
 * Runs against the static export in ./out (npm run e2e builds first).
 *
 * Failure modes covered, one test each:
 *  1. Page throws: any pageerror or console error during load and a full slow scroll.
 *  2. WebGL scene never mounts or renders blank (one sized canvas, screenshot > 20 kB).
 *  3. Scroll does not drive the camera (canvas at top differs from canvas at station 3).
 *  4. Station readout shows the wrong position (desktop): "04 / 07" at station 3.
 *  5. Nav anchors do not land on their section (desktop): Work, Contact.
 *  6. Language switch does not apply, persist or restore (h1, html lang, CV link).
 *  7. CV files missing from the build (EN and PT PDFs).
 *  8. Mobile horizontal overflow at the top and at key sections.
 *  9. Mobile menu: dialog, focus trap, Escape + focus return, anchor navigation.
 * 10. Reduced motion: no Lenis, content visible, counters never stuck at reset.
 * 11. No WebGL: no canvas, no page error, all content still rendered.
 * 12. Counters land on real values (1,900+ in EN) after scrolling into view.
 * 13. Copy email does not reach the clipboard or is not announced (desktop).
 * 14. Legal identity missing from the footer.
 * 15. Design contract (seed d74f41d2) lost in the build output.
 * 16. Project manifest does not expand.
 * 17. External links without rel="noopener".
 * 18. A Portuguese-language browser with no stored choice still gets English.
 * Plus: "evidence" screenshots (hero, station 3, work) per project.
 */
import { expect, test, type Page, type TestInfo } from "@playwright/test";
import { readFileSync } from "node:fs";
import path from "node:path";

const SETTLE = 2500;

async function open(page: Page) {
  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
  await page.waitForTimeout(1500);
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

test("2. WebGL canvas mounts and renders non-blank", async ({ page }, testInfo) => {
  await open(page);
  await expect(page.locator("canvas"), "expected exactly one canvas").toHaveCount(1);
  const box = await page.locator("canvas").boundingBox();
  expect(box?.width ?? 0, "canvas width is zero").toBeGreaterThan(0);
  expect(box?.height ?? 0, "canvas height is zero").toBeGreaterThan(0);

  let shot = Buffer.alloc(0);
  await expect
    .poll(
      async () => {
        shot = await page.locator("canvas").screenshot();
        return shot.length;
      },
      { message: "canvas screenshot is <= 20 kB: scene is blank or flat", timeout: 15_000 },
    )
    .toBeGreaterThan(20_000);
  await attachPng(testInfo, "canvas-top", shot);
});

test("3. scrolling drives the camera (canvas differs top vs station 3)", async ({ page }, testInfo) => {
  await open(page);
  const top = await page.locator("canvas").screenshot();
  await scrollToMiddle(page, '[data-cam="s3"]', SETTLE);
  const s3 = await page.locator("canvas").screenshot();
  await attachPng(testInfo, "canvas-top", top);
  await attachPng(testInfo, "canvas-station-3", s3);
  expect(Buffer.compare(top, s3), "canvas pixels identical: camera did not move with scroll").not.toBe(0);
});

test("4. station readout shows 04 / 07 at station 3 (desktop)", async ({ page }) => {
  test.skip(test.info().project.name !== "desktop", "HUD is desktop only");
  await open(page);
  await scrollToMiddle(page, '[data-station="3"]', 1200);
  const hud = page.getByRole("navigation", { name: "Position on the line" });
  await expect(hud).toBeVisible();
  await expect(hud).toContainText("04 / 07");
});

test("5. nav anchors land on their section (desktop)", async ({ page }) => {
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

test("6. language switch applies, persists and restores", async ({ page }) => {
  const PT = "Eu construo produtos reais, de ponta a ponta.";
  const EN = "I build real products end to end.";
  const cv = page.locator("#top a[download]");
  await open(page);
  await expect(page.locator("h1")).toHaveText(EN);

  await page.getByRole("button", { name: "PT", exact: true }).click();
  await expect(page.getByRole("button", { name: "PT", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("h1")).toHaveText(PT);
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(cv).toHaveAttribute("href", /Artur_Guerra_CV_PT\.pdf$/);

  await page.reload();
  await expect(page.locator("h1")).toHaveText(PT);
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");

  await page.getByRole("button", { name: "EN", exact: true }).click();
  await expect(page.locator("h1")).toHaveText(EN);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(cv).toHaveAttribute("href", /Artur_Guerra_CV_EN\.pdf$/);
});

test("7. CV PDFs are served", async ({ request }) => {
  for (const lang of ["EN", "PT"]) {
    const res = await request.get(`/cv/Artur_Guerra_CV_${lang}.pdf`);
    expect(res.status(), `CV ${lang} status`).toBe(200);
    const type = res.headers()["content-type"] ?? "";
    const head = (await res.body()).subarray(0, 5).toString("latin1");
    expect(type.includes("pdf") || head.startsWith("%PDF"), `CV ${lang} is not a PDF (${type})`).toBe(true);
  }
});

test("8. no horizontal overflow on mobile", async ({ page }) => {
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

test("9. mobile menu: dialog, focus trap, Escape, navigation", async ({ page }) => {
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
  await expect(dialog).toBeHidden();
  await page.waitForTimeout(2000);
  const box = await page.locator("#experience").boundingBox();
  expect(box).not.toBeNull();
  expect(box!.y, `#experience top at y=${box!.y}`).toBeGreaterThanOrEqual(-10);
  expect(box!.y, `#experience top at y=${box!.y}`).toBeLessThanOrEqual(300);
});

test("10. reduced motion: no Lenis, content visible, counters not stuck", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await open(page);
  await expect(page.locator("html")).not.toHaveClass(/lenis/);
  await expect(page.locator("h1")).toBeVisible();
  await scrollToMiddle(page, '[data-index="0"]', 1500);
  const state = await page.locator('[data-index="0"] .odo').first().getAttribute("data-state");
  expect(state, "odometer stuck at data-state=reset").not.toBe("reset");
});

test("11. without WebGL: no canvas, no errors, content visible", async ({ page }) => {
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

test("12. counters land on real values", async ({ page }) => {
  await open(page);
  await scrollToMiddle(page, '[data-index="0"]', 2000);
  const odo = page.locator('[data-index="0"] .odo').first();
  const state = await odo.getAttribute("data-state");
  expect(state, "odometer did not leave reset").not.toBe("reset");
  await expect(odo.locator("xpath=preceding-sibling::*[contains(@class,'sr-only')]")).toHaveText("1,900+");
});

test("13. copy email reaches the clipboard and is announced (desktop)", async ({ page, context }) => {
  test.skip(test.info().project.name !== "desktop", "clipboard check is desktop only");
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await open(page);
  await scrollToMiddle(page, "#contact", 800);
  await page.getByRole("button").filter({ hasText: "arturpvguerra@gmail.com" }).click();
  await expect(page.locator('#contact [role="status"]')).toHaveText("Email address copied");
  const clip = await page.evaluate(() => navigator.clipboard.readText());
  expect(clip).toBe("arturpvguerra@gmail.com");
});

test("14. legal identity is rendered in the footer", async ({ page }) => {
  await open(page);
  const footer = page.locator("footer");
  await expect(footer).toContainText("Artur Guerra Desenvolvimento de Software LTDA");
  await expect(footer).toContainText("67.557.039/0001-85");
});

test("15. design contract survives the build", async () => {
  const html = readFileSync(path.join(process.cwd(), "out", "index.html"), "utf8");
  expect(html).toContain("d74f41d2");
});

test("16. manifest expands", async ({ page }) => {
  await open(page);
  const manifest = page.locator("details.manifest").first();
  await scrollToMiddle(page, "details.manifest", 800);
  await manifest.locator("summary").click();
  await expect(manifest.locator("li").first()).toBeVisible();
});

test("17. external links carry rel=noopener", async ({ page }) => {
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

  test("18. defaults to PT-BR without a stored choice", async ({ page }) => {
    await open(page);
    await expect(page.locator("h1")).toHaveText("Eu construo produtos reais, de ponta a ponta.");
    await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  });
});

test("evidence: viewport screenshots of hero, station 3, work", async ({ page }, testInfo) => {
  await open(page);
  await page.waitForTimeout(SETTLE);
  await attachPng(testInfo, "hero", await page.screenshot());

  await scrollToMiddle(page, '[data-cam="s3"]', SETTLE);
  await attachPng(testInfo, "station-3", await page.screenshot());

  await scrollToTop(page, "#work", SETTLE);
  await attachPng(testInfo, "work", await page.screenshot());
});
