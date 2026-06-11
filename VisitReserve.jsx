// NEST — Visit + Reserve pages.
const { useState: useStateVR } = React;

function Visit({ go }) {
  const N = window.NEST;
  return (
    <div className="page">
      <section className="section-sm" style={{ paddingTop: 80 }}>
        <div className="wrap">
          <Eyebrow>Visit</Eyebrow>
          <h1 className="display" style={{ fontSize: "clamp(46px,7.5vw,104px)", marginTop: 16 }}>
            Find the bookshelf.
          </h1>
        </div>
      </section>

      <section style={{ paddingBottom: 8 }}>
        <div className="wrap">
          <Img src="img/wings-topdown.jpg" alt="Caviar wing at Nest" style={{ aspectRatio: "16/8" }} />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="grid-2" style={{ alignItems: "start", gap: 64 }}>
            <div>
              <dl style={{ margin: 0 }}>
                <div className="info-row">
                  <dt>Address</dt>
                  <dd>{N.address.line1}<br /><span className="sub">{N.address.line2}</span></dd>
                </div>
                <div className="info-row">
                  <dt>Getting in</dt>
                  <dd className="sub">{N.address.note}</dd>
                </div>
                <div className="info-row">
                  <dt>Contact</dt>
                  <dd className="sub">
                    <a href={"mailto:" + N.contact.email} className="ilink">{N.contact.email}</a><br />
                    <a href={N.contact.instagramUrl} target="_blank" rel="noreferrer" className="ilink">{N.contact.instagram}</a>
                  </dd>
                </div>
                <div className="info-row">
                  <dt>Good to know</dt>
                  <dd className="sub">21+ after 9pm · Walk-ins welcome at the bar · No phone — email or reserve online.</dd>
                </div>
              </dl>
            </div>
            <div>
              <h3 className="serif-h" style={{ fontSize: "clamp(24px,2.6vw,34px)", marginBottom: 8 }}>Hours</h3>
              <dl style={{ margin: 0 }}>
                {N.hours.map(([d, h], i) => (
                  <div className="info-row" key={i} style={{ gridTemplateColumns: "1fr auto" }}>
                    <dt style={{ color: "var(--nest-fg)", fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: 16, letterSpacing: 0, textTransform: "none" }}>{d}</dt>
                    <dd className="sub" style={{ fontFamily: "var(--font-mono)", fontSize: 14 }}>{h}</dd>
                  </div>
                ))}
              </dl>
              <div style={{ marginTop: 32 }}>
                <Btn kind="accent" size="lg" onClick={() => go("reserve")}>Reserve a table</Btn>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Reserve({ go, toast }) {
  const N = window.NEST;
  const [form, setForm] = useStateVR({ name: "", email: "", date: "", time: "19:00", party: "2", notes: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    toast("Request sent — we'll confirm by email.");
  };
  return (
    <div className="page">
      <section className="section-sm" style={{ paddingTop: 80 }}>
        <div className="wrap">
          <Eyebrow>Reservations</Eyebrow>
          <h1 className="display" style={{ fontSize: "clamp(46px,7.5vw,104px)", marginTop: 16 }}>
            Hold a seat.
          </h1>
          <p className="lede" style={{ marginTop: 18, maxWidth: "48ch" }}>
            The room is small — booking ahead is the surest way in. The ten-seat bar holds a few spots for walk-ins each night.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div className="grid-2" style={{ alignItems: "start", gap: 56 }}>
            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div className="field">
                <label>Name</label>
                <input value={form.name} onChange={set("name")} placeholder="Your name" required />
              </div>
              <div className="field">
                <label>Email</label>
                <input type="email" value={form.email} onChange={set("email")} placeholder="you@email.com" required />
              </div>
              <div className="reserve-grid3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                <div className="field">
                  <label>Date</label>
                  <input type="date" value={form.date} onChange={set("date")} required />
                </div>
                <div className="field">
                  <label>Time</label>
                  <select value={form.time} onChange={set("time")}>
                    {["18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30","22:00"].map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label>Party</label>
                  <select value={form.party} onChange={set("party")}>
                    {["1","2","3","4","5","6"].map((p) => <option key={p} value={p}>{p}{p === "6" ? "+" : ""}</option>)}
                  </select>
                </div>
              </div>
              <div className="field">
                <label>Notes (optional)</label>
                <textarea rows="3" value={form.notes} onChange={set("notes")} placeholder="Occasion, seating preference, allergies"></textarea>
              </div>
              <div>
                <Btn kind="accent" size="lg">Request reservation</Btn>
              </div>
            </form>

            <aside>
              <Img src="img/croquettes-cocktail.jpg" alt="NEST" style={{ aspectRatio: "4/5" }} />
              <div style={{ marginTop: 24 }}>
                <h4 className="serif-h" style={{ fontSize: 22 }}>Good to know</h4>
                <p className="body" style={{ marginTop: 10, fontSize: 15 }}>
                  Parties of 6+ and buy-outs: email {N.contact.email}. Caviar service and the board are best reserved a day ahead.
                </p>
                <p className="body" style={{ marginTop: 12, fontSize: 15 }}>
                  {N.address.line1}, {N.address.line2}. Up the stairs, behind the bookshelf.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { Visit, Reserve });
