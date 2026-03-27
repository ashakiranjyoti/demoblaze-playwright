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
    await this.page.goto('/#/cart');
    await this.page.waitForTimeout(3000); // CI ke liye zyada wait
    
    // Kitne delete buttons hain pehle count karo
    const deleteButtons = this.page.getByRole('link', { name: 'Delete' });
    const count = await deleteButtons.count();
    
    // Ek ek karke sab delete karo
    for (let i = 0; i < count; i++) {
        await this.page.getByRole('link', { name: 'Delete' }).first().click();
        await this.page.waitForTimeout(2000); // Har delete ke baad wait
    }
    
    // Home pe wapas jao
    await this.page.goto('/');
    await this.page.waitForTimeout(2000);
}
    
    // Home pe wapas jao ✅
    await this.page.goto('/');
    await this.page.waitForTimeout(1000);
}
}

module.exports = { CartPage };
