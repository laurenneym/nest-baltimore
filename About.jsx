// NEST — About page (Chef Loic Sany), ALA-style editorial composition.
function About({ go }) {
  const N = window.NEST;
  const c = N.chef;
  return (
    <div className="page">
      <section className="section" style={{ paddingTop: 72 }}>
        <div className="wrap">
          <div className="about-grid">
            {/* Left — sticky label */}
            <aside className="about-label">
              <div className="eyebrow">About NEST</div>
              <h1 className="serif-h about-name">{c.name}</h1>
              <div className="about-role">{c.role}</div>
              <p className="about-lede">{c.lede}</p>
              <div style={{ marginTop: 30, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Btn kind="accent" onClick={() => go("reserve")}>Reserve a table</Btn>
                <Btn kind="ghost" onClick={() => go("menu")}>View the menu</Btn>
              </div>
            </aside>

            {/* Center — long-form body */}
            <div className="about-body">
              {c.about.map((p, i) => (
                <p className="about-p" key={i}>{p}</p>
              ))}

              <div className="creds">
                <span className="cred"><b>Protégé</b> · 1 Michelin star</span>
                <span className="cred"><b>The Inn at Little Washington</b> · 3 Michelin stars</span>
                <span className="cred"><b>Fig &amp; Olive</b> · executive chef</span>
                <span className="cred"><b>Chopped</b> · finalist</span>
                <span className="cred"><b>Beat Bobby Flay</b> · competitor</span>
                <span className="cred"><b>Frederick Community College</b> · culinary arts</span>
              </div>
            </div>

            {/* Right — two photos: portrait first, then the room */}
            <div className="about-figcol">
              <figure className="about-fig">
                <Img src={c.portrait} alt={c.caption} style={{ aspectRatio: "4/5" }} />
                <figcaption className="cap"><span className="idx">01</span> {c.caption}</figcaption>
              </figure>
              <figure className="about-fig">
                <Img src="img/chef-loic.jpg" alt="Chef Loic Sany plating" style={{ aspectRatio: "3/4" }} />
                <figcaption className="cap"><span className="idx">02</span> In the Nest kitchen</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Pull quote */}
      <section className="section-sm" style={{ background: "var(--nest-bg-2)", borderTop: "1px solid var(--nest-line)", borderBottom: "1px solid var(--nest-line)" }}>
        <div className="wrap-n" style={{ textAlign: "center" }}>
          <hr className="rule-accent" style={{ margin: "0 auto 28px" }} />
          <p className="quote">"Feed people well. Don't stop until they're happy."</p>
          <div className="quote-by">Loic Sany · on his grandmother's lesson</div>
        </div>
      </section>

      {/* Plates strip removed — About keeps two photos (portrait + room) per brief */}

      <section className="section-sm" style={{ background: "var(--nest-bg-2)", borderTop: "1px solid var(--nest-line)" }}>
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <h3 className="serif-h" style={{ fontSize: "clamp(24px,3vw,38px)" }}>Come see the room.</h3>
          <Btn kind="accent" size="lg" onClick={() => go("reserve")}>Reserve a table</Btn>
        </div>
      </section>
    </div>
  );
}

window.About = About;
