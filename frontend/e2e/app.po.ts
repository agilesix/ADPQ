import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class A2 {

  navigateToHome():promise.Promise<any> {
    return browser.get('/home');
  }

  navigateTo() {
    return browser.get('/');
  }  

  navigateToLogin() {
    return browser.get('/login');
  } 

  getToolbarText() {
    return element(by.css('app-toolbar header a h1')).getText();
  }

  /* Landing Elements */
  getLandingText() {
    return element(by.css('#get-started-link')).getText();
  }

  /* Login Elements */

  getUserLoginCredentials() {
    let user = {email: 'test@a2tool.com', password: 'testa2tool'}
    return user;
  }

  getLoginHeaderText() {
    return element(by.css('legend')).getText();
  }

  login() {
    let user: any = this.getUserLoginCredentials();

    this.getInputEmail().sendKeys(user.email);
    this.getInputPassword().sendKeys(user.password);
    this.clickLoginButton();
  }

  getLoginButton() {
    return element(by.css('app-login app-login-form input[type="submit"]'));
  }

  clickLoginButton() {
    return this.getLoginButton().click();
  }

  getInputEmail():ElementFinder {
    return element(by.name("email"));
  }

  getInputPassword():ElementFinder {
    return element(by.name("password"));
  }  

  getCurrentUserInfoText() {
    return element(by.id("user-profile")).getText();
  }

}
