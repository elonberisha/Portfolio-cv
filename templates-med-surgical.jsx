// Template_t56 — GRAND ROUNDS · Teaching Hospital Presentation
// Warm cream (#fffdf7) + deep teal (#0a6e6e). Fraunces + DM Sans.
// Teaching-hospital case presentation style — human, clinical, warm.
(function(){
  const SCOPE="t56";
  function injectStyles(){
    if(document.getElementById(SCOPE+'-sty'))return;
    const s=document.createElement('style');s.id=SCOPE+'-sty';
    s.textContent=`
    .t56{font-family:'DM Sans',sans-serif;background:#fffdf7;color:#1a1a14;min-height:100%;container-type:inline-size;}
    .t56 *{box-sizing:border-box;margin:0;padding:0;}
    /* header */
    .t56-hdr{background:#0a6e6e;padding:28px 44px 0;position:relative;overflow:hidden;}
    .t56-hdr::after{content:'';position:absolute;bottom:0;left:0;right:0;height:40px;background:#fffdf7;border-radius:40px 40px 0 0;}
    .t56-hdr-inner{display:flex;gap:28px;align-items:flex-end;padding-bottom:52px;}
    .t56-portrait{width:110px;height:130px;border-radius:12px 12px 0 0;border:3px solid rgba(255,255,255,.3);border-bottom:none;flex-shrink:0;position:relative;z-index:1;}
    .t56-hdr-text{flex:1;padding-bottom:8px;}
    .t56-rounds-label{font-size:10px;text-transform:uppercase;letter-spacing:2.5px;color:rgba(255,255,255,.6);margin-bottom:8px;}
    .t56-name{font-family:'Fraunces',serif;font-size:34px;font-weight:900;color:#fff;line-height:1;letter-spacing:-.5px;}
    .t56-sub{font-size:13px;color:rgba(255,255,255,.75);margin-top:8px;}
    .t56-chips{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap;}
    .t56-chip{background:rgba(255,255,255,.18);color:#fff;font-size:10px;padding:4px 12px;border-radius:20px;font-weight:600;letter-spacing:.5px;}
    .t56-chip-red{background:#c0392b;color:#fff;}
    /* body layout */
    .t56-body{display:grid;grid-template-columns:2fr 1fr;gap:0;}
    .t56-main{padding:32px 40px 32px 44px;}
    .t56-sidebar{padding:32px 44px 32px 28px;border-left:2px dashed #d4e8e0;}
    /* section heading */
    .t56-sh{font-family:'Fraunces',serif;font-size:14px;font-weight:700;color:#0a6e6e;margin-bottom:14px;display:flex;align-items:center;gap:10px;}
    .t56-sh::after{content:'';flex:1;height:1px;background:#d4e8e0;}
    .t56-sh-sm{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#0a6e6e;margin-bottom:10px;}
    .t56-mb{margin-bottom:28px;}
    /* summary */
    .t56-summary{font-size:14px;line-height:1.8;color:#2a2a1e;font-style:italic;padding:16px 20px;background:#f0faf8;border-left:4px solid #0a6e6e;border-radius:0 8px 8px 0;margin-bottom:28px;}
    /* case cards / rotations */
    .t56-case{background:#fff;border:1px solid #ddeee8;border-radius:8px;padding:16px;margin-bottom:10px;position:relative;}
    .t56-case-num{position:absolute;top:-10px;left:16px;background:#0a6e6e;color:#fff;font-size:10px;font-weight:700;padding:2px 10px;border-radius:10px;}
    .t56-case-svc{font-size:15px;font-weight:700;color:#0a3d3d;margin-top:4px;}
    .t56-case-site{font-size:12px;color:#0a6e6e;margin-top:2px;}
    .t56-case-meta{font-size:11px;color:#8a9a8a;margin-top:1px;}
    .t56-case-procs{font-size:11px;color:#3d5a4a;margin-top:6px;line-height:1.5;}
    /* research as case list */
    .t56-study{display:flex;gap:14px;padding:12px 0;border-bottom:1px solid #e8f0ea;align-items:flex-start;}
    .t56-study:last-child{border-bottom:none;}
    .t56-study-mark{width:32px;height:32px;background:#0a6e6e;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;font-weight:700;flex-shrink:0;font-family:'Fraunces',serif;}
    .t56-study-ttl{font-size:13px;font-weight:600;color:#1a1a14;line-height:1.4;}
    .t56-study-meta{font-size:11px;color:#6b8070;margin-top:3px;}
    .t56-study-st{display:inline-block;font-size:10px;padding:2px 8px;border-radius:4px;font-weight:600;margin-top:4px;}
    .t56-st-p{background:#d1fae5;color:#065f46;}
    .t56-st-r{background:#fef3c7;color:#92400e;}
    .t56-st-a{background:#dbeafe;color:#1e40af;}
    /* sidebar: skills */
    .t56-vitals-box{background:#0a6e6e;border-radius:10px;padding:16px;margin-bottom:20px;color:#fff;}
    .t56-vitals-title{font-size:10px;text-transform:uppercase;letter-spacing:1.5px;opacity:.7;margin-bottom:10px;}
    .t56-vital-row{display:flex;justify-content:space-between;align-items:center;padding:5px 0;border-bottom:1px solid rgba(255,255,255,.15);}
    .t56-vital-row:last-child{border-bottom:none;}
    .t56-vital-k{font-size:11px;opacity:.8;}
    .t56-vital-v{font-size:13px;font-weight:700;}
    .t56-skill{padding:7px 0;border-bottom:1px solid #e8f0ea;display:flex;justify-content:space-between;align-items:center;}
    .t56-skill:last-child{border-bottom:none;}
    .t56-skill-name{font-size:12px;}
    .t56-skill-lvl{font-size:10px;padding:2px 8px;border-radius:10px;font-weight:600;}
    .lv56-i{background:#d1fae5;color:#065f46;}
    .lv56-c{background:#dbeafe;color:#1e40af;}
    .lv56-s{background:#fef9c3;color:#854d0e;}
    .lv56-t{background:#ede9fe;color:#5b21b6;}
    .t56-edu{padding:8px 0;border-bottom:1px solid #e8f0ea;}
    .t56-edu:last-child{border-bottom:none;}
    .t56-edu-deg{font-size:12px;font-weight:600;}
    .t56-edu-org{font-size:11px;color:#0a6e6e;margin-top:1px;}
    .t56-edu-yr{font-size:10px;color:#8a9a8a;}
    .t56-award{padding:6px 0;border-bottom:1px solid #e8f0ea;font-size:12px;}
    .t56-award:last-child{border-bottom:none;}
    .t56-aw-name{font-weight:600;}
    .t56-aw-org{font-size:11px;color:#6b8070;margin-top:1px;}
    /* footer */
    .t56-ftr{background:#0a3d3d;padding:14px 44px;display:flex;justify-content:space-between;font-size:11px;}
    .t56-ftr-l{color:rgba(255,255,255,.5);}
    .t56-ftr-r{color:rgba(255,255,255,.85);font-family:'Fraunces',serif;font-style:italic;font-size:12px;}
    @container(max-width:768px){
      .t56-hdr{padding:20px 18px 0;}
      .t56-hdr-inner{flex-direction:column;align-items:flex-start;gap:16px;padding-bottom:48px;}
      .t56-portrait{width:80px;height:96px;}
      .t56-name{font-size:26px;}
      .t56-body{grid-template-columns:1fr;}
      .t56-main{padding:20px 18px;}
      .t56-sidebar{padding:20px 18px;border-left:none;border-top:2px dashed #d4e8e0;}
      .t56-ftr{padding:12px 18px;flex-direction:column;gap:4px;}
    }
    `;
    document.head.appendChild(s);
  }
  function lv56(level){
    const l=(level||'').toLowerCase();
    if(l.includes('indep'))return 'lv56-i';
    if(l.includes('conf'))return 'lv56-c';
    if(l.includes('sup'))return 'lv56-s';
    return 'lv56-t';
  }
  function stCls(s){
    const v=(s||'').toLowerCase();
    if(v.includes('pub')||v.includes('first')||v.includes('award'))return 't56-st-p';
    if(v.includes('review'))return 't56-st-r';
    return 't56-st-a';
  }

  function Template_t56({persona:p,mode,dark}){
    injectStyles();
    const h=React.createElement;
    const vitals=p.vitals||{bp:'118/74',hr:'62',rr:'14',spo2:'99%',temp:'36.8 °C'};
    return h('div',{className:'t56'},
      /* header */
      h('div',{className:'t56-hdr'},
        h('div',{className:'t56-hdr-inner'},
          h('svg',{className:'t56-portrait',viewBox:'0 0 110 130'},
            h('rect',{x:0,y:0,width:110,height:130,rx:12,fill:'#064a4a'}),
            /* scrubs top */
            h('rect',{x:10,y:72,width:90,height:60,rx:6,fill:'#0a6e6e'}),
            /* white coat collar */
            h('polygon',{points:'55,72 38,72 32,130 55,90',fill:'rgba(255,255,255,.9)'}),
            h('polygon',{points:'55,72 72,72 78,130 55,90',fill:'rgba(255,255,255,.9)'}),
            /* face */
            h('circle',{cx:55,cy:48,r:22,fill:'#f5c9a0'}),
            /* hair */
            h('ellipse',{cx:55,cy:28,rx:22,ry:12,fill:'#6b3a1f'}),
            /* stethoscope */
            h('path',{d:'M40 76 C35 85 35 94 44 97 C52 100 60 95 62 86 C64 79 72 76 78 79',stroke:'#90caf9',strokeWidth:3,fill:'none',strokeLinecap:'round',strokeLinejoin:'round'}),
            h('circle',{cx:78,cy:79,r:4.5,fill:'#90caf9'}),
            /* lanyard */
            h('rect',{x:48,y:71,width:14,height:1.5,rx:.75,fill:'#fbbf24'}),
            /* ID card */
            h('rect',{x:20,y:100,width:22,height:16,rx:2,fill:'#fff'}),
            h('rect',{x:22,y:102,width:18,height:4,rx:1,fill:'#0a6e6e'}),
            h('line',{x1:22,y1:109,x2:38,y2:109,stroke:'#d1d5db',strokeWidth:1.5}),
            h('line',{x1:22,y1:113,x2:34,y2:113,stroke:'#e5e7eb',strokeWidth:1}),
          ),
          h('div',{className:'t56-hdr-text'},
            h('div',{className:'t56-rounds-label'},'Grand Rounds · Teaching Portfolio'),
            h('div',{className:'t56-name'},p.name),
            h('div',{className:'t56-sub'},`${p.specialization} · ${p.currentRole}`),
            h('div',{className:'t56-chips'},
              h('span',{className:'t56-chip'},p.field),
              h('span',{className:'t56-chip'},p.year),
              h('span',{className:'t56-chip'},p.faculty),
              p.allergies?.length?h('span',{className:'t56-chip t56-chip-red'},'⚠ '+p.allergies[0].split('—')[0].trim()):null,
            ),
          ),
        ),
      ),
      /* body */
      h('div',{className:'t56-body'},
        /* main */
        h('div',{className:'t56-main'},
          h('div',{className:'t56-summary'},`"${p.summary}"`),
          h('div',{className:'t56-sh t56-mb'},'Clinical Rotations'),
          h('div',null,
            ...(p.rotations||[]).map((r,i)=>h('div',{className:'t56-case'},
              h('div',{className:'t56-case-num'},`Case ${String(i+1).padStart(2,'0')}`),
              h('div',{className:'t56-case-svc'},r.service),
              h('div',{className:'t56-case-site'},r.site),
              h('div',{className:'t56-case-meta'},`${r.period} · ${r.weeks}w · Lead: ${r.lead}`),
              h('div',{className:'t56-case-procs'},r.procedures),
            )),
          ),
          h('div',{className:'t56-sh t56-mb',style:{marginTop:'28px'}},'Research & Publications'),
          ...(p.research||[]).map((r,i)=>h('div',{className:'t56-study'},
            h('div',{className:'t56-study-mark'},['I','II','III','IV'][i]||i+1),
            h('div',null,
              h('div',{className:'t56-study-ttl'},r.title),
              h('div',{className:'t56-study-meta'},`${r.role} · ${r.venue} · ${r.year}`),
              h('span',{className:`t56-study-st ${stCls(r.status)}`},r.status),
            ),
          )),
        ),
        /* sidebar */
        h('div',{className:'t56-sidebar'},
          h('div',{className:'t56-vitals-box'},
            h('div',{className:'t56-vitals-title'},'Patient Vitals (reference)'),
            ...Object.entries(vitals).map(([k,v])=>h('div',{className:'t56-vital-row'},
              h('span',{className:'t56-vital-k'},k.toUpperCase()),
              h('span',{className:'t56-vital-v'},v),
            )),
          ),
          h('div',{className:'t56-sh-sm t56-mb'},'Clinical Skills'),
          ...(p.skills?.clinical||[]).map(sk=>h('div',{className:'t56-skill'},
            h('span',{className:'t56-skill-name'},sk.name),
            h('span',{className:`t56-skill-lvl ${lv56(sk.level)}`},sk.level),
          )),
          h('div',{className:'t56-sh-sm t56-mb',style:{marginTop:'20px'}},'Education'),
          ...(p.education||[]).map(e=>h('div',{className:'t56-edu'},
            h('div',{className:'t56-edu-deg'},e.degree),
            h('div',{className:'t56-edu-org'},e.org),
            h('div',{className:'t56-edu-yr'},e.period),
          )),
          h('div',{className:'t56-sh-sm t56-mb',style:{marginTop:'20px'}},'Awards & Honours'),
          ...(p.awards||[]).map(a=>h('div',{className:'t56-award'},
            h('div',{className:'t56-aw-name'},'★ '+a.name),
            h('div',{className:'t56-aw-org'},`${a.org} · ${a.year}`),
          )),
        ),
      ),
      /* footer */
      h('div',{className:'t56-ftr'},
        h('span',{className:'t56-ftr-l'},`${p.email} · ${p.phone} · ${p.url}`),
        h('span',{className:'t56-ftr-r'},p.tagline),
      ),
    );
  }
  window.Template_t56=Template_t56;
})();
