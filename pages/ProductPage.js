class ProductPage {
  constructor(page) {
    this.page = page;

    // Product links - codegen se verified ✅
    this.addToCartLink = page.getByRole('link', { name: 'Add to cart' });
  }

  async selectProduct(productName) {
    // Quotes hata do - variable hai string nahi ✅
    await this.page.getByRole('link', { name: productName }).click();
    await this.page.waitForTimeout(1000);
}

  async addToCart() {
    // Dialog handle karo - "Product added" alert
    this.page.once('dialog', async dialog => {
      await dialog.accept();
    });
    await this.addToCartLink.click();
  }
}

module.exports = { ProductPage };