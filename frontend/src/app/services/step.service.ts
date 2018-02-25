import { Injectable } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Angular2TokenService } from "angular2-token";
import { Subject } from 'rxjs/Subject';

const resource = 'workflow_steps';
@Injectable()
export class StepService {

  workflowSteps$: Subject<Object> = new Subject();

  constructor(private http: HttpClient, private authTokenService: Angular2TokenService) { }

  getWorkflowSteps() {
    return this.authTokenService.get(resource + '.json').subscribe(
      res => {
        this.workflowSteps$.next(res.json());
      }
    );    
  }

  getWorkflowStep(id) {
    return this.authTokenService.get(resource + '/' + id + '.json');    
  }

  updateWorkflowStep(step: {id: number, name: string, description: string}){
    return this.authTokenService.put(resource + '/' + step.id + '.json', step);
  }

}
