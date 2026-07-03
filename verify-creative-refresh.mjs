import puppeteer from 'puppeteer';

const pages = [
  'index.html','beton.html','galvaniz.html','enerji.html','atik-donusum.html',
  'tedarik-zinciri.html','iletisim.html','hakkimizda.html','belgelerimiz.html',
  'referanslar.html','akademi.html'
];

const browser = await puppeteer.launch({ headless: 'new' });
let anyFail = false;

for(const p of pages){
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  const errors = [];
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  page.on('console', msg => { if(msg.type() === 'error') errors.push('console.error: ' + msg.text()); });
  page.on('requestfailed', req => errors.push('requestfailed: ' + req.url() + ' — ' + (req.failure()?.errorText||'')));

  await page.goto('http://localhost:3000/' + p, { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 900));

  const libsOk = await page.evaluate(() => ({
    gsap: !!window.gsap, ScrollTrigger: !!window.ScrollTrigger, Lenis: !!window.Lenis, SplitType: !!window.SplitType,
    lenisInstance: !!window.__lenis
  }));

  console.log(`\n=== ${p} ===`);
  console.log('libs:', libsOk);
  if(errors.length){ anyFail = true; errors.forEach(e => console.log('  !! ' + e)); }
  else console.log('  no console/page errors');

  await page.screenshot({ path: `verify-${p.replace('.html','')}.png`, fullPage: false });
  await page.close();
}

await browser.close();
console.log(anyFail ? '\nSome pages reported errors.' : '\nAll pages clean.');
