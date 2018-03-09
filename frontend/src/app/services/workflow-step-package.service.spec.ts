import { TestBed, inject, getTestBed, async } from '@angular/core/testing';

import { WorkflowStepPackageService } from './workflow-step-package.service';

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

describe('WorkflowStepPackageService', () => {
  let service;
  let authTokenService;
  let backend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WorkflowStepPackageService,
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
    service = testBed.get(WorkflowStepPackageService);
    authTokenService = testBed.get(Angular2TokenService);   
    authTokenService.init({apiPath: 'testApi'});
  });

  function setupConnections(backend: MockBackend, options: any) {
    backend.connections.subscribe((connection: MockConnection) => {
        if (connection.request.url === 'workflow_step_packages') {
            const responseOptions = new ResponseOptions(options);
            const response = new Response(responseOptions);

            connection.mockRespond(response);
        }
    });
  }

  it('should be created', inject([WorkflowStepPackageService], (service: WorkflowStepPackageService) => {
    expect(service).toBeTruthy();
  }));

  it('should get Workflow Step Packages', () => {
    setupConnections(backend, {
      body: [
        {
          id: 1,
          package_file_attachments: []
        },
        {
          id: 2,
          package_file_attachments: []
        },
        {
          id: 3,
          package_file_attachments: []
        },
        {
          id: 4,
          package_file_attachments: []
        },
        {
          id: 5,
          package_file_attachments: []
        }
      ],
      status: 200
    });

    service.getWorkflowStepPackages(1).subscribe(data => {
      expect(data.length).toBe(5);
    });
  });
});
