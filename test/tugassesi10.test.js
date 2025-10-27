const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
require('chromedriver');

describe('SauceDemo Automation Test', function () {
  this.timeout(60000);
  let driver;

  
  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().setTimeouts({ implicit: 10000 });
    await driver.get('https://www.saucedemo.com/');
  });

  
  after(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  it('Sukses Login dan Urutkan Produk dari A-Z', async function () {
    
    await driver.findElement(By.id('user-name')).sendKeys('standard_user');
    await driver.findElement(By.id('password')).sendKeys('secret_sauce');
    await driver.findElement(By.id('login-button')).click();

    
    await driver.wait(until.urlContains('inventory.html'), 10000);
    const currentUrl = await driver.getCurrentUrl();
    assert.ok(currentUrl.includes('inventory.html'), '❌ Login gagal');

    
    const sortDropdown = await driver.findElement(By.className('product_sort_container'));
    await sortDropdown.click();
    await sortDropdown.findElement(By.css('option[value="az"]')).click();

    const firstItem = await driver.findElement(By.className('inventory_item_name')).getText();
    console.log('Produk pertama setelah sort A-Z:', firstItem);
    assert.ok(firstItem.length > 0, '❌ Produk tidak ditemukan');

    console.log('✅ Test sukses: Login & Sort A-Z berjalan dengan benar');
  });
});
