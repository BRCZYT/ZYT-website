import fs from 'fs';

const files = [
  'index.html','beton.html','galvaniz.html','enerji.html',
  'atik-donusum.html','tedarik-zinciri.html','iletisim.html','akademi.html'
];

// ── Canonical footer (from beton.html, with data-i18n on copyright) ──────────
const FOOTER_HTML = `<footer id="foot">
  <div style="max-width:1160px;margin:0 auto">
    <div class="foot-inner">
      <a href="index.html" style="text-decoration:none;display:flex;align-items:center;gap:13px">
        <svg width="50" viewBox="140 60 400 130" xmlns="http://www.w3.org/2000/svg">
          <path d="M150,70 L250,70 L260,80 L260,86 L180,164 L260,164 L260,180 L160,180 L150,170 L150,164 L158,164 L238,86 L150,86 Z" fill="#fff"/>
          <path d="M285,76 L291,70 L303,70 L336,122 L344,122 L377,70 L389,70 L395,76 L348,130 L348,180 L332,180 L332,130 Z" fill="#2874B2"/>
          <path d="M420,80 L430,70 L520,70 L530,80 L530,86 L483,86 L483,180 L467,180 L467,86 L420,86 Z" fill="#fff"/>
        </svg>
        <span style="font-family:'JetBrains Mono Variable',monospace;font-size:10px;letter-spacing:2.5px;color:rgba(255,255,255,.38);text-transform:uppercase">ZYT Global Industry</span>
      </a>
      <a href="akademi.html" style="font-family:'JetBrains Mono Variable',monospace;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.35);text-decoration:none;border:1px solid rgba(255,255,255,.1);border-radius:3px;padding:6px 12px;transition:color .15s,border-color .15s" onmouseover="this.style.color='#fff';this.style.borderColor='rgba(40,116,178,.5)'" onmouseout="this.style.color='rgba(255,255,255,.35)';this.style.borderColor='rgba(255,255,255,.1)'">Blog</a>
      <div class="ft-social">
        <a href="https://linkedin.com/company/zyt-global-industry" class="ft-soc-link" aria-label="LinkedIn" target="_blank" rel="noopener"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
        <a href="https://youtube.com/@ZYTGlobalIndustry" class="ft-soc-link" aria-label="YouTube" target="_blank" rel="noopener"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
        <a href="https://instagram.com/zytglobalindustry" class="ft-soc-link" aria-label="Instagram" target="_blank" rel="noopener"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>
        <a href="https://tiktok.com/@zytglobalindustry" class="ft-soc-link" aria-label="TikTok" target="_blank" rel="noopener"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg></a>
        <a href="https://github.com/ZYTGlobalIndustry" class="ft-soc-link" aria-label="GitHub" target="_blank" rel="noopener"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>
      </div>
    </div>
    <div style="height:1px;background:linear-gradient(to right,transparent,rgba(40,116,178,.18),transparent);margin-bottom:20px"></div>
    <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px">
      <span style="font-family:'JetBrains Mono Variable',monospace;font-size:9px;letter-spacing:1.5px;color:rgba(255,255,255,.18);text-transform:uppercase" data-i18n="foot.copy">© 2026 ZYT Global Industry Grubu — Tüm Hakları Saklıdır</span>
      <span style="font-family:'JetBrains Mono Variable',monospace;font-size:9px;letter-spacing:1.5px;color:rgba(255,255,255,.18);text-transform:uppercase">Ankara · Türkiye</span>
    </div>
  </div>
</footer>`;

// ── BTT CSS ───────────────────────────────────────────────────────────────────
const BTT_CSS = `
/* BACK TO TOP */
#btt{position:fixed;right:24px;bottom:32px;width:44px;height:44px;border-radius:50%;background:rgba(10,37,64,.88);border:1px solid rgba(40,116,178,.45);color:rgba(255,255,255,.85);cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:190;opacity:0;transform:translateY(10px);transition:opacity .3s,transform .3s,background .2s,box-shadow .2s;backdrop-filter:blur(10px);box-shadow:0 4px 20px rgba(0,0,0,.35),0 0 0 1px rgba(40,116,178,.1)}
#btt.vis{opacity:1;transform:none}
#btt:hover{background:rgba(40,116,178,.65);box-shadow:0 6px 28px rgba(40,116,178,.35),0 0 0 1px rgba(40,116,178,.3)}`;

// ── BTT HTML (injected before </body>) ────────────────────────────────────────
const BTT_HTML = `
<!-- BACK TO TOP -->
<button id="btt" onclick="window.scrollTo({top:0,behavior:'smooth'})" title="Yukarı Git" aria-label="Yukarı Git">
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 9.5L7 4.5L12 9.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
</button>`;

// ── BTT JS snippet (added to scroll handler) ──────────────────────────────────
const BTT_SCROLL_JS = `\n  document.getElementById('btt').classList.toggle('vis',scrollY>400);`;

// ── Scroll reveal CSS (for pages missing it) ──────────────────────────────────
const RV_CSS = `
/* SCROLL REVEAL */
.rv{opacity:0;transform:translateY(18px);transition:opacity .6s cubic-bezier(.22,1,.36,1),transform .6s cubic-bezier(.22,1,.36,1)}
.rv.on{opacity:1;transform:none}
.d1{transition-delay:.08s}.d2{transition-delay:.16s}.d3{transition-delay:.24s}.d4{transition-delay:.32s}.d5{transition-delay:.4s}.d6{transition-delay:.48s}`;

