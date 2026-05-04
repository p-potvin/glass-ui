const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const absolutePath = path.resolve('docs/index.html');
  await page.goto(`file://${absolutePath}`, { waitUntil: 'networkidle' });

  await page.screenshot({ path: '/tmp/screenshot_6.png', fullPage: true });

  await browser.close();
  console.log('Screenshots saved to /tmp/');
})();
