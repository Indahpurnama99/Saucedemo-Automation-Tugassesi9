const { Builder } = require('selenium-webdriver');
require('chromedriver');
const LoginPage = require('../pages/loginPage');
const InventoryPage = require('../pages/inventoryPage');

describe('SauceDemo Automation Test (POM + Visual Test)', function () {
  this.timeout(60000);
  let driver, loginPage, inventoryPage;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    loginPage = new LoginPage(driver);
    inventoryPage = new InventoryPage(driver);
  });

  after(async function () {
    await driver.quit();
  });

  it('Sukses Login dan Urutkan Produk dari A-Z', async function () {
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.sortAtoZ();
    await inventoryPage.verifyFirstItem();
    console.log('✅ Test sukses: Login & Sort A-Z berjalan dengan benar');
  });

  it('Visual Testing: Screenshot halaman Inventory', async function () {
    await inventoryPage.takeScreenshot('inventory-visual.png');
  });
});
