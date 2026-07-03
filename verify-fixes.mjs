import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: 'new' });

for(const url of ['http://localhost:3000/index.html', 'http://localhost:3000/index.html?motion=on']){
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(url, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 500));
  const info = await page.evaluate(() => ({
    scrollTriggerRegistered: !!(window.gsap && gsap.core.globals().ScrollTrigger),
    lenisActive: !!window.__lenis
  }));
  console.log(url, info, errors.length ? 'ERRORS: ' + errors.join('; ') : 'no errors');
  await page.close();
}
await browser.close();
