import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const url   = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || 'full';
const scrollY = parseInt(process.argv[4] || '0');

const dir = path.join(__dirname, 'temporary screenshots');
const existing = fs.readdirSync(dir).filter(f => f.startsWith('screenshot-') && f.endsWith('.png'));
const nums = existing.map(f => parseInt(f.match(/screenshot-(\d+)/)?.[1] || '0')).filter(n => !isNaN(n));
const next = nums.length ? Math.max(...nums) + 1 : 1;
const outPath = path.join(dir, `screenshot-${next}-${label}.png`);

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 2000));
if (scrollY > 0) {
  await page.evaluate(y => window.scrollTo(0, y), scrollY);
  await new Promise(r => setTimeout(r, 800));
}
await page.screenshot({ path: outPath, fullPage: false });
await browser.close();
console.log(`Saved: ${outPath}`);
