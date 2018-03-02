import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';

const resource = 'workflows';
@Injectable()
export class WorkflowService {

  constructor(private authTokenService: Angular2TokenService) { }
  
  getWorkflow(id) {
    return this.authTokenService.get(resource + '/' + id + '.json');    
  }
}
