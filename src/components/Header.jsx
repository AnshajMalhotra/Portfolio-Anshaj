import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    ["projects", "Work"],
    ["experience", "Experience"],
    ["about", "About"],
  ];
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a
          className="brand"
          href="#home"
          aria-label="Anshaj Malhotra, home"
          onClick={() => setOpen(false)}
        >
          AM<span>✳</span>
        </a>
        <nav
          className={open ? "navigation is-open" : "navigation"}
          id="main-navigation"
          aria-label="Main navigation"
        >
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a
            className="mobile-contact"
            href="#contact"
            onClick={() => setOpen(false)}
          >
            Let's talk ↗
          </a>
        </nav>
        <a className="header-contact" href="#contact">
          Let's talk <span aria-hidden="true">↗</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
    </header>
  );
}
