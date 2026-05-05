const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  await page.screenshot({ path: '/tmp/screenshot_5.png', fullPage: true });

  await browser.close();
  console.log('Screenshot saved to /tmp/screenshot_5.png');
})();
