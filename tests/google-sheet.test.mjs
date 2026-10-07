import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import vm from "node:vm";

const scriptFile = new URL("../google-apps-script/Code.gs", import.meta.url);
function handler() {
  const rows = [];
  const context = vm.createContext({
    Date,
    SpreadsheetApp: { getActiveSpreadsheet: () => ({ getSheetByName: () => ({ appendRow: (row) => rows.push(row) }) }) },
    ContentService: { MimeType: { JSON: "json" }, createTextOutput: (text) => ({ setMimeType: () => JSON.parse(text) }) },
  });
  vm.runInContext(existsSync(scriptFile) ? readFileSync(scriptFile, "utf8") : "", context);
  assert.equal(typeof context.doPost, "function", "The sheet submission handler must exist");
  return { context, rows };
}

test("appends one timestamped entry and confirms success", () => {
  const { context, rows } = handler();
  assert.equal(context.doGet().status, "ready");
  assert.equal(context.doPost({ parameter: { name: " Anshaj ", email: "anshajm9@gmail.com", message: " Connection check " } }).status, "success");
  assert.equal(rows.length, 1);
  assert.ok(rows[0][0] instanceof Date);
  assert.deepEqual(Array.from(rows[0]).slice(1), ["Anshaj", "anshajm9@gmail.com", "Connection check"]);
});

test("rejects invalid input without writing and stores formula-like input as text", () => {
  const { context, rows } = handler();
  for (const parameter of [{}, { name: "A", email: "invalid", message: "Hi" }, { name: "A", email: "a@example.com", message: "x".repeat(5001) }]) {
    assert.equal(context.doPost({ parameter }).status, "error");
  }
  assert.equal(rows.length, 0);
  context.doPost({ parameter: { name: "=1+1", email: "a@example.com", message: "=IMPORTXML()" } });
  assert.equal(rows[0][1], "'=1+1");
  assert.equal(rows[0][3], "'=IMPORTXML()");
});
