const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const testData = require('../utils/testData');

test.describe('Login Tests', () => {

  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  // Test 1: Valid Login
  test('should login successfully with valid credentials', async ({ page }) => {
    await loginPage.login(
      testData.user.username,
      testData.user.password
    );

    // Login ke baad "Welcome akay" dikhna chahiye navbar mein
    await expect(
      page.locator('#nameofuser')
    ).toBeVisible();
  });

  // Test 2: Logout
test('should logout successfully', async ({ page }) => {
    // Pehle login karo
    await loginPage.login(
      testData.user.username,
      testData.user.password
    );

    // Phir logout karo
    await loginPage.logout();

    // Fix - seedha locator use karo ✅
    await expect(
      page.getByRole('link', { name: 'Log in' })
    ).toBeVisible();
});

});