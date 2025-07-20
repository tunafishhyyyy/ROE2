const { chromium } = require("playwright");

(async () => {
  const baseUrl = "https://sanand0.github.io/tdsdata/js_table/?seed=";
  const seeds = [24, 25, 26, 27, 28, 29, 30, 31, 32, 33];

  let totalSum = 0;

  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (const seed of seeds) {
    const url = `${baseUrl}${seed}`;
    await page.goto(url);
    await page.waitForSelector("table");

    const seedSum = await page.evaluate(() => {
      const tables = Array.from(document.querySelectorAll("table"));
      let sum = 0;

      for (const table of tables) {
        for (const row of table.rows) {
          for (const cell of row.cells) {
            const value = parseFloat(cell.innerText.trim());
            if (!isNaN(value)) sum += value;
          }
        }
      }

      return sum;
    });

    console.log(`Seed ${seed} sum: ${seedSum}`);
    totalSum += seedSum;
  }

  console.log(`Total sum across all seeds: ${totalSum}`);
  await browser.close();
})();
