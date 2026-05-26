import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const imgs = [
  ['vt-wa1','https://vettertech.com/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-12-at-11.45.17-1.jpeg'],
  ['vt-wa2','https://vettertech.com/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-12-at-11.45.17.jpeg'],
  ['vt-wa3','https://vettertech.com/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-12-at-11.45.16.jpeg'],
  ['vt-wa4','https://vettertech.com/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-12-at-11.45.16-2.jpeg'],
  ['vt-wa5','https://vettertech.com/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-12-at-11.45.16-1.jpeg'],
  ['vt-wa6','https://vettertech.com/wp-content/uploads/2020/10/WhatsApp-Image-2026-05-20-at-20.10.27.jpeg'],
  ['vt-wa7','https://vettertech.com/wp-content/uploads/2020/10/WhatsApp-Image-2026-05-09-at-14.16.25.jpeg'],
];

const dir = path.join(__dirname, 'temporary screenshots');
const existing = fs.readdirSync(dir).filter(f => f.startsWith('screenshot-') && f.endsWith('.png'));
const nums = existing.map(f => parseInt(f.match(/screenshot-(\d+)/)?.[1] || '0')).filter(n => !isNaN(n));
let next = nums.length ? Math.max(...nums) + 1 : 1;

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 800, height: 600 });

for (const [lbl, url] of imgs) {
  await page.setContent(`<html><body style="margin:0;background:#000"><img src="${url}" style="max-width:100%;max-height:600px;display:block"></body></html>`);
  await new Promise(r => setTimeout(r, 3500));
  const out = path.join(dir, `screenshot-${next}-${lbl}.png`);
  await page.screenshot({ path: out });
  console.log('saved', out);
  next++;
}

await browser.close();
