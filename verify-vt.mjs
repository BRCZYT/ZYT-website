import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: 'new' });

// ---- Test 1: normal (supported) path ----
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if(m.type()==='error') errors.push(m.text()); });
  await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 500));

  const supported = await page.evaluate(() => typeof document.startViewTransition === 'function');
  console.log('startViewTransition supported in this Chromium:', supported);

  // click the "Hakkımızda" dropdown link via our router
  const clicked = await page.evaluate(() => {
    const a = document.querySelector('a[href="hakkimizda.html"]');
    if(!a) return false;
    a.click();
    return true;
  });
  console.log('clicked hakkimizda.html link:', clicked);
  await new Promise(r => setTimeout(r, 2500));

  const after = await page.evaluate(() => ({
    url: location.href,
    title: document.title,
    hasHeroH1: !!document.querySelector('.hero-h1'),
    heroText: document.querySelector('.hero-h1') ? document.querySelector('.hero-h1').textContent.trim().slice(0,40) : null,
    lenisAlive: !!window.__lenis
  }));
  console.log('after routed nav:', after);

  // browser back
  await page.goBack === undefined; // noop guard
  await page.evaluate(() => history.back());
  await new Promise(r => setTimeout(r, 2500));
  const afterBack = await page.evaluate(() => ({ url: location.href, title: document.title }));
  console.log('after popstate back:', afterBack);

  console.log(errors.length ? 'ERRORS: ' + errors.join(' | ') : 'no console/page errors');
  await page.close();
}

// ---- Test 2: unsupported fallback (stub out startViewTransition before any script runs) ----
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if(m.type()==='error') errors.push(m.text()); });
  await page.evaluateOnNewDocument(() => { Object.defineProperty(document, 'startViewTransition', { value: undefined, configurable: true }); });
  await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 500));

  const urlBefore = page.url();
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 5000 }).catch(() => null),
    page.evaluate(() => { document.querySelector('a[href="hakkimizda.html"]').click(); })
  ]);
  const urlAfter = page.url();
  console.log('fallback path — url before:', urlBefore, '| after:', urlAfter, '| real navigation happened:', urlBefore !== urlAfter);
  console.log(errors.length ? 'ERRORS: ' + errors.join(' | ') : 'no console/page errors');
  await page.close();
}

await browser.close();
