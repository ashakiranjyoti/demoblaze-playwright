class LoginPage {
  constructor(page) {
    this.page = page;

    // Locators - codegen se verified ✅
    this.loginNavLink = page.getByRole('link', { name: 'Log in' });
    this.usernameInput = page.locator('#loginusername');
    this.passwordInput = page.locator('#loginpassword');
    this.loginButton = page.getByRole('button', { name: 'Log in' });
    this.logoutLink = page.getByRole('link', { name: 'Log out' });
    this.loginLinkVisible = page.getByRole('link', { name: 'Log in' });
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(username, password) {
    await this.loginNavLink.click();
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async logout() {
    await this.logoutLink.click();
  }

  async getLoginLink() {
    return this.page.getByRole('link', { name: 'Log in' });
}
}

module.exports = { LoginPage };