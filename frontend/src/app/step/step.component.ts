import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Angular2TokenService } from "angular2-token";
import { ModalComponent } from '../modal/modal.component';
import { StepService } from '../services/step.service';
import { ArticleService } from '../services/article.service';
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

  constructor(public authTokenService:Angular2TokenService, private stepService: StepService, private articleService: ArticleService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
     window.scrollTo(0, 0);
      this.sub = this.route.params.subscribe(params => {
        this.id = +params['id'];
        this.getStep(this.id);
      });
     this.initModal()
  }

  initModal() {
    this.modal.fileActions.subscribe(evt => {
      switch (evt.action) {
        case 'approve': {
          this.articleService.approveFileAttachment(evt).subscribe(() => {
            this.getStep(this.workflowStep.id);
          });
          break;
        }
        case 'reject': {
          this.articleService.removeFileAttachment(evt).subscribe(() => {
            this.getStep(this.workflowStep.id);
          });
          break;
        }
      }
    });
  }

  refreshModal() {
    this.modal.fileSubmissions = this.step.knowledge_articles.reduce( (subs, article) => {
      subs = subs.concat(article.file_submissions.map( file => {
        file.knowledge_article = article;
        file.workflow_steps = [this.step];
        return file;
      }));
      return subs;
    }, []);
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
        this.refreshModal()
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
