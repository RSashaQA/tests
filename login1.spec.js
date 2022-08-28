const { test, expect } = require('@playwright/test');

let userNameLogin = 'testdeleteme@limehd.tv'

test.setTimeout(120000)

test('Регистрация тестового аккаунта', async ({ page }) => {

    await page.goto('https://limehd.tv/signup');

    await page.locator('[placeholder="Введите e-mail"]').fill(userNameLogin);
    await page.locator('input[type="password"]').first().fill('qqqqqq');
    await page.locator('text=Повторите пароль >> input[type="password"]').fill('qqqqqq');
    await page.locator('text=Зарегистрироваться').click();
})

test('авторизация, хороший сценарий', async ({ page }) => {

    await page.goto('https://limehd.tv/login');

    //авторизация, используя корректные данные от аккаунта testdeleteme@limehd.tv
    await page.locator('[placeholder="Введите e-mail"]').fill(userNameLogin);
    await page.locator('input[type="password"]').fill('qqqqqq');
    await page.locator('text=Войти').click();




})