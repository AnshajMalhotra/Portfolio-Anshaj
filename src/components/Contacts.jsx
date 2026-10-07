import { useRef, useState } from "react";
import { createContactDraft, sendContact } from "../lib/contact";
export default function Contacts() {
  const [fields, setFields] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [emailFallback, setEmailFallback] = useState("");
  const sending = useRef(false);
  function change(event) {
    setFields({ ...fields, [event.target.name]: event.target.value });
    setStatus("idle");
    setError("");
    setEmailFallback("");
  }
  async function submit(event) {
    event.preventDefault();
    if (sending.current) return;
    let draft = "";
    try {
      draft = createContactDraft(fields);
      sending.current = true;
      setStatus("sending");
      setError("");
      setEmailFallback("");
      await sendContact(fields);
      setStatus("success");
      setFields({ name: "", email: "", message: "" });
    } catch (submissionError) {
      setError(submissionError.name === "AbortError"
        ? "This is taking longer than expected; delivery is unconfirmed. Your message is still here. Please contact me by email."
        : draft ? "Delivery could not be confirmed. Your message is still here; please try again or contact me by email." : submissionError.message);
      setEmailFallback(draft);
      setStatus("error");
    } finally {
      sending.current = false;
    }
  }
  return (
    <section id="contact" className="section shell contact-section">
      <div className="contact-copy">
        <p className="eyebrow">04 / LET’S CONNECT</p>
        <h2>
          Let’s build something <span>that connects.</span>
        </h2>
        <p>
          I’m looking for a Werkstudent role or a practical Master’s thesis
          where I can build, test and learn with an engineering team.
        </p>
        <div className="contact-details">
          <a href="mailto:anshajm9@gmail.com">anshajm9@gmail.com ↗</a>
          <a href="tel:+4917627409363">+49 176 27409363</a>
          <span>Karlsruhe, Germany</span>
        </div>
        <div className="social-links">
          <a
            href="https://www.linkedin.com/in/anshaj-malhotra-19023514a"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn ↗
          </a>
          <a
            href="https://github.com/AnshajMalhotra"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
        </div>
      </div>
      <form className="contact-form" onSubmit={submit} aria-busy={status === "sending"}>
        <h3>Start a conversation</h3>
        <p>A role, a thesis topic, or a technical question.</p>
        <label htmlFor="contact-name">Your name</label>
        <input
          id="contact-name"
          name="name"
          autoComplete="name"
          required
          maxLength={120}
          value={fields.name}
          onChange={change}
          placeholder="Name"
          disabled={status === "sending"}
        />
        <label htmlFor="contact-email">Email address</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          value={fields.email}
          onChange={change}
          placeholder="you@company.com"
          disabled={status === "sending"}
        />
        <label htmlFor="contact-message">What would you like to work on?</label>
        <textarea
          id="contact-message"
          name="message"
          required
          maxLength={5000}
          rows={5}
          value={fields.message}
          onChange={change}
          placeholder="Tell me a little about the opportunity…"
          disabled={status === "sending"}
        />
        <p className="form-note">
          Your details are sent directly to Anshaj and stored privately to reply to your enquiry.
        </p>
        <button
          type="submit"
          className="button primary"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending…" : "Send message ↗"}
        </button>
        <p
          className={"form-status " + status}
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {status === "success"
            ? "Message received. Thanks for getting in touch."
            : error}
        </p>
        {emailFallback && <a className="quiet-link" href={emailFallback}>Send by email instead ↗</a>}
      </form>
    </section>
  );
}
