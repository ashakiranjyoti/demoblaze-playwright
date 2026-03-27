const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { HomePage } = require('../pages/HomePage');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const testData = require('../utils/testData');

test.describe('DemoBlaze E2E Flow', () => {

  test('complete purchase flow - login to logout', async ({ page }) => {
    
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Step 1: Login
    await loginPage.goto();
    await loginPage.login(
      testData.user.username,
      testData.user.password
    );
    await expect(page.locator('#nameofuser')).toBeVisible();
    console.log('✅ Step 1: Login successful');

    // Step 1.5: Cart clear karo - fresh start ✅
    await cartPage.clearCart();

    // Step 2: Category select karo
    await homePage.selectCategory('monitors');
    console.log('✅ Step 2: Category selected');

    // Step 3: Product select karo
    await productPage.selectProduct('Apple monitor');
    console.log('✅ Step 3: Product selected');

    // Step 4: Add to cart
    await productPage.addToCart();
    console.log('✅ Step 4: Added to cart');

    // Step 5: Cart mein jao
    await cartPage.goto();
    await expect(
      page.getByRole('cell', { name: 'Apple monitor' }).first()
    ).toBeVisible();
    console.log('✅ Step 5: Product in cart verified');

    // Step 6: Place order
    await cartPage.placeOrder();

    // Step 7: Checkout form fill karo
    await checkoutPage.fillForm(testData.checkout);
    await checkoutPage.completePurchase();

    // Step 8: Success verify karo
    await expect(
      checkoutPage.getSuccessHeading()
    ).toBeVisible();
    console.log('✅ Step 8: Order successful');

    // Step 9: OK click karo
    await checkoutPage.clickOk();

    // Step 10: Logout
    await loginPage.logout();
    await expect(
      page.getByRole('link', { name: 'Log in' })
    ).toBeVisible();
    console.log('✅ Step 10: Logout successful');

  });

});