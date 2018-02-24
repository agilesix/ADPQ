import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Angular2TokenService } from "angular2-token";
import { ModalComponent } from '../modal/modal.component';
import { StepService } from '../services/step.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {

  id: number;
  private sub: any;
  loading: boolean;
  public step;

  @ViewChild('modal') modal: ModalComponent;

  presentModal(mode) {
    this.modal.openModal(mode);
  }

  constructor(public authTokenService:Angular2TokenService, private stepService: StepService, private route: ActivatedRoute) { }

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
        this.step = JSON.parse(data['_body']);
        this.step.published_articles = this.step.knowledge_articles.filter(ka => ka.published);
        this.loading = false;
      },
      err => console.error(err),
      () => console.log('step: ', this.step)
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  
  toggleEdit() {
    this.edit = !this.edit;
  }
}
