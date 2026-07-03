import fs from 'fs';

// redesign/creative-refresh §9 — small page-specific hero identities.
// Each motif is a pure-CSS decorative layer, inserted right after the
// existing <div class="hero-grid"></div> marker in each hero section.

const MOTIF_MARK = '/* CREATIVE-REFRESH MOTIF';

const jobs = [
  {
    file: 'galvaniz.html',
    name: 'galvaniz',
    div: '<div class="hero-motif hero-motif-galvaniz" aria-hidden="true"></div>',
    css: `
${MOTIF_MARK} — galvaniz: metallic shimmer sweep */
.hero-motif{position:absolute;inset:0;pointer-events:none;z-index:0;overflow:hidden}
.hero-motif-galvaniz::before{content:'';position:absolute;top:-50%;left:-20%;width:60%;height:200%;background:linear-gradient(100deg,transparent 30%,rgba(255,255,255,.10) 45%,rgba(200,230,255,.18) 50%,rgba(255,255,255,.10) 55%,transparent 70%);animation:cr-shimmer-sweep 6s ease-in-out infinite}
@keyframes cr-shimmer-sweep{0%{transform:translateX(-30%)}100%{transform:translateX(160%)}}
`
  },
  {
    file: 'enerji.html',
    name: 'enerji',
    div: '<div class="hero-motif hero-motif-enerji" aria-hidden="true"></div>',
    css: `
${MOTIF_MARK} — enerji: flowing energy line */
.hero-motif{position:absolute;inset:0;pointer-events:none;z-index:0;overflow:hidden}
.hero-motif-enerji::before{content:'';position:absolute;left:0;right:0;top:38%;height:1.5px;background:repeating-linear-gradient(90deg,transparent 0 12px,rgba(232,119,34,.3) 12px 26px,transparent 26px 40px);background-size:200% 100%;animation:cr-energy-flow 3.2s linear infinite;filter:blur(.4px) drop-shadow(0 0 5px rgba(232,119,34,.25));opacity:.7}
@keyframes cr-energy-flow{to{background-position:-80px 0}}
`
  },
  {
    file: 'tedarik-zinciri.html',
    name: 'tedarik',
    div: '<div class="hero-motif hero-motif-tedarik" aria-hidden="true"></div>',
    css: `
${MOTIF_MARK} — tedarik-zinciri: network nodes */
.hero-motif{position:absolute;inset:0;pointer-events:none;z-index:0;overflow:hidden}
.hero-motif-tedarik::before{content:'';position:absolute;inset:0;background-image:radial-gradient(circle,rgba(40,116,178,.35) 1.5px,transparent 1.5px);background-size:46px 46px;opacity:.35;animation:cr-network-pulse 4s ease-in-out infinite}
@keyframes cr-network-pulse{0%,100%{opacity:.25}50%{opacity:.5}}
`
  }
];

for(const job of jobs){
  if(!fs.existsSync(job.file)){ console.log(`[${job.file}] NOT FOUND`); continue; }
  let html = fs.readFileSync(job.file, 'utf8');
  const changed = [];

  if(!html.includes(MOTIF_MARK)){
    const si = html.indexOf('</style>');
    if(si !== -1){ html = html.slice(0,si) + job.css + html.slice(si); changed.push('css'); }
  }

  const marker = '<div class="hero-grid"></div>';
  if(!html.includes(job.div) && html.includes(marker)){
    html = html.replace(marker, marker + '\n  ' + job.div);
    changed.push('div');
  }

  fs.writeFileSync(job.file, html, 'utf8');
  console.log(`[${job.file}] ${changed.join(', ') || 'no-change'}`);
}
console.log('\nDone.');
