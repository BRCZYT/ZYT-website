import fs from 'fs';

const files = [
  'index.html','beton.html','galvaniz.html','enerji.html',
  'atik-donusum.html','tedarik-zinciri.html','iletisim.html','akademi.html'
];

// isolation:isolate creates a stacking context so z-index:-1 pseudo-element
// stays above the section's own background but below all its content.
const DARK_AMB_CSS = `
/* DARK SECTION AMBIENT */
.cta-band,.stats-band,.clients-band,#plant-sec{position:relative;overflow:hidden;isolation:isolate}
#foot{position:relative;overflow:hidden;isolation:isolate}
.sec-dark{overflow:hidden;isolation:isolate}
.cta-band::before,.stats-band::before,.clients-band::before,#plant-sec::before,#foot::before,.sec-dark::before{content:'';position:absolute;inset:0;pointer-events:none;z-index:-1;background:radial-gradient(ellipse 65% 160% at 12% 50%,rgba(40,116,178,.24) 0%,transparent 58%),radial-gradient(ellipse 52% 160% at 88% 50%,rgba(40,116,178,.17) 0%,transparent 58%);animation:hamb 10s ease-in-out infinite alternate}`;

for (const file of files) {
  if (!fs.existsSync(file)) { console.log(`[${file}] NOT FOUND`); continue; }
  let html = fs.readFileSync(file, 'utf8');
  let changed = [];

  // 1. Inject CSS (once)
  if (!html.includes('.sec-dark{overflow:hidden')) {
    const anchor = '.nav-link:hover{color:#fff}';
    if (html.includes(anchor)) {
      html = html.replace(anchor, anchor + DARK_AMB_CSS);
      changed.push('dark-amb-css');
    }
  }

  // 2. Add sec-dark class to section.sec elements with dark inline backgrounds
  //    Handles both orderings: class="sec" style=... and id="..." class="sec" style=...
  const before2 = html;
  html = html.replace(
    /class="sec"([^>]*style="background:(#051728|#0A2540)")/g,
    'class="sec sec-dark"$1'
  );
  if (html !== before2) changed.push('sec-dark-class');

  // 3. akademi.html has a <section style="...background:#051728..."> without sec class
  html = html.replace(
    /<section style="([^"]*background:#051728[^"]*)"/g,
    '<section class="sec-dark" style="$1"'
  );

  // 4. iletisim.html info band <div style="background:#0A2540;...">
  html = html.replace(
    /<div style="background:#0A2540;padding:48px 80px">/,
    '<div class="sec-dark" style="background:#0A2540;padding:48px 80px;position:relative;">'
  );

  fs.writeFileSync(file, html, 'utf8');
  console.log(`[${file}] done: ${changed.join(', ') || 'no-change'}`);
}
console.log('\nAll done.');
