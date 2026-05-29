import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, 'temporary screenshots');

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  args: ['--no-sandbox','--disable-setuid-sandbox']
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 800));

const top = await page.evaluate(() => document.getElementById('companies')?.offsetTop || 0);
console.log('companies top:', top);
await page.evaluate(y => window.scrollTo(0, y), top);
await new Promise(r => setTimeout(r, 700));

const existing = fs.readdirSync(dir).filter(f => f.startsWith('screenshot-') && f.endsWith('.png'));
const nums = existing.map(f => parseInt(f.match(/screenshot-(\d+)/)?.[1]||'0')).filter(n=>!isNaN(n));
const next = nums.length ? Math.max(...nums)+1 : 1;
const out = path.join(dir, `screenshot-${next}-co-hx.png`);
await page.screenshot({ path: out });
console.log('Saved:', out);
await browser.close();
