const { chromium } = require('playwright');

async function scrapeAndSum() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let totalSum = 0;

  for (let seed = 24; seed <= 33; seed++) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    await page.goto(url);
    await page.waitForSelector("table");

    const numbers = await page.$$eval("table td", tds =>
      tds.map(td => parseInt(td.innerText.trim())).filter(n => !isNaN(n))
    );

    const pageSum = numbers.reduce((a, b) => a + b, 0);
    console.log(`Seed ${seed}: ${pageSum}`);
    totalSum += pageSum;
  }

  await browser.close();
  console.log(`✅ Total Sum: ${totalSum}`);
}

scrapeAndSum();
