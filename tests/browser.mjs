import { createRequire } from "node:module";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const base = process.env.PREVIEW_URL || "http://127.0.0.1:5173";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
const page = await context.newPage();
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
await fs.mkdir(".local-review", { recursive: true });
const results = [];
async function check(name, run) {
  await run();
  results.push(name);
  console.log("PASS " + name);
}
try {
  await page.goto(base);
  await check("one h1, correct metadata, portrait loaded", async () => {
    assert.equal(await page.locator("h1").count(), 1);
    assert.match(await page.title(), /Anshaj Malhotra.*Karlsruhe/);
    assert.equal(
      await page.locator("link[rel=canonical]").getAttribute("href"),
      "https://anshajm.vercel.app/",
    );
    await page.locator(".portrait-card img").evaluate((img) => img.decode());
  });
  await check("skip link moves keyboard focus into main", async () => {
    await page.keyboard.press("Tab");
    assert.equal(
      await page.evaluate(() => document.activeElement.textContent),
      "Skip to content",
    );
    await page.keyboard.press("Enter");
    assert.equal(await page.evaluate(() => document.activeElement.id), "main");
  });
  await check(
    "filters show the correct featured and secondary projects",
    async () => {
      for (const [filter, total, featured] of [
        ["IoT / RTLS", 2, 2],
        ["Embedded / Test", 3, 1],
        ["Data / Web", 3, 2],
        ["All work", 6, 3],
      ]) {
        await page.getByRole("button", { name: filter, exact: true }).click();
        assert.equal(await page.locator(".project-card").count(), featured);
        assert.equal(
          await page.locator(".results-count").textContent(),
          total + " projects",
        );
      }
    },
  );
  await check(
    "dialogs trap focus, close with Escape, and restore focus",
    async () => {
      for (const title of [
        "Locate-IQ",
        "BLE / RTLS validation",
        "Automotive measurement analytics",
      ]) {
        const trigger = page.getByRole("button", {
          name: "Read " + title + " case study",
          exact: true,
        });
        await trigger.click();
        await page.getByRole("dialog").waitFor({ state: "visible" });
        assert.equal(
          await page.evaluate(() =>
            document.activeElement.getAttribute("aria-label"),
          ),
          "Close case study",
        );
        await page.keyboard.press("Shift+Tab");
        assert.equal(
          await page.evaluate(() => document.activeElement.textContent),
          "Back to work",
        );
        await page.keyboard.press("Tab");
        assert.equal(
          await page.evaluate(() =>
            document.activeElement.getAttribute("aria-label"),
          ),
          "Close case study",
        );
        await page.keyboard.press("Escape");
        assert.equal(await page.getByRole("dialog").count(), 0);
        assert.equal(
          await page.evaluate(() =>
            document.activeElement.getAttribute("aria-label"),
          ),
          "Read " + title + " case study",
        );
      }
    },
  );
  await check("all internal section anchors resolve", async () => {
    const broken = await page
      .locator('a[href^="#"]')
      .evaluateAll((links) =>
        links
          .filter((a) => !document.querySelector(a.getAttribute("href")))
          .map((a) => a.outerHTML),
      );
    assert.deepEqual(broken, []);
  });
  await check(
    "CV download is a real PDF and sample output is consistent",
    async () => {
      const response = await context.request.get(base + "/resume-de.pdf");
      assert.equal(response.status(), 200);
      assert.equal((await response.body()).subarray(0, 4).toString(), "%PDF");
      const sample = await (
        await context.request.get(base + "/quality-sample.json")
      ).json();
      assert.equal(sample.measurements, 25000);
      assert.equal(
        sample.weekly_quality.reduce((s, w) => s + w.defects, 0),
        sample.out_of_spec_measurements,
      );
    },
  );
  await check(
    "contact form has native validation and explicit labels",
    async () => {
      assert.equal(
        await page.locator("form").evaluate((form) => form.checkValidity()),
        false,
      );
      assert.equal(
        await page.getByLabel("Your name", { exact: true }).count(),
        1,
      );
      assert.equal(
        await page.getByLabel("Email address", { exact: true }).count(),
        1,
      );
    },
  );
  await check(
    "contact success, application error, HTTP error, network failure, timeout (mocked only)",
    async () => {
      const pattern = "https://script.google.com/**";
      const fill = async () => {
        await page
          .getByLabel("Your name", { exact: true })
          .fill("Preview test");
        await page
          .getByLabel("Email address", { exact: true })
          .fill("preview@example.com");
        await page
          .getByLabel("What would you like to work on?")
          .fill("Mock request. Never delivered.");
      };
      for (const mode of [
        "success",
        "application",
        "http",
        "network",
        "timeout",
      ]) {
        await page.route(pattern, async (route) => {
          if (mode === "network") return route.abort();
          if (mode === "timeout") {
            await new Promise((resolve) => setTimeout(resolve, 13000));
            return route.abort().catch(() => {});
          }
          await route.fulfill({
            status: mode === "http" ? 503 : 200,
            contentType: "application/json",
            body: JSON.stringify({
              status: mode === "application" ? "error" : "success",
            }),
          });
        });
        await fill();
        await page
          .getByRole("button", { name: "Send message ↗", exact: true })
          .click();
        await page.waitForFunction(
          () =>
            ["success", "error", "timeout"].some((s) =>
              document.querySelector(".form-status").classList.contains(s),
            ),
          {},
          { timeout: 16000 },
        );
        const text = await page.locator(".form-status").textContent();
        if (mode === "success") {
          assert.match(text, /Message received/);
          assert.equal(
            await page.getByLabel("Your name", { exact: true }).inputValue(),
            "",
          );
        } else {
          assert.match(text, /unconfirmed|could not be confirmed/);
          assert.equal(
            await page.getByLabel("Your name", { exact: true }).inputValue(),
            "Preview test",
          );
        }
        await page.unroute(pattern);
      }
    },
  );
  await check(
    "no horizontal overflow at desktop, tablet, mobile and 320px",
    async () => {
      for (const width of [1440, 1024, 768, 390, 320]) {
        await page.setViewportSize({ width, height: 900 });
        assert.ok(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
          "Overflow at " + width,
        );
      }
    },
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base);
  await check(
    "mobile navigation opens, closes on selection and Escape",
    async () => {
      await page.getByRole("button", { name: "Menu", exact: true }).click();
      await page
        .getByRole("navigation", { name: "Main" })
        .getByRole("link", { name: "Experience", exact: true })
        .click();
      assert.equal(
        await page
          .getByRole("button", { name: "Menu", exact: true })
          .getAttribute("aria-expanded"),
        "false",
      );
      await page.getByRole("button", { name: "Menu", exact: true }).click();
      await page
        .getByRole("navigation", { name: "Main" })
        .getByRole("link", { name: "Work", exact: true })
        .focus();
      await page.keyboard.press("Escape");
      assert.equal(
        await page.evaluate(() => document.activeElement.textContent),
        "Menu",
      );
    },
  );
  await check(
    "reduced motion disables portrait tilt and smooth scrolling",
    async () => {
      assert.equal(
        await page
          .locator(".portrait-card")
          .evaluate((e) => getComputedStyle(e).transform),
        "none",
      );
      assert.equal(
        await page.evaluate(
          () => getComputedStyle(document.documentElement).scrollBehavior,
        ),
        "auto",
      );
    },
  );
  await page.goto(base);
  await page.screenshot({
    path: ".local-review/verified-mobile.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(base);
  await page.screenshot({
    path: ".local-review/verified-desktop.png",
    fullPage: true,
  });
  await check(
    "200% content zoom reflows without horizontal overflow",
    async () => {
      await page.evaluate(() => (document.documentElement.style.zoom = "2"));
      assert.ok(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      );
      await page.screenshot({ path: ".local-review/zoom-200.png" });
      await page.evaluate(() => (document.documentElement.style.zoom = ""));
    },
  );
  assert.deepEqual(errors, []);
  results.push("No uncaught browser errors");
  await fs.writeFile(
    ".local-review/browser-results.json",
    JSON.stringify({ base, results }, null, 2),
  );
} finally {
  await browser.close();
}
