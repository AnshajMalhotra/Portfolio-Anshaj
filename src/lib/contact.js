export const CONTACT_EMAIL = "anshajm9@gmail.com";

export function createContactDraft(fields) {
  const name = fields.name.trim();
  const email = fields.email.trim();
  const message = fields.message.trim();
  if (!name || !email || !message)
    throw new Error("Please complete each field with more than spaces.");
  if (name.length > 120 || email.length > 254 || message.length > 5000)
    throw new Error("Please shorten your details to fit the field limits.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    throw new Error("Please enter a valid email address.");

  const subject = `Portfolio enquiry from ${name.replace(/\s+/g, " ")}`;
  const body = `Name: ${name}\r\nReply email: ${email}\r\n\r\n${message.replace(/\r?\n/g, "\r\n")}`;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
