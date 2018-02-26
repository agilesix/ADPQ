import { TestBed, inject, getTestBed, async } from '@angular/core/testing';
import {fakeAsync, tick} from '@angular/core/testing';

import { StepService } from './step.service';
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

let authTokenServiceStub = {

};

describe('StepService', () => {
  let service;
  let authTokenService;
  let backend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StepService, 
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
    service = testBed.get(StepService);
    authTokenService = testBed.get(Angular2TokenService);   
    authTokenService.init({apiPath: 'testApi'})

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
    
  it('should be created', inject([StepService], (service: StepService) => {
    expect(service).toBeTruthy();
  }));

  it('should get Workflow Steps', fakeAsync(() => {      
    setupConnections(backend, {
      body: [
        {
          id: 1,
          name: 'Step 1',
          description: 'The description of the article'
        },
      ],
      status: 200
    });    

    service.getWorkflowSteps();
  }));

  it('should get a Workflow Step', () => {
    setupConnections(backend, {
      body: 
        {
          id: 1,
          name: 'Step 1',
          description: 'The description of the article'
        },
      status: 200
    });

    service.getWorkflowStep(1).subscribe(data => {
      expect(data.id).toBe(1);
      expect(data.name).toBe('Step 1');
    });
  });

  it('should update a Workflow Step', () => {
    let step = {id: 1, name: 'Step 1 Updated', description: 'The description of the article updated'}
    setupConnections(backend, {
      body: step,
      status: 200
    });

    service.updateWorkflowStep(step).subscribe(data => {
      expect(data.id).toBe(step.id);
      expect(data.name).toBe(step.name);
    });
  });

});
