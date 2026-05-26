import fs from 'fs';

const files = [
  'index.html','beton.html','galvaniz.html','enerji.html',
  'atik-donusum.html','tedarik-zinciri.html','iletisim.html','blog.html'
];

const BTT_JS = `window.addEventListener('scroll',()=>{const b=document.getElementById('btt');if(b)b.classList.toggle('vis',scrollY>400);},{passive:true});`;

const SEP_CSS = `
/* BLOCK SEP */
.block-sep{height:2px;background:linear-gradient(90deg,transparent 0%,rgba(40,116,178,.48) 12%,rgba(100,180,255,.92) 32%,rgba(180,230,255,1) 50%,rgba(100,180,255,.92) 68%,rgba(40,116,178,.48) 88%,transparent 100%);box-shadow:0 0 18px 8px rgba(40,116,178,.28),0 0 45px 16px rgba(40,116,178,.12);position:relative;z-index:2;animation:sep-pulse 3.5s ease-in-out infinite alternate}
@keyframes sep-pulse{from{opacity:.55;box-shadow:0 0 12px 4px rgba(40,116,178,.18)}to{opacity:1;box-shadow:0 0 28px 10px rgba(40,116,178,.42),0 0 60px 22px rgba(40,116,178,.18)}}`;

const FOOT_ANIM = `@keyframes foot-glow{0%,100%{opacity:.6}50%{opacity:1}}
#foot::before{animation:foot-glow 5s ease-in-out infinite !important;background:radial-gradient(ellipse 80% 220% at 50% 50%,rgba(40,116,178,.28) 0%,transparent 52%),radial-gradient(ellipse 65% 200% at 5% 50%,rgba(40,116,178,.48) 0%,transparent 52%),radial-gradient(ellipse 55% 200% at 95% 50%,rgba(40,116,178,.35) 0%,transparent 52%) !important}`;

// Minimal T dict for blog.html which has no i18n system
const BLOG_SETLANG = `const T={
  tr:{'nav.about':'Hakkımızda','nav.companies':'Şirketlerimiz','nav.contact':'İletişim',
      'cta.h':'Projeniz için konuşalım.','cta.sub':'Sektörünüze özel çözüm için uzman ekibimize ulaşın.',
      'cta.btn':'Teklif Al','cta.btn2':'Şirketlerimiz →',
      'foot.copy':'© 2026 ZYT Global Industry Grubu — Tüm Hakları Saklıdır'},
  en:{'nav.about':'About','nav.companies':'Companies','nav.contact':'Contact',
      'cta.h':"Let's talk about your project.",'cta.sub':'Reach our expert team for industry-specific solutions.',
      'cta.btn':'Get a Quote','cta.btn2':'Our Companies →',
      'foot.copy':'© 2026 ZYT Global Industry Group — All Rights Reserved'},
  ar:{'nav.about':'من نحن','nav.companies':'شركاتنا','nav.contact':'اتصل بنا',
      'cta.h':'لنتحدث عن مشروعك.','cta.sub':'تواصل مع فريق خبرائنا للحلول الخاصة بقطاعك.',
      'cta.btn':'احصل على عرض','cta.btn2':'شركاتنا ←',
      'foot.copy':'© 2026 مجموعة ZYT Global Industry — جميع الحقوق محفوظة'}
};
function setLang(l){
  const t=T[l];if(!t)return;
  document.documentElement.lang=l;document.documentElement.dir=l==='ar'?'rtl':'ltr';
  document.querySelectorAll('[data-i18n]').forEach(e=>{const v=t[e.dataset.i18n];if(v!==undefined)e.textContent=v});
  document.querySelectorAll('[data-i18n-html]').forEach(e=>{const v=t[e.dataset.i18nHtml];if(v!==undefined)e.innerHTML=v});
  document.querySelectorAll('.l-btn,.mob-l-btn').forEach(b=>b.classList.toggle('active',b.dataset.lang===l));
  localStorage.setItem('zyt-lang',l);
}
const _l=localStorage.getItem('zyt-lang')||(navigator.language.startsWith('ar')?'ar':navigator.language.startsWith('tr')?'tr':'en');
setLang(_l);
document.querySelectorAll('.l-btn,.mob-l-btn').forEach(b=>b.addEventListener('click',()=>setLang(b.dataset.lang)));`;

const SEP_DIV = '<div class="block-sep"></div>';

function addSepBefore(html, anchor) {
  if (!html.includes(anchor)) return html;
  if (html.includes(SEP_DIV + '\n' + anchor) || html.includes(SEP_DIV + anchor)) return html;
  return html.split(anchor).join(SEP_DIV + '\n' + anchor);
}

