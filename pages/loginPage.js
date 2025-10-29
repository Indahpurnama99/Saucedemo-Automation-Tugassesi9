const { By, until } = require('selenium-webdriver');

class LoginPage {
  constructor(driver) {
    this.driver = driver;
    this.url = 'https://www.saucedemo.com/';
    this.usernameInput = By.id('user-name');
    this.passwordInput = By.id('password');
    this.loginButton = By.id('login-button');
  }

  async open() {
    await this.driver.get(this.url);
  }

  async login(username, password) {
    await this.driver.findElement(this.usernameInput).sendKeys(username);
    await this.driver.findElement(this.passwordInput).sendKeys(password);
    await this.driver.findElement(this.loginButton).click();
    await this.driver.wait(until.urlContains('inventory.html'), 10000);
  }
}

module.exports = LoginPage;
