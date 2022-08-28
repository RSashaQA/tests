const { chromium } = require('playwright')

async function run () {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  const response = await page.goto('https://limehd.tv/tv')

  await page.goto('https://limehd.tv/tv')
  if (response.status() > 399) {
    throw new Error(`Failed with response code ${response.status()}`)
  }
  await page.waitForTimeout(1000);

  await page.locator('text=Избранные').click();
  await page.waitForSelector('text=Добавьте каналы в избранное');
  await page.waitForTimeout(1000);

  await page.locator('text=Популярные').click();
  await page.waitForSelector('text=Россия 1');
  await page.waitForTimeout(1000);

  await page.locator('text=Все').first().click();
  await page.waitForSelector('text=Россия 1');
  await page.waitForTimeout(1000);

  await page.locator('text=Региональные').click();
  await page.waitForSelector('text=360 Новости');
  await page.waitForTimeout(1000);

  await page.locator('text=Развлечения').click();
  await page.waitForSelector('text=Пятница!');
  await page.waitForTimeout(1000);

  await page.locator('text=Спорт').click();
  await page.waitForSelector('text=Матч! Боец');
  await page.waitForTimeout(1000);

  await page.locator('text=Детям').click();
  await page.waitForSelector('text=Карусель');
  await page.waitForTimeout(1000);

  await page.locator('text=Музыка').click();
  await page.waitForSelector('text=Муз-тв');
  await page.waitForTimeout(1000);

  await page.locator('text=Новости >> nth=0').click();
  await page.waitForSelector('text=Rt');
  await page.waitForTimeout(1000);

  await page.locator('text=Познавательные').click();
  await page.waitForSelector('text=Егэ');
  await page.waitForTimeout(1000);

  await page.locator('text=Фильмы').click();
  await page.waitForSelector('text=Киноужас');
  await page.waitForTimeout(1000);

  await page.close()
  await browser.close()
}
run()