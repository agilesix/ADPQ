import { Injectable } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Angular2TokenService } from "angular2-token";

const resource = 'workflow_steps';
@Injectable()
export class StepService {

  constructor(private http: HttpClient, private authTokenService: Angular2TokenService) { }

  getWorkflowSteps() {
    return this.authTokenService.get(resource + '.json')
  }

  getWorkflowStep(id) {
    return this.authTokenService.get(resource + '/' + id + '.json')
  }
}
