import { TestBed, inject, getTestBed, async } from '@angular/core/testing';

import { WorkflowPackageService } from './workflow-package.service';

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

describe('WorkflowPackageService', () => {
  let service;
  let authTokenService;
  let backend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WorkflowPackageService,
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
    service = testBed.get(WorkflowPackageService);
    authTokenService = testBed.get(Angular2TokenService);   
    authTokenService.init({apiPath: 'testApi'});
  });

  function setupConnections(backend: MockBackend, options: any) {
    backend.connections.subscribe((connection: MockConnection) => {
        if (connection.request.url === 'workflow_packages') {
            const responseOptions = new ResponseOptions(options);
            const response = new Response(responseOptions);

            connection.mockRespond(response);
        }
    });
  }

  it('should be created', inject([WorkflowPackageService], (service: WorkflowPackageService) => {
    expect(service).toBeTruthy();
  }));

  it('should get Workflow Packages', () => {
    setupConnections(backend, {
      body: [
        {
          id: 1,
          name: 'My First Solicitation Package'
        }
      ],
      status: 200
    });

    service.getWorkflowPackages(1).subscribe(data => {
      expect(data.length).toBe(1);
    });
  });
});
