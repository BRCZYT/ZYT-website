import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
page.on('pageerror', e => console.log('PAGEERROR:', e.message));
await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 500));

await page.evaluate(() => {
  window.__navLog = [];
  var t0 = performance.now();
  window.__mark = (label) => window.__navLog.push(Math.round(performance.now()-t0) + 'ms  ' + label);
  window.addEventListener('popstate', () => window.__mark('NATIVE popstate event fired, location=' + location.href));
  window.__mark('history.length at start = ' + history.length);
});

await page.evaluate(() => { window.__mark('click()'); document.querySelector('a[href="hakkimizda.html"]').click(); });
await new Promise(r => setTimeout(r, 120));
await page.evaluate(() => { window.__mark('history.back() called, history.length=' + history.length); history.back(); });
await new Promise(r => setTimeout(r, 120));
await page.evaluate(() => { window.__mark('history.forward() called'); history.forward(); });
await new Promise(r => setTimeout(r, 6000));

let log;
try{
  log = await page.evaluate(() => window.__navLog);
}catch(e){
  console.log('page context died reading log:', e.message);
  log = null;
}
if(log) console.log(log.join('\n'));

const state = await page.evaluate(() => ({ url: location.href, title: document.title })).catch(e => ({ err: e.message }));
console.log('final:', state);
await browser.close();
