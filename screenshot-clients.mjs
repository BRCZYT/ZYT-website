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
await page.goto('http://localhost:3000/chipsa-index-clone.html', { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 1000));

async function shot(label, scrollY) {
  if (scrollY !== undefined) {
    await page.evaluate(y => window.scrollTo(0, y), scrollY);
    await new Promise(r => setTimeout(r, 700));
  }
  const existing = fs.readdirSync(dir).filter(f => f.startsWith('screenshot-') && f.endsWith('.png'));
  const nums = existing.map(f => parseInt(f.match(/screenshot-(\d+)/)?.[1] || '0')).filter(n => !isNaN(n));
  const next = nums.length ? Math.max(...nums) + 1 : 1;
  const outPath = path.join(dir, `screenshot-${next}-${label}.png`);
  await page.screenshot({ path: outPath });
  console.log(`Saved: ${outPath}`);
}

// Get the clients section top position
const clientsTop = await page.evaluate(() => document.getElementById('clients')?.offsetTop || 0);
console.log(`clients section top: ${clientsTop}px`);

// Screenshot at different scroll positions within the section
await shot('cli-client1', clientsTop + 10);          // first client (LG)
await shot('cli-client2', clientsTop + 900);         // second client (McDonald's)
await shot('cli-client3', clientsTop + 1800);        // third client (Iiko)
await shot('cli-client4', clientsTop + 2700);        // fourth client (Darkside)
await shot('cli-client5', clientsTop + 3600);        // fifth client (Daigo)

await browser.close();
