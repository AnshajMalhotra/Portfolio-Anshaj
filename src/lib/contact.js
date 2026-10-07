export const CONTACT_EMAIL = "anshajm9@gmail.com";
export const CONTACT_URL = "https://script.google.com/macros/s/AKfycbz9CBY0KmUP4D9S85TeJ1fMLCgSIzSEhClf8hfniwCY6lfuj2lwXvMc0UtwYRscSzpU/exec";

export function validateContactFields(fields) {
  if (!fields || ["name", "email", "message"].some((key) => typeof fields[key] !== "string"))
    throw new Error("Please complete each field with more than spaces.");
  const name = fields.name.trim();
  const email = fields.email.trim();
  const message = fields.message.trim();
  if (!name || !email || !message)
    throw new Error("Please complete each field with more than spaces.");
  if (name.length > 120 || email.length > 254 || message.length > 5000)
    throw new Error("Please shorten your details to fit the field limits.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    throw new Error("Please enter a valid email address.");
  return { name, email, message };
}

export function createContactDraft(fields) {
  const { name, email, message } = validateContactFields(fields);
  const subject = `Portfolio enquiry from ${name.replace(/\s+/g, " ")}`;
  const body = `Name: ${name}\r\nReply email: ${email}\r\n\r\n${message.replace(/\r?\n/g, "\r\n")}`;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export async function sendContact(fields, { fetcher = globalThis.fetch, timeoutMs = 15000 } = {}) {
  const details = validateContactFields(fields);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetcher(CONTACT_URL, {
      method: "POST",
      body: new URLSearchParams(details),
      signal: controller.signal,
    });
    if (!response.ok || (await response.json()).status !== "success")
      throw new Error("Your message could not be confirmed. Please try again or contact me by email.");
    return true;
  } finally {
    clearTimeout(timer);
  }
}
