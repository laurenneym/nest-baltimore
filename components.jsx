// NEST — shared components. Exported to window for cross-file use.
const { useState, useEffect, useRef } = React;

// ===== Logo lockup: leading rule + elegant serif "NEST" wordmark =====
function Lockup({ onClick }) {
  return (
    <span className="lockup" onClick={onClick}>
      <span className="lockup-rule" aria-hidden="true"></span>
      <span className="nest">NEST</span>
    </span>
  );
}

// ===== Buttons =====
function Btn({ kind = "accent", size, href, target, onClick, children }) {
  const cls = "btn btn-" + kind + (size ? " btn-" + size : "");
  if (href) return <a className={cls} href={href} onClick={onClick} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined}>{children}</a>;
  return <button className={cls} onClick={onClick}>{children}</button>;
}

function ALink({ onClick, href, target, children }) {
  return (
    <a className="alink" href={href || "#"} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined} onClick={onClick}>
      {children} <span className="ar">→</span>
    </a>
  );
}

// ===== Image (real photo, lazy, reveals on scroll) =====
function Img({ src, alt, className, style, reveal = true }) {
  return (
    <div className={"frame " + (reveal ? "reveal " : "") + (className || "")} style={style}>
      <img className="img" src={src} alt={alt || ""} loading="lazy" />
    </div>
  );
}

// ===== Eyebrow =====
function Eyebrow({ children, muted }) {
  return <div className={"eyebrow" + (muted ? " muted" : "")}>{children}</div>;
}

// ===== Nav =====
function Nav({ route, go }) {
  const N = window.NEST;
  const [open, setOpen] = useState(false);
  const link = (path, label, onNav) => (
    <a
      key={path}
      className={"nav-link" + (route === path ? " active" : "")}
      href={"#/" + path}
      onClick={(e) => { e.preventDefault(); go(path); onNav && onNav(); }}
    >{label}</a>
  );
  return (
    <header className="nav">
      <div className="nav-inner">
        <nav className="nav-links">
          {link("menu", "Menu")}
          {link("about", "About")}
          {link("visit", "Visit")}
        </nav>
        <a href="#/home" onClick={(e) => { e.preventDefault(); go("home"); }} style={{ textDecoration: "none" }}>
          <Lockup />
        </a>
        <nav className="nav-links right">
          <Btn kind="accent" size="sm" onClick={() => go("reserve")}>Reserve</Btn>
        </nav>
        <button className={"nav-burger" + (open ? " is-open" : "")} onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="nav-mobile-menu">
          <span></span><span></span><span></span>
        </button>
      </div>
      {open && (
        <div className="nav-mobile" id="nav-mobile-menu">
          {link("menu", "Menu", () => setOpen(false))}
          {link("about", "About", () => setOpen(false))}
          {link("visit", "Visit", () => setOpen(false))}
          <Btn kind="accent" onClick={() => { go("reserve"); setOpen(false); }}>Reserve a table</Btn>
        </div>
      )}
    </header>
  );
}

// ===== Footer =====
function Footer({ go }) {
  const N = window.NEST;
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Lockup />
            <div className="footer-lede">{N.shortTag} Cocktails and highly technical snacks from Chef Loic Sany.</div>
          </div>
          <div>
            <h6>Visit</h6>
            <span className="fitem">{N.address.line1}</span>
            <span className="fitem">{N.address.line2}</span>
            <a href="#/visit" onClick={(e) => { e.preventDefault(); go("visit"); }}>Hours &amp; directions</a>
          </div>
          <div>
            <h6>More</h6>
            <a href="#/menu" onClick={(e) => { e.preventDefault(); go("menu"); }}>Menu</a>
            <a href="#/about" onClick={(e) => { e.preventDefault(); go("about"); }}>About</a>
            <a href="#/reserve" onClick={(e) => { e.preventDefault(); go("reserve"); }}>Reservations</a>
            <a href={N.contact.instagramUrl} target="_blank" rel="noreferrer">{N.contact.instagram}</a>
          </div>
        </div>
        <div className="footer-base">
          <span>© 2026 NEST · Baltimore</span>
          <span>Downtown Baltimore · {N.contact.email}</span>
        </div>
      </div>
    </footer>
  );
}

// ===== Open the menu PDF (in-page viewer; popup-safe) =====
function openMenu(e) {
  if (e && e.preventDefault) e.preventDefault();
  if (window.openMenuPdf) window.openMenuPdf();
}

// ===== PDF viewer modal =====
function PdfModal({ open, src, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="pdf-overlay" onClick={onClose}>
      <div className="pdf-panel" onClick={(e) => e.stopPropagation()}>
        <div className="pdf-bar">
          <span className="pdf-title">NEST · 2026 menu</span>
          <div className="pdf-actions">
            <a className="pdf-link" href={src} target="_blank" rel="noopener noreferrer">Open in new tab ↗</a>
            <button className="pdf-close" onClick={onClose} aria-label="Close menu">✕</button>
          </div>
        </div>
        <iframe className="pdf-frame" src={src} title="NEST 2026 menu"></iframe>
      </div>
    </div>
  );
}

// ===== Toast =====
function Toast({ msg }) {
  if (!msg) return null;
  return <div className="toast" key={msg}>{msg}</div>;
}

Object.assign(window, { Lockup, Btn, ALink, Img, Eyebrow, Nav, Footer, Toast, PdfModal, openMenu });
