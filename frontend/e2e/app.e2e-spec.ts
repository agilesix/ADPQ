import { A2 } from './app.po';
import { browser, by, element, $ } from 'protractor';
import { async } from '@angular/core/testing';
import {MockService} from 'protractor-xmlhttprequest-mock';
import { Router } from '@angular/router';

describe('a2 App', () => {
  const page: A2 = new A2();

  beforeEach(() => {
    
  });

  it('should display the landing page', () => {
    page.navigateTo();
    expect(page.getLandingText()).toEqual('Get started');
  });

  it('should display the login page', () => {
    page.navigateToLogin();
    expect(page.getLoginHeaderText()).toEqual('login');
  });

  it('should log the user in', async() => {
    await MockService.setup(browser);
    await MockService.addMock('sign_in', {
      path: '/auth/sign_in',
      response: {status: 200, data: "{\"data\":{\"id\":5,\"email\":\"admin@a2tool.com\",\"provider\":\"email\",\"uid\":\"admin@a2tool.com\",\"name\":\"Admin\",\"nickname\":\"Admin\",\"image\":null,\"roles\":[{\"id\":1,\"name\":\"Admin\",\"resource_type\":null,\"resource_id\":null,\"created_at\":\"2018-02-25T21:58:00.484Z\",\"updated_at\":\"2018-02-25T21:58:00.484Z\"}]}}"},
    });    

    page.login();
    expect(page.getCurrentUserInfoText()).toBe('Admin\nadmin@a2tool.com');
  });
  
});
