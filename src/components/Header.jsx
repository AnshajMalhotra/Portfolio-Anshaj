import { useState } from "react";
export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a
          className="wordmark"
          href="#home"
          aria-label="Anshaj Malhotra, home"
          onClick={() => setOpen(false)}
        >
          AM<span>.</span>
        </a>
        <span className="header-label">ENGINEERING PORTFOLIO</span>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close menu" : "Menu"}
        </button>
        <nav
          id="main-navigation"
          aria-label="Main"
          className={open ? "navigation is-open" : "navigation"}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setOpen(false);
              document.querySelector(".menu-toggle").focus();
            }
          }}
        >
          {[
            ["projects", "Work"],
            ["experience", "Experience"],
            ["about", "About"],
            ["contact", "Let’s talk ↗"],
          ].map(([id, label]) => (
            <a key={id} href={"#" + id} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
