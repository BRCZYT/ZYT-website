import fs from 'fs';

const files = [
  'index.html','beton.html','galvaniz.html','enerji.html',
  'atik-donusum.html','tedarik-zinciri.html','iletisim.html','blog.html'
];

// ── CSS chunks to inject ──────────────────────────────────────────────
const HERO_CSS = `
/* HERO AMBIENT */
.h-amb{position:absolute;inset:0;pointer-events:none;z-index:0;overflow:hidden}
.h-amb::before{content:'';position:absolute;width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,rgba(40,116,178,.28) 0%,transparent 65%);top:-220px;left:-200px;animation:hamb 8s ease-in-out infinite alternate}
.h-amb::after{content:'';position:absolute;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(40,116,178,.2) 0%,transparent 65%);bottom:-120px;right:-100px;animation:hamb 6s ease-in-out infinite alternate-reverse}
@keyframes hamb{from{transform:scale(1) translate(0,0)}to{transform:scale(1.12) translate(28px,-24px)}}
.h-scan{position:absolute;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent 0%,rgba(40,116,178,.55) 30%,rgba(100,180,255,.7) 50%,rgba(40,116,178,.55) 70%,transparent 100%);animation:hscan 6s ease-in-out infinite;pointer-events:none;z-index:1;top:0}
@keyframes hscan{0%{top:-2px;opacity:0}5%{opacity:1}90%{opacity:.5}100%{top:100%;opacity:0}}
.h-dots{position:absolute;inset:0;pointer-events:none;z-index:0;background-image:radial-gradient(circle,rgba(40,116,178,.35) 1px,transparent 1px);background-size:80px 80px;opacity:.25;animation:hdot 4s ease-in-out infinite alternate}
@keyframes hdot{from{opacity:.15}to{opacity:.32}}`;

const HERO_BG_CSS = `
/* HERO BACKGROUND LIFT */
#hero{background:linear-gradient(150deg,#0f3d72 0%,#09274a 30%,#061e3a 55%,#051728 80%) !important}`;

const HERO_GRID_FIX = `.06) 1px,transparent 1px),linear-gradient(90deg,rgba(40,116,178,.06)`;
const HERO_GRID_NEW = `.14) 1px,transparent 1px),linear-gradient(90deg,rgba(40,116,178,.14)`;
const HERO_GRID_FIX2 = `.05) 1px,transparent 1px),linear-gradient(90deg,rgba(40,116,178,.05)`;
const HERO_GRID_NEW2 = `.14) 1px,transparent 1px),linear-gradient(90deg,rgba(40,116,178,.14)`;

// ── Blog footer link HTML ─────────────────────────────────────────────
const BLOG_FT_LINK = `<a href="blog.html" style="font-family:'JetBrains Mono Variable',monospace;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.35);text-decoration:none;border:1px solid rgba(255,255,255,.1);border-radius:3px;padding:6px 12px;transition:color .15s,border-color .15s" onmouseover="this.style.color='#fff';this.style.borderColor='rgba(40,116,178,.5)'" onmouseout="this.style.color='rgba(255,255,255,.35)';this.style.borderColor='rgba(255,255,255,.1)'">Blog</a>`;

