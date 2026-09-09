import test from "node:test";
import assert from "node:assert/strict";
import { sendContact } from "../src/lib/contact.js";

const fields = {
  name: " Test User ",
  email: " test@example.com ",
  message: " A test message ",
};
test("requires HTTP and application success, and trims form data", async () => {
  let submitted;
  await sendContact(fields, {
    fetcher: async (_url, options) => {
      submitted = options.body;
      return { ok: true, json: async () => ({ status: "success" }) };
    },
  });
  assert.equal(submitted.get("name"), "Test User");
  assert.equal(submitted.get("message"), "A test message");
});
for (const [label, response] of [
  ["HTTP failure", { ok: false, json: async () => ({ status: "success" }) }],
  [
    "application failure",
    { ok: true, json: async () => ({ status: "error" }) },
  ],
  ["missing acknowledgment", { ok: true, json: async () => ({}) }],
  [
    "invalid JSON",
    {
      ok: true,
      json: async () => {
        throw new SyntaxError("invalid JSON");
      },
    },
  ],
])
  test("rejects " + label, async () => {
    await assert.rejects(
      sendContact(fields, { fetcher: async () => response }),
    );
  });
test("reports network rejection", async () => {
  await assert.rejects(
    sendContact(fields, {
      fetcher: async () => {
        throw new TypeError("Network failure");
      },
    }),
  );
});
test("aborts a stalled request", async () => {
  await assert.rejects(
    sendContact(fields, {
      timeoutMs: 5,
      fetcher: async (_url, { signal }) =>
        new Promise((_resolve, reject) =>
          signal.addEventListener("abort", () =>
            reject(new DOMException("Timeout", "AbortError")),
          ),
        ),
    }),
    { name: "AbortError" },
  );
});
