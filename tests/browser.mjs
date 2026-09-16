import { createRequire } from "node:module";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const base = process.env.PREVIEW_URL || "http://127.0.0.1:5173";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  reducedMotion: "reduce",
});
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
try {
  await page.goto(base);
  await page.evaluate(() => document.fonts.ready);
  assert.equal(await page.locator("h1").count(), 1);
  assert.equal(await page.locator(".featured-project").count(), 3);
  assert.equal(await page.locator(".more-card").count(), 6);
  await page.locator(".hero-portrait img").evaluate((img) => img.decode());
  const desktopPortrait = await page.locator(".hero-portrait img").boundingBox();
  assert.equal(Math.round(desktopPortrait.width), 280);
  assert.equal(Math.round(desktopPortrait.height), 280);
  assert.equal(await page.locator(".connectivity-backdrop svg").count(), 1);
  const broken = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) =>
      links
        .filter((a) => !a.hash.startsWith("#project/") && !document.getElementById(a.hash.slice(1)))
        .map((a) => a.outerHTML),
    );
  assert.deepEqual(broken, []);
  const trigger = page
    .getByRole("link", { name: /Explore case study/ })
    .first();
  await trigger.click();
  await page.getByRole("dialog").waitFor({ state: "visible" });
  assert.equal(await page.getByRole("dialog").isVisible(), true);
  assert.equal(new URL(page.url()).hash, "#project/locate");
  await page.keyboard.press("Escape");
  await page.getByRole("dialog").waitFor({ state: "detached" });
  assert.equal(await page.getByRole("dialog").count(), 0);
  assert.equal(new URL(page.url()).hash, "#projects");
  await page.goto(`${base}/#project/locate`);
  await page.getByRole("dialog").waitFor({ state: "visible" });
  await page.getByLabel("Search sample devices").fill("BLE");
  assert.match(await page.getByRole("dialog").innerText(), /2 of 4 sample devices/i);
  await page.getByRole("button", { name: "Close case study" }).click();
  await page.getByRole("dialog").waitFor({ state: "detached" });
  await page.goto(`${base}/#project/quality`);
  await page.getByRole("dialog").waitFor({ state: "visible" });
  await page.getByLabel("Measurement period").selectOption("2026-W31");
  assert.match(await page.getByRole("dialog").innerText(), /3,689[\s\S]*177[\s\S]*95\.20%/);
  await page.keyboard.press("Escape");
  await page.getByRole("dialog").waitFor({ state: "detached" });
  for (const language of ["en", "de"]) {
    const cv = await page.request.get(`${base}/resume-${language}.pdf`);
    assert.equal(cv.status(), 200);
    assert.equal((await cv.body()).subarray(0, 5).toString(), "%PDF-");
  }
  const sectionOrder = await page.locator("main > section").evaluateAll((sections) => sections.map((section) => section.id));
  assert.ok(sectionOrder.indexOf("experience") > sectionOrder.indexOf("projects"));
  assert.ok(sectionOrder.indexOf("experience") < sectionOrder.indexOf("additional-projects"));
  assert.equal(
    await page.locator("form").evaluate((form) => form.checkValidity()),
    false,
  );
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(
      () =>
        new Promise((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(resolve)),
        ),
    );
    const size = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth,
      offenders: Array.from(document.querySelectorAll("*"))
        .filter((e) => e.getBoundingClientRect().right > innerWidth)
        .slice(0, 4)
        .map((e) => [
          e.tagName,
          e.className,
          e.parentElement?.textContent.slice(0, 60),
          getComputedStyle(e.parentElement).fontSize,
          Math.round(e.getBoundingClientRect().right),
        ]),
    }));
    assert.ok(
      size.scrollWidth <= size.innerWidth,
      `Overflow at ${width}px: ${JSON.stringify(size)}`,
    );
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base);
  const mobilePortrait = await page.locator(".hero-portrait img").boundingBox();
  assert.equal(Math.round(mobilePortrait.width), 190);
  assert.equal(Math.round(mobilePortrait.height), 190);
  await page.getByRole("button", { name: "Menu" }).click();
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Let's talk" })
    .click();
  assert.equal(
    await page
      .getByRole("button", { name: "Menu" })
      .getAttribute("aria-expanded"),
    "false",
  );
  assert.equal(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
    "auto",
  );
  await fs.mkdir(".local-review", { recursive: true });
  await page.goto(base);
  await page.screenshot({ path: ".local-review/redesign-mobile.png" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(base);
  for (const image of await page.locator("img").all()) {
    await image.scrollIntoViewIfNeeded();
    await image.evaluate((img) => img.decode());
  }
  await page.evaluate(() => {
    document.activeElement?.blur();
    scrollTo(0, 0);
  });
  await page.evaluate(
    () =>
      new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve)),
      ),
  );
  await page.screenshot({
    path: ".local-review/redesign-desktop.png",
    fullPage: true,
  });
  assert.deepEqual(errors, []);
  console.log("Portfolio browser checks passed");
} finally {
  await browser.close();
}
