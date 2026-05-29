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
await new Promise(r => setTimeout(r, 1000));

const prjTop = await page.evaluate(() => document.getElementById('projects')?.offsetTop || 0);
await page.evaluate(y => window.scrollTo(0, y), prjTop + 10);
await new Promise(r => setTimeout(r, 800));

// Measure nav height and hdr position
const info = await page.evaluate(() => {
  const nav = document.getElementById('nav');
  const hdr = document.querySelector('.prj-pin-hdr');
  const secNum = hdr?.querySelector('.sec-num');
  return {
    navH: nav?.getBoundingClientRect().height,
    hdrTop: hdr?.getBoundingClientRect().top,
    hdrBottom: hdr?.getBoundingClientRect().bottom,
    secColor: secNum ? window.getComputedStyle(secNum).color : 'N/A',
    secBg: secNum ? window.getComputedStyle(secNum).backgroundImage : 'N/A',
  };
});
console.log('Layout info:', JSON.stringify(info, null, 2));

const existing = fs.readdirSync(dir).filter(f => f.startsWith('screenshot-') && f.endsWith('.png'));
const nums = existing.map(f => parseInt(f.match(/screenshot-(\d+)/)?.[1]||'0')).filter(n=>!isNaN(n));
const next = nums.length ? Math.max(...nums)+1 : 1;

// Crop: hdr area (from nav bottom to 100px below)
const hdrTop = Math.max(0, Math.round(info.navH));
const out = path.join(dir, `screenshot-${next}-prj-hdr-zone.png`);
await page.screenshot({ path: out, clip: { x: 0, y: hdrTop, width: 1440, height: 100 } });
console.log('Saved:', out);

await browser.close();
