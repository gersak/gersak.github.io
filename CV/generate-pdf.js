const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const htmlPath = path.resolve(__dirname, 'CV.html');
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });
  await page.evaluateHandle('document.fonts.ready');

  await page.pdf({
    path: path.resolve(__dirname, 'CV_Robert_Gersak.pdf'),
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' }
  });

  await browser.close();
  console.log('PDF generated: CV_Robert_Gersak.pdf');
})();
