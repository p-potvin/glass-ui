const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  await page.screenshot({ path: '/tmp/screenshot_7.png', fullPage: true });

  await browser.close();
  console.log('Screenshots saved to /tmp/screenshot_7.png');
})();
