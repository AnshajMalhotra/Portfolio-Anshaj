import { useState } from "react";
import { createContactDraft } from "../lib/contact";
export default function Contacts() {
  const [fields, setFields] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  function change(event) {
    setFields({ ...fields, [event.target.name]: event.target.value });
    setStatus("idle");
    setError("");
  }
  function submit(event) {
    event.preventDefault();
    try {
      const draft = createContactDraft(fields);
      window.location.href = draft;
      setStatus("draft");
      setError("");
    } catch (draftError) {
      setError(draftError.message);
      setStatus("invalid");
    }
  }
  return (
    <section id="contact" className="section shell contact-section">
      <div className="contact-copy">
        <p className="eyebrow">04 / LET’S CONNECT</p>
        <h2>
          Have a device,
          <br />
          data or systems
          <br />
          <span>challenge?</span>
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
      <form className="contact-form" onSubmit={submit}>
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
        />
        <p className="form-note">
          Opens your email app. Review and send the draft there.
        </p>
        <button
          type="submit"
          className="button primary"
        >
          Open email draft ↗
        </button>
        <p
          className={"form-status " + status}
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {status === "draft"
            ? "Your draft is ready. Send it in your email app. If no app opened, use the email address above; your message is still here."
            : error}
        </p>
      </form>
    </section>
  );
}
