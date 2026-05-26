import { readFileSync, writeFileSync } from 'fs';

const ctaPages  = ['beton.html','galvaniz.html','enerji.html','atik-donusum.html','tedarik-zinciri.html'];
const allPages  = [...ctaPages, 'index.html', 'blog.html', 'iletisim.html'];

// ── 1. Remove CTA blocks ────────────────────────────────────────────────────
for (const f of ctaPages) {
  let html = readFileSync(f, 'utf8');
  // Strip everything from <!-- CTA  up to (not including) <!-- FOOTER
  const before = html.length;
  html = html.replace(/<!-- CTA[\s\S]*?(?=<!-- FOOTER)/, '');
  if (html.length < before) {
    writeFileSync(f, html);
    console.log(`✓ CTA removed from ${f}  (${before - html.length} chars)`);
  } else {
    console.log(`⚠  No CTA found in ${f}`);
  }
}

// ── 2. Add footer top brightness to all pages ──────────────────────────────
const FOOT_BRIGHT_MARKER = 'foot-top-brightness-added';

// The CSS to inject — a ::after glow on top of the footer
const brightCSS = `
/* footer top brightness */
#foot{background:linear-gradient(180deg,#1e4f84 0%,#102d56 18%,#071e38 52%,#051728 100%) !important}
#foot::after{content:'';position:absolute;top:0;left:0;right:0;height:220px;background:radial-gradient(ellipse 90% 100% at 50% 0%,rgba(40,116,178,.55) 0%,rgba(40,116,178,.22) 40%,transparent 70%);pointer-events:none;z-index:0;animation:foot-top-pulse 6s ease-in-out infinite}
@keyframes foot-top-pulse{0%,100%{opacity:.75}50%{opacity:1}}
`;

for (const f of allPages) {
  let html = readFileSync(f, 'utf8');
  if (html.includes(FOOT_BRIGHT_MARKER)) {
    console.log(`– already patched: ${f}`);
    continue;
  }
  // Inject just before </style>
  const marker = `/* ${FOOT_BRIGHT_MARKER} */`;
  html = html.replace('</style>', marker + brightCSS + '\n</style>');
  writeFileSync(f, html);
  console.log(`✓ Footer brightness added to ${f}`);
}

console.log('\nDone.');
