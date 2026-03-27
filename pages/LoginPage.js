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
    await this.page.goto('/', { 
      waitUntil: 'domcontentloaded',  // 'load' ki jagah yeh use karo
      timeout: 60000 
    });
}

  async login(username, password) {
    // Firefox ke liye force click use karo
    await this.loginNavLink.click({ force: true });
    
    // Modal open hone ka wait karo
    await this.page.waitForSelector('#loginusername', { state: 'visible' });
    
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
}

  async logout() {
    // Pehle check karo modal hai ya nahi
    const modal = await this.page.$('#orderModal');
    if (modal) {
        await this.page.evaluate(() => {
            document.querySelector('#orderModal')?.remove();
            document.querySelector('.modal-backdrop')?.remove();
        });
    }
    await this.logoutLink.click();
}

  async getLoginLink() {
    return this.page.getByRole('link', { name: 'Log in' });
}
}

module.exports = { LoginPage };