for (const file of files) {
  if (!fs.existsSync(file)) { console.log(`[${file}] NOT FOUND`); continue; }
  let html = fs.readFileSync(file, 'utf8');
  let changed = [];

  // ══ 1. FIX BTT LISTENER LOCATION ════════════════════════════════════

  // Remove from inside Tailwind CDN script tag
  if (html.includes('<script src="https://cdn.tailwindcss.com">\n')) {
    html = html.replace(
      /<script src="https:\/\/cdn\.tailwindcss\.com">\n[^\n]+\n<\/script>/,
      '<script src="https://cdn.tailwindcss.com"></script>'
    );
    changed.push('cdn-cleaned');
  }

  // Remove from inside application/ld+json (index.html)
  html = html.replace(
    /\n\nwindow\.addEventListener\('scroll',\(\)=>\{document\.getElementById\('btt'\)\.classList\.toggle\('vis',scrollY>400\);\},\{passive:true\}\);\n(<\/script>)/,
    '\n$1'
  );

  // Add to last real script block if still missing
  if (!html.includes("getElementById('btt').classList.toggle")) {
    const idx = html.lastIndexOf('</script>');
    if (idx !== -1) {
      html = html.slice(0, idx) + '\n' + BTT_JS + '\n</script>' + html.slice(idx + 9);
      changed.push('btt-fixed');
    }
  }

  // ══ 2. BLOCK SEPARATOR CSS ══════════════════════════════════════════

  if (!html.includes('@keyframes sep-pulse')) {
    html = html.replace('</style>', SEP_CSS + '\n</style>');
    changed.push('sep-css');
  }

  // ══ 3. BLOCK SEPARATOR DIVS ═════════════════════════════════════════

  // Before cta-band and footer
  const prevLen = html.length;
  html = addSepBefore(html, '<div class="cta-band');
  html = addSepBefore(html, '<footer id="foot">');

  // Before every sec-dark section (avoid doubling)
  html = html.replace(/<section([^>]+class="sec sec-dark")/g, (match) => {
    return SEP_DIV + '\n<section' + match.slice('<section'.length);
  });
  // Remove any duplicates created by running twice
  const dupRe = new RegExp(
    SEP_DIV.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\n' +
    SEP_DIV.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\n',
    'g'
  );
  html = html.replace(dupRe, SEP_DIV + '\n');
  if (html.length !== prevLen) changed.push('sep-divs');

  // ══ 4. FOOTER BRIGHTENING + ANIMATION ═══════════════════════════════

  if (!html.includes('foot-glow')) {
    html = html.replace(
      '#foot{background:#051728;',
      '#foot{background:linear-gradient(180deg,#0e2d52 0%,#071e38 50%,#051728 100%);'
    );
    html = html.replace('</style>', FOOT_ANIM + '\n</style>');
    changed.push('footer-brightened');
  }

  // ══ 5. NAV DROPDOWN: preserve SVG while translating ═════════════════

  // Desktop: move data-i18n to inner text-only span, leaving SVG untouched
  // Before: <span class="nav-link dd-tog" data-i18n="nav.companies">TEXT <svg
  // After:  <span class="nav-link dd-tog"><span data-i18n="nav.companies">TEXT</span> <svg
  if (!html.includes('<span data-i18n="nav.companies">')) {
    html = html.replace(
      /(<span class="nav-link dd-tog") data-i18n="nav\.companies">([^<]+?)( <svg)/g,
      '$1><span data-i18n="nav.companies">$2</span>$3'
    );
    changed.push('dd-i18n-wrapped');
  }

  // Mobile: same for button
  if (!html.includes('<span data-i18n="nav.companies">') === false) {
    // already done above or already had it
  }
  html = html.replace(
    /(<button class="mob-link mob-dd-tog"[^>]*?) data-i18n="nav\.companies">([^<]+?)( <span class="mob-dd-arr")/g,
    '$1><span data-i18n="nav.companies">$2</span>$3'
  );

  // ══ 6. BLOG.HTML: add full i18n system ══════════════════════════════

  if (file === 'blog.html') {

    // Add data-i18n to nav links that lack it
    html = html.replace(
      /<a href="index\.html#about" class="nav-link">/,
      '<a href="index.html#about" class="nav-link" data-i18n="nav.about">'
    );
    html = html.replace(
      /<span class="nav-link dd-tog">(Şirketlerimiz|Companies|شركاتنا) (<svg)/,
      '<span class="nav-link dd-tog"><span data-i18n="nav.companies">$1</span> $2'
    );
    html = html.replace(
      /<a href="iletisim\.html" class="nav-link" style="color:rgba\(255,255,255,\.8\)">/,
      '<a href="iletisim.html" class="nav-link" style="color:rgba(255,255,255,.8)" data-i18n="nav.contact">'
    );
    // Mobile nav
    html = html.replace(
      /<a href="index\.html#about" class="mob-link" onclick="closeMobNav\(\)">(Hakkımızda|About|من نحن)<\/a>/,
      '<a href="index.html#about" class="mob-link" onclick="closeMobNav()" data-i18n="nav.about">$1</a>'
    );
    html = html.replace(
      /<button class="mob-link mob-dd-tog" onclick="toggleMobDd\(this\)">(Şirketlerimiz|Companies|شركاتنا) (<span class="mob-dd-arr">)/,
      '<button class="mob-link mob-dd-tog" onclick="toggleMobDd(this)"><span data-i18n="nav.companies">$1</span> $2'
    );
    html = html.replace(
      /<a href="iletisim\.html" class="mob-link" onclick="closeMobNav\(\)">(İletişim|Contact|اتصل بنا)<\/a>/,
      '<a href="iletisim.html" class="mob-link" onclick="closeMobNav()" data-i18n="nav.contact">$1</a>'
    );

    // Add data-i18n to CTA
    html = html.replace(
      /<h2 style="font-family:'Sora Variable',Sora,sans-serif;font-size:clamp\(1\.8rem,4vw,3rem\);font-weight:300;letter-spacing:-.03em;margin-bottom:14px">Projeniz için konuşalım\.<\/h2>/,
      '<h2 style="font-family:\'Sora Variable\',Sora,sans-serif;font-size:clamp(1.8rem,4vw,3rem);font-weight:300;letter-spacing:-.03em;margin-bottom:14px" data-i18n="cta.h">Projeniz için konuşalım.</h2>'
    );

    // Replace simple lang switcher with full setLang
    html = html.replace(
      `document.querySelectorAll('[data-lang]').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('[data-lang]').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll(\`[data-lang="\${btn.dataset.lang}"]\`).forEach(b=>b.classList.add('active'));
  });
});`,
      BLOG_SETLANG
    );
    changed.push('blog-i18n');
  }

  // ══ 7. INDEX.HTML: fix ticker i18n ══════════════════════════════════

  if (file === 'index.html') {

    // Add id to ticker-inner
    html = html.replace(
      '<div class="ticker-inner">',
      '<div class="ticker-inner" id="ticker-inner">'
    );

    // Add ticker arrays to T dict (append just before closing of each lang)
    // TR
    html = html.replace(
      `'foot.copy':'© 2026 ZYT Global Industry Grubu — Tüm Hakları Saklıdır'\n  },\n  en:`,
      `'foot.copy':'© 2026 ZYT Global Industry Grubu — Tüm Hakları Saklıdır',\n    'ticker':['Beton Santralleri','Atık-Enerji Dönüşüm','Galvaniz Tesisleri','Tedarik Zinciri','Anahtar Teslim Projeler','ZYT Global Industry']\n  },\n  en:`
    );
    // EN
    html = html.replace(
      `'foot.copy':'© 2026 ZYT Global Industry Group — All Rights Reserved'\n  },\n  ar:`,
      `'foot.copy':'© 2026 ZYT Global Industry Group — All Rights Reserved',\n    'ticker':['Concrete Batching Plants','Waste-Energy Conversion','Galvanizing Facilities','Supply Chain','Turnkey Projects','ZYT Global Industry']\n  },\n  ar:`
    );
    // AR
    html = html.replace(
      `'foot.copy':'© 2026 مجموعة ZYT Global Industry — جميع الحقوق محفوظة'\n  }\n};`,
      `'foot.copy':'© 2026 مجموعة ZYT Global Industry — جميع الحقوق محفوظة',\n    'ticker':['محطات الخرسانة','تحويل النفايات إلى طاقة','مرافق الغلفنة','سلسلة التوريد','مشاريع تسليم المفتاح','ZYT Global Industry']\n  }\n};`
    );

    // Patch setLang to also update the ticker
    const TICKER_PATCH = `\n  const ti=document.getElementById('ticker-inner');if(ti&&t.ticker){const inner=t.ticker.map(s=>'<span>'+s+'</span><div class="ticker-dot"></div>').join('');const item='<div class="ticker-item">'+inner+'</div>';ti.innerHTML=item+item;}`;
    html = html.replace(
      `localStorage.setItem('zyt-lang',l)}`,
      `localStorage.setItem('zyt-lang',l);${TICKER_PATCH}}`
    );

    changed.push('ticker-i18n');
  }

  fs.writeFileSync(file, html, 'utf8');
  console.log(`[${file}] ${changed.join(', ') || 'no-change'}`);
}
console.log('\nAll done.');
