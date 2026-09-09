export const CONTACT_URL =
  "https://script.google.com/macros/s/AKfycbzBKFbEHFRhvPwFy3JmNEhOVQfRh2LaO05y_aVkvm0C8nlRb411L34oYl2NV8oGBV08/exec";

export async function sendContact(
  fields,
  { fetcher = globalThis.fetch, timeoutMs = 12000 } = {},
) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const body = new FormData();
    for (const key of ["name", "email", "message"])
      body.append(key, fields[key].trim());
    const response = await fetcher(CONTACT_URL, {
      method: "POST",
      body,
      signal: controller.signal,
    });
    if (!response.ok) throw new Error("The server did not confirm receipt.");
    const result = await response.json();
    if (result?.status !== "success")
      throw new Error("The server did not confirm receipt.");
    return true;
  } finally {
    clearTimeout(timer);
  }
}
