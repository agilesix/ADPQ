import { Injectable } from '@angular/core';
import { Angular2TokenService } from "angular2-token";

const resource = 'workflow_step_packages';
@Injectable()
export class WorkflowStepPackageService {

  constructor(private authTokenService: Angular2TokenService) { }

  //gets workflow step packages by the user and workflow package id
  getWorkflowStepPackages(workflow_package_id) {
    return this.authTokenService.get(resource + '.json', {params: {workflow_package_id: workflow_package_id}})
  }
}
