class HomePage {
  constructor(page) {
    this.page = page;

    // Category links - codegen se verified ✅
    this.phonesCategory = page.getByRole('link', { name: 'Phones' });
    this.laptopsCategory = page.getByRole('link', { name: 'Laptops' });
    this.monitorsCategory = page.getByRole('link', { name: 'Monitors' });
  }

  async goto() {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
  }

  async selectCategory(category) {
    const categories = {
      phones: this.phonesCategory,
      laptops: this.laptopsCategory,
      monitors: this.monitorsCategory,
    };
    await categories[category].click();
    // Products load hone ka wait karo
    await this.page.waitForTimeout(1500);
  }
}

module.exports = { HomePage };