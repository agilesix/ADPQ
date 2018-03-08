import { TestBed, inject, getTestBed, async } from '@angular/core/testing';

import { PackageFileAttachmentService } from './package-file-attachment.service';

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

describe('PackageFileAttachmentService', () => {
  let service;
  let authTokenService;
  let backend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PackageFileAttachmentService,
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
    service = testBed.get(PackageFileAttachmentService);
    authTokenService = testBed.get(Angular2TokenService);   
    authTokenService.init({apiPath: 'testApi'});
  });

  function setupConnections(backend: MockBackend, options: any) {
    backend.connections.subscribe((connection: MockConnection) => {
        if (connection.request.url === 'package_file_attachments') {
            const responseOptions = new ResponseOptions(options);
            const response = new Response(responseOptions);

            connection.mockRespond(response);
        }
    });
  }

  it('should be created', inject([PackageFileAttachmentService], (service: PackageFileAttachmentService) => {
    expect(service).toBeTruthy();
  }));

  it('should create a Package File Attachment for a Workflow Package Step', () => {
    let fileAttachment = {
      filename: 'Test', 
      workflow_step_package_id: 1, 
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

    service.createPackageFileAttachment(fileAttachment).subscribe(data => {
      expect(data).toBeTruthy();
    });
  });
});
