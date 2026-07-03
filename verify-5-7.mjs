import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
const errors = [];
page.on('pageerror', e => errors.push(e.message));
page.on('console', m => { if(m.type()==='error') errors.push(m.text()); });
await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 600));

// active-link indicator
const activeLinks = await page.evaluate(() =>
  Array.from(document.querySelectorAll('.cr-active')).map(el => el.textContent.trim()));
console.log('cr-active elements:', activeLinks);

// tilt on a pillar card
const pillar = await page.$('.pillar');
await pillar.scrollIntoView();
await new Promise(r => setTimeout(r, 200));
const box = await pillar.boundingBox();
await page.mouse.move(box.x + box.width*0.25, box.y + box.height*0.25);
await new Promise(r => setTimeout(r, 150));
const transform = await pillar.evaluate(el => el.style.transform);
console.log('pillar transform on hover:', transform);

// nav hide/show
await page.evaluate(() => window.scrollTo(0, 0));
await new Promise(r => setTimeout(r, 200));
await page.evaluate(() => window.scrollTo(0, 1200));
await new Promise(r => setTimeout(r, 600));
let navHidden = await page.evaluate(() => document.getElementById('nav').classList.contains('cr-nav-hidden'));
console.log('nav hidden after scrolling down:', navHidden);
await page.evaluate(() => window.scrollTo(0, 1000));
await new Promise(r => setTimeout(r, 600));
navHidden = await page.evaluate(() => document.getElementById('nav').classList.contains('cr-nav-hidden'));
console.log('nav hidden after scrolling up a bit:', navHidden);

console.log(errors.length ? 'ERRORS: ' + errors.join('; ') : 'no console/page errors');
await browser.close();
