import { A2 } from './app.po';
import { browser, by, element } from 'protractor';

describe('a2 App', () => {
  const page: A2 = new A2();

  beforeEach(() => {
    page.navigateTo();
  });

  it('should display the login page', () => {
    expect(page.getLoginHeaderText()).toEqual('login');
  });

  it('should display the initial toolbar', () => {
    expect(page.getToolbarText()).toEqual('a2');
  });

  it('should log the user in', () => {
    page.login();
    browser.sleep(30000);
  });
  
});
