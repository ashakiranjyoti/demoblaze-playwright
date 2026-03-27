class CartPage {
  constructor(page) {
    this.page = page;

    // Cart link
    this.cartLink = page.getByRole('link', { name: 'Cart', exact: true });
    
    // Place order button
    this.placeOrderButton = page.getByRole('button', { name: 'Place Order' });
  }

  async goto() {
    await this.cartLink.click();
    await this.page.waitForTimeout(1500);
  }

  async isProductInCart(productName) {
    return page.getByRole('cell', { name: productName });
  }

  async placeOrder() {
    await this.placeOrderButton.click();
  }

  async clearCart() {
    // Direct cart URL pe jao
    await this.page.goto('/#/cart');
    await this.page.waitForTimeout(1500);
    
    // Jab tak Delete buttons hain tab tak delete karte raho
    while (await this.page.getByRole('link', { name: 'Delete' }).first().isVisible()
      .catch(() => false)) {
        await this.page.getByRole('link', { name: 'Delete' }).first().click();
        await this.page.waitForTimeout(1000);
    }
    
    // Home pe wapas jao ✅
    await this.page.goto('/');
    await this.page.waitForTimeout(1000);
}
}

module.exports = { CartPage };