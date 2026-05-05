import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // click on the first menu item "Liquid Glass (WebGL)"
  const elements = await page.getByText('Liquid Glass (WebGL)').all();
  await elements[0].click();

  await page.waitForTimeout(2000);

  // scroll down to bottom
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  await page.screenshot({ path: '/tmp/screenshot_3.png' });
  await browser.close();
})();
