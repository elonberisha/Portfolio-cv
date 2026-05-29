// Template_t34cd — Hearing Record
// Court-reporter transcript portfolio. Examination format — Q. … A. … —
// with line numbers, page numbering, examiner-and-witness headers, and
// a reporter's certification block at the bottom. All set in Courier
// Prime; the typewriter feel and conversational Q/A is what sells the
// metaphor.
//
// Scoped under .t34 / .t34.dark (amber-on-black night transcript).

(function () {
  const SCOPE = "t34cd";

  function injectStyles() {
    if (document.getElementById("style-" + SCOPE)) return;
    const s = document.createElement("style");
    s.id = "style-" + SCOPE;
    s.textContent = `
.${SCOPE} {
  --paper:     #f4ecd9;
  --paper-2:   #ebe1c8;
  --ink:       #1a160c;
  --ink-2:     #3a3320;
  --muted:     #7a6f54;
  --rule:      rgba(26, 22, 12, 0.42);
  --rule-soft: rgba(26, 22, 12, 0.18);
  --red:       #883220;
  --lineno:    #9c8a6c;

  position: absolute; inset: 0;
  overflow-y: auto;
  background:
    repeating-linear-gradient(
      to bottom,
      transparent 0 17px,
      rgba(120, 90, 50, 0.04) 17px 18px
    ),
    var(--paper);
  color: var(--ink);
  font-family: "Courier Prime", "Courier New", monospace;
  font-size: 13px;
  line-height: 18px;
  -webkit-font-smoothing: antialiased;
}
.${SCOPE}.dark {
  --paper:     #0a0a06;
  --paper-2:   #131008;
  --ink:       #f1c277;             /* amber phosphor */
  --ink-2:     #d6a85a;
  --muted:     #8f7e58;
  --rule:      rgba(241, 194, 119, 0.36);
  --rule-soft: rgba(241, 194, 119, 0.16);
  --red:       #ff8074;
  --lineno:    #6d5e3f;
}

/* Outer page */
.${SCOPE}-page {
  position: relative;
  padding: 30px 56px 36px 100px;
}
.${SCOPE}-page-m { padding: 50px 22px 60px 56px; }

/* Two vertical rules (court transcript double-rule on the left) */
.${SCOPE}-rules {
  position: absolute; top: 0; bottom: 0;
  left: 64px; width: 14px;
  border-left: 1px solid var(--ink);
  border-right: 1px solid var(--ink);
  z-index: 1;
}
.${SCOPE}-page-m .${SCOPE}-rules { left: 36px; }

/* Line numbers */
.${SCOPE}-ln {
  position: absolute; top: 30px; bottom: 36px;
  left: 0; width: 64px;
  text-align: right;
  font-family: "Courier Prime", monospace;
  font-size: 11px;
  color: var(--lineno);
  padding-right: 18px;
  line-height: 18px;
  user-select: none;
  z-index: 2;
}
.${SCOPE}-page-m .${SCOPE}-ln { left: 0; width: 36px; padding-right: 8px; top: 50px; bottom: 60px; font-size: 9px; line-height: 17px; }
.${SCOPE}-ln i { display: block; font-style: normal; }

/* HEADER */
.${SCOPE}-head {
  position: relative; z-index: 3;
  text-align: center;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--ink);
  margin-bottom: 18px;
}
.${SCOPE}-head .court {
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.16em;
  margin: 0;
  text-transform: uppercase;
}
.${SCOPE}-head .sub {
  font-size: 11.5px;
  color: var(--ink-2);
  margin-top: 6px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.${SCOPE}-head .vline {
  display: flex; justify-content: center; align-items: center;
  gap: 14px;
  margin: 10px 0 6px;
  font-size: 12px;
  letter-spacing: 0.04em;
}
.${SCOPE}-head .vline b { font-weight: 700; }
.${SCOPE}-head .docket {
  display: inline-block;
  border: 2px solid var(--ink);
  padding: 4px 12px;
  margin-top: 8px;
  font-weight: 700;
  letter-spacing: 0.12em;
  font-size: 11px;
}

/* Examination title */
.${SCOPE}-extitle {
  position: relative; z-index: 3;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.1em;
  margin: 14px 0 12px;
  padding: 4px 0;
  border-top: 1px solid var(--ink);
  border-bottom: 1px solid var(--ink);
}
.${SCOPE}-extitle .l { float: left; }
.${SCOPE}-extitle .r { float: right; }
.${SCOPE}-extitle::after { content: ""; display: block; clear: both; }

/* Q&A — preserve fixed 18px line height for line numbers to align */
.${SCOPE}-qa {
  position: relative; z-index: 3;
  display: grid;
  grid-template-columns: 26px 1fr;
  gap: 6px;
  margin-bottom: 0;
  line-height: 18px;
  align-items: start;
}
.${SCOPE}-qa .lbl {
  font-weight: 700;
  text-align: left;
  letter-spacing: 0.04em;
  font-size: 13px;
}
.${SCOPE}-qa .lbl.q { color: var(--ink); }
.${SCOPE}-qa .lbl.a { color: var(--red); }
.${SCOPE}-qa .txt {
  margin: 0;
  font-size: 13px;
}
.${SCOPE}-qa .txt b { font-weight: 700; letter-spacing: 0.04em; }
.${SCOPE}-qa .txt em { font-style: italic; color: var(--ink-2); }
.${SCOPE}-qa.indent { padding-left: 32px; }

/* Section header inline */
.${SCOPE}-sec {
  position: relative; z-index: 3;
  text-align: center;
  font-weight: 700;
  font-size: 11.5px;
  letter-spacing: 0.18em;
  margin: 16px 0 12px;
  padding: 4px 0;
  border-top: 1px dashed var(--ink);
  border-bottom: 1px dashed var(--ink);
  text-transform: uppercase;
}

/* Reporter's certification footer */
.${SCOPE}-cert {
  position: relative; z-index: 3;
  margin-top: 26px;
  border-top: 2px solid var(--ink);
  padding-top: 16px;
  display: grid;
  grid-template-columns: 1fr 200px;
  gap: 24px;
}
.${SCOPE}-cert .body {
  font-size: 12px;
  line-height: 1.6;
}
.${SCOPE}-cert .body p { margin: 0 0 8px; }
.${SCOPE}-cert .body b { font-weight: 700; letter-spacing: 0.04em; }
.${SCOPE}-cert .stamp {
  border: 2px solid var(--red);
  color: var(--red);
  padding: 14px 10px;
  text-align: center;
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  transform: rotate(-3deg);
}
.${SCOPE}-cert .stamp b {
  display: block;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.06em;
  margin: 2px 0;
}
.${SCOPE}-cert .sigblock {
  margin-top: 10px;
  border-bottom: 1px solid var(--ink);
  padding-bottom: 4px;
  font-family: "Caveat", cursive;
  font-size: 28px;
  line-height: 1;
  color: var(--ink);
  transform: rotate(-1.5deg);
  transform-origin: bottom left;
  display: inline-block;
}
.${SCOPE}-cert .sigcap {
  font-size: 10.5px;
  margin-top: 4px;
  color: var(--ink-2);
  letter-spacing: 0.06em;
}
`;
    document.head.appendChild(s);
  }

  function LineNo({ count }) {
    return (
      <div className={`${SCOPE}-ln`}>
        {Array.from({ length: count }).map((_, i) => (
          <i key={i}>{String(i + 1).padStart(2, "0")}</i>
        ))}
      </div>
    );
  }

  function QA({ q, a, indent }) {
    return (
      <React.Fragment>
        <div className={`${SCOPE}-qa${indent ? " indent" : ""}`}>
          <span className="lbl q">Q.</span>
          <p className="txt">{q}</p>
        </div>
        <div className={`${SCOPE}-qa${indent ? " indent" : ""}`}>
          <span className="lbl a">A.</span>
          <p className="txt">{a}</p>
        </div>
      </React.Fragment>
    );
  }

  function SectionHead({ text }) {
    return <div className={`${SCOPE}-sec`}>·   {text}   ·</div>;
  }

  function Desktop({ persona }) {
    const ed = persona.education;
    const exp = persona.experience;
    const moot = persona.mooting;
    const langs = persona.languages.map(l => `${l.name} (${l.cefr})`).join(", ");
    const pubsTop = persona.publications.slice(0, 2);

    return (
      <div className={`${SCOPE}-page`}>
        <LineNo count={42} />
        <div className={`${SCOPE}-rules`} />

        <div className={`${SCOPE}-head`}>
          <p className="court">In the High Court of Justice — King's Bench Division</p>
          <p className="sub">Pupillage Application Hearings · 2026 / 27 Intake</p>
          <p className="vline">
            <span>Examination of</span>
            <b>MR. EWAN KAVANAGH</b>
            <span>before the Pupillage Committee.</span>
          </p>
          <span className="docket">CLAIM No. {persona.docketNumber}</span>
        </div>

        <div className={`${SCOPE}-extitle`}>
          <span className="l">EXAMINATION-IN-CHIEF BY MS. R. AYALA KC.</span>
          <span className="r">PAGE 1 OF 1.</span>
        </div>

        <QA q={<><b>State your full name for the record, please.</b></>}
            a={<>{persona.name}.</>} />

        <QA q={<>And your present age and residence?</>}
            a={<>I am 22, of {persona.location}.</>} />

        <QA q={<>Where do you presently study, Mr Kavanagh?</>}
            a={<>I am in the final year of the <b>Bachelor of Laws</b> at <em>{persona.institution}</em>, in the <em>{persona.faculty}</em>.</>} />

        <QA q={<>And the doctrinal area of your interest?</>}
            a={<><em>{persona.specialization}</em>. Particular concern, my Lady, with the relationship between Parliament and the European Convention on Human Rights.</>} />

        <SectionHead text="ON EDUCATION" />

        <QA q={<>Take us through the educational record, please &mdash; from secondary upwards.</>}
            a={<><em>{ed[2].degree}</em> at <em>{ed[2].org}</em>, {ed[2].period}; thereafter the <em>{ed[0].degree}</em> at <em>{ed[0].org}</em>, {ed[0].period}. I also undertook an exchange semester at <em>{ed[1].org.split(" · ")[0]}</em> in <em>{ed[1].period}</em>.</>} />

        <QA q={<>Predicted class in the LLB?</>}
            a={<>A <b>First</b>, on present indications.</>} />

        <SectionHead text="ON THE MOOTING RECORD" />

        <QA q={<>How many competitive moots in your three years, would you say?</>}
            a={<>Eight, my Lady.</>} />

        <QA q={<>Take us through the most material of those.</>}
            a={<>The most material would be <em>{moot[0].name}</em> &mdash; {moot[0].outcome.toLowerCase()}; <em>{moot[1].name}</em> &mdash; {moot[1].outcome.toLowerCase()}; and <em>{moot[3].name}</em> &mdash; {moot[3].outcome.toLowerCase()}.</>} />

        <QA q={<>And in each, you were &mdash;</>}
            a={<>Counsel, my Lady. {moot[1].role} at <em>{moot[1].name}</em>.</>} />

        <SectionHead text="ON PUBLICATIONS" />

        <QA q={<>Are you presently published, Mr Kavanagh?</>}
            a={<>I am, my Lady. <em>"{pubsTop[0].title}"</em>, a case note in <em>{pubsTop[0].venue}</em>, {pubsTop[0].pages}, in <em>{pubsTop[0].year}</em>; and a co-authored article, <em>"{pubsTop[1].title}"</em>, in <em>{pubsTop[1].venue}</em>, {pubsTop[1].year}.</>} />

        <QA q={<>You are also an editor, I understand?</>}
            a={<><b>Editor-in-Chief</b> of the <em>UCL Bentham Law Review</em>, for the academic year 2025/26.</>} />

        <SectionHead text="ON PRACTICAL EXPERIENCE" />

        <QA q={<>Place your placements before the Committee.</>}
            a={<>Most recently, a vacation scheme at <em>{exp[0].org}</em>, {exp[0].period}; before that, a legal internship at <em>{exp[1].org}</em>, {exp[1].period}; a visiting research role at the <em>{exp[2].org.split(" · ")[0]}</em>, {exp[2].period}; and ongoing pro bono case-work at the <em>{exp[3].org}</em>.</>} />

        <QA q={<>How many pro bono hours have you recorded?</>}
            a={<>Seventy-five plus, my Lady; the figure was audited by the Clinic in March.</>} />

        <QA q={<>Anything in the way of court marshalling?</>}
            a={<>Yes &mdash; two weeks with <em>{exp[4].org}</em>, Easter Term 2023.</>} />

        <SectionHead text="ON LANGUAGES AND SUNDRIES" />

        <QA q={<>Languages, Mr Kavanagh?</>}
            a={<>{langs}. The French and German were deployed at <em>Sciences Po</em> and at the <em>Strasbourg</em> Registry.</>} />

        <QA q={<>Distinctions of which the Committee should be apprised?</>}
            a={<>The <em>Hardwicke Entrance Scholarship</em> of <em>{persona.courtSeat}</em>, 2022; the Faculty Prize in Constitutional Law, 2024; and Best Memorial at Jessup (Regional), 2025.</>} />

        <QA q={<>And outside the law?</>}
            a={<><em>Talking Newspaper for the Blind</em>, Lambeth, weekly; UCL Law Society Moots Officer in 2024/25.</>} />

        <SectionHead text="ON AVAILABILITY" />

        <QA q={<>When are you available to commence?</>}
            a={<><b>July 2026</b>, my Lady, after sitting the final Bar Course assessments.</>} />

        <QA q={<>And for any further correspondence?</>}
            a={<><em>{persona.email}</em>; <em>{persona.phone}</em>; matters online at <em>{persona.url}</em>.</>} />

        <QA q={<>No further questions for this witness, my Lady.</>}
            a={<><em>(WITNESS STOOD DOWN at 14:42 hrs.)</em></>} />

        {/* CERTIFICATION */}
        <div className={`${SCOPE}-cert`}>
          <div className="body">
            <p><b>REPORTER'S CERTIFICATE.</b></p>
            <p>
              I, <b>R. M. CHEN</b>, Official Shorthand Writer to the Court, do hereby certify
              that the foregoing transcript, comprising one page, is a true and accurate
              record of the examination of <b>{persona.name.toUpperCase()}</b> taken
              before the Pupillage Committee, sitting at <b>{persona.courtSeat}</b>,
              on Thursday, the 14th day of May, 2026, between 14:18 and 14:42 hours.
            </p>
            <p style={{ color: "var(--muted)" }}>
              Dated this 14<sup>th</sup> day of May, 2026 &mdash; Reference {persona.docketNumber}.
            </p>
            <div className="sigblock">R. M. Chen</div>
            <div className="sigcap">R. M. CHEN, OFFICIAL SHORTHAND WRITER</div>
          </div>
          <div>
            <div className={`${SCOPE}-cert .stamp ${SCOPE}-cert`}>
              <div className="stamp">
                CERTIFIED TRUE
                <b>RECORD</b>
                14 V MMXXVI
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function Mobile({ persona }) {
    const ed = persona.education;
    const exp = persona.experience;
    const moot = persona.mooting;
    const pubsTop = persona.publications.slice(0, 2);

    return (
      <div style={{ position: "absolute", inset: 0, overflowY: "auto" }}>
        <div className={`${SCOPE}-page-m`}>
          <LineNo count={68} />
          <div className={`${SCOPE}-rules`} />

          <div className={`${SCOPE}-head`} style={{ paddingBottom: 8 }}>
            <p className="court" style={{ fontSize: 10 }}>In the High Court of Justice</p>
            <p className="sub" style={{ fontSize: 8.5, marginTop: 4 }}>Pupillage Hearings · 2026</p>
            <p className="vline" style={{ fontSize: 10, margin: "6px 0 4px", gap: 6 }}>
              Examination of <b>MR. EWAN KAVANAGH</b>
            </p>
            <span className="docket" style={{ fontSize: 9, padding: "2px 8px" }}>CLAIM № {persona.docketNumber}</span>
          </div>

          <div className={`${SCOPE}-extitle`} style={{ fontSize: 10 }}>
            <span className="l">EXAM-IN-CHIEF · MS. AYALA KC</span>
            <span className="r">P. 1</span>
          </div>

          <QA q={<><b>State your name.</b></>} a={<>{persona.name}.</>} />
          <QA q={<>Where do you study?</>} a={<>Final-year LLB at <em>{persona.institution}</em>.</>} />
          <QA q={<>Doctrinal interest?</>} a={<><em>{persona.specialization}</em>.</>} />

          <SectionHead text="EDUCATION" />
          <QA q={<>Walk us through.</>} a={<><em>{ed[0].degree}</em>, {ed[0].org.split(" · ")[0]}, {ed[0].period}; exchange at <em>{ed[1].org.split(" · ")[0]}</em>.</>} />
          <QA q={<>Predicted class?</>} a={<>A <b>First</b>.</>} />

          <SectionHead text="MOOTS" />
          <QA q={<>How many?</>} a={<>Eight.</>} />
          <QA q={<>Most material?</>}
              a={<><em>{moot[0].name}</em> ({moot[0].outcome.toLowerCase()}); <em>{moot[1].name}</em> ({moot[1].outcome.toLowerCase()}); <em>{moot[3].name}</em> ({moot[3].outcome.toLowerCase()}).</>} />

          <SectionHead text="PUBLICATIONS" />
          <QA q={<>Published?</>} a={<><em>"{pubsTop[0].title}"</em>, <em>{pubsTop[0].venue.split(" · ")[0]}</em>, {pubsTop[0].year}.</>} />
          <QA q={<>Editor?</>} a={<>Editor-in-Chief, <em>UCL Bentham Law Review</em>.</>} />

          <SectionHead text="EXPERIENCE" />
          <QA q={<>Recent placements?</>}
              a={<><em>{exp[0].org}</em>, {exp[0].period}; <em>{exp[1].org.split(" · ")[0]}</em>, {exp[1].period}; <em>{exp[2].org.split(" · ")[0]}</em>, {exp[2].period}.</>} />

          <SectionHead text="LANGUAGES" />
          <QA q={<>Languages?</>} a={<>{persona.languages.map(l => `${l.name} (${l.cefr})`).join(", ")}.</>} />

          <SectionHead text="AVAILABILITY" />
          <QA q={<>When?</>} a={<><b>July 2026</b>.</>} />
          <QA q={<>Correspondence?</>} a={<><em>{persona.email}</em>; <em>{persona.phone}</em>.</>} />
          <QA q={<>No further questions.</>} a={<><em>(WITNESS STOOD DOWN.)</em></>} />

          <div className={`${SCOPE}-cert`} style={{ gridTemplateColumns: "1fr", gap: 14 }}>
            <div className="body" style={{ fontSize: 10.5 }}>
              <p><b>REPORTER'S CERTIFICATE.</b></p>
              <p>I, <b>R. M. CHEN</b>, certify that the foregoing transcript is a true record of the examination of <b>{persona.name.toUpperCase()}</b>, 14 May 2026.</p>
              <div className="sigblock" style={{ fontSize: 22 }}>R. M. Chen</div>
              <div className="sigcap" style={{ fontSize: 9 }}>OFFICIAL SHORTHAND WRITER</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function Template_t34cd({ persona, mode, dark }) {
    React.useEffect(injectStyles, []);
    return (
      <div className={`${SCOPE}${dark ? " dark" : ""}`}>
        {mode === "mobile" ? <Mobile persona={persona} /> : <Desktop persona={persona} />}
      </div>
    );
  }

  window.Template_t34cd = Template_t34cd;
})();

