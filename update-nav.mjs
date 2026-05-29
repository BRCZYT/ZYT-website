import fs from 'fs';

const DD_CSS = `
/* DROPDOWN */
.has-dd{position:relative;display:flex;align-items:center}
.dd-tog{cursor:default;user-select:none;display:flex;align-items:center;gap:4px}
.dd-caret{transition:transform .22s cubic-bezier(.22,1,.36,1);flex-shrink:0}
.has-dd:hover .dd-caret,.has-dd:focus-within .dd-caret{transform:rotate(180deg)}
.dd-menu{position:absolute;top:calc(100% + 14px);left:50%;transform:translateX(-50%) translateY(-8px);opacity:0;pointer-events:none;transition:opacity .18s,transform .22s cubic-bezier(.22,1,.36,1);background:rgba(5,23,40,.98);border:1px solid rgba(255,255,255,.1);border-radius:8px;min-width:230px;padding:7px;backdrop-filter:blur(24px);box-shadow:0 24px 60px rgba(0,0,0,.6),0 0 0 1px rgba(40,116,178,.08);z-index:300}
.has-dd:hover .dd-menu,.has-dd:focus-within .dd-menu{opacity:1;pointer-events:all;transform:translateX(-50%) translateY(0)}
.dd-item{display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:5px;text-decoration:none;color:rgba(255,255,255,.62);font-family:'JetBrains Mono Variable',monospace;font-size:9.5px;letter-spacing:1.5px;text-transform:uppercase;transition:color .15s,background .15s;white-space:nowrap}
.dd-item:hover{color:#fff;background:rgba(40,116,178,.18)}
.dd-item-num{color:rgba(40,116,178,.65);font-size:8px;min-width:18px;flex-shrink:0}
/* MOBILE DROPDOWN */
.mob-dd-inner{overflow:hidden;max-height:0;transition:max-height .32s cubic-bezier(.22,1,.36,1);display:flex;flex-direction:column}
.mob-dd-wrap.open .mob-dd-inner{max-height:320px}
.mob-sub-link{font-family:'Sora Variable',Sora,sans-serif;font-size:clamp(1.1rem,5vw,1.6rem);font-weight:300;color:rgba(255,255,255,.38);text-decoration:none;padding:6px 0;transition:color .2s;display:block;text-align:center}
.mob-sub-link:hover{color:#2874B2}
.mob-dd-arr{font-family:'JetBrains Mono Variable',monospace;font-size:14px;color:rgba(40,116,178,.7);transition:transform .25s cubic-bezier(.22,1,.36,1);display:inline-block;margin-left:8px}
.mob-dd-wrap.open .mob-dd-arr{transform:rotate(45deg)}`;

const DD_NAV_NEW = `    <div class="has-dd">
      <span class="nav-link dd-tog" data-i18n="nav.companies">Şirketlerimiz <svg class="dd-caret" width="8" height="5" viewBox="0 0 8 5" fill="none"><path d="M1 1L4 4L7 1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
      <div class="dd-menu">
        <a href="beton.html" class="dd-item"><span class="dd-item-num">01</span>ZYT Beton</a>
        <a href="galvaniz.html" class="dd-item"><span class="dd-item-num">02</span>ZYT Galvaniz</a>
        <a href="enerji.html" class="dd-item"><span class="dd-item-num">03</span>ZYT Enerji</a>
        <a href="atik-donusum.html" class="dd-item"><span class="dd-item-num">04</span>ZYT Makina</a>
        <a href="tedarik-zinciri.html" class="dd-item"><span class="dd-item-num">05</span>ZYT Tedarik</a>
      </div>
    </div>
    <a href="akademi.html" class="nav-link">Blog</a>
    <a href="iletisim.html" class="nav-link" style="color:rgba(255,255,255,.8)" data-i18n="nav.contact">İletişim</a>
  </div>`;

const MOB_DD_NEW = `  <div class="mob-dd-wrap">
    <button class="mob-link mob-dd-tog" onclick="toggleMobDd(this)" data-i18n="nav.companies">Şirketlerimiz <span class="mob-dd-arr">+</span></button>
    <div class="mob-dd-inner">
      <a href="beton.html" class="mob-sub-link" onclick="closeMobNav()">ZYT Beton</a>
      <a href="galvaniz.html" class="mob-sub-link" onclick="closeMobNav()">ZYT Galvaniz</a>
      <a href="enerji.html" class="mob-sub-link" onclick="closeMobNav()">ZYT Enerji</a>
      <a href="atik-donusum.html" class="mob-sub-link" onclick="closeMobNav()">ZYT Makina</a>
      <a href="tedarik-zinciri.html" class="mob-sub-link" onclick="closeMobNav()">ZYT Tedarik</a>
    </div>
  </div>
  <div class="mob-sep"></div>
  <a href="akademi.html" class="mob-link" onclick="closeMobNav()">Blog</a>
  <div class="mob-sep"></div>
  <a href="iletisim.html" class="mob-link" style="color:#2874B2" data-i18n="nav.contact" onclick="closeMobNav()">İletişim</a>`;

const files = ['beton.html','galvaniz.html','enerji.html','atik-donusum.html','tedarik-zinciri.html'];

for (const file of files) {
  let html = fs.readFileSync(file, 'utf8');

  // 1. Add dropdown CSS after .nav-link:hover{color:#fff}
  const cssAnchor = '.nav-link:hover{color:#fff}';
  if (!html.includes('.has-dd{')) {
    html = html.replace(cssAnchor, cssAnchor + DD_CSS);
    console.log(`[${file}] CSS added`);
  } else {
    console.log(`[${file}] CSS already present`);
  }

  // 2. Replace nav-links div (companies + contact links)
  html = html.replace(
    /    <a href="index\.html#companies" class="nav-link"[^>]*>Şirketlerimiz<\/a>\n    <a href="index\.html#contact" class="nav-link"[^>]*>İletişim<\/a>\n  <\/div>/,
    DD_NAV_NEW
  );

  // 3. Replace mobile nav companies + contact
  html = html.replace(
    /  <a href="index\.html#companies" class="mob-link"[^>]*>Şirketlerimiz<\/a>\n  <div class="mob-sep"><\/div>\n  <a href="index\.html#contact" class="mob-link"[^>]*>İletişim<\/a>/,
    MOB_DD_NEW
  );

  // 4. Replace all remaining index.html#contact with iletisim.html
  html = html.replaceAll('href="index.html#contact"', 'href="iletisim.html"');

  // 5. Add toggleMobDd to scripts (after closeMobNav definition)
  if (!html.includes('toggleMobDd')) {
    html = html.replace(
      /function closeMobNav\(\)\{[^}]+\}/,
      m => m + '\nfunction toggleMobDd(el){el.closest(\'.mob-dd-wrap\').classList.toggle(\'open\');}'
    );
  }

  fs.writeFileSync(file, html, 'utf8');
  console.log(`[${file}] done`);
}
console.log('All done.');
