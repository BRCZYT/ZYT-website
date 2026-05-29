import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });

// Disable lazy loading to ensure images load
await page.setExtraHTTPHeaders({ 'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8' });

await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 2500));

const dir = path.join(__dirname, 'temporary screenshots');
const existing = fs.readdirSync(dir).filter(f => f.startsWith('screenshot-') && f.endsWith('.png'));
const nums = existing.map(f => parseInt(f.match(/screenshot-(\d+)/)?.[1] || '0')).filter(n => !isNaN(n));
let next = nums.length ? Math.max(...nums) + 1 : 1;

// Scroll to panel bottom area (names visible)
await page.evaluate(() => {
  const el = document.querySelector('#companies .co-hx-panel');
  if (el) el.scrollIntoView({ block: 'end' });
});
await new Promise(r => setTimeout(r, 600));

// Actually scroll to show bottom of panel
await page.evaluate(() => {
  const sec = document.querySelector('#companies');
  const rect = sec.getBoundingClientRect();
  window.scrollTo(0, window.scrollY + rect.top + window.innerHeight * 0.3);
});
await new Promise(r => setTimeout(r, 700));

// Default — no hover
await page.screenshot({ path: path.join(dir, `screenshot-${next++}-co-hx-default.png`), fullPage: false });
console.log('Default saved');

const cards = await page.$$('.co-hx-card');
const names = ['beton', 'enerji', 'galvaniz', 'tedarik', 'makina'];

for (let i = 0; i < cards.length; i++) {
  await cards[i].hover();
  await new Promise(r => setTimeout(r, 950));
  await page.screenshot({ path: path.join(dir, `screenshot-${next++}-co-hx-${names[i]}.png`), fullPage: false });
  console.log(`Hover ${names[i]} saved`);
}

await browser.close();
console.log('Done');
