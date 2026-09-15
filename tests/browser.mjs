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
  assert.equal(await page.locator("h1").count(), 1);
  assert.equal(await page.locator(".featured-project").count(), 3);
  assert.equal(await page.locator(".more-card").count(), 6);
  await page.locator(".hero-portrait img").evaluate((img) => img.decode());
  const desktopPortrait = await page.locator(".hero-portrait img").boundingBox();
  assert.equal(Math.round(desktopPortrait.width), 250);
  assert.equal(Math.round(desktopPortrait.height), 250);
  assert.equal(await page.locator(".connectivity-backdrop svg").count(), 1);
  const broken = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) =>
      links
        .filter((a) => !document.querySelector(a.getAttribute("href")))
        .map((a) => a.outerHTML),
    );
  assert.deepEqual(broken, []);
  const trigger = page
    .getByRole("button", { name: /Explore case study/ })
    .first();
  await trigger.click();
  assert.equal(await page.getByRole("dialog").isVisible(), true);
  await page.keyboard.press("Escape");
  assert.equal(await page.getByRole("dialog").count(), 0);
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