for (const file of files) {
  if (!fs.existsSync(file)) { console.log(`[${file}] NOT FOUND`); continue; }
  let html = fs.readFileSync(file, 'utf8');
  let changed = [];

  // 1. FIX DROPDOWN GAP: remove top gap, use padding-top instead
  if (html.includes('top:calc(100% + 14px)')) {
    html = html.replace(
      'top:calc(100% + 14px);left:50%;transform:translateX(-50%) translateY(-8px);opacity:0;pointer-events:none;transition:opacity .18s,transform .22s cubic-bezier(.22,1,.36,1);background:rgba(5,23,40,.98);border:1px solid rgba(255,255,255,.1);border-radius:8px;min-width:230px;padding:7px;',
      'top:100%;left:50%;transform:translateX(-50%) translateY(-8px);opacity:0;pointer-events:none;transition:opacity .18s,transform .22s cubic-bezier(.22,1,.36,1);background:rgba(5,23,40,.98);border:1px solid rgba(255,255,255,.1);border-radius:8px;min-width:230px;padding:14px 7px 7px;'
    );
    // Also add a transparent hover bridge above dd-menu
    html = html.replace(
      '.has-dd:hover .dd-menu,.has-dd:focus-within .dd-menu{opacity:1;pointer-events:all;transform:translateX(-50%) translateY(0)}',
      '.has-dd:hover .dd-menu,.has-dd:focus-within .dd-menu{opacity:1;pointer-events:all;transform:translateX(-50%) translateY(0)}.dd-menu::before{content:\'\';position:absolute;top:-14px;left:0;right:0;height:14px}'
    );
    changed.push('dropdown-gap-fix');
  }

  // 2. REMOVE BLOG FROM NAV
  html = html.replace(/<a href="blog\.html" class="nav-link"(?: active)?">Blog<\/a>\n?/g, '');
  html = html.replace(/<a href="blog\.html" class="nav-link active">Blog<\/a>\n?/g, '');
  html = html.replace(/    <a href="blog\.html" class="nav-link"[^>]*>Blog<\/a>\n/g, '');
  changed.push('blog-from-nav');

  // 3. ADD BLOG LINK TO FOOTER near ft-social
  if (!html.includes('blog.html" style="font-family')) {
    html = html.replace(
      '<div class="ft-social">',
      BLOG_FT_LINK + '\n      <div class="ft-social">'
    );
    changed.push('blog-to-footer');
  }

  // 4. ADD HERO AMBIENT CSS
  if (!html.includes('.h-amb{')) {
    // Inject after .nav-link:hover{color:#fff} or at end of style block
    const cssAnchor = '.nav-link:hover{color:#fff}';
    if (html.includes(cssAnchor)) {
      html = html.replace(cssAnchor, cssAnchor + HERO_CSS + HERO_BG_CSS);
      changed.push('hero-css');
    }
  }

  // 5. BRIGHTEN HERO GRID (both opacity variants)
  const escRe = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  html = html.replace(new RegExp(escRe(HERO_GRID_FIX), 'g'), HERO_GRID_NEW);
  html = html.replace(new RegExp(escRe(HERO_GRID_FIX2), 'g'), HERO_GRID_NEW2);

  // 6. MAKE HERO ORBS BRIGHTER
  html = html.replace(/rgba\(40,116,178,\.13\) 0%,transparent 70%\);top:-150px;right:-100px/g,
    'rgba(40,116,178,.28) 0%,transparent 70%);top:-150px;right:-100px');
  html = html.replace(/rgba\(40,116,178,\.08\) 0%,transparent 70%\);bottom:0;left:-80px/g,
    'rgba(40,116,178,.18) 0%,transparent 70%);bottom:0;left:-80px');

  // 7. ADD HERO AMBIENT DIVS — inject after hero-grid and orb divs
  if (!html.includes('class="h-amb"')) {
    html = html.replace(
      /<div class="hero-grid"><\/div>/,
      '<div class="hero-grid"></div>\n  <div class="h-amb"></div>\n  <div class="h-scan"></div>\n  <div class="h-dots"></div>'
    );
    // For pages that don't use hero-grid class (iletisim/blog have different hero structure)
    if (!html.includes('class="h-amb"')) {
      html = html.replace(
        /(<section id="hero"[^>]*>)\n/,
        '$1\n  <div class="h-amb"></div>\n  <div class="h-scan"></div>\n  <div class="h-dots"></div>\n'
      );
    }
    changed.push('hero-ambient-divs');
  }

  fs.writeFileSync(file, html, 'utf8');
  console.log(`[${file}] done: ${changed.join(', ')}`);
}
console.log('\nAll done.');
