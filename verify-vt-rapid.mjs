import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
const errors = [];
page.on('pageerror', e => errors.push('pageerror: ' + e.message));
page.on('console', m => { if(m.type()==='error') errors.push('console.error: ' + m.text()); });
await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 500));

// rapid-fire, but with a small realistic gap (a fast user, not a zero-delay hammer)
await page.evaluate(() => { document.querySelector('a[href="hakkimizda.html"]').click(); });
await new Promise(r => setTimeout(r, 120));
await page.evaluate(() => { history.back(); });
await new Promise(r => setTimeout(r, 120));
await page.evaluate(() => { history.forward(); });
await new Promise(r => setTimeout(r, 1500));

const state = await page.evaluate(() => ({ url: location.href, title: document.title }));
console.log('final state after rapid nav storm:', state);
console.log(errors.length ? 'ERRORS:\n  ' + errors.join('\n  ') : 'no console/page errors');
await browser.close();
