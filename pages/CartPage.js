class CartPage {
  constructor(page) {
    this.page = page;

    this.cartLink = page.getByRole('link', { name: 'Cart', exact: true });
    this.placeOrderButton = page.getByRole('button', { name: 'Place Order' });
  }

  async goto() {
    await this.cartLink.click();
    await this.page.waitForTimeout(1500);
  }

  async isProductInCart(productName) {
    return this.page.getByRole('cell', { name: productName });
  }

  async placeOrder() {
    await this.placeOrderButton.click();
  }

  async clearCart() {
    await this.page.goto('/#/cart');
    await this.page.waitForTimeout(3000);

    const deleteButtons = this.page.getByRole('link', { name: 'Delete' });
    const count = await deleteButtons.count();

    for (let i = 0; i < count; i++) {
      await this.page.getByRole('link', { name: 'Delete' }).first().click();
      await this.page.waitForTimeout(2000);
    }

    await this.page.goto('/');
    await this.page.waitForTimeout(2000);
  }
}

module.exports = { CartPage };
