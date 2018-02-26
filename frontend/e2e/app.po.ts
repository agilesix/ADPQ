import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class A2 {

  navigateToHome():promise.Promise<any> {
    return browser.get('/');
  }


  navigateTo() {
    return browser.get('/');
  }  

  getToolbarText() {
    return element(by.css('app-toolbar header')).getText();
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

  /* Workflow Steps */

  /* Mock data for retrieving Workflow Steps and editing existing Workflow Step */
  
  getMockWorkflowSteps(): any {
    let wfs: any = [{"id":1,"workflow_id":1,"name":"Vision Statement","description":"---\nA vision statement is a government program’s road map, indicating both what the program wants to become and guiding transformational initiatives by setting a defined direction for the program's future. Vision statements undergo minimal revisions during the life of a program, unlike operational goals and objectives which may be updated from year-to-year. Effective vision statements are clear, concise and usually consist of two to four sentences. Vision statements should provide a high-level description of the program outcomes required to meet the definition of success.\n\n#### Commonly cited vision statement traits include:\n- concise: able to be easily remembered and repeated\n- clear: defines a prime goal\n- Time horizon: defines a time horizon\n- future-oriented: describes where the company is going rather than the current state\n- stable: offers a long-term perspective and is unlikely to be impacted by market or technology changes\n- challenging: not something that can be easily met and discarded\n- abstract: general enough to encompass all of the organization's interests and strategic direction\n- inspiring: motivates employees and is something that employees view as desirable\n","created_at":"2018-02-25T21:58:01.616Z","updated_at":"2018-02-25T22:05:37.729Z","url":"http://localhost/workflow_steps/1.json","knowledge_articles":[{"id":1,"title":"How to Create a Vision Statement","description":"This is a short description of what the knowledge article is about.","body":"# This is a header!","user":{"id":5,"provider":"email","uid":"admin@a2tool.com","name":"Admin","nickname":"Admin","image":null,"email":"admin@a2tool.com","created_at":"2018-02-25T21:58:01.265Z","updated_at":"2018-02-25T22:50:10.331Z"},"published":true,"created_at":"2018-02-25T21:58:01.707Z","updated_at":"2018-02-25T22:04:22.529Z","file_attachments":[{"id":1,"approved":true,"filename":"Vision Statement Template","user_id":1,"category_id":1,"file_type_id":1,"knowledge_article_id":1,"created_at":"2018-02-25T21:58:02.050Z","updated_at":"2018-02-25T21:58:02.050Z","attached_file_file_name":"VisionStatementTemplate.docx","attached_file_content_type":"application/zip","attached_file_file_size":6546,"attached_file_updated_at":"2018-02-25T21:58:01.999Z"},{"id":2,"approved":true,"filename":"Sample Vision Statement","user_id":1,"category_id":2,"file_type_id":1,"knowledge_article_id":1,"created_at":"2018-02-25T21:58:02.127Z","updated_at":"2018-02-25T21:58:02.127Z","attached_file_file_name":"SampleVisionStatement.docx","attached_file_content_type":"application/zip","attached_file_file_size":6584,"attached_file_updated_at":"2018-02-25T21:58:02.097Z"}]},{"id":2,"title":"Creating an Article for Fun!","description":"this is a really fun article","body":"","user":{"id":5,"provider":"email","uid":"admin@a2tool.com","name":"Admin","nickname":"Admin","image":null,"email":"admin@a2tool.com","created_at":"2018-02-25T21:58:01.265Z","updated_at":"2018-02-25T22:50:10.331Z"},"published":false,"created_at":"2018-02-25T22:05:04.926Z","updated_at":"2018-02-25T22:05:04.926Z","file_attachments":[]}],"workflow":{"id":1,"name":"Agile Acquisition Workflow","description":null,"workflow_type":{"id":1,"name":"Acquisition Workflow Type","description":"The workflow to acquire agile.","created_at":"2018-02-25T21:58:01.530Z","updated_at":"2018-02-25T21:58:01.530Z"},"created_at":"2018-02-25T21:58:01.578Z","updated_at":"2018-02-25T21:58:01.578Z"}},{"id":2,"workflow_id":1,"name":"Statement of Objectives (SOO)","description":"This is the description for the Statement of Objectives (SOO) workflow step.","created_at":"2018-02-25T21:58:01.627Z","updated_at":"2018-02-25T21:58:01.627Z","url":"http://localhost/workflow_steps/2.json","knowledge_articles":[],"workflow":{"id":1,"name":"Agile Acquisition Workflow","description":null,"workflow_type":{"id":1,"name":"Acquisition Workflow Type","description":"The workflow to acquire agile.","created_at":"2018-02-25T21:58:01.530Z","updated_at":"2018-02-25T21:58:01.530Z"},"created_at":"2018-02-25T21:58:01.578Z","updated_at":"2018-02-25T21:58:01.578Z"}},{"id":3,"workflow_id":1,"name":"Concept of Operations (ConOps)","description":"This is the description for the Concept of Operations (ConOps) workflow step.","created_at":"2018-02-25T21:58:01.647Z","updated_at":"2018-02-25T21:58:01.647Z","url":"http://localhost/workflow_steps/3.json","knowledge_articles":[],"workflow":{"id":1,"name":"Agile Acquisition Workflow","description":null,"workflow_type":{"id":1,"name":"Acquisition Workflow Type","description":"The workflow to acquire agile.","created_at":"2018-02-25T21:58:01.530Z","updated_at":"2018-02-25T21:58:01.530Z"},"created_at":"2018-02-25T21:58:01.578Z","updated_at":"2018-02-25T21:58:01.578Z"}},{"id":4,"workflow_id":1,"name":"Independent Government Cost Estimate (IGCE)","description":"This is the description for the Independent Government Cost Estimate (IGCE) workflow step.","created_at":"2018-02-25T21:58:01.654Z","updated_at":"2018-02-25T21:58:01.654Z","url":"http://localhost/workflow_steps/4.json","knowledge_articles":[],"workflow":{"id":1,"name":"Agile Acquisition Workflow","description":null,"workflow_type":{"id":1,"name":"Acquisition Workflow Type","description":"The workflow to acquire agile.","created_at":"2018-02-25T21:58:01.530Z","updated_at":"2018-02-25T21:58:01.530Z"},"created_at":"2018-02-25T21:58:01.578Z","updated_at":"2018-02-25T21:58:01.578Z"}},{"id":5,"workflow_id":1,"name":"Proposal Instructions/Evaluation Criteria","description":"This is the description for the Proposal Instructions/Evaluation Criteria workflow step.","created_at":"2018-02-25T21:58:01.662Z","updated_at":"2018-02-25T21:58:01.662Z","url":"http://localhost/workflow_steps/5.json","knowledge_articles":[],"workflow":{"id":1,"name":"Agile Acquisition Workflow","description":null,"workflow_type":{"id":1,"name":"Acquisition Workflow Type","description":"The workflow to acquire agile.","created_at":"2018-02-25T21:58:01.530Z","updated_at":"2018-02-25T21:58:01.530Z"},"created_at":"2018-02-25T21:58:01.578Z","updated_at":"2018-02-25T21:58:01.578Z"}}]
    return wfs;
  }  
}
