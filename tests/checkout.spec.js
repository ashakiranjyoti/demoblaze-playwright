const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { HomePage } = require('../pages/HomePage');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const testData = require('../utils/testData');

test.describe('Checkout Tests', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    // Login
    await loginPage.goto();
    await loginPage.login(
      testData.user.username,
      testData.user.password
    );

    // Product add karo
    await homePage.selectCategory('monitors');
    await productPage.selectProduct('Apple monitor');
    await productPage.addToCart();
  });

  test('should complete checkout successfully', async ({ page }) => {
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Cart mein jao
    await cartPage.goto();
    await cartPage.placeOrder();

    // Form fill karo
    await checkoutPage.fillForm(testData.checkout);
    await checkoutPage.completePurchase();

    // Success verify karo
    await expect(
      checkoutPage.getSuccessHeading()
    ).toBeVisible();
  });

});