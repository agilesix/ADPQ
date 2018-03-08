import { TestBed, inject, getTestBed, async } from '@angular/core/testing';

import { ArticleService } from './article.service';
import { Angular2TokenService } from 'angular2-token';
import {
  BaseRequestOptions,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';

import {
  MockBackend,
  MockConnection
} from '@angular/http/testing';

describe('ArticleService', () => {
  let service;
  let authTokenService;
  let backend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ArticleService, 
        Angular2TokenService,
        BaseRequestOptions,
        MockBackend,
        {
          deps: [
            MockBackend,
            BaseRequestOptions
          ],
          provide: Http,
          useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }
        }
      ]
    });

    const testBed = getTestBed();
    backend = testBed.get(MockBackend);
    service = testBed.get(ArticleService);
    authTokenService = testBed.get(Angular2TokenService);   
    authTokenService.init({apiPath: 'testApi'});
  });

  function setupConnections(backend: MockBackend, options: any) {
    backend.connections.subscribe((connection: MockConnection) => {
        if (connection.request.url === 'knowledge_articles') {
            const responseOptions = new ResponseOptions(options);
            const response = new Response(responseOptions);

            connection.mockRespond(response);
        }
    });
  }

  it('should be created', inject([ArticleService], (service: ArticleService) => {
    expect(service).toBeTruthy();
  }));

  it('should get Knowledge Articles', () => {
    setupConnections(backend, {
      body: [
        {
          id: 1,
          title: 'The Best Knowledge Article',
          description: 'The description of the article',
          body: 'The body of the artcile.'
        }
      ],
      status: 200
    });

    service.getKnowledgeArticles().subscribe(data => {
      expect(data.length).toBe(1);
    });
  });

  it('should get a Knowledge Article', () => {
    setupConnections(backend, {
      body: {
          id: 1,
          title: 'The Best Knowledge Article',
          description: 'The description of the article',
          body: 'The body of the artcile.'
      },
      status: 200
    });

    service.getKnowledgeArticle(1).subscribe(data => {
      expect(data.id).toBe(1);
      expect(data.title).toBe('The Best Knowledge Article');
    });
  });

  it('should create a Knowledge Article', () => {
    let article = {title: 'The Greatest Article Ever Created', description: 'The best description', body: '# Lots of markdown here', workflow_step_id: 1, user_id: 1};
    setupConnections(backend, {
      body: article,
      status: 200
    });

    service.createKnowledgeArticle(article).subscribe(data => {
      expect(data.title).toBe(article.title);
    });
  });

  it('should update a Knowledge Article', () => {
    let article = {id: 1, title: 'The Greatest Article Ever Updated', description: 'The best description', body: '# Lots of markdown here', workflow_step_id: 1, user_id: 1};
    setupConnections(backend, {
      body: article,
      status: 200
    });

    service.updateKnowledgeArticle(article).subscribe(data => {
      expect(data.id).toBe(article.id);
      expect(data.title).toBe(article.title);
    });
  });

  it('should remove a Knowledge Article', () => {
    let article = {id: 1, title: 'The Greatest Article Ever Updated', description: 'The best description', body: '# Lots of markdown here', workflow_step_id: 1, user_id: 1};
    setupConnections(backend, {
      body: article,
      status: 200
    });

    service.removeKnowledgeArticle(article.id).subscribe(data => {
      expect(data.id).toBe(article.id);
      expect(data.title).toBe(article.title);
    });
  });

  it('should upload multiple File Attachments for a Knowledge Article', () => {
    let fileAttachments = [{filename: 'Test.txt', filetype: 'text/plain', knowledge_article_id: 1, value: 'Tm8gbW9yZSB0ZXN0IHBpY3R1cmVzIG9mIGtpdHRlbnMgOig=\n'}];
    setupConnections(backend, {
      body: fileAttachments,
      status: 200
    });

    service.uploadFileAttachments(fileAttachments).subscribe(data => {
      expect(data).toBeTruthy();
    });
  });

  it('should submit a File Attachment for a Knowledge Article', () => {
    let fileAttachment = {
      filename: 'Test', 
      file_type_id: 1, 
      category_id: 1, 
      knowledge_article_id: 1, 
      file_contents: 
      {
        filename: 'Test.txt',
        filetypr: 'text/plain',
        value: 'Tm8gbW9yZSB0ZXN0IHBpY3R1cmVzIG9mIGtpdHRlbnMgOig=\n'
      }
    };
    setupConnections(backend, {
      body: fileAttachment,
      status: 200
    });

    service.submitFileAttachment(fileAttachment).subscribe(data => {
      expect(data).toBeTruthy();
    });
  });

  it('should approve a File Attachment for a Knowledge Article', () => {
    let fileAttachment = {
      filename: 'Test', 
      file_type_id: 1, 
      category_id: 1, 
      knowledge_article_id: 1,
      file_attachment: {}
    }

    setupConnections(backend, {
      body: fileAttachment,
      status: 200
    });

    service.approveFileAttachment({file_attachment_id: 1}).subscribe(data => {
      expect(data).toBeTruthy();
    });
  });

  it('should remove a File Attachment from a Knowledge Article', () => {
    let fileAttachment = {
      filename: 'Test', 
      file_type_id: 1, 
      category_id: 1, 
      knowledge_article_id: 1,
      file_attachment: {}
    }

    setupConnections(backend, {
      body: fileAttachment,
      status: 200
    });

    service.removeFileAttachment({file_attachment_id: 1}).subscribe(data => {
      expect(data).toBeTruthy();
    });
  });

  it('should get File Attachment Submissions', () => {
    let fileAttachments = [{
      filename: 'Test', 
      file_type_id: 1, 
      category_id: 1, 
      knowledge_article_id: 1,
      approved: false,
      file_attachment: {}
    }]

    setupConnections(backend, {
      body: fileAttachments,
      status: 200
    });

    service.getFileAttachments().subscribe(data => {
      expect(data).toBeTruthy();
    });
  });
});

