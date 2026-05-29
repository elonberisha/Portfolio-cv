// Template_t55 — CLINIC BLUE · Modern Hospital Profile
// Crisp white + deep medical blue (#1565c0). Manrope. Hospital ID aesthetic.
// Clean, structured, modern — like a hospital system patient profile card.
(function(){
  const SCOPE="t55";
  function injectStyles(){
    if(document.getElementById(SCOPE+'-sty'))return;
    const s=document.createElement('style');s.id=SCOPE+'-sty';
    s.textContent=`
    .t55{font-family:'Manrope',sans-serif;background:#f0f6ff;color:#0d1a2e;min-height:100%;container-type:inline-size;}
    .t55 *{box-sizing:border-box;margin:0;padding:0;}
    /* banner */
    .t55-banner{background:#1565c0;padding:0 44px;display:flex;align-items:stretch;min-height:120px;}
    .t55-banner-left{display:flex;align-items:center;gap:28px;flex:1;padding:28px 0;}
    .t55-portrait{width:84px;height:84px;border-radius:8px;border:3px solid rgba(255,255,255,.4);flex-shrink:0;}
    .t55-banner-name{font-size:30px;font-weight:800;color:#fff;letter-spacing:-.5px;}
    .t55-banner-role{font-size:12px;color:rgba(255,255,255,.7);margin-top:4px;font-weight:500;}
    .t55-banner-dept{font-size:12px;color:#90caf9;margin-top:6px;}
    .t55-banner-right{display:flex;flex-direction:column;justify-content:center;align-items:flex-end;padding:20px 0;gap:8px;}
    .t55-id-chip{background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.3);color:#fff;font-size:10px;font-weight:700;padding:4px 12px;border-radius:20px;letter-spacing:.8px;}
    .t55-allergy-chip{background:#ef5350;color:#fff;font-size:10px;font-weight:700;padding:4px 12px;border-radius:20px;letter-spacing:.5px;}
    /* sub-banner */
    .t55-sub{background:#1251a0;padding:8px 44px;display:flex;gap:28px;font-size:11px;color:rgba(255,255,255,.7);}
    /* stats row */
    .t55-stats{background:#fff;border-bottom:1px solid #e3eaf5;display:flex;}
    .t55-stat{flex:1;padding:18px 0;text-align:center;border-right:1px solid #e3eaf5;}
    .t55-stat:last-child{border-right:none;}
    .t55-stat-v{font-size:30px;font-weight:800;color:#1565c0;line-height:1;}
    .t55-stat-l{font-size:10px;color:#607d9a;text-transform:uppercase;letter-spacing:1px;margin-top:3px;}
    /* body */
    .t55-body{display:grid;grid-template-columns:1fr 1fr;gap:16px;padding:20px 44px 24px;}
    .t55-card{background:#fff;border-radius:8px;border:1px solid #dce8f8;padding:20px 22px;}
    .t55-card-full{grid-column:1/-1;}
    .t55-sh{font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:1.8px;color:#1565c0;margin-bottom:14px;display:flex;align-items:center;gap:8px;}
    .t55-sh-icon{width:18px;height:18px;background:#1565c0;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;flex-shrink:0;}
    /* rotation rows */
    .t55-rot{padding:10px 0;border-bottom:1px solid #f0f5fc;}
    .t55-rot:last-child{border-bottom:none;}
    .t55-rot-top{display:flex;justify-content:space-between;align-items:center;}
    .t55-rot-svc{font-size:14px;font-weight:700;color:#0d1a2e;}
    .t55-rot-wk{font-size:10px;background:#e3f0ff;color:#1565c0;padding:2px 8px;border-radius:10px;font-weight:600;}
    .t55-rot-site{font-size:11px;color:#4a6fa5;margin-top:2px;}
    .t55-rot-lead{font-size:11px;color:#607d9a;}
    .t55-rot-procs{font-size:11px;color:#3d5a7a;margin-top:5px;background:#f0f6ff;padding:4px 8px;border-radius:4px;line-height:1.4;}
    /* skills pills */
    .t55-skills-grid{display:flex;flex-direction:column;gap:6px;}
    .t55-skill-row{display:flex;align-items:center;gap:10px;}
    .t55-skill-name{font-size:12px;flex:1;color:#0d1a2e;}
    .t55-dots{display:flex;gap:3px;}
    .t55-dot{width:10px;height:10px;border-radius:50%;}
    .t55-dot-fill{background:#1565c0;}
    .t55-dot-empty{background:#dce8f8;}
    .t55-skill-lvl{font-size:10px;color:#607d9a;min-width:70px;text-align:right;}
    /* research */
    .t55-res{padding:10px 0;border-bottom:1px solid #f0f5fc;display:flex;gap:12px;align-items:flex-start;}
    .t55-res:last-child{border-bottom:none;}
    .t55-res-n{font-size:12px;font-weight:800;color:#1565c0;min-width:24px;}
    .t55-res-ttl{font-size:13px;font-weight:500;color:#0d1a2e;line-height:1.4;}
    .t55-res-meta{font-size:11px;color:#607d9a;margin-top:2px;}
    .t55-tag{display:inline-block;font-size:10px;padding:2px 8px;border-radius:4px;font-weight:700;margin-top:4px;text-transform:uppercase;letter-spacing:.5px;}
    .t55-tag-p{background:#1565c0;color:#fff;}
    .t55-tag-r{background:#fff3e0;color:#e65100;border:1px solid #ffcc80;}
    .t55-tag-a{background:#f3e5f5;color:#6a1b9a;border:1px solid #ce93d8;}
    /* edu + awards */
    .t55-two-col{display:grid;grid-template-columns:1fr 1fr;gap:0 32px;}
    .t55-edu{padding:9px 0;border-bottom:1px solid #f0f5fc;}
    .t55-edu:last-child{border-bottom:none;}
    .t55-edu-deg{font-size:13px;font-weight:600;}
    .t55-edu-org{font-size:11px;color:#1565c0;margin-top:2px;}
    .t55-edu-yr{font-size:10px;color:#607d9a;}
    .t55-edu-note{font-size:10px;color:#4a6fa5;margin-top:3px;font-style:italic;}
    .t55-award{padding:8px 0;border-bottom:1px solid #f0f5fc;display:flex;gap:8px;align-items:flex-start;}
    .t55-award:last-child{border-bottom:none;}
    .t55-aw-dot{width:8px;height:8px;border-radius:50%;background:#1565c0;flex-shrink:0;margin-top:3px;}
    .t55-aw-name{font-size:12px;font-weight:600;}
    .t55-aw-org{font-size:11px;color:#607d9a;margin-top:1px;}
    /* footer */
    .t55-ftr{background:#1565c0;padding:13px 44px;display:flex;justify-content:space-between;font-size:11px;}
    .t55-ftr-l{color:rgba(255,255,255,.6);}
    .t55-ftr-r{color:rgba(255,255,255,.9);font-weight:600;}
    @container(max-width:768px){
      .t55-banner{padding:0 18px;flex-direction:column;}
      .t55-banner-left{gap:14px;padding:20px 0 0;}
      .t55-portrait{width:64px;height:64px;border-radius:6px;}
      .t55-banner-name{font-size:22px;}
      .t55-banner-right{align-items:flex-start;padding:10px 0 16px;}
      .t55-sub{padding:8px 18px;gap:10px;flex-wrap:wrap;font-size:10px;}
      .t55-stats{flex-wrap:wrap;}
      .t55-stat{min-width:50%;}
      .t55-stat-v{font-size:22px;}
      .t55-body{grid-template-columns:1fr;padding:12px 18px;gap:10px;}
      .t55-card-full{grid-column:1;}
      .t55-two-col{grid-template-columns:1fr;}
      .t55-ftr{padding:12px 18px;flex-direction:column;gap:4px;}
    }
    `;
    document.head.appendChild(s);
  }

  function skillDots(level){
    const h=React.createElement;
    const l=(level||'').toLowerCase();
    const filled=l.includes('indep')?5:l.includes('conf')?4:l.includes('train')||l.includes('cert')||l.includes('provid')?3:2;
    return h('div',{className:'t55-dots'},
      ...[1,2,3,4,5].map(i=>h('div',{className:`t55-dot ${i<=filled?'t55-dot-fill':'t55-dot-empty'}`}))
    );
  }
  function tagCls(s){
    const v=(s||'').toLowerCase();
    if(v.includes('pub')||v.includes('first')||v.includes('award'))return 't55-tag-p';
    if(v.includes('review'))return 't55-tag-r';
    return 't55-tag-a';
  }

  function Template_t55({persona:p,mode,dark}){
    injectStyles();
    const h=React.createElement;
    return h('div',{className:'t55'},
      /* banner */
      h('div',{className:'t55-banner'},
        h('div',{className:'t55-banner-left'},
          h('svg',{className:'t55-portrait',viewBox:'0 0 84 84'},
            h('rect',{x:0,y:0,width:84,height:84,rx:8,fill:'#0d3b7a'}),
            /* scrubs/uniform */
            h('rect',{x:14,y:52,width:56,height:32,rx:3,fill:'#1565c0'}),
            /* face */
            h('circle',{cx:42,cy:36,r:16,fill:'#f5c9a0'}),
            /* hair */
            h('ellipse',{cx:42,cy:21,rx:16,ry:9,fill:'#2d1a0e'}),
            /* stethoscope over scrubs */
            h('path',{d:'M30 56 C26 62 26 68 32 70 C38 72 44 68 46 62 C48 57 54 55 58 57',stroke:'#90caf9',strokeWidth:2,fill:'none',strokeLinecap:'round'}),
            h('circle',{cx:58,cy:57,r:3,fill:'#90caf9'}),
            /* hospital ID */
            h('rect',{x:16,y:67,width:18,height:13,rx:2,fill:'#fff'}),
            h('rect',{x:18,y:69,width:14,height:3,rx:1,fill:'#1565c0'}),
            h('rect',{x:18,y:74,width:10,height:2,rx:1,fill:'#90caf9'}),
            h('rect',{x:18,y:77,width:8,height:2,rx:1,fill:'#e3f0ff'}),
          ),
          h('div',null,
            h('div',{className:'t55-banner-name'},p.name),
            h('div',{className:'t55-banner-role'},`${p.field} · ${p.year} · ${p.currentRole}`),
            h('div',{className:'t55-banner-dept'},p.specialization),
          ),
        ),
        h('div',{className:'t55-banner-right'},
          h('div',{className:'t55-id-chip'},'STUDENT ID · '+p.mrn),
          h('div',{className:'t55-id-chip'},p.institution.split(' ').slice(-1)[0]+' HEALTH SYSTEM'),
          p.allergies?.length?h('div',{className:'t55-allergy-chip'},'⚠ '+p.allergies[0].split('—')[0].trim()):null,
        ),
      ),
      h('div',{className:'t55-sub'},
        h('span',null,'✉ '+p.email),
        h('span',null,'✆ '+p.phone),
        h('span',null,'NHS No: '+p.nhsNumber),
        h('span',null,p.url),
      ),
      /* stats */
      h('div',{className:'t55-stats'},
        [{v:p.rotations?.length||6,l:'Rotations'},{v:p.research?.length||4,l:'Research'},{v:p.skills?.clinical?.length||9,l:'Procedures'},{v:p.awards?.length||4,l:'Honours'}]
        .map(s=>h('div',{className:'t55-stat'},
          h('div',{className:'t55-stat-v'},s.v),
          h('div',{className:'t55-stat-l'},s.l),
        ))
      ),
      /* body */
      h('div',{className:'t55-body'},
        /* rotations */
        h('div',{className:'t55-card'},
          h('div',{className:'t55-sh'},h('div',{className:'t55-sh-icon'},'Rx'),'Clinical Rotations'),
          ...(p.rotations||[]).slice(0,4).map(r=>h('div',{className:'t55-rot'},
            h('div',{className:'t55-rot-top'},
              h('span',{className:'t55-rot-svc'},r.service),
              h('span',{className:'t55-rot-wk'},r.weeks+'w'),
            ),
            h('div',{className:'t55-rot-site'},r.site),
            h('div',{className:'t55-rot-lead'},r.lead),
            h('div',{className:'t55-rot-procs'},r.procedures),
          )),
        ),
        /* skills */
        h('div',{className:'t55-card'},
          h('div',{className:'t55-sh'},h('div',{className:'t55-sh-icon'},'✓'),'Clinical Skills'),
          h('div',{className:'t55-skills-grid'},
            ...(p.skills?.clinical||[]).map(sk=>h('div',{className:'t55-skill-row'},
              h('span',{className:'t55-skill-name'},sk.name),
              skillDots(sk.level),
              h('span',{className:'t55-skill-lvl'},sk.level),
            )),
          ),
        ),
        /* research - full width */
        h('div',{className:'t55-card t55-card-full'},
          h('div',{className:'t55-sh'},h('div',{className:'t55-sh-icon'},'§'),'Research & Publications'),
          h('div',{className:'t55-two-col'},
            ...(p.research||[]).map((r,i)=>h('div',{className:'t55-res'},
              h('div',{className:'t55-res-n'},`0${i+1}`),
              h('div',null,
                h('div',{className:'t55-res-ttl'},r.title),
                h('div',{className:'t55-res-meta'},`${r.role} · ${r.venue} · ${r.year}`),
                h('span',{className:`t55-tag ${tagCls(r.status)}`},r.status),
              ),
            )),
          ),
        ),
        /* edu + awards */
        h('div',{className:'t55-card t55-card-full'},
          h('div',{className:'t55-two-col'},
            h('div',null,
              h('div',{className:'t55-sh'},h('div',{className:'t55-sh-icon'},'🎓'),'Education'),
              ...(p.education||[]).map(e=>h('div',{className:'t55-edu'},
                h('div',{className:'t55-edu-deg'},e.degree),
                h('div',{className:'t55-edu-org'},e.org),
                h('div',{className:'t55-edu-yr'},e.period),
                e.notes?h('div',{className:'t55-edu-note'},e.notes):null,
              )),
            ),
            h('div',null,
              h('div',{className:'t55-sh'},h('div',{className:'t55-sh-icon'},'★'),'Awards & Honours'),
              ...(p.awards||[]).map(a=>h('div',{className:'t55-award'},
                h('div',{className:'t55-aw-dot'}),
                h('div',null,
                  h('div',{className:'t55-aw-name'},a.name),
                  h('div',{className:'t55-aw-org'},`${a.org} · ${a.year}`),
                ),
              )),
            ),
          ),
        ),
      ),
      /* footer */
      h('div',{className:'t55-ftr'},
        h('span',{className:'t55-ftr-l'},`${p.faculty} · ${p.institution}`),
        h('span',{className:'t55-ftr-r'},p.tagline),
      ),
    );
  }
  window.Template_t55=Template_t55;
})();
