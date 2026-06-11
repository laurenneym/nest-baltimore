// NEST — Home page. Auto-advancing slideshow hero + editorial manifesto.
const { useState: useStateHome, useEffect: useEffectHome, useRef: useRefHome } = React;

function HeroSlideshow({ go }) {
  const N = window.NEST;
  const slides = N.hero;
  const [idx, setIdx] = useStateHome(0);
  const timer = useRefHome(null);

  const reduce = typeof window !== "undefined" &&
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffectHome(() => {
    if (reduce || slides.length < 2) return;
    const start = () => {
      stop();
      timer.current = setInterval(() => {
        if (!document.hidden) setIdx((i) => (i + 1) % slides.length);
      }, 5200);
    };
    const stop = () => { if (timer.current) clearInterval(timer.current); };
    start();
    document.addEventListener("visibilitychange", start);
    return () => { stop(); document.removeEventListener("visibilitychange", start); };
  }, [slides.length, reduce]);

  const jump = (i) => {
    setIdx(i);
    if (timer.current) clearInterval(timer.current);
    if (!reduce && slides.length > 1) {
      timer.current = setInterval(() => {
        if (!document.hidden) setIdx((p) => (p + 1) % slides.length);
      }, 5200);
    }
  };

  return (
    <section className="hero hero-full">
      <div className="slideshow">
        {slides.map((s, i) => (
          <div className={"slide" + (i === idx ? " active" : "")} key={i} aria-hidden={i !== idx}>
            <img src={s.img} alt={s.cap} loading={i === 0 ? "eager" : "lazy"} />
          </div>
        ))}
      </div>
      <div className="scrim"></div>
      <div className="inner">
        <div className="rise rise-1"><span className="hero-lockup"><Lockup /></span></div>
        <div className="hero-tag rise rise-2">{N.tagline}</div>
        <div className="hero-meta rise rise-3">
          <span>Baltimore</span><span className="dot">·</span>
          <span>Modern speakeasy</span><span className="dot">·</span>
          <span>Cocktails &amp; snacks</span>
        </div>
        <div className="rise rise-4" style={{ marginTop: 34, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Btn kind="accent" size="lg" onClick={() => go("reserve")}>Reserve a table</Btn>
          <Btn kind="ghost" size="lg" onClick={() => go("menu")}>See the menu</Btn>
        </div>
      </div>
      <div className="hero-dots">
        {slides.map((s, i) => (
          <button
            key={i}
            className={i === idx ? "on" : ""}
            aria-label={"Show slide " + (i + 1)}
            onClick={() => jump(i)}
          ></button>
        ))}
      </div>
    </section>
  );
}

function Home({ go }) {
  const N = window.NEST;
  const m = N.manifesto;
  const featured = ["Lobster croquettes", "Stuffed wings", "Salmon crudo"]
    .map((n) => N.food.find((f) => f.name === n))
    .filter(Boolean);
  return (
    <div className="page">
      <HeroSlideshow go={go} />

      {/* Manifesto — the description, set in the menu font */}
      <section className="section">
        <div className="wrap">
          <div className="manifesto">
            <p className="manifesto-lead">{m.lead}</p>
            <hr className="manifesto-rule" />
            {m.paras.map((p, i) => <p key={i}>{p}</p>)}
            <div style={{ marginTop: 36, textAlign: "center" }}>
              <ALink onClick={(e) => { e.preventDefault(); go("about"); }}>The story behind Nest</ALink>
            </div>
          </div>
        </div>
      </section>

      {/* Signature snacks */}
      <section className="section" style={{ background: "var(--nest-bg-2)", borderTop: "1px solid var(--nest-line)", borderBottom: "1px solid var(--nest-line)" }}>
        <div className="wrap">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 46 }}>
            <div>
              <Eyebrow>From the kitchen</Eyebrow>
              <h2 className="serif-h" style={{ fontSize: "clamp(30px,3.6vw,46px)", marginTop: 14 }}>Highly technical snacks.</h2>
            </div>
            <ALink onClick={(e) => { e.preventDefault(); go("menu"); }}>See the full menu</ALink>
          </div>
          <div className="grid-3">
            {featured.map((d, i) => (
              <article className="dish-card" key={i}>
                <Img src={d.img} alt={d.name} />
                <h4>{d.name}</h4>
                <p>{d.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Cocktail feature */}
      <section className="section">
        <div className="wrap">
          <div className="grid-2">
            <Img src="img/cocktail-lineup.jpg" alt="The Nest cocktail lineup" style={{ aspectRatio: "4/3" }} />
            <div>
              <Eyebrow>Behind the bar</Eyebrow>
              <h2 className="serif-h" style={{ fontSize: "clamp(30px,3.6vw,46px)", marginTop: 14 }}>
                Drinks built like <span style={{ fontStyle: "italic" }}>courses.</span>
              </h2>
              <p className="body" style={{ marginTop: 18 }}>
                Oxtail fat-washed bourbon with pimento smoke. Clarified tequila over single-origin Peru coffee. A Nest vesper finished with herb oil. Five signatures, plus a tight, well-chosen wine list.
              </p>
              <div style={{ marginTop: 22 }}>
                <ALink onClick={(e) => { e.preventDefault(); go("menu"); }}>Read the cocktail list</ALink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="section-sm">
        <div className="wrap-n" style={{ textAlign: "center" }}>
          <hr className="rule-accent" style={{ margin: "0 auto 28px" }} />
          <p className="quote">"Feed people well. Don't stop until they're happy."</p>
          <div className="quote-by">Loic Sany · Chef &amp; owner</div>
        </div>
      </section>

      {/* Visit CTA */}
      <section className="section" style={{ background: "var(--nest-bg-2)", borderTop: "1px solid var(--nest-line)" }}>
        <div className="wrap">
          <div className="grid-2">
            <div>
              <Eyebrow>Find us</Eyebrow>
              <h2 className="serif-h" style={{ fontSize: "clamp(30px,3.6vw,46px)", marginTop: 14 }}>
                A hidden room across from the Hippodrome.
              </h2>
              <p className="body" style={{ marginTop: 18 }}>{N.address.note}</p>
              <div style={{ marginTop: 26, display: "flex", gap: 14, flexWrap: "wrap" }}>
                <Btn kind="accent" onClick={() => go("reserve")}>Reserve a table</Btn>
                <Btn kind="ghost" onClick={() => go("visit")}>Hours &amp; directions</Btn>
              </div>
            </div>
            <Img src="img/board.jpg" alt="The board at Nest" style={{ aspectRatio: "4/3" }} />
          </div>
        </div>
      </section>
    </div>
  );
}

window.Home = Home;
