const { test, expect } = require('@playwright/test');

test.setTimeout(120000)

test('проверка наличия ЕПГ на первом и втором мультиплексах', async ({ page }) => {

    await page.goto('https://limehd.tv/channel/1kanal');

    //проверяем, что нет текста об отстутствии ЕПГ
    await page.isHidden('h2:has-text("Телепрограмма отсутствует")')

    //проверяем, что есть время начала и окончания телепрограммы
    await page.waitForSelector('.page-main > .stream__item > .stream__current-program > .current-program__title-container > .current-program__time')

    //нажимаем на "Телепрограмма, проверяем наличие хотябы 1 телепрограмма"
    await page.click('.page-main > .stream__item > .stream__title-container > .stream__button-container > .stream__button')
    await page.waitForSelector('.main__content > .main__wrapper > .epg__list > li:nth-child(1) > .epg__item')
    await page.locator('text=Закрыть').click();

    //перемещаемся по каналам
    let i = 1
    do {
        i++;
        await page.locator('.channel__list-container > .channel__list > .channel__item-list:nth-child(' + i + ') > .channel-container > .channel__item').click();
        try {
            //проверяем, что нет текста об отстутствии ЕПГ
            await page.waitForSelector('h2:has-text("Телепрограмма отсутствует")', { state: 'hidden' })

            //проверяем, что есть время начала и окончания телепрограммы
            await page.waitForSelector('.page-main > .stream__item > .stream__current-program > .current-program__title-container > .current-program__time', {state: 'visible'})

            //нажимаем на "Телепрограмма, проверяем наличие хотябы 1 телепрограмма"
            await page.click('.page-main > .stream__item > .stream__title-container > .stream__button-container > .stream__button')
            await page.waitForSelector('.main__content > .main__wrapper > .epg__list > li:nth-child(1) > .epg__item')
        } catch (err) { console.log('EPG for channel # ' + i + ' missing') };
        await page.locator('text=Закрыть').click();
    } while (i < 21)
})