import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
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

const prjTop = await page.evaluate(() => document.getElementById('projects')?.offsetTop || 0);
await page.evaluate(y => window.scrollTo(0, y), prjTop + 20);

function nextNum() {
  const ex = fs.readdirSync(dir).filter(f=>f.startsWith('screenshot-')&&f.endsWith('.png'));
  const nums = ex.map(f=>parseInt(f.match(/screenshot-(\d+)/)?.[1]||'0')).filter(n=>!isNaN(n));
  return nums.length ? Math.max(...nums)+1 : 1;
}

// t=0 anlık (animasyon başı)
await new Promise(r => setTimeout(r, 800));
const out1 = path.join(dir, `screenshot-${nextNum()}-prj-anim-t0.png`);
await page.screenshot({ path: out1 });
console.log('t=0:', out1);

// t=5.5s (background-position %25 ilerledi — renkler değişiyor)
await new Promise(r => setTimeout(r, 5500));
const out2 = path.join(dir, `screenshot-${nextNum()}-prj-anim-t5.png`);
await page.screenshot({ path: out2 });
console.log('t=5.5s:', out2);

// t=11s (background-position ~%50 — en çok fark)
await new Promise(r => setTimeout(r, 5500));
const out3 = path.join(dir, `screenshot-${nextNum()}-prj-anim-t11.png`);
await page.screenshot({ path: out3 });
console.log('t=11s:', out3);

await browser.close();
