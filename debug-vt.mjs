import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
page.on('pageerror', e => console.log('PAGEERROR:', e.message));
page.on('console', m => console.log('CONSOLE[' + m.type() + ']:', m.text()));
await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 500));

await page.evaluate(() => {
  window.__log = [];
  const origError = console.error;
  console.error = function(...args){ window.__log.push(String(args)); origError.apply(console, args); };
});

await page.evaluate(() => { document.querySelector('a[href="hakkimizda.html"]').click(); });
await new Promise(r => setTimeout(r, 1200));

const state = await page.evaluate(() => ({
  url: location.href, title: document.title,
  bodyHasHakkimizdaHero: document.body.innerHTML.includes('Mühendisliğe dayalı')
}));
console.log('state:', state);
await browser.close();
