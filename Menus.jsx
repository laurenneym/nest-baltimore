// NEST — Menu page. Mirrors the NEST 2026 menu (cocktails, food, wine).
function MenuRow({ item }) {
  return (
    <div className="menu-row">
      <div className="menu-name">{item.name}</div>
      {item.desc ? <div className="menu-desc">{item.desc}</div> : null}
    </div>
  );
}

function MenuGroup({ label, note, items }) {
  return (
    <div className="menu-group">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6, flexWrap: "wrap", gap: 8 }}>
        <h3 className="serif-h" style={{ fontSize: "clamp(26px,3vw,38px)" }}>{label}</h3>
        {note && <span className="menu-note">{note}</span>}
      </div>
      {items.map((it, i) => <MenuRow key={i} item={it} />)}
    </div>
  );
}

function Menus({ go }) {
  const N = window.NEST;
  return (
    <div className="page">
      {/* Header */}
      <section className="section-sm" style={{ paddingTop: 80 }}>
        <div className="wrap">
          <Eyebrow>The menu</Eyebrow>
          <h1 className="display" style={{ fontSize: "clamp(48px,8vw,108px)", marginTop: 16 }}>
            Cocktails, food <em>&amp;</em> wine
          </h1>
          <p className="lede" style={{ marginTop: 20, maxWidth: "52ch" }}>
            A short, exact list that changes with the season and the market. This is the current 2026 menu — view it as a PDF below.
          </p>
          <div style={{ marginTop: 26 }}>
            <Btn kind="ghost" href={N.menuPdf} target="_blank">Open the 2026 menu (PDF)</Btn>
          </div>
        </div>
      </section>

      {/* Feature image band */}
      <section style={{ paddingBottom: 24 }}>
        <div className="wrap">
          <div className="grid-3" style={{ gap: 14 }}>
            <Img src="img/wings-serving.jpg" alt="Stuffed wings" style={{ aspectRatio: "3/4" }} />
            <Img src="img/croquettes.jpg" alt="Lobster croquettes" style={{ aspectRatio: "3/4" }} />
            <Img src="img/ceviche.jpg" alt="Salmon crudo" style={{ aspectRatio: "3/4" }} />
          </div>
        </div>
      </section>

      {/* Lists */}
      <section className="section" style={{ paddingTop: 56 }}>
        <div className="wrap">
          <div className="grid-2" style={{ alignItems: "start", gap: "72px" }}>
            <div>
              <MenuGroup label="Cocktails" items={N.cocktails} />
            </div>
            <div>
              <MenuGroup label="Food" items={N.food} />
              <MenuGroup label="Wine" items={N.wine} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm" style={{ background: "var(--nest-bg-2)", borderTop: "1px solid var(--nest-line)" }}>
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <h3 className="serif-h" style={{ fontSize: "clamp(24px,3vw,38px)" }}>Best enjoyed slowly, at the bar.</h3>
          <Btn kind="accent" size="lg" onClick={() => go("reserve")}>Reserve a table</Btn>
        </div>
      </section>
    </div>
  );
}

window.Menus = Menus;