// ── Scroll reveal JS (for pages missing it) ───────────────────────────────────
const RV_JS = `
/* Scroll reveal */
const _ro=new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('on'); });
},{threshold:0.07});
document.querySelectorAll('.rv').forEach(el=>_ro.observe(el));`;

// ── Dark separator CSS ────────────────────────────────────────────────────────
const SEP_CSS = `
/* DARK SECTION SEPARATOR — subtle glow edge at top of every dark section */
.sec-dark,.cta-band{box-shadow:inset 0 1px 0 rgba(40,116,178,.28),inset 0 60px 60px -60px rgba(40,116,178,.07)}
#foot{border-top:1px solid rgba(40,116,178,.22) !important}`;

// ── Hero image seeds per page ─────────────────────────────────────────────────
const HERO_IMGS = {
  'index.html':       'factory/1440/860',
  'beton.html':       'construction/1440/860',
  'galvaniz.html':    'steel/1440/860',
  'enerji.html':      'solar/1440/860',
  'atik-donusum.html':'industrial/1440/860',
  'tedarik-zinciri.html':'logistics/1440/860',
  'iletisim.html':    'architecture/1440/860',
  'akademi.html':        'office/1440/860',
};

for (const file of files) {
  if (!fs.existsSync(file)) { console.log(`[${file}] NOT FOUND`); continue; }
  let html = fs.readFileSync(file, 'utf8');
  const changed = [];

  // ── 1. Inject BTT CSS ──────────────────────────────────────────────────────
  if (!html.includes('#btt{position:fixed')) {
    html = html.replace('.nav-link:hover{color:#fff}', '.nav-link:hover{color:#fff}' + BTT_CSS);
    // For akademi.html which has different anchor:
    if (!html.includes('#btt{position:fixed')) {
      html = html.replace('.nav-link:hover,.nav-link.active{color:#fff}', '.nav-link:hover,.nav-link.active{color:#fff}' + BTT_CSS);
    }
    changed.push('btt-css');
  }

  // ── 2. Inject separator CSS ────────────────────────────────────────────────
  if (!html.includes('DARK SECTION SEPARATOR')) {
    html = html.replace('.nav-link:hover{color:#fff}', '.nav-link:hover{color:#fff}' + SEP_CSS);
    if (!html.includes('DARK SECTION SEPARATOR')) {
      html = html.replace('.nav-link:hover,.nav-link.active{color:#fff}', '.nav-link:hover,.nav-link.active{color:#fff}' + SEP_CSS);
    }
    changed.push('sep-css');
  }

  // ── 3. Inject scroll reveal CSS where missing ──────────────────────────────
  if (!html.includes('.rv{opacity:0')) {
    html = html.replace('.nav-link:hover{color:#fff}', '.nav-link:hover{color:#fff}' + RV_CSS);
    if (!html.includes('.rv{opacity:0')) {
      html = html.replace('.nav-link:hover,.nav-link.active{color:#fff}', '.nav-link:hover,.nav-link.active{color:#fff}' + RV_CSS);
    }
    changed.push('rv-css');
  }

  // ── 4. Inject BTT HTML + JS ────────────────────────────────────────────────
  if (!html.includes('id="btt"')) {
    html = html.replace('</body>', BTT_HTML + '\n</body>');
    changed.push('btt-html');
  }

  // ── 5. Add BTT toggle to scroll handler ───────────────────────────────────
  if (!html.includes('classList.toggle(\'vis\'')) {
    html = html.replace(
      "window.addEventListener('scroll',()=>{",
      "window.addEventListener('scroll',()=>{"
    );
    html = html.replace(
      "document.getElementById('nav').classList.toggle('scrolled',scrollY>60);",
      "document.getElementById('nav').classList.toggle('scrolled',scrollY>60);" + BTT_SCROLL_JS
    );
    changed.push('btt-js');
  }

  // ── 6. Add scroll reveal JS where missing ─────────────────────────────────
  if (!html.includes('IntersectionObserver') && !html.includes('_ro=new')) {
    html = html.replace('</script>', RV_JS + '\n</script>');
    changed.push('rv-js');
  }

  // ── 7. Unify footer ────────────────────────────────────────────────────────
  const footStart = html.indexOf('<footer id="foot">');
  const footEnd = html.indexOf('</footer>', footStart) + '</footer>'.length;
  if (footStart !== -1) {
    const currentFoot = html.substring(footStart, footEnd);
    if (!currentFoot.includes('aria-label="TikTok"') || !currentFoot.includes('data-i18n="foot.copy"')) {
      html = html.substring(0, footStart) + FOOTER_HTML + html.substring(footEnd);
      changed.push('footer-unified');
    }
  }

  // ── 8. Add subtle hero background image ───────────────────────────────────
  const seed = HERO_IMGS[file];
  if (seed && !html.includes('picsum.photos')) {
    // Inject after .hero-grid div
    const heroGridDiv = '<div class="hero-grid"></div>';
    if (html.includes(heroGridDiv)) {
      html = html.replace(
        heroGridDiv,
        heroGridDiv + `\n  <div style="position:absolute;inset:0;background:url('https://picsum.photos/seed/${seed}') center/cover no-repeat;opacity:.05;mix-blend-mode:luminosity;pointer-events:none"></div>`
      );
      changed.push('hero-img');
    }
  }

  // ── 9. Scroll reveal JS — ensure IntersectionObserver exists ─────────────
  if (html.includes('const ro=new IntersectionObserver') && !html.includes('const _ro=')) {
    // Already has scroll reveal under 'ro', fine
  }

  fs.writeFileSync(file, html, 'utf8');
  console.log(`[${file}] ${changed.join(', ') || 'no-change'}`);
}
console.log('\nAll done.');
