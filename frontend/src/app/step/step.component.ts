import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Angular2TokenService } from "angular2-token";
import { ModalComponent } from '../modal/modal.component';
import { StepService } from '../services/step.service';
import { ArticleService } from '../services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkflowStepPackageService } from '../services/workflow-step-package.service';
import { WorkflowPackageService } from '../services/workflow-package.service';
import { PackageFileAttachmentService } from '../services/package-file-attachment.service';

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
  loading: boolean = true;
  loadingUser: boolean = true;
  public step;

  public workflowStep = {
    id: 0,
    name: '',
    description: ''
  }

  public user = {
    workflowPackage: {},
    workflowStepPackage: {}
  }

  @ViewChild('modal') modal: ModalComponent;

  presentModal(mode, data) {
    this.modal.openModal(mode, data);
  }

  constructor(
    public authTokenService:Angular2TokenService, 
    private stepService: StepService, 
    private articleService: ArticleService, 
    private route: ActivatedRoute, private router: Router,
    private workflowPackageService: WorkflowPackageService,
    private workflowStepPackageService: WorkflowStepPackageService,
    private packageFileAttachmentService: PackageFileAttachmentService
  ) { }

  ngOnInit() {
     window.scrollTo(0, 0);
      this.sub = this.route.params.subscribe(params => {
        this.id = +params['id'];
        this.getStep(this.id);
      });
     this.initModal();          
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

    this.modal.packageFileSubmit.subscribe(
      packageFileAttachmentData => {
        this.packageFileAttachmentService.createPackageFileAttachment(packageFileAttachmentData).subscribe(
          data => {
            this.getWorkflowPackage(this.step.workflow.id);
            this.modal.submitSuccess();
          },
          err => console.log(err)
        );
      }
    )
  }

  refreshModal() {
    this.modal['fileSubmissions'] = this.step.knowledge_articles.reduce( (subs, article) => {
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
        this.refreshModal();
        this.getWorkflowPackage(this.step.workflow.id);
      },
      err => console.error(err)
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
      err => console.error(err)
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  
  toggleEdit() {
    this.edit = !this.edit;
  }

  //eventually, this will be plural
  getWorkflowPackage(workflow_id) {
    this.workflowPackageService.getWorkflowPackages(workflow_id).subscribe(
      data => {
        this.user.workflowPackage = data.json()[0];
        this.getWorkflowStepPackages(this.user.workflowPackage['id']);
      }
    )
  }

  getWorkflowStepPackages(workflow_package_id) {
    this.workflowStepPackageService.getWorkflowStepPackages(workflow_package_id).subscribe(
      data => {
        this.loadingUser = false;
        //find by step id
        this.user.workflowStepPackage = data.json().find(x => x.workflow_step.id == this.id);
      }
    )
  }
}
