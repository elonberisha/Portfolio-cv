(function () {
  /* ══════════════════════════════════════════════════════════════════
     EUPASS STANDARD CV — 5 visual variants sharing common structure
     Each variant: window.EupassCV_classic / modern / minimal / executive / fresh
     All follow Europass section ordering & CEFR language table.
     ══════════════════════════════════════════════════════════════════ */

  /* ── shared helpers ─────────────────────────────────────────────── */
  function parseLangs(langs) {
    if (!langs || !langs.length) return [];
    if (typeof langs[0] === "string") {
      return langs.map(function (s) {
        var m = s.match(/^(.+?)\s*\((.+?)\)$/);
        if (m) {
          var raw = m[2].trim();
          var cefr =
            /^[ABC][12]$/.test(raw) ? raw
            : raw.toLowerCase().includes("native") || raw.toLowerCase().includes("fluent") ? "C2"
            : raw.toLowerCase().includes("heritage") ? "B1"
            : "—";
          return { name: m[1].trim(), level: m[2].trim(), cefr: cefr };
        }
        return { name: s, level: "—", cefr: "—" };
      });
    }
    return langs;
  }

  function per(e) { return e.period || e.time || ""; }
  function det(e) { return e.bullets || (e.note ? [e.note] : []); }
  function eduN(e) { return e.notes || ""; }
  function expandCefr(c) { return [c, c, c, c, c]; }

  /* get flat skill strings from any persona shape */
  function flatSkills(p) {
    if (Array.isArray(p.skills)) {
      return typeof p.skills[0] === "string" ? p.skills : p.skills.map(function(s){ return s.name || s; });
    }
    if (p.skills && typeof p.skills === "object") {
      var out = [];
      Object.keys(p.skills).forEach(function(k) {
        (p.skills[k] || []).forEach(function(s) { out.push(typeof s === "string" ? s : s.name || s); });
      });
      return out;
    }
    return [];
  }

  /* ── inject one stylesheet by id ────────────────────────────────── */
  function injectOnce(id, css) {
    if (document.getElementById(id)) return;
    var s = document.createElement("style");
    s.id = id;
    s.textContent = css;
    document.head.appendChild(s);
  }

  /* ── shared section renderers ───────────────────────────────────── */
  var h = React.createElement;

  function InfoGrid(cls, rows) {
    var children = [];
    rows.forEach(function(r) {
      if (!r[1]) return;
      children.push(h("div", { key: r[0]+"l", className: cls+"-info-label" }, r[0]));
      children.push(h("div", { key: r[0]+"v", className: cls+"-info-val" }, r[1]));
    });
    if (!children.length) return null;
    return h("div", { className: cls+"-info-grid" }, children);
  }

  function Timeline(cls, items) {
    return items.map(function(e, i) {
      var bullets = det(e);
      return h("div", { key: i, className: cls+"-tl" }, [
        h("div", { key: "d", className: cls+"-tl-date" }, per(e)),
        h("div", { key: "c" }, [
          h("div", { key: "r", className: cls+"-tl-title" }, e.role || e.degree),
          (e.org) && h("div", { key: "o", className: cls+"-tl-org" }, e.org),
          eduN(e) && h("div", { key: "n", className: cls+"-tl-note" }, eduN(e)),
          bullets.length > 0 && h("ul", { key: "b", className: cls+"-tl-bullets" },
            bullets.map(function(b, j) { return h("li", { key: j }, b); })
          ),
        ]),
      ]);
    });
  }

  function CefrTable(cls, langs) {
    if (!langs.length) return null;
    return h("table", { className: cls+"-cefr" }, [
      h("thead", { key: "th" }, [
        h("tr", { key: "r1" }, [
          h("th", { key: 0, rowSpan: 2 }, "Language"),
          h("th", { key: 1, colSpan: 2 }, "Understanding"),
          h("th", { key: 2, colSpan: 2 }, "Speaking"),
          h("th", { key: 3 }, "Writing"),
        ]),
        h("tr", { key: "r2" }, [
          h("th", { key: 0 }, "Listening"),
          h("th", { key: 1 }, "Reading"),
          h("th", { key: 2 }, "Interaction"),
          h("th", { key: 3 }, "Production"),
          h("th", { key: 4 }, "Writing"),
        ]),
      ]),
      h("tbody", { key: "tb" }, langs.map(function(l, i) {
        var cells = expandCefr(l.cefr);
        return h("tr", { key: i }, [
          h("td", { key: "n" }, l.name + (l.level && l.level !== l.cefr ? " (" + l.level + ")" : "")),
        ].concat(cells.map(function(c, j) { return h("td", { key: j }, c); })));
      })),
    ]);
  }

  function SkillChips(cls, skills) {
    if (!skills.length) return null;
    return h("div", { className: cls+"-chips" },
      skills.map(function(s, i) { return h("span", { key: i, className: cls+"-chip" }, s); })
    );
  }

  function SimpleList(cls, items, renderItem) {
    if (!items.length) return null;
    return h("ul", { className: cls+"-list" },
      items.map(function(item, i) { return h("li", { key: i }, renderItem(item)); })
    );
  }

  /* domain-specific sections (only render if data exists) */
  function DomainSections(cls, p, secH) {
    var sections = [];

    /* rotations (med) */
    if (p.rotations && p.rotations.length) {
      sections.push(h("div", { key: "rot", className: cls+"-section" }, [
        secH("Clinical Rotations"),
        h("table", { className: cls+"-table" }, [
          h("thead", { key: "th" }, h("tr", null, [
            h("th", { key: 0 }, "Service"), h("th", { key: 1 }, "Site"),
            h("th", { key: 2 }, "Period"), h("th", { key: 3 }, "Lead"),
          ])),
          h("tbody", { key: "tb" }, p.rotations.map(function(r, i) {
            return h("tr", { key: i }, [
              h("td", { key: 0 }, h("strong", null, r.service)), h("td", { key: 1 }, r.site),
              h("td", { key: 2 }, r.period), h("td", { key: 3 }, r.lead),
            ]);
          })),
        ]),
      ]));
    }

    /* mooting (law) */
    if (p.mooting && p.mooting.length) {
      sections.push(h("div", { key: "moot", className: cls+"-section" }, [
        secH("Mooting & Competitions"),
        h("table", { className: cls+"-table" }, [
          h("thead", { key: "th" }, h("tr", null, [
            h("th", { key: 0 }, "Competition"), h("th", { key: 1 }, "Role"),
            h("th", { key: 2 }, "Outcome"), h("th", { key: 3 }, "Year"),
          ])),
          h("tbody", { key: "tb" }, p.mooting.map(function(m, i) {
            return h("tr", { key: i }, [
              h("td", { key: 0 }, h("strong", null, m.name)), h("td", { key: 1 }, m.role),
              h("td", { key: 2 }, m.outcome), h("td", { key: 3 }, m.year),
            ]);
          })),
        ]),
      ]));
    }

    /* coached (sport) */
    if (p.coached && p.coached.length) {
      sections.push(h("div", { key: "coach", className: cls+"-section" }, [
        secH("Coaching & Squad Experience"),
      ].concat(Timeline(cls, p.coached.map(function(c) {
        return { role: c.role + " — " + c.squad, org: c.result || "", period: c.period, bullets: (c.outcomes||[]).map(function(o){ return o.stat+" "+o.label; }) };
      })))));
    }

    /* fields (agri) */
    if (p.fields && p.fields.length) {
      sections.push(h("div", { key: "field", className: cls+"-section" }, [
        secH("Field Projects"),
        h("table", { className: cls+"-table" }, [
          h("thead", { key: "th" }, h("tr", null, [
            h("th", { key: 0 }, "Project"), h("th", { key: 1 }, "Location"),
            h("th", { key: 2 }, "Crop / Land"), h("th", { key: 3 }, "Year"),
          ])),
          h("tbody", { key: "tb" }, p.fields.map(function(f, i) {
            return h("tr", { key: i }, [
              h("td", { key: 0 }, h("strong", null, f.name)), h("td", { key: 1 }, f.loc),
              h("td", { key: 2 }, f.crop), h("td", { key: 3 }, f.year),
            ]);
          })),
        ]),
      ]));
    }

    /* research / publications */
    var pubs = p.research || p.publications || [];
    if (pubs.length) {
      sections.push(h("div", { key: "pubs", className: cls+"-section" }, [
        secH("Research & Publications"),
        h("ol", { className: cls+"-list" }, pubs.map(function(r, i) {
          return h("li", { key: i }, [
            h("span", { key: "y", className: cls+"-list-year" }, r.year),
            h("strong", { key: "t" }, r.title),
            r.venue ? h("span", { key: "v", style: { color: "#666" } }, " — " + r.venue) : null,
            r.status ? h("span", { key: "s", className: cls+"-pub-status" }, r.status) : null,
          ]);
        })),
      ]));
    }

    /* writing (if no research) */
    var wri = p.writing || [];
    if (wri.length && !pubs.length) {
      sections.push(h("div", { key: "wri", className: cls+"-section" }, [
        secH("Publications & Writing"),
        h("ol", { className: cls+"-list" }, wri.map(function(w, i) {
          return h("li", { key: i }, [
            h("span", { key: "y", className: cls+"-list-year" }, w.year),
            h("strong", { key: "t" }, w.title),
            w.where ? h("span", { key: "v", style: { color: "#666" } }, " — " + w.where) : null,
          ]);
        })),
      ]));
    }

    /* certs */
    if (p.certs && p.certs.length) {
      sections.push(h("div", { key: "cert", className: cls+"-section" }, [
        secH("Certifications & Licences"),
        h("ul", { className: cls+"-list" }, p.certs.map(function(c, i) {
          return h("li", { key: i }, [
            h("strong", { key: "n" }, c.name),
            c.body ? h("span", { key: "b", style: { color: "#666" } }, " — " + c.body) : null,
            c.status ? h("span", { key: "s", className: cls+"-badge" }, c.status) : null,
          ]);
        })),
      ]));
    }

    return sections;
  }

  function ProjectsSection(cls, p, secH) {
    var proj = p.projects || [];
    if (!proj.length) return null;
    return h("div", { className: cls+"-section" }, [
      secH("Projects"),
    ].concat(Timeline(cls, proj.slice(0,6).map(function(pr) {
      return { role: pr.title, org: pr.kind, time: pr.year, note: pr.note };
    }))));
  }

  function AwardsSection(cls, p, secH) {
    var awards = p.awards || [];
    if (!awards.length) return null;
    return h("div", { className: cls+"-section" }, [
      secH("Awards & Honours"),
      h("ul", { className: cls+"-list" }, awards.map(function(a, i) {
        return h("li", { key: i }, [
          h("span", { key: "y", className: cls+"-list-year" }, a.year || ""),
          h("strong", { key: "n" }, a.name),
          a.org ? h("span", { key: "o", style: { color: "#666" } }, " — " + a.org) : null,
        ]);
      })),
    ]);
  }

  function ActivitiesSection(cls, p, secH) {
    var acts = p.activities || p.extras || [];
    if (!acts.length) return null;
    return h("div", { className: cls+"-section" }, [
      secH("Additional Information"),
      h("ul", { className: cls+"-list" }, acts.map(function(a, i) {
        return h("li", { key: i }, a);
      })),
    ]);
  }

  /* ════════════════════════════════════════════════════════════════
     VARIANT 1 — CLASSIC
     Blue accent #2952a3, IBM Plex Serif headings, traditional layout
     ════════════════════════════════════════════════════════════════ */
  var CLS1 = "epc";
  var AC1 = "#2952a3";
  injectOnce(CLS1+"-sty", [
    "."+CLS1+"{font-family:'Inter',sans-serif;font-size:13px;line-height:1.55;color:#1a1a1a;background:#fff;min-height:100%;padding:0;container-type:inline-size;}",
    "."+CLS1+"-hdr{padding:32px 36px 22px;border-bottom:3px solid "+AC1+";}",
    "."+CLS1+"-hdr h1{font-family:'IBM Plex Serif',serif;font-size:28px;font-weight:700;margin:0 0 2px;color:"+AC1+";letter-spacing:-0.01em;}",
    "."+CLS1+"-hdr .sub{font-size:14px;color:#555;margin:0;}",
    "."+CLS1+"-section{padding:18px 36px;border-bottom:1px solid #eee;}",
    "."+CLS1+"-section:last-child{border-bottom:0;}",
    "."+CLS1+"-sh{font-family:'IBM Plex Serif',serif;font-size:14px;font-weight:700;color:"+AC1+";margin:0 0 12px;text-transform:uppercase;letter-spacing:0.05em;border-bottom:1.5px solid "+AC1+";padding-bottom:5px;}",
    "."+CLS1+"-info-grid{display:grid;grid-template-columns:140px 1fr;gap:3px 16px;font-size:12.5px;}",
    "."+CLS1+"-info-label{color:"+AC1+";font-weight:600;text-transform:uppercase;font-size:10px;letter-spacing:0.08em;padding:3px 0;}",
    "."+CLS1+"-info-val{padding:3px 0;}",
    "."+CLS1+"-summary{font-style:italic;color:#444;font-size:13px;line-height:1.6;max-width:640px;}",
    "."+CLS1+"-tl{display:grid;grid-template-columns:130px 1fr;gap:4px 20px;margin-bottom:10px;font-size:12.5px;}",
    "."+CLS1+"-tl-date{color:"+AC1+";font-weight:600;font-size:11px;}",
    "."+CLS1+"-tl-title{font-weight:600;font-size:13px;}",
    "."+CLS1+"-tl-org{color:#555;font-size:12px;}",
    "."+CLS1+"-tl-note{color:#666;font-size:11.5px;margin-top:1px;}",
    "."+CLS1+"-tl-bullets{margin:3px 0 0;padding-left:16px;color:#444;font-size:12px;}",
    "."+CLS1+"-tl-bullets li{margin-bottom:2px;}",
    "."+CLS1+"-cefr{width:100%;border-collapse:collapse;font-size:11px;margin-top:8px;}",
    "."+CLS1+"-cefr th,."+CLS1+"-cefr td{border:1px solid #ccc;padding:5px 7px;text-align:center;}",
    "."+CLS1+"-cefr thead th{background:"+AC1+";color:#fff;font-weight:600;font-size:10px;text-transform:uppercase;}",
    "."+CLS1+"-cefr tbody td:first-child{text-align:left;font-weight:600;background:#f5f7fa;}",
    "."+CLS1+"-cefr tbody td{background:#fafbfc;}",
    "."+CLS1+"-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px;}",
    "."+CLS1+"-chip{background:#e8edf5;color:#2a2a2a;font-size:11px;padding:4px 10px;border-radius:3px;border:1px solid #d0d8e8;}",
    "."+CLS1+"-list{margin:0;padding-left:18px;font-size:12.5px;color:#333;}",
    "."+CLS1+"-list li{margin-bottom:5px;}",
    "."+CLS1+"-list-year{color:"+AC1+";font-weight:600;margin-right:8px;font-size:11px;}",
    "."+CLS1+"-pub-status{color:"+AC1+";font-weight:600;margin-left:8px;font-size:10.5px;}",
    "."+CLS1+"-table{width:100%;border-collapse:collapse;font-size:12px;margin-top:6px;}",
    "."+CLS1+"-table th{background:"+AC1+";color:#fff;font-weight:600;font-size:10px;text-transform:uppercase;padding:5px 8px;text-align:left;}",
    "."+CLS1+"-table td{border-bottom:1px solid #e5e5e5;padding:5px 8px;vertical-align:top;}",
    "."+CLS1+"-badge{display:inline-block;font-size:10px;padding:2px 7px;border-radius:3px;font-weight:600;margin-left:6px;background:#d4edda;color:#155724;}",
    "."+CLS1+"-foot{padding:14px 36px;font-size:10px;color:#aaa;letter-spacing:0.06em;text-transform:uppercase;display:flex;justify-content:space-between;border-top:2px solid "+AC1+";}",
    "@container(max-width:600px){",
    "  ."+CLS1+"-hdr{padding:20px 18px 16px;} ."+CLS1+"-hdr h1{font-size:22px;}",
    "  ."+CLS1+"-section{padding:14px 18px;}",
    "  ."+CLS1+"-info-grid{grid-template-columns:100px 1fr;}",
    "  ."+CLS1+"-tl{grid-template-columns:1fr;gap:2px;}",
    "  ."+CLS1+"-cefr{font-size:9px;} ."+CLS1+"-cefr th,."+CLS1+"-cefr td{padding:3px 4px;}",
    "  ."+CLS1+"-foot{padding:10px 18px;flex-direction:column;gap:4px;}",
    "  ."+CLS1+"-table{font-size:10.5px;} ."+CLS1+"-table th,."+CLS1+"-table td{padding:4px 5px;}",
    "}",
  ].join("\n"));

  window.EupassCV_classic = function(props) {
    var p = props.persona; var cls = CLS1;
    var langs = parseLangs(p.languages);
    var skills = flatSkills(p);
    var secH = function(t){ return h("h2",{key:"h_"+t,className:cls+"-sh"},t); };
    return h("div",{className:cls},[
      h("div",{key:"hdr",className:cls+"-hdr"},[
        h("h1",{key:"n"},p.name),
        h("p",{key:"s",className:"sub"},(p.field||p.role||"")+(p.institution||p.school?" · "+(p.institution||p.school):"")),
      ]),
      h("div",{key:"info",className:cls+"-section"},[ secH("Personal Information"), InfoGrid(cls,[["Address",p.location],["Phone",p.phone],["Email",p.email],["Date of birth",p.dob],["Website",p.url],["Specialisation",p.specialization]]) ]),
      (p.summary||p.tagline)&&h("div",{key:"sum",className:cls+"-section"},[ secH("Professional Summary"), h("p",{key:"p",className:cls+"-summary"},p.summary||p.tagline) ]),
      (p.experience||[]).length>0&&h("div",{key:"exp",className:cls+"-section"},[ secH("Work Experience") ].concat(Timeline(cls,p.experience))),
      (p.education||[]).length>0&&h("div",{key:"edu",className:cls+"-section"},[ secH("Education and Training") ].concat(Timeline(cls,p.education.map(function(e){return{role:e.degree,org:e.org,period:e.period,time:e.time,notes:e.notes||""};})))),
      h("div",{key:"skills",className:cls+"-section"},[
        secH("Personal Skills"),
        langs.length>0&&h("div",{key:"lang",style:{marginBottom:16}},[
          h("div",{key:"lbl",style:{fontWeight:600,fontSize:12,marginBottom:6,color:AC1}},"Languages"),
          CefrTable(cls,langs),
        ]),
        skills.length>0&&h("div",{key:"dsk"},[
          h("div",{key:"lbl",style:{fontWeight:600,fontSize:12,marginBottom:6,color:AC1}},"Digital / Technical Skills"),
          SkillChips(cls,skills),
        ]),
      ]),
    ].concat(DomainSections(cls,p,secH)).concat([
      ProjectsSection(cls,p,secH),
      AwardsSection(cls,p,secH),
      ActivitiesSection(cls,p,secH),
      h("div",{key:"foot",className:cls+"-foot"},[
        h("span",{key:"a"},"Eupass Standard CV · Classic"),
        h("span",{key:"b"},p.name+" · "+(p.email||"")),
      ]),
    ]));
  };

  /* ════════════════════════════════════════════════════════════════
     VARIANT 2 — MODERN
     Teal #0d7377, DM Sans, card-like sections with subtle shadow
     ════════════════════════════════════════════════════════════════ */
  var CLS2 = "epm";
  var AC2 = "#0d7377";
  injectOnce(CLS2+"-sty", [
    "."+CLS2+"{font-family:'DM Sans',sans-serif;font-size:13px;line-height:1.55;color:#1a1a1a;background:#f4f6f7;min-height:100%;padding:24px;container-type:inline-size;}",
    "."+CLS2+"-hdr{background:#fff;border-radius:8px;padding:28px 32px 22px;margin-bottom:16px;border-left:5px solid "+AC2+";}",
    "."+CLS2+"-hdr h1{font-family:'DM Sans',sans-serif;font-size:26px;font-weight:700;margin:0 0 2px;color:"+AC2+";}",
    "."+CLS2+"-hdr .sub{font-size:13px;color:#666;margin:0;}",
    "."+CLS2+"-section{background:#fff;border-radius:8px;padding:18px 24px;margin-bottom:12px;}",
    "."+CLS2+"-sh{font-size:13px;font-weight:700;color:"+AC2+";margin:0 0 12px;text-transform:uppercase;letter-spacing:0.06em;padding-bottom:6px;border-bottom:2px solid "+AC2+"30;}",
    "."+CLS2+"-info-grid{display:grid;grid-template-columns:130px 1fr;gap:3px 14px;font-size:12.5px;}",
    "."+CLS2+"-info-label{color:"+AC2+";font-weight:600;text-transform:uppercase;font-size:10px;letter-spacing:0.07em;padding:3px 0;}",
    "."+CLS2+"-info-val{padding:3px 0;}",
    "."+CLS2+"-summary{color:#555;font-size:13px;line-height:1.6;border-left:3px solid "+AC2+"40;padding-left:14px;}",
    "."+CLS2+"-tl{display:grid;grid-template-columns:120px 1fr;gap:4px 18px;margin-bottom:10px;font-size:12.5px;}",
    "."+CLS2+"-tl-date{color:"+AC2+";font-weight:600;font-size:11px;}",
    "."+CLS2+"-tl-title{font-weight:600;font-size:13px;}",
    "."+CLS2+"-tl-org{color:#666;font-size:12px;}",
    "."+CLS2+"-tl-note{color:#777;font-size:11.5px;margin-top:1px;}",
    "."+CLS2+"-tl-bullets{margin:3px 0 0;padding-left:16px;color:#555;font-size:12px;}",
    "."+CLS2+"-tl-bullets li{margin-bottom:2px;}",
    "."+CLS2+"-cefr{width:100%;border-collapse:collapse;font-size:11px;margin-top:8px;border-radius:4px;overflow:hidden;}",
    "."+CLS2+"-cefr th,."+CLS2+"-cefr td{border:1px solid #ddd;padding:5px 7px;text-align:center;}",
    "."+CLS2+"-cefr thead th{background:"+AC2+";color:#fff;font-weight:600;font-size:10px;text-transform:uppercase;}",
    "."+CLS2+"-cefr tbody td:first-child{text-align:left;font-weight:600;background:#f0f7f7;}",
    "."+CLS2+"-cefr tbody td{background:#fafcfc;}",
    "."+CLS2+"-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px;}",
    "."+CLS2+"-chip{background:"+AC2+"12;color:#1a1a1a;font-size:11px;padding:4px 10px;border-radius:14px;border:1px solid "+AC2+"30;}",
    "."+CLS2+"-list{margin:0;padding-left:18px;font-size:12.5px;color:#333;}",
    "."+CLS2+"-list li{margin-bottom:5px;}",
    "."+CLS2+"-list-year{color:"+AC2+";font-weight:600;margin-right:8px;font-size:11px;}",
    "."+CLS2+"-pub-status{color:#fff;font-weight:600;margin-left:8px;font-size:10px;background:"+AC2+";padding:1px 6px;border-radius:8px;}",
    "."+CLS2+"-table{width:100%;border-collapse:collapse;font-size:12px;margin-top:6px;}",
    "."+CLS2+"-table th{background:"+AC2+";color:#fff;font-weight:600;font-size:10px;text-transform:uppercase;padding:5px 8px;text-align:left;}",
    "."+CLS2+"-table td{border-bottom:1px solid #eee;padding:5px 8px;vertical-align:top;}",
    "."+CLS2+"-badge{display:inline-block;font-size:10px;padding:2px 7px;border-radius:10px;font-weight:600;margin-left:6px;background:#d4edda;color:#155724;}",
    "."+CLS2+"-foot{padding:14px 24px;font-size:10px;color:#bbb;letter-spacing:0.06em;text-transform:uppercase;display:flex;justify-content:space-between;}",
    "@container(max-width:600px){",
    "  ."+CLS2+"{padding:12px;}",
    "  ."+CLS2+"-hdr{padding:18px 16px 14px;} ."+CLS2+"-hdr h1{font-size:21px;}",
    "  ."+CLS2+"-section{padding:14px 16px;margin-bottom:8px;}",
    "  ."+CLS2+"-info-grid{grid-template-columns:90px 1fr;}",
    "  ."+CLS2+"-tl{grid-template-columns:1fr;gap:2px;}",
    "  ."+CLS2+"-cefr{font-size:9px;}",
    "  ."+CLS2+"-foot{flex-direction:column;gap:4px;}",
    "}",
  ].join("\n"));

  window.EupassCV_modern = function(props) {
    var p = props.persona; var cls = CLS2;
    var langs = parseLangs(p.languages);
    var skills = flatSkills(p);
    var secH = function(t){ return h("h2",{key:"h_"+t,className:cls+"-sh"},t); };
    return h("div",{className:cls},[
      h("div",{key:"hdr",className:cls+"-hdr"},[
        h("h1",{key:"n"},p.name),
        h("p",{key:"s",className:"sub"},(p.field||p.role||"")+(p.institution||p.school?" · "+(p.institution||p.school):"")),
      ]),
      h("div",{key:"info",className:cls+"-section"},[ secH("Personal Information"), InfoGrid(cls,[["Address",p.location],["Phone",p.phone],["Email",p.email],["Date of birth",p.dob],["Website",p.url],["Specialisation",p.specialization]]) ]),
      (p.summary||p.tagline)&&h("div",{key:"sum",className:cls+"-section"},[ secH("Professional Summary"), h("p",{key:"p",className:cls+"-summary"},p.summary||p.tagline) ]),
      (p.experience||[]).length>0&&h("div",{key:"exp",className:cls+"-section"},[ secH("Work Experience") ].concat(Timeline(cls,p.experience))),
      (p.education||[]).length>0&&h("div",{key:"edu",className:cls+"-section"},[ secH("Education and Training") ].concat(Timeline(cls,p.education.map(function(e){return{role:e.degree,org:e.org,period:e.period,time:e.time,notes:e.notes||""};})))),
      h("div",{key:"skills",className:cls+"-section"},[
        secH("Personal Skills"),
        langs.length>0&&h("div",{key:"lang",style:{marginBottom:16}},[
          h("div",{key:"lbl",style:{fontWeight:600,fontSize:12,marginBottom:6,color:AC2}},"Languages"),
          CefrTable(cls,langs),
        ]),
        skills.length>0&&h("div",{key:"dsk"},[
          h("div",{key:"lbl",style:{fontWeight:600,fontSize:12,marginBottom:6,color:AC2}},"Digital / Technical Skills"),
          SkillChips(cls,skills),
        ]),
      ]),
    ].concat(DomainSections(cls,p,secH)).concat([
      ProjectsSection(cls,p,secH),
      AwardsSection(cls,p,secH),
      ActivitiesSection(cls,p,secH),
      h("div",{key:"foot",className:cls+"-foot"},[
        h("span",{key:"a"},"Eupass Standard CV · Modern"),
        h("span",{key:"b"},p.name+" · "+(p.email||"")),
      ]),
    ]));
  };

  /* ════════════════════════════════════════════════════════════════
     VARIANT 3 — MINIMAL
     Neutral grey #4a4a4a, lots of whitespace, hairline rules, Manrope
     ════════════════════════════════════════════════════════════════ */
  var CLS3 = "epn";
  var AC3 = "#4a4a4a";
  injectOnce(CLS3+"-sty", [
    "."+CLS3+"{font-family:'Manrope',sans-serif;font-size:13px;line-height:1.6;color:#2a2a2a;background:#fff;min-height:100%;padding:0;container-type:inline-size;}",
    "."+CLS3+"-hdr{padding:40px 40px 24px;border-bottom:1px solid #ddd;}",
    "."+CLS3+"-hdr h1{font-size:32px;font-weight:800;margin:0 0 4px;color:#1a1a1a;letter-spacing:-0.02em;}",
    "."+CLS3+"-hdr .sub{font-size:13px;color:#888;margin:0;font-weight:400;}",
    "."+CLS3+"-section{padding:22px 40px;border-bottom:1px solid #eee;}",
    "."+CLS3+"-section:last-child{border-bottom:0;}",
    "."+CLS3+"-sh{font-size:11px;font-weight:600;color:#999;margin:0 0 14px;text-transform:uppercase;letter-spacing:0.12em;}",
    "."+CLS3+"-info-grid{display:grid;grid-template-columns:120px 1fr;gap:2px 20px;font-size:12.5px;}",
    "."+CLS3+"-info-label{color:#999;font-weight:600;text-transform:uppercase;font-size:10px;letter-spacing:0.08em;padding:3px 0;}",
    "."+CLS3+"-info-val{padding:3px 0;color:#333;}",
    "."+CLS3+"-summary{color:#666;font-size:13px;line-height:1.7;max-width:600px;}",
    "."+CLS3+"-tl{display:grid;grid-template-columns:110px 1fr;gap:4px 24px;margin-bottom:12px;font-size:12.5px;}",
    "."+CLS3+"-tl-date{color:#999;font-weight:600;font-size:11px;}",
    "."+CLS3+"-tl-title{font-weight:600;font-size:13px;color:#1a1a1a;}",
    "."+CLS3+"-tl-org{color:#888;font-size:12px;}",
    "."+CLS3+"-tl-note{color:#999;font-size:11.5px;margin-top:1px;}",
    "."+CLS3+"-tl-bullets{margin:3px 0 0;padding-left:16px;color:#666;font-size:12px;}",
    "."+CLS3+"-tl-bullets li{margin-bottom:2px;}",
    "."+CLS3+"-cefr{width:100%;border-collapse:collapse;font-size:11px;margin-top:8px;}",
    "."+CLS3+"-cefr th,."+CLS3+"-cefr td{border:1px solid #e0e0e0;padding:5px 7px;text-align:center;}",
    "."+CLS3+"-cefr thead th{background:#f5f5f5;color:#555;font-weight:600;font-size:10px;text-transform:uppercase;}",
    "."+CLS3+"-cefr tbody td:first-child{text-align:left;font-weight:600;background:#fafafa;}",
    "."+CLS3+"-cefr tbody td{background:#fff;}",
    "."+CLS3+"-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px;}",
    "."+CLS3+"-chip{background:#f5f5f5;color:#333;font-size:11px;padding:4px 10px;border-radius:2px;border:1px solid #e0e0e0;}",
    "."+CLS3+"-list{margin:0;padding-left:18px;font-size:12.5px;color:#444;}",
    "."+CLS3+"-list li{margin-bottom:5px;}",
    "."+CLS3+"-list-year{color:#999;font-weight:600;margin-right:8px;font-size:11px;}",
    "."+CLS3+"-pub-status{color:#888;font-weight:600;margin-left:8px;font-size:10px;}",
    "."+CLS3+"-table{width:100%;border-collapse:collapse;font-size:12px;margin-top:6px;}",
    "."+CLS3+"-table th{background:#f5f5f5;color:#555;font-weight:600;font-size:10px;text-transform:uppercase;padding:5px 8px;text-align:left;border-bottom:1px solid #ddd;}",
    "."+CLS3+"-table td{border-bottom:1px solid #eee;padding:5px 8px;vertical-align:top;}",
    "."+CLS3+"-badge{display:inline-block;font-size:10px;padding:2px 7px;border-radius:2px;font-weight:600;margin-left:6px;background:#f0f0f0;color:#555;}",
    "."+CLS3+"-foot{padding:18px 40px;font-size:10px;color:#ccc;letter-spacing:0.08em;text-transform:uppercase;display:flex;justify-content:space-between;}",
    "@container(max-width:600px){",
    "  ."+CLS3+"-hdr{padding:24px 18px 16px;} ."+CLS3+"-hdr h1{font-size:24px;}",
    "  ."+CLS3+"-section{padding:16px 18px;}",
    "  ."+CLS3+"-info-grid{grid-template-columns:90px 1fr;}",
    "  ."+CLS3+"-tl{grid-template-columns:1fr;gap:2px;}",
    "  ."+CLS3+"-cefr{font-size:9px;}",
    "  ."+CLS3+"-foot{padding:12px 18px;flex-direction:column;gap:4px;}",
    "}",
  ].join("\n"));

  window.EupassCV_minimal = function(props) {
    var p = props.persona; var cls = CLS3;
    var langs = parseLangs(p.languages);
    var skills = flatSkills(p);
    var secH = function(t){ return h("h2",{key:"h_"+t,className:cls+"-sh"},t); };
    return h("div",{className:cls},[
      h("div",{key:"hdr",className:cls+"-hdr"},[
        h("h1",{key:"n"},p.name),
        h("p",{key:"s",className:"sub"},(p.field||p.role||"")+(p.institution||p.school?" · "+(p.institution||p.school):"")),
      ]),
      h("div",{key:"info",className:cls+"-section"},[ secH("Personal Information"), InfoGrid(cls,[["Address",p.location],["Phone",p.phone],["Email",p.email],["Date of birth",p.dob],["Website",p.url],["Specialisation",p.specialization]]) ]),
      (p.summary||p.tagline)&&h("div",{key:"sum",className:cls+"-section"},[ secH("Professional Summary"), h("p",{key:"p",className:cls+"-summary"},p.summary||p.tagline) ]),
      (p.experience||[]).length>0&&h("div",{key:"exp",className:cls+"-section"},[ secH("Work Experience") ].concat(Timeline(cls,p.experience))),
      (p.education||[]).length>0&&h("div",{key:"edu",className:cls+"-section"},[ secH("Education and Training") ].concat(Timeline(cls,p.education.map(function(e){return{role:e.degree,org:e.org,period:e.period,time:e.time,notes:e.notes||""};})))),
      h("div",{key:"skills",className:cls+"-section"},[
        secH("Personal Skills"),
        langs.length>0&&h("div",{key:"lang",style:{marginBottom:16}},[
          h("div",{key:"lbl",style:{fontWeight:600,fontSize:11,marginBottom:6,color:"#999",textTransform:"uppercase",letterSpacing:"0.08em"}},"Languages"),
          CefrTable(cls,langs),
        ]),
        skills.length>0&&h("div",{key:"dsk"},[
          h("div",{key:"lbl",style:{fontWeight:600,fontSize:11,marginBottom:6,color:"#999",textTransform:"uppercase",letterSpacing:"0.08em"}},"Digital / Technical Skills"),
          SkillChips(cls,skills),
        ]),
      ]),
    ].concat(DomainSections(cls,p,secH)).concat([
      ProjectsSection(cls,p,secH),
      AwardsSection(cls,p,secH),
      ActivitiesSection(cls,p,secH),
      h("div",{key:"foot",className:cls+"-foot"},[
        h("span",{key:"a"},"Eupass Standard CV · Minimal"),
        h("span",{key:"b"},p.name+" · "+(p.email||"")),
      ]),
    ]));
  };

  /* ════════════════════════════════════════════════════════════════
     VARIANT 4 — EXECUTIVE
     Dark navy header #0f1b2d, gold accent #b8860b, Playfair Display
     ════════════════════════════════════════════════════════════════ */
  var CLS4 = "epe";
  var AC4 = "#b8860b";
  var NAVY = "#0f1b2d";
  injectOnce(CLS4+"-sty", [
    "."+CLS4+"{font-family:'Inter',sans-serif;font-size:13px;line-height:1.55;color:#1a1a1a;background:#fff;min-height:100%;padding:0;container-type:inline-size;}",
    "."+CLS4+"-hdr{background:"+NAVY+";padding:32px 36px 24px;color:#fff;}",
    "."+CLS4+"-hdr h1{font-family:'Playfair Display',serif;font-size:30px;font-weight:700;margin:0 0 4px;color:"+AC4+";}",
    "."+CLS4+"-hdr .sub{font-size:13px;color:#b0bec5;margin:0;}",
    "."+CLS4+"-section{padding:18px 36px;border-bottom:1px solid #eee;}",
    "."+CLS4+"-section:last-child{border-bottom:0;}",
    "."+CLS4+"-sh{font-family:'Playfair Display',serif;font-size:15px;font-weight:700;color:"+NAVY+";margin:0 0 12px;border-bottom:2px solid "+AC4+";padding-bottom:5px;}",
    "."+CLS4+"-info-grid{display:grid;grid-template-columns:140px 1fr;gap:3px 16px;font-size:12.5px;}",
    "."+CLS4+"-info-label{color:"+AC4+";font-weight:600;text-transform:uppercase;font-size:10px;letter-spacing:0.08em;padding:3px 0;}",
    "."+CLS4+"-info-val{padding:3px 0;}",
    "."+CLS4+"-summary{color:#444;font-size:13px;line-height:1.6;max-width:640px;font-style:italic;}",
    "."+CLS4+"-tl{display:grid;grid-template-columns:130px 1fr;gap:4px 20px;margin-bottom:10px;font-size:12.5px;}",
    "."+CLS4+"-tl-date{color:"+AC4+";font-weight:600;font-size:11px;}",
    "."+CLS4+"-tl-title{font-weight:600;font-size:13px;}",
    "."+CLS4+"-tl-org{color:#555;font-size:12px;}",
    "."+CLS4+"-tl-note{color:#666;font-size:11.5px;margin-top:1px;}",
    "."+CLS4+"-tl-bullets{margin:3px 0 0;padding-left:16px;color:#444;font-size:12px;}",
    "."+CLS4+"-tl-bullets li{margin-bottom:2px;}",
    "."+CLS4+"-cefr{width:100%;border-collapse:collapse;font-size:11px;margin-top:8px;}",
    "."+CLS4+"-cefr th,."+CLS4+"-cefr td{border:1px solid #ccc;padding:5px 7px;text-align:center;}",
    "."+CLS4+"-cefr thead th{background:"+NAVY+";color:"+AC4+";font-weight:600;font-size:10px;text-transform:uppercase;}",
    "."+CLS4+"-cefr tbody td:first-child{text-align:left;font-weight:600;background:#f8f6f0;}",
    "."+CLS4+"-cefr tbody td{background:#fdfcfa;}",
    "."+CLS4+"-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px;}",
    "."+CLS4+"-chip{background:"+NAVY+"10;color:#1a1a1a;font-size:11px;padding:4px 10px;border-radius:3px;border:1px solid "+NAVY+"25;}",
    "."+CLS4+"-list{margin:0;padding-left:18px;font-size:12.5px;color:#333;}",
    "."+CLS4+"-list li{margin-bottom:5px;}",
    "."+CLS4+"-list-year{color:"+AC4+";font-weight:600;margin-right:8px;font-size:11px;}",
    "."+CLS4+"-pub-status{color:"+AC4+";font-weight:600;margin-left:8px;font-size:10px;}",
    "."+CLS4+"-table{width:100%;border-collapse:collapse;font-size:12px;margin-top:6px;}",
    "."+CLS4+"-table th{background:"+NAVY+";color:"+AC4+";font-weight:600;font-size:10px;text-transform:uppercase;padding:5px 8px;text-align:left;}",
    "."+CLS4+"-table td{border-bottom:1px solid #e5e5e5;padding:5px 8px;vertical-align:top;}",
    "."+CLS4+"-badge{display:inline-block;font-size:10px;padding:2px 7px;border-radius:3px;font-weight:600;margin-left:6px;background:#fff8e1;color:#7a6200;}",
    "."+CLS4+"-foot{background:"+NAVY+";padding:14px 36px;font-size:10px;color:#667;letter-spacing:0.06em;text-transform:uppercase;display:flex;justify-content:space-between;}",
    "@container(max-width:600px){",
    "  ."+CLS4+"-hdr{padding:22px 18px 16px;} ."+CLS4+"-hdr h1{font-size:24px;}",
    "  ."+CLS4+"-section{padding:14px 18px;}",
    "  ."+CLS4+"-info-grid{grid-template-columns:100px 1fr;}",
    "  ."+CLS4+"-tl{grid-template-columns:1fr;gap:2px;}",
    "  ."+CLS4+"-cefr{font-size:9px;}",
    "  ."+CLS4+"-foot{padding:10px 18px;flex-direction:column;gap:4px;}",
    "}",
  ].join("\n"));

  window.EupassCV_executive = function(props) {
    var p = props.persona; var cls = CLS4;
    var langs = parseLangs(p.languages);
    var skills = flatSkills(p);
    var secH = function(t){ return h("h2",{key:"h_"+t,className:cls+"-sh"},t); };
    return h("div",{className:cls},[
      h("div",{key:"hdr",className:cls+"-hdr"},[
        h("h1",{key:"n"},p.name),
        h("p",{key:"s",className:"sub"},(p.field||p.role||"")+(p.institution||p.school?" · "+(p.institution||p.school):"")),
      ]),
      h("div",{key:"info",className:cls+"-section"},[ secH("Personal Information"), InfoGrid(cls,[["Address",p.location],["Phone",p.phone],["Email",p.email],["Date of birth",p.dob],["Website",p.url],["Specialisation",p.specialization]]) ]),
      (p.summary||p.tagline)&&h("div",{key:"sum",className:cls+"-section"},[ secH("Professional Summary"), h("p",{key:"p",className:cls+"-summary"},p.summary||p.tagline) ]),
      (p.experience||[]).length>0&&h("div",{key:"exp",className:cls+"-section"},[ secH("Work Experience") ].concat(Timeline(cls,p.experience))),
      (p.education||[]).length>0&&h("div",{key:"edu",className:cls+"-section"},[ secH("Education and Training") ].concat(Timeline(cls,p.education.map(function(e){return{role:e.degree,org:e.org,period:e.period,time:e.time,notes:e.notes||""};})))),
      h("div",{key:"skills",className:cls+"-section"},[
        secH("Personal Skills"),
        langs.length>0&&h("div",{key:"lang",style:{marginBottom:16}},[
          h("div",{key:"lbl",style:{fontWeight:600,fontSize:12,marginBottom:6,color:AC4}},"Languages"),
          CefrTable(cls,langs),
        ]),
        skills.length>0&&h("div",{key:"dsk"},[
          h("div",{key:"lbl",style:{fontWeight:600,fontSize:12,marginBottom:6,color:AC4}},"Digital / Technical Skills"),
          SkillChips(cls,skills),
        ]),
      ]),
    ].concat(DomainSections(cls,p,secH)).concat([
      ProjectsSection(cls,p,secH),
      AwardsSection(cls,p,secH),
      ActivitiesSection(cls,p,secH),
      h("div",{key:"foot",className:cls+"-foot"},[
        h("span",{key:"a"},"Eupass Standard CV · Executive"),
        h("span",{key:"b"},p.name+" · "+(p.email||"")),
      ]),
    ]));
  };

  /* ════════════════════════════════════════════════════════════════
     VARIANT 5 — FRESH
     Green accent #2e7d32, rounded corners, warm bg, Space Grotesk
     ════════════════════════════════════════════════════════════════ */
  var CLS5 = "epf";
  var AC5 = "#2e7d32";
  injectOnce(CLS5+"-sty", [
    "."+CLS5+"{font-family:'Space Grotesk',sans-serif;font-size:13px;line-height:1.55;color:#1a1a1a;background:#f9faf6;min-height:100%;padding:20px;container-type:inline-size;}",
    "."+CLS5+"-hdr{background:#fff;border-radius:12px;padding:28px 30px 22px;margin-bottom:14px;border-top:4px solid "+AC5+";}",
    "."+CLS5+"-hdr h1{font-size:26px;font-weight:700;margin:0 0 2px;color:"+AC5+";}",
    "."+CLS5+"-hdr .sub{font-size:13px;color:#666;margin:0;}",
    "."+CLS5+"-section{background:#fff;border-radius:10px;padding:18px 24px;margin-bottom:10px;}",
    "."+CLS5+"-sh{font-size:12px;font-weight:700;color:"+AC5+";margin:0 0 12px;text-transform:uppercase;letter-spacing:0.06em;padding-bottom:6px;border-bottom:2px dashed "+AC5+"40;}",
    "."+CLS5+"-info-grid{display:grid;grid-template-columns:130px 1fr;gap:3px 14px;font-size:12.5px;}",
    "."+CLS5+"-info-label{color:"+AC5+";font-weight:600;text-transform:uppercase;font-size:10px;letter-spacing:0.07em;padding:3px 0;}",
    "."+CLS5+"-info-val{padding:3px 0;}",
    "."+CLS5+"-summary{color:#555;font-size:13px;line-height:1.65;max-width:620px;}",
    "."+CLS5+"-tl{display:grid;grid-template-columns:115px 1fr;gap:4px 18px;margin-bottom:10px;font-size:12.5px;}",
    "."+CLS5+"-tl-date{color:"+AC5+";font-weight:600;font-size:11px;}",
    "."+CLS5+"-tl-title{font-weight:600;font-size:13px;}",
    "."+CLS5+"-tl-org{color:#666;font-size:12px;}",
    "."+CLS5+"-tl-note{color:#777;font-size:11.5px;margin-top:1px;}",
    "."+CLS5+"-tl-bullets{margin:3px 0 0;padding-left:16px;color:#555;font-size:12px;}",
    "."+CLS5+"-tl-bullets li{margin-bottom:2px;}",
    "."+CLS5+"-cefr{width:100%;border-collapse:collapse;font-size:11px;margin-top:8px;border-radius:6px;overflow:hidden;}",
    "."+CLS5+"-cefr th,."+CLS5+"-cefr td{border:1px solid #d4e4d4;padding:5px 7px;text-align:center;}",
    "."+CLS5+"-cefr thead th{background:"+AC5+";color:#fff;font-weight:600;font-size:10px;text-transform:uppercase;}",
    "."+CLS5+"-cefr tbody td:first-child{text-align:left;font-weight:600;background:#f0f5f0;}",
    "."+CLS5+"-cefr tbody td{background:#f8fbf8;}",
    "."+CLS5+"-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px;}",
    "."+CLS5+"-chip{background:"+AC5+"10;color:#1a1a1a;font-size:11px;padding:5px 12px;border-radius:16px;border:1px solid "+AC5+"30;}",
    "."+CLS5+"-list{margin:0;padding-left:18px;font-size:12.5px;color:#333;}",
    "."+CLS5+"-list li{margin-bottom:5px;}",
    "."+CLS5+"-list-year{color:"+AC5+";font-weight:600;margin-right:8px;font-size:11px;}",
    "."+CLS5+"-pub-status{color:#fff;font-weight:600;margin-left:8px;font-size:10px;background:"+AC5+";padding:1px 6px;border-radius:8px;}",
    "."+CLS5+"-table{width:100%;border-collapse:collapse;font-size:12px;margin-top:6px;}",
    "."+CLS5+"-table th{background:"+AC5+";color:#fff;font-weight:600;font-size:10px;text-transform:uppercase;padding:5px 8px;text-align:left;}",
    "."+CLS5+"-table td{border-bottom:1px solid #e8ede8;padding:5px 8px;vertical-align:top;}",
    "."+CLS5+"-badge{display:inline-block;font-size:10px;padding:2px 7px;border-radius:10px;font-weight:600;margin-left:6px;background:#d4edda;color:#155724;}",
    "."+CLS5+"-foot{padding:14px 24px;font-size:10px;color:#bbb;letter-spacing:0.06em;text-transform:uppercase;display:flex;justify-content:space-between;}",
    "@container(max-width:600px){",
    "  ."+CLS5+"{padding:10px;}",
    "  ."+CLS5+"-hdr{padding:18px 16px 14px;} ."+CLS5+"-hdr h1{font-size:21px;}",
    "  ."+CLS5+"-section{padding:14px 16px;margin-bottom:8px;}",
    "  ."+CLS5+"-info-grid{grid-template-columns:90px 1fr;}",
    "  ."+CLS5+"-tl{grid-template-columns:1fr;gap:2px;}",
    "  ."+CLS5+"-cefr{font-size:9px;}",
    "  ."+CLS5+"-foot{flex-direction:column;gap:4px;}",
    "}",
  ].join("\n"));

  window.EupassCV_fresh = function(props) {
    var p = props.persona; var cls = CLS5;
    var langs = parseLangs(p.languages);
    var skills = flatSkills(p);
    var secH = function(t){ return h("h2",{key:"h_"+t,className:cls+"-sh"},t); };
    return h("div",{className:cls},[
      h("div",{key:"hdr",className:cls+"-hdr"},[
        h("h1",{key:"n"},p.name),
        h("p",{key:"s",className:"sub"},(p.field||p.role||"")+(p.institution||p.school?" · "+(p.institution||p.school):"")),
      ]),
      h("div",{key:"info",className:cls+"-section"},[ secH("Personal Information"), InfoGrid(cls,[["Address",p.location],["Phone",p.phone],["Email",p.email],["Date of birth",p.dob],["Website",p.url],["Specialisation",p.specialization]]) ]),
      (p.summary||p.tagline)&&h("div",{key:"sum",className:cls+"-section"},[ secH("Professional Summary"), h("p",{key:"p",className:cls+"-summary"},p.summary||p.tagline) ]),
      (p.experience||[]).length>0&&h("div",{key:"exp",className:cls+"-section"},[ secH("Work Experience") ].concat(Timeline(cls,p.experience))),
      (p.education||[]).length>0&&h("div",{key:"edu",className:cls+"-section"},[ secH("Education and Training") ].concat(Timeline(cls,p.education.map(function(e){return{role:e.degree,org:e.org,period:e.period,time:e.time,notes:e.notes||""};})))),
      h("div",{key:"skills",className:cls+"-section"},[
        secH("Personal Skills"),
        langs.length>0&&h("div",{key:"lang",style:{marginBottom:16}},[
          h("div",{key:"lbl",style:{fontWeight:600,fontSize:12,marginBottom:6,color:AC5}},"Languages"),
          CefrTable(cls,langs),
        ]),
        skills.length>0&&h("div",{key:"dsk"},[
          h("div",{key:"lbl",style:{fontWeight:600,fontSize:12,marginBottom:6,color:AC5}},"Digital / Technical Skills"),
          SkillChips(cls,skills),
        ]),
      ]),
    ].concat(DomainSections(cls,p,secH)).concat([
      ProjectsSection(cls,p,secH),
      AwardsSection(cls,p,secH),
      ActivitiesSection(cls,p,secH),
      h("div",{key:"foot",className:cls+"-foot"},[
        h("span",{key:"a"},"Eupass Standard CV · Fresh"),
        h("span",{key:"b"},p.name+" · "+(p.email||"")),
      ]),
    ]));
  };

})();
