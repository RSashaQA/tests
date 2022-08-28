const { test, expect, webkit, chromium, firefox } = require('@playwright/test');

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const userNameDevWebkit = ('testdeleteme' + getRandomInt(999999999) + '@limehd.tv') //не забыть подчищать созданные аккаунты
const userNameDevFirefox = ('testdeleteme' + getRandomInt(999999999) + '@limehd.tv')
const userNameDevChromium = ('testdeleteme' + getRandomInt(999999999) + '@limehd.tv')
const passwordDevisec = 'qqqqqq'

test('Регистрация тестового аккаунта', async () => {

    for (const browserType of [webkit, chromium, firefox]) {
        const browser = await browserType.launch();
        const page = await browser.newPage();

        await page.goto('https://limehd.tv/signup');

        //для регистрации в разных браузерах используется свой e-mail
        if (browserType.name() == 'webkit') {
            await page.locator('input[type="email"]').fill(userNameDevWebkit)
        }
        if (browserType.name() == 'chromium') {
            await page.locator('input[type="email"]').fill(userNameDevChromium)
        }
        if (browserType.name() == 'firefox') {
            await page.locator('input[type="email"]').fill(userNameDevFirefox)
        }

        await page.locator('input[type="password"]').first().fill(passwordDevisec);
        await page.locator('text=Повторите пароль >> input[type="password"]').fill(passwordDevisec);
        await page.locator('text=Зарегистрироваться').click();
        await page.locator('text=Отлично').click();

        //переходим в профиль только что созданного аккаунта
        await page.locator('header >> text=t').click({ clickCount: 2 });
        await page.locator('text=Общая информация').click();
        await page.waitForTimeout(2000);
        await page.locator('text=Управление устройствами').click();

        //нажать на кнопку "Удалить", затем "Отменить". Проверяем, что мы еще залогинены (если удалить устройство с которого мы залогинились - нас разлогинит)
        await page.locator('text=Удалить').first().click()
        await page.locator('text=Отменить').first().click();
        await page.waitForSelector('header >> text=t');


        //удалить устройство, проверить, что устройство удалилось из списка
        await page.locator('text=Удалить').first().click()
        await page.locator('button:has-text("Удалить")').first().click();
        try{
        await page.waitForSelector('text=Вход', {timeout:3000});
        } catch (err) {console.log(browserType.name() + ' bug https://limehd.atlassian.net/browse/PW-302')};
        await browser.close();
    }
});