// Template_t57 — CADUCEUS · Formal Medical Credential
// Deep navy (#0c1a45) + gold (#c9a84c) + cream. EB Garamond + Syne.
// Prestigious diploma / medical register aesthetic — caduceus SVG, formal credential feel.
(function(){
  const SCOPE="t57";
  function injectStyles(){
    if(document.getElementById(SCOPE+'-sty'))return;
    const s=document.createElement('style');s.id=SCOPE+'-sty';
    s.textContent=`
    .t57{font-family:'DM Sans',sans-serif;background:#f8f5ee;color:#1a1410;min-height:100%;container-type:inline-size;}
    .t57 *{box-sizing:border-box;margin:0;padding:0;}
    /* Top credential bar */
    .t57-cred-bar{background:#0c1a45;padding:10px 44px;display:flex;align-items:center;justify-content:space-between;}
    .t57-cred-left{display:flex;align-items:center;gap:14px;}
    .t57-cred-text{font-size:10px;color:rgba(255,255,255,.6);letter-spacing:1.5px;text-transform:uppercase;}
    .t57-cred-right{font-size:10px;color:#c9a84c;letter-spacing:1px;}
    /* hero */
    .t57-hero{background:linear-gradient(165deg,#0c1a45 0%,#162454 55%,#0c1a45 100%);padding:44px;display:grid;grid-template-columns:auto 1fr auto;gap:36px;align-items:center;}
    .t57-portrait-wrap{position:relative;}
    .t57-portrait{width:120px;height:120px;border-radius:50%;border:2px solid #c9a84c;}
    /* gold ring */
    .t57-ring{position:absolute;top:-8px;left:-8px;width:136px;height:136px;}
    .t57-hero-text{}
    .t57-prefix{font-size:11px;color:#c9a84c;letter-spacing:2px;text-transform:uppercase;margin-bottom:6px;}
    .t57-name{font-family:'EB Garamond',serif;font-size:42px;font-weight:400;color:#fff;line-height:1;letter-spacing:-.5px;}
    .t57-title{font-family:'EB Garamond',serif;font-size:16px;font-style:italic;color:rgba(255,255,255,.7);margin-top:8px;}
    .t57-info-chips{display:flex;gap:12px;margin-top:16px;flex-wrap:wrap;}
    .t57-info-chip{border:1px solid rgba(201,168,76,.4);color:rgba(255,255,255,.75);font-size:10px;padding:4px 14px;border-radius:2px;letter-spacing:.5px;}
    .t57-hero-right{text-align:center;}
    /* gold stats */
    .t57-gold-stat{margin-bottom:16px;text-align:center;}
    .t57-gold-v{font-family:'EB Garamond',serif;font-size:36px;color:#c9a84c;line-height:1;}
    .t57-gold-l{font-size:9px;color:rgba(255,255,255,.5);text-transform:uppercase;letter-spacing:1.2px;margin-top:2px;}
    /* divider */
    .t57-divider{background:#0c1a45;height:1px;margin:0 44px;}
    /* body */
    .t57-body{display:grid;grid-template-columns:1fr 1fr;gap:0;}
    .t57-col{padding:32px 40px 32px 44px;}
    .t57-col-r{padding:32px 44px 32px 40px;border-left:1px solid #e0d8c8;}
    .t57-full{padding:28px 44px;border-top:1px solid #e0d8c8;grid-column:1/-1;}
    .t57-sh{font-family:'EB Garamond',serif;font-size:18px;color:#0c1a45;margin-bottom:14px;display:flex;align-items:center;gap:12px;}
    .t57-sh-line{flex:1;height:1px;background:linear-gradient(to right,#c9a84c,transparent);}
    .t57-sh-sm{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.8px;color:#0c1a45;margin-bottom:12px;padding-bottom:6px;border-bottom:1px solid #e0d8c8;}
    /* rotations */
    .t57-rot{padding:12px 0;border-bottom:1px solid #f0ebe0;}
    .t57-rot:last-child{border-bottom:none;}
    .t57-rot-svc{font-family:'EB Garamond',serif;font-size:18px;color:#0c1a45;}
    .t57-rot-site{font-size:12px;color:#7a6040;margin-top:2px;}
    .t57-rot-meta{font-size:11px;color:#a89070;}
    .t57-rot-procs{font-size:11px;color:#4a3c2a;margin-top:6px;border-left:2px solid #c9a84c;padding-left:8px;line-height:1.5;}
    /* research */
    .t57-res{padding:12px 0;border-bottom:1px solid #f0ebe0;display:flex;gap:14px;}
    .t57-res:last-child{border-bottom:none;}
    .t57-res-n{font-family:'EB Garamond',serif;font-size:20px;color:#c9a84c;min-width:28px;line-height:1;}
    .t57-res-ttl{font-size:13px;color:#1a1410;line-height:1.5;}
    .t57-res-meta{font-size:11px;color:#8a7060;margin-top:3px;font-style:italic;}
    .t57-res-st{display:inline-block;font-size:9px;padding:2px 8px;border-radius:2px;font-weight:700;margin-top:4px;text-transform:uppercase;letter-spacing:.5px;}
    .t57-st-p{background:#0c1a45;color:#c9a84c;}
    .t57-st-r{background:#f5ede0;color:#7a3020;border:1px solid #d4b89a;}
    .t57-st-a{background:#eef0f8;color:#2a3a6a;border:1px solid #b8c0d8;}
    /* skills as pills */
    .t57-skills-wrap{display:flex;flex-direction:column;gap:8px;}
    .t57-skill{display:flex;align-items:center;gap:10px;}
    .t57-skill-name{font-size:12px;flex:1;color:#1a1410;}
    .t57-skill-bar{height:4px;flex:1;background:#e0d8c8;border-radius:2px;max-width:80px;}
    .t57-skill-fill{height:100%;background:#0c1a45;border-radius:2px;}
    .t57-skill-lvl{font-size:10px;color:#8a7060;min-width:68px;text-align:right;}
    /* edu */
    .t57-edu{padding:11px 0;border-bottom:1px solid #f0ebe0;}
    .t57-edu:last-child{border-bottom:none;}
    .t57-edu-deg{font-family:'EB Garamond',serif;font-size:16px;color:#0c1a45;}
    .t57-edu-org{font-size:12px;color:#7a6040;margin-top:2px;}
    .t57-edu-yr{font-size:11px;color:#a89070;}
    .t57-edu-note{font-size:11px;color:#4a3c2a;margin-top:4px;font-style:italic;}
    /* awards */
    .t57-award{display:flex;gap:10px;padding:9px 0;border-bottom:1px solid #f0ebe0;align-items:flex-start;}
    .t57-award:last-child{border-bottom:none;}
    .t57-aw-sym{color:#c9a84c;font-family:'EB Garamond',serif;font-size:18px;line-height:1;}
    .t57-aw-name{font-size:13px;font-weight:600;color:#0c1a45;}
    .t57-aw-org{font-size:11px;color:#8a7060;margin-top:2px;}
    /* footer */
    .t57-ftr{background:#0c1a45;padding:16px 44px;display:flex;justify-content:space-between;align-items:center;}
    .t57-ftr-l{font-size:11px;color:rgba(255,255,255,.45);}
    .t57-ftr-center{font-family:'EB Garamond',serif;font-size:13px;color:#c9a84c;font-style:italic;}
    .t57-ftr-r{font-size:10px;color:rgba(255,255,255,.4);letter-spacing:1px;text-transform:uppercase;}
    .t57-two{display:grid;grid-template-columns:1fr 1fr;gap:0 48px;}
    @container(max-width:768px){
      .t57-two{grid-template-columns:1fr;}
      .t57-cred-bar{padding:8px 18px;flex-wrap:wrap;gap:6px;}
      .t57-hero{grid-template-columns:1fr;padding:24px 18px;gap:20px;}
      .t57-hero-right{display:flex;flex-direction:row;gap:20px;justify-content:flex-start;}
      .t57-gold-stat{text-align:left;}
      .t57-portrait{width:90px;height:90px;}
      .t57-ring{width:106px;height:106px;top:-8px;left:-8px;}
      .t57-name{font-size:30px;}
      .t57-body{grid-template-columns:1fr;}
      .t57-col{padding:20px 18px;}
      .t57-col-r{padding:20px 18px;border-left:none;border-top:1px solid #e0d8c8;}
      .t57-full{padding:20px 18px;}
      .t57-ftr{padding:12px 18px;flex-direction:column;gap:4px;text-align:center;}
      .t57-ftr-center{text-align:center;}
    }
    `;
    document.head.appendChild(s);
  }
  function stCls(s){
    const v=(s||'').toLowerCase();
    if(v.includes('pub')||v.includes('first')||v.includes('award'))return 't57-st-p';
    if(v.includes('review'))return 't57-st-r';
    return 't57-st-a';
  }
  function fillPct(level){
    const l=(level||'').toLowerCase();
    if(l.includes('indep'))return'100%';
    if(l.includes('conf'))return'80%';
    if(l.includes('train')||l.includes('cert')||l.includes('provid'))return'60%';
    if(l.includes('sup'))return'40%';
    return'50%';
  }

  function Template_t57({persona:p,mode,dark}){
    injectStyles();
    const h=React.createElement;
    const stats=[
      {v:p.rotations?.length||6,l:'Rotations'},
      {v:p.research?.length||4,l:'Research'},
      {v:p.awards?.length||4,l:'Honours'},
    ];
    return h('div',{className:'t57'},
      /* credential bar */
      h('div',{className:'t57-cred-bar'},
        h('div',{className:'t57-cred-left'},
          /* caduceus SVG inline */
          h('svg',{width:24,height:24,viewBox:'0 0 24 24'},
            h('line',{x1:12,y1:2,x2:12,y2:22,stroke:'#c9a84c',strokeWidth:1.5}),
            h('path',{d:'M12 6 C8 6 6 9 9 11 C12 13 15 11 12 9 C9 7 7 10 10 12 C13 14 16 12 12 10',stroke:'#c9a84c',strokeWidth:1,fill:'none',strokeLinecap:'round'}),
            h('path',{d:'M12 10 C8 10 6 13 9 15 C12 17 15 15 12 13 C9 11 7 14 10 16 C13 18 16 16 12 14',stroke:'rgba(201,168,76,.6)',strokeWidth:1,fill:'none',strokeLinecap:'round'}),
            h('line',{x1:9,y1:3,x2:15,y2:3,stroke:'#c9a84c',strokeWidth:1.5}),
            h('line',{x1:9,y1:3,x2:8,y2:5,stroke:'#c9a84c',strokeWidth:1.5}),
            h('line',{x1:15,y1:3,x2:16,y2:5,stroke:'#c9a84c',strokeWidth:1.5}),
          ),
          h('span',{className:'t57-cred-text'},`${p.institution} · Medical Register`),
        ),
        h('span',{className:'t57-cred-right'},'MBChB Portfolio · '+new Date().getFullYear()),
      ),
      /* hero */
      h('div',{className:'t57-hero'},
        h('div',{className:'t57-portrait-wrap'},
          h('svg',{className:'t57-ring',viewBox:'0 0 136 136'},
            h('circle',{cx:68,cy:68,r:64,fill:'none',stroke:'#c9a84c',strokeWidth:1,strokeDasharray:'4 3',opacity:.6}),
            h('circle',{cx:68,cy:68,r:58,fill:'none',stroke:'#c9a84c',strokeWidth:.5,opacity:.3}),
          ),
          h('svg',{className:'t57-portrait',viewBox:'0 0 120 120'},
            h('circle',{cx:60,cy:60,r:60,fill:'#081230'}),
            /* white coat */
            h('rect',{x:16,y:72,width:88,height:48,rx:6,fill:'#fff'}),
            h('polygon',{points:'60,72 40,72 34,120 60,88',fill:'#e8e8e8'}),
            h('polygon',{points:'60,72 80,72 86,120 60,88',fill:'#e8e8e8'}),
            /* face */
            h('circle',{cx:60,cy:46,r:22,fill:'#f5c9a0'}),
            /* hair */
            h('ellipse',{cx:60,cy:27,rx:22,ry:12,fill:'#3d2312'}),
            /* stethoscope */
            h('path',{d:'M44 78 C38 88 38 96 48 100 C57 103 65 97 67 88 C69 80 78 77 84 81',stroke:'#c9a84c',strokeWidth:2.5,fill:'none',strokeLinecap:'round',strokeLinejoin:'round'}),
            h('circle',{cx:84,cy:81,r:4,fill:'#c9a84c'}),
            /* gold caduceus pin on lapel */
            h('line',{x1:72,y1:88,x2:72,y2:96,stroke:'#c9a84c',strokeWidth:1.5}),
            h('circle',{cx:72,cy:87,r:2,fill:'#c9a84c'}),
            /* name tag */
            h('rect',{x:30,y:94,width:22,height:16,rx:2,fill:'#0c1a45'}),
            h('rect',{x:32,y:96,width:18,height:3,rx:1,fill:'#c9a84c'}),
            h('line',{x1:32,y1:102,x2:50,y2:102,stroke:'rgba(255,255,255,.3)',strokeWidth:1}),
            h('line',{x1:32,y1:106,x2:46,y2:106,stroke:'rgba(255,255,255,.2)',strokeWidth:1}),
          ),
        ),
        h('div',{className:'t57-hero-text'},
          h('div',{className:'t57-prefix'},'Medical Portfolio — Curriculum Vitae'),
          h('div',{className:'t57-name'},p.name),
          h('div',{className:'t57-title'},`${p.specialization}`),
          h('div',{className:'t57-info-chips'},
            h('span',{className:'t57-info-chip'},p.field),
            h('span',{className:'t57-info-chip'},p.year),
            h('span',{className:'t57-info-chip'},p.faculty),
            h('span',{className:'t57-info-chip'},p.email),
          ),
        ),
        h('div',{className:'t57-hero-right'},
          ...stats.map(s=>h('div',{className:'t57-gold-stat'},
            h('div',{className:'t57-gold-v'},s.v),
            h('div',{className:'t57-gold-l'},s.l),
          )),
        ),
      ),
      /* body */
      h('div',{className:'t57-body'},
        h('div',{className:'t57-col'},
          h('div',{className:'t57-sh'},'Clinical Rotations',h('div',{className:'t57-sh-line'})),
          ...(p.rotations||[]).slice(0,4).map(r=>h('div',{className:'t57-rot'},
            h('div',{className:'t57-rot-svc'},r.service),
            h('div',{className:'t57-rot-site'},r.site),
            h('div',{className:'t57-rot-meta'},`${r.period} · ${r.weeks}w · ${r.lead}`),
            h('div',{className:'t57-rot-procs'},r.procedures),
          )),
        ),
        h('div',{className:'t57-col-r'},
          h('div',{className:'t57-sh'},'Clinical Skills',h('div',{className:'t57-sh-line'})),
          h('div',{className:'t57-skills-wrap'},
            ...(p.skills?.clinical||[]).map(sk=>h('div',{className:'t57-skill'},
              h('span',{className:'t57-skill-name'},sk.name),
              h('div',{className:'t57-skill-bar'},h('div',{className:'t57-skill-fill',style:{width:fillPct(sk.level)}})),
              h('span',{className:'t57-skill-lvl'},sk.level),
            )),
          ),
          h('div',{className:'t57-sh',style:{marginTop:'24px'}},'Education',h('div',{className:'t57-sh-line'})),
          ...(p.education||[]).map(e=>h('div',{className:'t57-edu'},
            h('div',{className:'t57-edu-deg'},e.degree),
            h('div',{className:'t57-edu-org'},e.org),
            h('div',{className:'t57-edu-yr'},e.period),
            e.notes?h('div',{className:'t57-edu-note'},e.notes):null,
          )),
        ),
        /* research full-width */
        h('div',{className:'t57-full'},
          h('div',{className:'t57-sh'},'Research & Publications',h('div',{className:'t57-sh-line'})),
          h('div',{className:'t57-two'},
            ...(p.research||[]).map((r,i)=>h('div',{className:'t57-res'},
              h('div',{className:'t57-res-n'},['I','II','III','IV'][i]||i+1),
              h('div',null,
                h('div',{className:'t57-res-ttl'},r.title),
                h('div',{className:'t57-res-meta'},`${r.role} · ${r.venue} · ${r.year}`),
                h('span',{className:`t57-res-st ${stCls(r.status)}`},r.status),
              ),
            )),
          ),
        ),
        /* awards full-width */
        h('div',{className:'t57-full',style:{borderTop:'1px solid #e0d8c8'}},
          h('div',{className:'t57-sh'},'Awards & Honours',h('div',{className:'t57-sh-line'})),
          h('div',{className:'t57-two'},
            ...(p.awards||[]).map(a=>h('div',{className:'t57-award'},
              h('span',{className:'t57-aw-sym'},'✦'),
              h('div',null,
                h('div',{className:'t57-aw-name'},a.name),
                h('div',{className:'t57-aw-org'},`${a.org} · ${a.year}`),
              ),
            )),
          ),
        ),
      ),
      /* footer */
      h('div',{className:'t57-ftr'},
        h('span',{className:'t57-ftr-l'},`${p.email} · ${p.phone}`),
        h('span',{className:'t57-ftr-center'},p.tagline),
        h('span',{className:'t57-ftr-r'},p.url),
      ),
    );
  }
  window.Template_t57=Template_t57;
})();
