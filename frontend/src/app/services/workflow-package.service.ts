import { Injectable } from '@angular/core';
import { Angular2TokenService } from "angular2-token";

const resource = 'workflow_packages';
@Injectable()
export class WorkflowPackageService {

  constructor(private authTokenService: Angular2TokenService) { }

  //gets workflow packages by the user and workflow id
  getWorkflowPackages(workflow_id) {
    return this.authTokenService.get(resource + '.json', {params: {workflow_id: workflow_id}})
  }

}
