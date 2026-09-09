import { useState, useRef, useEffect } from "react";
import { sendContact } from "../lib/contact";
import ContactScene from "./ContactScene";
export default function Contacts() {
  const [fields, setFields] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const submitting = useRef(false);
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  function change(event) {
    setFields({ ...fields, [event.target.name]: event.target.value });
    if (status !== "sending") setStatus("idle");
  }
  async function submit(event) {
    event.preventDefault();
    if (submitting.current) return;
    if (Object.values(fields).some((value) => !value.trim())) {
      setStatus("invalid");
      return;
    }
    submitting.current = true;
    setStatus("sending");
    try {
      await sendContact(fields);
      if (mounted.current) {
        setStatus("success");
        setFields({ name: "", email: "", message: "" });
      }
    } catch (error) {
      if (mounted.current)
        setStatus(error.name === "AbortError" ? "timeout" : "error");
    } finally {
      submitting.current = false;
    }
  }
  return (
    <section id="contact" className="section shell contact-section">
      <div className="contact-copy">
        <p className="eyebrow">05 / LET’S CONNECT</p>
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
        <ContactScene />
      </div>
      <form
        className="contact-form"
        onSubmit={submit}
        aria-busy={status === "sending"}
      >
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
          disabled={status === "sending"}
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
          disabled={status === "sending"}
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
          disabled={status === "sending"}
          placeholder="Tell me a little about the opportunity…"
        />
        <p className="form-note">
          Your message is sent to Anshaj through Google Apps Script. You can
          also contact me directly by email.
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
            ? "Message received. Thank you for getting in touch."
            : status === "error"
              ? "Receipt could not be confirmed. Your message is still here; please email me directly."
              : status === "timeout"
                ? "The request timed out; delivery is unconfirmed. Please email me directly."
                : status === "invalid"
                  ? "Please complete each field with more than spaces."
                  : ""}
        </p>
      </form>
    </section>
  );
}
