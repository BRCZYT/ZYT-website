import { readFileSync, writeFileSync } from 'fs';

const ZYT_GRUP_DD_DESKTOP = `    <div class="has-dd">
      <span class="nav-link dd-tog">ZYT Grup <svg class="dd-caret" width="8" height="5" viewBox="0 0 8 5" fill="none"><path d="M1 1L4 4L7 1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
      <div class="dd-menu">
        <a href="hakkimizda.html" class="dd-item"><span class="dd-item-num">01</span>Hakkımızda</a>
        <a href="belgelerimiz.html" class="dd-item"><span class="dd-item-num">02</span>Belgelerimiz</a>
        <a href="referanslar.html" class="dd-item"><span class="dd-item-num">03</span>Referanslar</a>
      </div>
    </div>`;

const ZYT_GRUP_DD_MOBILE_PREFIX = `  <div class="mob-dd-wrap">
    <button class="mob-link mob-dd-tog" onclick="toggleMobDd(this)">ZYT Grup <span class="mob-dd-arr">+</span></button>
    <div class="mob-dd-inner">
      <a href="hakkimizda.html" class="mob-sub-link" onclick="closeMobNav()">Hakkımızda</a>
      <a href="belgelerimiz.html" class="mob-sub-link" onclick="closeMobNav()">Belgelerimiz</a>
      <a href="referanslar.html" class="mob-sub-link" onclick="closeMobNav()">Referanslar</a>
    </div>
  </div>
  <div class="mob-sep"></div>
  <div class="mob-dd-wrap">`;

const subPages = ['beton.html','galvaniz.html','enerji.html','atik-donusum.html','tedarik-zinciri.html','iletisim.html','akademi.html'];

for (const f of subPages) {
  let html = readFileSync(f, 'utf8');
  const before = html.length;

  // 1. Desktop nav
  html = html.replace(
    `    <a href="index.html#about" class="nav-link" data-i18n="nav.about">Hakkımızda</a>`,
    ZYT_GRUP_DD_DESKTOP
  );

  // 2. Mobile nav — various onclick/attribute orderings
  html = html.replace(
    /  <a href="index\.html#about" class="mob-link"[^>]*>Hakkımızda<\/a>\n  <div class="mob-sep"><\/div>\n  <div class="mob-dd-wrap">/,
    ZYT_GRUP_DD_MOBILE_PREFIX
  );

  if (html.length !== before) {
    writeFileSync(f, html);
    console.log(`✓ nav updated: ${f}`);
  } else {
    console.log(`⚠  no change in: ${f}  (check patterns)`);
  }
}

console.log('\nDone.');
