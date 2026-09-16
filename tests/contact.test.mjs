import test from "node:test";
import assert from "node:assert/strict";
import { createContactDraft } from "../src/lib/contact.js";

const fields = {
  name: " Test User ",
  email: " test@example.com ",
  message: " A test message ",
};
test("addresses the owner and trims the draft details", () => {
  const draft = new URL(createContactDraft(fields));
  assert.equal(draft.protocol, "mailto:");
  assert.equal(draft.pathname, "anshajm9@gmail.com");
  assert.equal(draft.searchParams.get("subject"), "Portfolio enquiry from Test User");
  assert.equal(draft.searchParams.get("body"), "Name: Test User\r\nReply email: test@example.com\r\n\r\nA test message");
});

test("preserves Unicode, special characters and line breaks without extra mail headers", () => {
  const draft = new URL(createContactDraft({
    name: "Élodie & Co",
    email: "hello+jobs@example.com",
    message: "IoT & C++? 100% ready.\n#next = yes &bcc=other@example.com",
  }));
  assert.equal(draft.searchParams.get("subject"), "Portfolio enquiry from Élodie & Co");
  assert.equal(draft.searchParams.get("body"), "Name: Élodie & Co\r\nReply email: hello+jobs@example.com\r\n\r\nIoT & C++? 100% ready.\r\n#next = yes &bcc=other@example.com");
  assert.deepEqual([...draft.searchParams.keys()], ["subject", "body"]);
  assert.equal(draft.hash, "");
});

test("keeps the subject on one line", () => {
  const draft = new URL(createContactDraft({ ...fields, name: "Test\r\nUser" }));
  assert.equal(draft.searchParams.get("subject"), "Portfolio enquiry from Test User");
});

for (const key of ["name", "email", "message"])
  test(`rejects a whitespace-only ${key}`, () => {
    assert.throws(() => createContactDraft({ ...fields, [key]: " \n " }), /complete each field/);
  });

for (const email of ["not-an-email", "a b@example.com", "person@example.com\r\nBcc: other@example.com"])
  test(`rejects invalid email ${JSON.stringify(email)}`, () => {
    assert.throws(() => createContactDraft({ ...fields, email }), /valid email address/);
  });

for (const [key, length] of [["name", 121], ["email", 255], ["message", 5001]])
  test(`rejects an overlong ${key}`, () => {
    assert.throws(() => createContactDraft({ ...fields, [key]: "a".repeat(length) }), /field limits/);
  });
