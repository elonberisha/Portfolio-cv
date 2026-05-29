// Template_t54 — ANATOMY ATLAS · Classical Medical Illustration
// Warm ivory + deep burgundy. Playfair Display. Anatomical heart SVG.
// Like a page from Gray's Anatomy — prestigious, classical, beautiful.
(function(){
  const SCOPE="t54";
  function injectStyles(){
    if(document.getElementById(SCOPE+'-sty'))return;
    const s=document.createElement('style');s.id=SCOPE+'-sty';
    s.textContent=`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=IBM+Plex+Sans:wght@400;500;600&display=swap');
    .t54{font-family:'IBM Plex Sans',sans-serif;background:#f9f4ed;color:#1a0a0a;min-height:100%;container-type:inline-size;}
    .t54 *{box-sizing:border-box;margin:0;padding:0;}
    /* top rule */
    .t54-rule-top{height:8px;background:#7b1f2a;}
    /* masthead */
    .t54-masthead{padding:28px 44px;display:flex;align-items:flex-start;justify-content:space-between;border-bottom:2px solid #7b1f2a;}
    .t54-mast-left{}
    .t54-mast-title{font-family:'Playfair Display',serif;font-size:11px;text-transform:uppercase;letter-spacing:3px;color:#7b1f2a;font-weight:400;}
    .t54-mast-name{font-family:'Playfair Display',serif;font-size:38px;font-weight:900;color:#1a0a0a;line-height:1;margin-top:6px;}
    .t54-mast-sub{font-family:'Playfair Display',serif;font-size:15px;font-style:italic;color:#7b1f2a;margin-top:6px;}
    .t54-mast-right{text-align:right;}
    .t54-mast-year{font-family:'Playfair Display',serif;font-size:60px;font-weight:900;color:rgba(123,31,42,.12);line-height:1;}
    .t54-mast-inst{font-size:12px;color:#5a3535;margin-top:4px;}
    /* main layout */
    .t54-main{display:grid;grid-template-columns:1fr 340px;gap:0;}
    @container(max-width:768px){.t54-main{grid-template-columns:1fr;}}
    .t54-left{padding:32px 44px;}
    .t54-right{padding:32px 32px;border-left:1px solid #d9c8b8;background:#f3ece3;}
    /* section heading */
    .t54-sh{font-family:'Playfair Display',serif;font-size:13px;font-weight:700;color:#7b1f2a;text-transform:uppercase;letter-spacing:2px;margin-bottom:12px;padding-bottom:6px;border-bottom:1px solid #d9c8b8;}
    .t54-sh-sm{font-size:11px;font-weight:700;color:#7b1f2a;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:10px;padding-bottom:5px;border-bottom:1px solid #d9c8b8;}
    /* pull quote */
    .t54-quote{font-family:'Playfair Display',serif;font-size:16px;font-style:italic;color:#3d1212;line-height:1.7;padding:18px 0;border-top:1px solid #d9c8b8;border-bottom:1px solid #d9c8b8;margin-bottom:28px;}
    /* rotations as two-col table */
    .t54-rot-table{width:100%;border-collapse:collapse;margin-bottom:28px;}
    .t54-rot-table th{font-size:10px;text-transform:uppercase;letter-spacing:1px;color:#7b1f2a;font-weight:600;padding:5px 8px;border-bottom:1.5px solid #7b1f2a;text-align:left;}
    .t54-rot-table td{font-size:12px;padding:9px 8px;border-bottom:1px solid #e5d9cc;vertical-align:top;}
    .t54-rot-table tr:last-child td{border-bottom:none;}
    .t54-svc{font-weight:600;color:#1a0a0a;}
    .t54-site{color:#7b1f2a;font-size:11px;}
    /* research list */
    .t54-res{padding:11px 0;border-bottom:1px solid #e5d9cc;display:flex;gap:10px;align-items:flex-start;}
    .t54-res:last-child{border-bottom:none;}
    .t54-res-n{font-family:'Playfair Display',serif;font-size:14px;font-weight:700;color:#7b1f2a;min-width:22px;font-style:italic;}
    .t54-res-ttl{font-size:13px;color:#1a0a0a;line-height:1.4;}
    .t54-res-meta{font-size:11px;color:#7a6060;margin-top:3px;font-style:italic;}
    .t54-res-st{display:inline-block;font-size:9px;padding:1px 6px;border-radius:2px;font-weight:700;margin-top:3px;letter-spacing:.5px;text-transform:uppercase;}
    .t54-st-p{background:#7b1f2a;color:#fff;}
    .t54-st-r{background:#f5e6c8;color:#7b1f2a;border:1px solid #d9c8b8;}
    .t54-st-a{background:#e8e0f0;color:#4a2060;}
    /* right sidebar */
    .t54-portrait-wrap{margin-bottom:24px;text-align:center;}
    .t54-annotation{font-size:10px;color:#7a6060;font-style:italic;text-align:center;margin-top:6px;}
    .t54-right-sect{margin-bottom:20px;}
    .t54-skill-row{display:flex;justify-content:space-between;align-items:center;padding:5px 0;border-bottom:1px solid #e5d9cc;font-size:12px;}
    .t54-skill-row:last-child{border-bottom:none;}
    .t54-skill-dot{width:8px;height:8px;border-radius:50%;background:#7b1f2a;flex-shrink:0;}
    .t54-skill-lvl{font-size:10px;color:#7a6060;font-style:italic;}
    .t54-edu-item{padding:8px 0;border-bottom:1px solid #e5d9cc;}
    .t54-edu-item:last-child{border-bottom:none;}
    .t54-edu-deg{font-size:12px;font-weight:600;}
    .t54-edu-org{font-size:11px;color:#7b1f2a;margin-top:2px;}
    .t54-edu-yr{font-size:10px;color:#9a7a7a;}
    .t54-award-item{padding:7px 0;border-bottom:1px solid #e5d9cc;display:flex;gap:8px;align-items:flex-start;}
    .t54-award-item:last-child{border-bottom:none;}
    .t54-aw-sym{color:#7b1f2a;font-size:12px;}
    .t54-aw-name{font-size:11px;font-weight:600;}
    .t54-aw-org{font-size:10px;color:#9a7a7a;}
    /* footer */
    .t54-footer{border-top:2px solid #7b1f2a;padding:14px 44px;display:flex;justify-content:space-between;align-items:center;background:#f9f4ed;}
    .t54-ftr-l{font-size:10px;color:#9a7a7a;font-style:italic;}
    .t54-ftr-r{font-family:'Playfair Display',serif;font-size:11px;color:#7b1f2a;}
    .t54-rule-bot{height:5px;background:#7b1f2a;}
    @container(max-width:768px){
      .t54-masthead{padding:18px 18px;flex-direction:column;gap:8px;}
      .t54-mast-right{text-align:left;}
      .t54-mast-year{font-size:40px;}
      .t54-mast-name{font-size:28px;}
      .t54-main{grid-template-columns:1fr;}
      .t54-left{padding:20px 18px;}
      .t54-right{padding:20px 18px;border-left:none;border-top:1px solid #d9c8b8;}
      .t54-rot-table{font-size:11px;}
      .t54-rot-table th,.t54-rot-table td{padding:6px 4px;}
      .t54-footer{padding:12px 18px;flex-direction:column;gap:4px;}
    }
    `;
    document.head.appendChild(s);
  }

  function stCls(s){
    const v=(s||'').toLowerCase();
    if(v.includes('pub')||v.includes('first')||v.includes('award'))return 't54-st-p';
    if(v.includes('review'))return 't54-st-r';
    return 't54-st-a';
  }

  function Template_t54({persona:p,mode,dark}){
    injectStyles();
    const h=React.createElement;
    return h('div',{className:'t54'},
      h('div',{className:'t54-rule-top'}),
      /* masthead */
      h('div',{className:'t54-masthead'},
        h('div',{className:'t54-mast-left'},
          h('div',{className:'t54-mast-title'},'Medical Portfolio · Anatomical Record'),
          h('div',{className:'t54-mast-name'},p.name),
          h('div',{className:'t54-mast-sub'},`${p.specialization}`),
        ),
        h('div',{className:'t54-mast-right'},
          h('div',{className:'t54-mast-year'},'Rx'),
          h('div',{className:'t54-mast-inst'},p.faculty),
          h('div',{className:'t54-mast-inst',style:{marginTop:'2px'}},p.field+' · '+p.year),
        ),
      ),
      /* main */
      h('div',{className:'t54-main'},
        /* left column */
        h('div',{className:'t54-left'},
          h('div',{className:'t54-quote'},`"${p.tagline}"`),
          /* rotations table */
          h('div',{className:'t54-sh'},'Clinical Rotations'),
          h('table',{className:'t54-rot-table'},
            h('thead',null,h('tr',null,
              h('th',null,'Specialty'),h('th',null,'Hospital'),h('th',null,'Period'),h('th',null,'Key Procedures'),
            )),
            h('tbody',null,...(p.rotations||[]).map(r=>h('tr',null,
              h('td',null,h('div',{className:'t54-svc'},r.service),h('div',{className:'t54-site'},`${r.weeks}w · ${r.lead}`)),
              h('td',null,r.site),
              h('td',null,r.period),
              h('td',null,r.procedures),
            ))),
          ),
          /* research */
          h('div',{className:'t54-sh',style:{marginTop:'24px'}},'Research & Publications'),
          ...(p.research||[]).map((r,i)=>h('div',{className:'t54-res'},
            h('div',{className:'t54-res-n'},`${['I','II','III','IV'][i]||i+1}.`),
            h('div',null,
              h('div',{className:'t54-res-ttl'},r.title),
              h('div',{className:'t54-res-meta'},`${r.role} · ${r.venue} · ${r.year}`),
              h('span',{className:`t54-res-st ${stCls(r.status)}`},r.status),
            ),
          )),
        ),
        /* right sidebar */
        h('div',{className:'t54-right'},
          /* anatomical portrait */
          h('div',{className:'t54-portrait-wrap'},
            h('svg',{viewBox:'0 0 180 220',width:'100%'},
              /* parchment bg */
              h('rect',{x:0,y:0,width:180,height:220,fill:'#ede4d6',rx:4}),
              /* classical border */
              h('rect',{x:4,y:4,width:172,height:212,fill:'none',stroke:'#7b1f2a',strokeWidth:.8,rx:3}),
              h('rect',{x:8,y:8,width:164,height:204,fill:'none',stroke:'#c8a87a',strokeWidth:.5,rx:2}),
              /* Anatomical heart - stylized */
              h('g',{transform:'translate(90,95)'},
                /* heart outline */
                h('path',{d:`M 0 20
                  C 0 20 -30 10 -32 -5
                  C -34 -20 -20 -30 -5 -22
                  C -2 -20 0 -16 0 -16
                  C 0 -16 2 -20 5 -22
                  C 20 -30 34 -20 32 -5
                  C 30 10 0 20 0 20 Z`,
                  fill:'#8b2030',stroke:'#5a0f15',strokeWidth:1}),
                /* aorta */
                h('path',{d:'M -5 -22 C -5 -35 -15 -42 -10 -50 C -5 -58 5 -55 8 -48',stroke:'#5a0f15',strokeWidth:2,fill:'none'}),
                h('path',{d:'M 5 -22 C 5 -32 15 -38 18 -32',stroke:'#5a0f15',strokeWidth:1.5,fill:'none'}),
                /* pulmonary */
                h('path',{d:'M -10 -50 C -20 -55 -28 -50 -30 -44',stroke:'#5a0f15',strokeWidth:1.5,fill:'none'}),
                h('path',{d:'M 8 -48 C 16 -56 26 -52 28 -46',stroke:'#5a0f15',strokeWidth:1.5,fill:'none'}),
                /* vena cava */
                h('path',{d:'M -30 -5 C -40 -5 -44 4 -40 10',stroke:'#2a4a7a',strokeWidth:1.5,fill:'none'}),
                h('path',{d:'M 30 -5 C 40 -5 44 4 40 10',stroke:'#2a4a7a',strokeWidth:1.5,fill:'none'}),
                /* highlight */
                h('path',{d:'M -18 -8 C -18 -16 -10 -20 -5 -14',stroke:'rgba(255,180,180,.5)',strokeWidth:1,fill:'none'}),
                /* cross-hatching for classical illustration feel */
                h('line',{x1:-25,y1:5,x2:-5,y2:15,stroke:'rgba(90,15,21,.2)',strokeWidth:.5}),
                h('line',{x1:-22,y1:10,x2:-2,y2:18,stroke:'rgba(90,15,21,.2)',strokeWidth:.5}),
              ),
              /* label lines */
              h('line',{x1:122,y1:72,x2:148,y2:60,stroke:'#7b1f2a',strokeWidth:.6}),
              h('text',{x:150,y:58,fill:'#7b1f2a',fontSize:7,fontStyle:'italic'},'Aorta'),
              h('line',{x1:58,y1:72,x2:32,y2:60,stroke:'#7b1f2a',strokeWidth:.6}),
              h('text',{x:5,y:58,fill:'#7b1f2a',fontSize:7,fontStyle:'italic'},'Pulm.'),
              h('line',{x1:50,y1:95,x2:26,y2:105,stroke:'#7b1f2a',strokeWidth:.6}),
              h('text',{x:5,y:108,fill:'#7b1f2a',fontSize:7,fontStyle:'italic'},'V. Cava'),
              /* name plate */
              h('rect',{x:20,y:172,width:140,height:38,rx:2,fill:'rgba(123,31,42,.08)',stroke:'#7b1f2a',strokeWidth:.5}),
              h('text',{x:90,y:186,textAnchor:'middle',fill:'#1a0a0a',fontSize:12,fontWeight:'bold',fontFamily:'Playfair Display,serif'},p.name),
              h('text',{x:90,y:200,textAnchor:'middle',fill:'#7b1f2a',fontSize:8,fontStyle:'italic'},'Internal Medicine · Neurology'),
              /* fig label */
              h('text',{x:90,y:215,textAnchor:'middle',fill:'#9a7a7a',fontSize:7,fontStyle:'italic'},'Fig. I — Cor (Heart) · Ventral view'),
            ),
            h('div',{className:'t54-annotation'},'Clinical Portfolio · Edinburgh Medical School'),
          ),
          /* skills */
          h('div',{className:'t54-right-sect'},
            h('div',{className:'t54-sh-sm'},'Clinical Skills'),
            ...(p.skills?.clinical||[]).map(sk=>h('div',{className:'t54-skill-row'},
              h('div',{style:{display:'flex',alignItems:'center',gap:'7px'}},
                h('div',{className:'t54-skill-dot'}),
                h('span',null,sk.name),
              ),
              h('span',{className:'t54-skill-lvl'},sk.level),
            )),
          ),
          /* education */
          h('div',{className:'t54-right-sect'},
            h('div',{className:'t54-sh-sm'},'Education'),
            ...(p.education||[]).map(e=>h('div',{className:'t54-edu-item'},
              h('div',{className:'t54-edu-deg'},e.degree),
              h('div',{className:'t54-edu-org'},e.org),
              h('div',{className:'t54-edu-yr'},e.period),
            )),
          ),
          /* awards */
          h('div',{className:'t54-right-sect'},
            h('div',{className:'t54-sh-sm'},'Awards'),
            ...(p.awards||[]).map(a=>h('div',{className:'t54-award-item'},
              h('span',{className:'t54-aw-sym'},'†'),
              h('div',null,
                h('div',{className:'t54-aw-name'},a.name),
                h('div',{className:'t54-aw-org'},`${a.org} · ${a.year}`),
              ),
            )),
          ),
        ),
      ),
      h('div',{className:'t54-footer'},
        h('div',{className:'t54-ftr-l'},`${p.email} · ${p.phone} · ${p.url}`),
        h('div',{className:'t54-ftr-r'},`${p.institution} · ${p.faculty}`),
      ),
      h('div',{className:'t54-rule-bot'}),
    );
  }
  window.Template_t54=Template_t54;
})();
