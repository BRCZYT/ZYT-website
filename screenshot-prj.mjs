import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, 'temporary screenshots');

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 800));

async function shot(label, scrollY) {
  await page.evaluate(y => window.scrollTo(0, y), scrollY);
  await new Promise(r => setTimeout(r, 700));
  const existing = fs.readdirSync(dir).filter(f => f.startsWith('screenshot-') && f.endsWith('.png'));
  const nums = existing.map(f => parseInt(f.match(/screenshot-(\d+)/)?.[1]||'0')).filter(n=>!isNaN(n));
  const next = nums.length ? Math.max(...nums)+1 : 1;
  const p = path.join(dir, `screenshot-${next}-${label}.png`);
  await page.screenshot({ path: p });
  console.log(`Saved: ${p}`);
}

const prjTop = await page.evaluate(() => document.getElementById('projects')?.offsetTop || 0);
console.log(`projects top: ${prjTop}px`);

await shot('prj-s1', prjTop + 20);
await shot('prj-s2', prjTop + 920);
await shot('prj-s3', prjTop + 1840);
await shot('prj-s4', prjTop + 2760);

await browser.close();
