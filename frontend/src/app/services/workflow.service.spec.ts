import { TestBed, inject, getTestBed, async } from '@angular/core/testing';
import {fakeAsync, tick} from '@angular/core/testing';

import { WorkflowService } from './workflow.service';
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

describe('WorkflowService', () => {
  let service;
  let authTokenService;
  let backend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WorkflowService,
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
    service = testBed.get(WorkflowService);
    authTokenService = testBed.get(Angular2TokenService);   
    authTokenService.init({apiPath: 'testApi'});
  });

  function setupConnections(backend: MockBackend, options: any) {
    backend.connections.subscribe((connection: MockConnection) => {
        if (connection.request.url === 'workflow_steps') {
            const responseOptions = new ResponseOptions(options);
            const response = new Response(responseOptions);

            connection.mockRespond(response);
        }
    });
  }

  it('should be created', inject([WorkflowService], (service: WorkflowService) => {
    expect(service).toBeTruthy();
  }));

  it('should get a Workflow Step', () => {
    setupConnections(backend, {
      body: 
        {
          id: 1,
          name: 'Agile Acquisition Workflow',
          description: 'The description of the workflow'
        },
      status: 200
    });

    service.getWorkflow(1).subscribe(data => {
      expect(data.id).toBe(1);
      expect(data.name).toBe('Agile Acquisition Workflow');
    });
  });
});
