const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { HomePage } = require('../pages/HomePage');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');
const testData = require('../utils/testData');

// Yeh line add karo - sequential chalega parallel nahi ✅
test.describe.configure({ mode: 'serial' });

test.describe('Cart Tests', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await loginPage.goto();
    await loginPage.login(
      testData.user.username,
      testData.user.password
    );

    // Cart clear karo
    await cartPage.clearCart();

    // Fresh product add karo
    await homePage.selectCategory('monitors');
    await productPage.selectProduct('Apple monitor');
    await productPage.addToCart();
  });

  test('should show added product in cart', async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.goto();

    await expect(
      page.getByRole('cell', { name: 'Apple monitor' }).first()
    ).toBeVisible();
  });

  test('should delete product from cart', async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.goto();

    // first() use karo ✅
    await page.getByRole('link', { name: 'Delete' }).first().click();
    await page.waitForTimeout(1500);

    await expect(
      page.getByRole('cell', { name: 'Apple monitor' })
    ).not.toBeVisible();
  });

});