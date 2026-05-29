// Template_t53 — WHITE COAT · Doctor's Private Practice Profile
// Forest green + white + gold. Lora serif. Stethoscope portrait.
// Clean, warm, human-centred — doctor's business card scaled up.
(function(){
  const SCOPE="t53";
  function injectStyles(){
    if(document.getElementById(SCOPE+'-sty'))return;
    const s=document.createElement('style');s.id=SCOPE+'-sty';
    s.textContent=`
    .t53{font-family:'DM Sans',sans-serif;background:#fff;color:#1a1a1a;min-height:100%;container-type:inline-size;}
    .t53 *{box-sizing:border-box;margin:0;padding:0;}
    .t53-hdr{background:#1b5e20;padding:36px 44px;display:flex;gap:30px;align-items:center;}
    .t53-portrait{width:100px;height:100px;border-radius:50%;border:3px solid #c8973a;flex-shrink:0;}
    .t53-hdr-info{flex:1;}
    .t53-name{font-family:'Lora',serif;font-size:28px;font-weight:700;color:#fff;letter-spacing:-.3px;}
    .t53-role{font-size:11px;color:rgba(255,255,255,.65);text-transform:uppercase;letter-spacing:1.5px;margin-top:5px;}
    .t53-tagline{font-size:13px;color:rgba(255,255,255,.8);margin-top:10px;font-style:italic;}
    .t53-badge{background:#c8973a;color:#fff;font-size:10px;font-weight:700;padding:5px 14px;border-radius:3px;letter-spacing:1px;text-transform:uppercase;align-self:flex-start;}
    .t53-strip{background:#f0f8f1;border-bottom:1px solid #d1e8d4;padding:9px 44px;display:flex;gap:20px;align-items:center;font-size:11px;color:#1b5e20;font-weight:500;flex-wrap:wrap;}
    .t53-allergy{background:#fee2e2;border:1px solid #fca5a5;color:#991b1b;font-size:10px;font-weight:700;padding:2px 10px;border-radius:3px;letter-spacing:.5px;}
    .t53-stats{display:flex;border-bottom:1px solid #e5e7eb;}
    .t53-stat{flex:1;padding:20px 0;text-align:center;border-right:1px solid #e5e7eb;}
    .t53-stat:last-child{border-right:none;}
    .t53-stat-v{font-family:'Lora',serif;font-size:32px;font-weight:700;color:#1b5e20;line-height:1;}
    .t53-stat-l{font-size:10px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;margin-top:4px;}
    .t53-body{display:grid;grid-template-columns:1fr 1fr;}
    .t53-col{padding:28px 44px;}
    .t53-col-r{padding:28px 44px;border-left:1px solid #e5e7eb;}
    .t53-full{padding:24px 44px;border-top:1px solid #e5e7eb;grid-column:1/-1;}
    .t53-sh{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.8px;color:#1b5e20;padding-bottom:8px;border-bottom:2px solid #1b5e20;margin-bottom:16px;}
    .t53-rot{padding:12px 0;border-bottom:1px solid #f3f4f6;}
    .t53-rot:last-child{border-bottom:none;}
    .t53-rot-svc{font-size:14px;font-weight:600;color:#111;}
    .t53-rot-site{font-size:12px;color:#1b5e20;margin-top:2px;}
    .t53-rot-meta{font-size:11px;color:#9ca3af;margin-top:1px;}
    .t53-rot-procs{font-size:11px;color:#4b5563;margin-top:6px;background:#f0faf4;border-left:3px solid #86efac;padding:4px 9px;line-height:1.5;}
    .t53-skill{display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid #f3f4f6;}
    .t53-skill:last-child{border-bottom:none;}
    .t53-skill-n{font-size:13px;color:#111;}
    .t53-skill-l{font-size:10px;padding:2px 9px;border-radius:20px;font-weight:600;}
    .lv53-ind{background:#d1fae5;color:#065f46;}
    .lv53-con{background:#dbeafe;color:#1e40af;}
    .lv53-sup{background:#fef9c3;color:#854d0e;}
    .lv53-cer{background:#ede9fe;color:#5b21b6;}
    .t53-res-grid{display:grid;grid-template-columns:1fr 1fr;gap:0 40px;}
    .t53-res{display:flex;gap:12px;padding:11px 0;border-bottom:1px solid #f3f4f6;align-items:flex-start;}
    .t53-res:last-child{border-bottom:none;}
    .t53-res-n{font-size:11px;color:#c8973a;font-weight:700;min-width:22px;}
    .t53-res-ttl{font-size:13px;font-weight:500;color:#111;line-height:1.4;}
    .t53-res-venue{font-size:11px;color:#6b7280;margin-top:3px;}
    .t53-st{display:inline-block;font-size:10px;padding:1px 7px;border-radius:10px;font-weight:600;margin-top:4px;}
    .t53-st-p{background:#d1fae5;color:#065f46;}
    .t53-st-r{background:#fef3c7;color:#92400e;}
    .t53-st-a{background:#e0e7ff;color:#3730a3;}
    .t53-edu{padding:10px 0;border-bottom:1px solid #f3f4f6;}
    .t53-edu:last-child{border-bottom:none;}
    .t53-edu-deg{font-size:14px;font-weight:600;}
    .t53-edu-org{font-size:12px;color:#1b5e20;margin-top:2px;}
    .t53-edu-yr{font-size:11px;color:#9ca3af;}
    .t53-edu-note{font-size:11px;color:#4b5563;margin-top:4px;font-style:italic;}
    .t53-award{display:flex;gap:10px;padding:8px 0;border-bottom:1px solid #f3f4f6;align-items:flex-start;}
    .t53-award:last-child{border-bottom:none;}
    .t53-aw-star{color:#c8973a;font-size:15px;}
    .t53-aw-name{font-size:12px;font-weight:600;}
    .t53-aw-org{font-size:11px;color:#6b7280;margin-top:2px;}
    .t53-ftr{background:#1b5e20;padding:14px 44px;display:flex;justify-content:space-between;align-items:center;}
    .t53-ftr-l{font-size:11px;color:rgba(255,255,255,.55);}
    .t53-ftr-r{font-size:12px;color:rgba(255,255,255,.9);font-family:'Lora',serif;font-style:italic;}
    .t53-two{display:grid;grid-template-columns:1fr 1fr;gap:0 40px;}
    .t53-two-wide{display:grid;grid-template-columns:1fr 1fr;gap:0 48px;}
    @container(max-width:768px){
      .t53-hdr{padding:20px 18px;gap:16px;flex-wrap:wrap;}
      .t53-portrait{width:72px;height:72px;}
      .t53-name{font-size:20px;}
      .t53-badge{font-size:9px;padding:4px 10px;}
      .t53-strip{padding:8px 18px;gap:12px;font-size:10px;}
      .t53-stats{flex-wrap:wrap;}
      .t53-stat{min-width:50%;border-bottom:1px solid #e5e7eb;}
      .t53-stat-v{font-size:24px;}
      .t53-body{grid-template-columns:1fr;}
      .t53-col{padding:20px 18px;}
      .t53-col-r{padding:20px 18px;border-left:none;border-top:1px solid #e5e7eb;}
      .t53-full{padding:20px 18px;}
      .t53-res-grid{grid-template-columns:1fr;}
      .t53-two{grid-template-columns:1fr;}
      .t53-two-wide{grid-template-columns:1fr;}
      .t53-ftr{padding:12px 18px;flex-direction:column;gap:4px;text-align:center;}
    }
    `;
    document.head.appendChild(s);
  }

  function lvl(level){
    const l=(level||'').toLowerCase();
    if(l.includes('indep'))return 'lv53-ind';
    if(l.includes('conf'))return 'lv53-con';
    if(l.includes('sup'))return 'lv53-sup';
    return 'lv53-cer';
  }
  function stCls(s){
    const v=(s||'').toLowerCase();
    if(v.includes('pub')||v.includes('first')||v.includes('award'))return 't53-st-p';
    if(v.includes('review'))return 't53-st-r';
    return 't53-st-a';
  }

  function Template_t53({persona:p,mode,dark}){
    injectStyles();
    const h=React.createElement;
    const stats=[
      {v:p.rotations?.length||6,l:'Rotations'},
      {v:p.research?.length||4,l:'Publications'},
      {v:p.skills?.clinical?.length||9,l:'Procedures'},
      {v:p.awards?.length||4,l:'Awards'},
    ];
    return h('div',{className:'t53'},
      h('div',{className:'t53-hdr'},
        h('svg',{className:'t53-portrait',viewBox:'0 0 100 100'},
          h('circle',{cx:50,cy:50,r:50,fill:'#0d3b1c'}),
          h('rect',{x:18,y:62,width:64,height:38,rx:4,fill:'#fff'}),
          h('polygon',{points:'50,62 30,62 25,100 50,76',fill:'#e0e0e0'}),
          h('polygon',{points:'50,62 70,62 75,100 50,76',fill:'#e0e0e0'}),
          h('circle',{cx:50,cy:37,r:17,fill:'#f7c49a'}),
          h('ellipse',{cx:50,cy:22,rx:17,ry:9,fill:'#3d2a1a'}),
          /* stethoscope */
          h('path',{d:'M36 68 C32 76 32 83 40 85 C47 87 53 82 55 75 C57 69 64 67 68 70',stroke:'#c8973a',strokeWidth:2.5,fill:'none',strokeLinecap:'round',strokeLinejoin:'round'}),
          h('circle',{cx:68,cy:70,r:3.5,fill:'#c8973a'}),
          /* red cross */
          h('rect',{x:42,y:78,width:16,height:4,rx:1.5,fill:'#dc2626'}),
          h('rect',{x:46,y:74,width:4,height:12,rx:1.5,fill:'#dc2626'}),
          h('rect',{x:26,y:80,width:16,height:10,rx:2,fill:'#1b5e20'}),
          h('line',{x1:28,y1:84,x2:40,y2:84,stroke:'#fff',strokeWidth:1.5}),
          h('line',{x1:28,y1:87,x2:37,y2:87,stroke:'rgba(255,255,255,.5)',strokeWidth:1}),
        ),
        h('div',{className:'t53-hdr-info'},
          h('div',{className:'t53-name'},`Dr ${p.name}`),
          h('div',{className:'t53-role'},`${p.field} · ${p.year}`),
          h('div',{className:'t53-tagline'},`"${p.tagline}"`),
        ),
        h('div',{className:'t53-badge'},'GMC Registered'),
      ),
      h('div',{className:'t53-strip'},
        h('span',null,'✚ ',p.faculty),
        h('span',null,'✉ ',p.email),
        h('span',null,'✆ ',p.phone),
        h('span',{className:'t53-allergy'},`⚠ Allergy: ${p.allergies?.[0]?.split('—')[0]?.trim()||'None known'}`),
      ),
      h('div',{className:'t53-stats'},
        ...stats.map(s=>h('div',{className:'t53-stat'},
          h('div',{className:'t53-stat-v'},s.v),
          h('div',{className:'t53-stat-l'},s.l),
        ))
      ),
      h('div',{className:'t53-body'},
        h('div',{className:'t53-col'},
          h('div',{className:'t53-sh'},'Clinical Rotations'),
          ...(p.rotations||[]).slice(0,4).map(r=>h('div',{className:'t53-rot'},
            h('div',{className:'t53-rot-svc'},r.service),
            h('div',{className:'t53-rot-site'},r.site),
            h('div',{className:'t53-rot-meta'},`${r.period} · ${r.weeks}w · ${r.lead}`),
            h('div',{className:'t53-rot-procs'},r.procedures),
          )),
        ),
        h('div',{className:'t53-col-r'},
          h('div',{className:'t53-sh'},'Clinical Skills'),
          ...(p.skills?.clinical||[]).map(sk=>h('div',{className:'t53-skill'},
            h('span',{className:'t53-skill-n'},sk.name),
            h('span',{className:`t53-skill-l ${lvl(sk.level)}`},sk.level),
          )),
        ),
        h('div',{className:'t53-full'},
          h('div',{className:'t53-sh'},'Research & Publications'),
          h('div',{className:'t53-res-grid t53-two'},
            ...(p.research||[]).map((r,i)=>h('div',{className:'t53-res'},
              h('div',{className:'t53-res-n'},`0${i+1}`),
              h('div',null,
                h('div',{className:'t53-res-ttl'},r.title),
                h('div',{className:'t53-res-venue'},`${r.venue} · ${r.year}`),
                h('span',{className:`t53-st ${stCls(r.status)}`},r.status),
              ),
            )),
          ),
        ),
        h('div',{className:'t53-full t53-two-wide'},
          h('div',null,
            h('div',{className:'t53-sh'},'Education'),
            ...(p.education||[]).map(e=>h('div',{className:'t53-edu'},
              h('div',{className:'t53-edu-deg'},e.degree),
              h('div',{className:'t53-edu-org'},e.org),
              h('div',{className:'t53-edu-yr'},e.period),
              e.notes?h('div',{className:'t53-edu-note'},e.notes):null,
            )),
          ),
          h('div',null,
            h('div',{className:'t53-sh'},'Awards & Honours'),
            ...(p.awards||[]).map(a=>h('div',{className:'t53-award'},
              h('span',{className:'t53-aw-star'},'★'),
              h('div',null,
                h('div',{className:'t53-aw-name'},a.name),
                h('div',{className:'t53-aw-org'},`${a.org} · ${a.year}`),
              ),
            )),
          ),
        ),
      ),
      h('div',{className:'t53-ftr'},
        h('div',{className:'t53-ftr-l'},`${p.institution} · ${p.faculty} · ${p.url}`),
        h('div',{className:'t53-ftr-r'},p.tagline),
      ),
    );
  }
  window.Template_t53=Template_t53;
})();
