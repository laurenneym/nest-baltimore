// NEST — app shell: hash router + Tweaks (accent color, hero direction).
const { useState: useStateApp, useEffect: useEffectApp } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#C2884E"
}/*EDITMODE-END*/;

const ROUTES = ["home", "menu", "about", "visit", "reserve"];

function hexToRgba(hex, a) {
  const h = hex.replace("#", "");
  const x = h.length === 3 ? h.replace(/./g, (c) => c + c) : h;
  const n = parseInt(x, 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function getRoute() {
  const h = (location.hash || "").replace(/^#\/?/, "").split("/")[0];
  return ROUTES.includes(h) ? h : "home";
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = useStateApp(getRoute());
  const [toastMsg, setToastMsg] = useStateApp("");
  const [pdfOpen, setPdfOpen] = useStateApp(false);

  // expose a global opener so any menu link can show the PDF in-page
  useEffectApp(() => {
    window.openMenuPdf = () => setPdfOpen(true);
    return () => { delete window.openMenuPdf; };
  }, []);

  // Build a blob URL for the embedded menu PDF (works in preview + offline,
  // bypassing the sandbox file-token that breaks a plain relative iframe src).
  const [menuUrl] = useStateApp(() => {
    try {
      if (window.MENU_PDF_B64) {
        const bin = atob(window.MENU_PDF_B64);
        const bytes = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        return URL.createObjectURL(new Blob([bytes], { type: "application/pdf" }));
      }
    } catch (e) { /* fall through */ }
    return window.NEST.menuPdf;
  });

  // hash routing
  useEffectApp(() => {
    const onHash = () => { setRoute(getRoute()); window.scrollTo(0, 0); };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const go = (path) => {
    if (path === "home") location.hash = "#/";
    else location.hash = "#/" + path;
    if (getRoute() === route) window.scrollTo(0, 0);
  };

  // apply accent tweak to CSS vars
  useEffectApp(() => {
    const root = document.documentElement;
    root.style.setProperty("--accent", t.accent);
    root.style.setProperty("--accent-soft", hexToRgba(t.accent, 0.16));
    root.style.setProperty("--accent-line", hexToRgba(t.accent, 0.42));
  }, [t.accent]);

  // scroll reveal — images pop up as they enter the viewport
  useEffectApp(() => {
    document.documentElement.classList.add("js");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const inView = (el) => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight * 0.96 && r.bottom > 0;
    };
    const instant = (el) => el.classList.add("shown");
    const all = () => document.querySelectorAll(".reveal:not(.in):not(.shown)");
    const cleanup = { io: null, timer: null, onVis: null };

    const raf = requestAnimationFrame(() => {
      const els = Array.from(document.querySelectorAll(".reveal:not(.in)"));
      // reduced-motion or a hidden/throttled tab → show instantly (no animation)
      if (reduce || document.hidden || !("IntersectionObserver" in window)) {
        els.forEach(instant);
        return;
      }
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
      els.forEach((el) => io.observe(el));
      cleanup.io = io;
      // Safety: anything in view but not yet animated after a beat gets shown.
      cleanup.timer = setTimeout(() => {
        all().forEach((el) => { if (inView(el)) { instant(el); io.unobserve(el); } });
      }, 900);
    });

    // If the tab ever goes hidden, reveal everything instantly so a paused
    // compositor can't strand a half-faded image when the user returns.
    cleanup.onVis = () => { if (document.hidden) all().forEach(instant); };
    document.addEventListener("visibilitychange", cleanup.onVis);

    return () => {
      cancelAnimationFrame(raf);
      if (cleanup.io) cleanup.io.disconnect();
      if (cleanup.timer) clearTimeout(cleanup.timer);
      document.removeEventListener("visibilitychange", cleanup.onVis);
    };
  }, [route]);

  const toast = (m) => { setToastMsg(""); requestAnimationFrame(() => setToastMsg(m)); setTimeout(() => setToastMsg(""), 3200); };

  let Page;
  if (route === "menu") Page = <Menus go={go} />;
  else if (route === "about") Page = <About go={go} />;
  else if (route === "visit") Page = <Visit go={go} />;
  else if (route === "reserve") Page = <Reserve go={go} toast={toast} />;
  else Page = <Home go={go} />;

  return (
    <div className="grain">
      <Nav route={route} go={go} />
      <main>{Page}</main>
      <Footer go={go} />
      <Toast msg={toastMsg} />
      <PdfModal open={pdfOpen} src={menuUrl} onClose={() => setPdfOpen(false)} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Brand">
          <TweakColor
            label="Accent"
            value={t.accent}
            options={["#C2884E", "#D9A441", "#C75D3A", "#6B3B4F"]}
            onChange={(v) => setTweak("accent", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
