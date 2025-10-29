const { By } = require('selenium-webdriver');
const assert = require('assert');
const fs = require('fs');

class InventoryPage {
  constructor(driver) {
    this.driver = driver;
    this.sortDropdown = By.className('product_sort_container');
    this.inventoryItemName = By.className('inventory_item_name');
  }

  async sortAtoZ() {
    const dropdown = await this.driver.findElement(this.sortDropdown);
    await dropdown.click();
    await dropdown.findElement(By.css('option[value="az"]')).click();
  }

  async verifyFirstItem() {
    const firstItem = await this.driver.findElement(this.inventoryItemName).getText();
    assert.ok(firstItem.length > 0, 'Produk tidak ditemukan');
    console.log('Produk pertama setelah sort A-Z:', firstItem);
  }

  async takeScreenshot(filename = 'inventory-page.png') {
    const image = await this.driver.takeScreenshot();
    fs.writeFileSync(filename, image, 'base64');
    console.log(`📸 Screenshot disimpan: ${filename}`);
  }
}

module.exports = InventoryPage;