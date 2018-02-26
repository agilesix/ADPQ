import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Angular2TokenService } from "angular2-token";
import { ModalComponent } from '../modal/modal.component';
import { StepService } from '../services/step.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {
  submitting: boolean;
  edit: boolean;

  id: number;
  private sub: any;
  loading: boolean;
  public step;

  public workflowStep = {
    id: 0,
    name: '',
    description: ''
  }

  @ViewChild('modal') modal: ModalComponent;

  presentModal(mode) {
    this.modal.openModal(mode);
  }

  constructor(public authTokenService:Angular2TokenService, private stepService: StepService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
     window.scrollTo(0, 0);
      this.sub = this.route.params.subscribe(params => {
        this.id = +params['id'];
        this.getStep(this.id);
      });
  }

  hasRole(roleName) {
    let userHasRole = false;
    if (this.authTokenService.currentUserData && this.authTokenService.currentUserData['roles'].length != 0) {
      userHasRole = this.authTokenService.currentUserData['roles'].some(r => r.name == roleName);
    }
    return userHasRole;
  }

  getStep(id) {
    this.loading = true;
    this.stepService.getWorkflowStep(id).subscribe(
      data => {
        this.step = data.json();
        this.workflowStep.name = this.step.name;
        this.workflowStep.description = this.step.description;
        this.workflowStep.id = this.step.id;
        this.loading = false;
      },
      err => console.error(err),
      () => console.log('step: ', this.step)
    );
  }

  updateStep() {
    this.submitting = true;
    this.stepService.updateWorkflowStep(this.workflowStep).subscribe(
      data => { 
        this.step = data.json();        
        this.submitting = false;
        this.stepService.getWorkflowSteps();
        this.edit = false;
      },
      err => console.error(err),
      () => console.log('article: ', this.step)
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  
  toggleEdit() {
    this.edit = !this.edit;
  }
}
