class CheckoutPage {
  constructor(page) {
    this.page = page;

    // ✅ Aisa karo - sirf id use karo
this.nameInput = page.locator('#name');
this.countryInput = page.locator('#country');
this.cityInput = page.locator('#city');
this.cardInput = page.locator('#card');
this.monthInput = page.locator('#month');
this.yearInput = page.locator('#year');

    // Buttons
    this.purchaseButton = page.getByRole('button', { name: 'Purchase' });

    // Success
    this.successHeading = page.getByRole('heading', { 
      name: 'Thank you for your purchase!' 
    });
    this.okButton = page.getByRole('button', { name: 'OK' });
  }

  async fillForm(data) {
    await this.nameInput.fill(data.name);
    await this.countryInput.fill(data.country);
    await this.cityInput.fill(data.city);
    await this.cardInput.fill(data.card);
    await this.monthInput.fill(data.month);
    await this.yearInput.fill(data.year);
  }

  async completePurchase() {
    await this.purchaseButton.click();
  }

  getSuccessHeading() {
    return this.successHeading;
}

  async clickOk() {
    await this.okButton.click();
    // Modal wait mat karo - sirf navigation ka wait karo
    await this.page.waitForTimeout(2000);
}
}

module.exports = { CheckoutPage };