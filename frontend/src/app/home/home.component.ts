import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Angular2TokenService } from "angular2-token";
import { Router, RouterLink } from '@angular/router';
import { StepService } from '../services/step.service';
import { ArticleService } from '../services/article.service';
import { ModalComponent } from '../modal/modal.component';
import { WorkflowService } from '../services/workflow.service';
import { WorkflowPackageService } from '../services/workflow-package.service';
import { WorkflowStepPackageService } from '../services/workflow-step-package.service';
import { PackageFileAttachmentService } from '../services/package-file-attachment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public fileSubmissionCount;
  public workflow;
  public loading: boolean = true;
  public submitting: boolean = false;
  public user = {
    filesLoading: true,
    fileAttachments:  {
      approved: [],
      unapproved: []
    },
    workflowPackage: {},
    workflowStepPackages: [],
    completedSteps: 0,
    percentageCompleted: 0
  }

  constructor(private cdr: ChangeDetectorRef,
    public authTokenService: Angular2TokenService,
    public authService: AuthService,
    public stepService: StepService,
    public articleService: ArticleService,
    public workflowService: WorkflowService,
    public workflowPackageService: WorkflowPackageService,
    public workflowStepPackageService: WorkflowStepPackageService,
    public packageFileAttachmentService: PackageFileAttachmentService
  ) {}

  @ViewChild('modal') modal: ModalComponent;

  presentModal(mode, data) {
    this.modal.openModal(mode, data);
  }

  metrics = {
    knowledgeArticlesCount: 0,
    filesCount: 0,
    fileSubmissionsCount: 0,
    usersCount: 0
  };

  refreshFileSubmissions() {
    this.submitting = true;
    this.articleService.getFileAttachments({approved: false}).subscribe(data => {
      this.submitting = false;
      this.modal['fileSubmissions'] = data.json();
      this.fileSubmissionCount = this.modal['fileSubmissions'].length;
    });
  }

  ngOnInit() {
    this.cdr.detectChanges();
    this.authService.isLoggedIn();
    this.cdr.detectChanges();
    this.stepService.getWorkflowSteps();
    this.refreshFileSubmissions();
    this.getUserFileAttachments();
    this.modal.fileActions.subscribe(evt => {
      this.submitting = true;
      switch (evt.action) {
        case 'approve': {
          this.articleService.approveFileAttachment(evt).subscribe(() => {
            this.submitting = true;
            this.refreshFileSubmissions();
            this.getWorkflow(1);
          });
          break;
        }
        case 'reject': {
          this.articleService.removeFileAttachment(evt).subscribe(() => {
            this.submitting = false;
            this.refreshFileSubmissions();
            this.getWorkflow(1);
          });
          break;
        }
        case 'contributorDelete': {
          this.submitting = false;
          this.getUserFileAttachments();
          break;
        }
      }
    });

    this.modal.packageFileSubmit.subscribe(
      packageFileAttachmentData => {
        this.submitting = true;
        this.packageFileAttachmentService.createPackageFileAttachment(packageFileAttachmentData).subscribe(
          data => {
            this.submitting = false;
            this.getWorkflowPackage(this.workflow.id);
            this.modal.submitSuccess();
          },
          err => {
            this.submitting = false;
            console.log(err)
          }
        );
      }
    )
    this.getWorkflow(1);
  }

  getWorkflow(id) {
    this.workflowService.getWorkflow(id).subscribe(data => {
      this.workflow = data.json();
      if (this.hasRole('Admin')) {
        this.metrics.knowledgeArticlesCount = this.workflow.knowledge_articles_count;
        this.metrics.filesCount = this.workflow.files_count;
        this.metrics.fileSubmissionsCount = this.workflow.file_submissions_count;
        this.metrics.usersCount = this.workflow.users_count;
      }
      this.getWorkflowPackage(this.workflow.id);
    });
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
        this.loading = false;
        this.user.workflowStepPackages = data.json();
        this.workflowPackagePercentageCompleted();
      }
    )
  }

  precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  }

  workflowPackagePercentageCompleted() {
    let total = this.user.workflowStepPackages.length;
    let completedSteps = this.user.workflowStepPackages.filter(wsp => wsp.package_file_attachments.length > 0);
    this.user.completedSteps = completedSteps.length;
    this.user.percentageCompleted = this.precisionRound(this.user.completedSteps/total, 2) * 100;
  }

  hasRole(roleName) {
    let userHasRole = false;
    if (this.authTokenService.currentUserData && this.authTokenService.currentUserData['roles'].length != 0) {
      userHasRole = this.authTokenService.currentUserData['roles'].some(r => r.name == roleName);
    }
    return userHasRole;
  }

  //get the user's specific submitted files
  getUserFileAttachments() {
    this.articleService.getFileAttachments({user: true}).subscribe(
      data => {
        this.user.filesLoading = false;
        let attachments = data.json();
        this.user.fileAttachments.approved = attachments.filter(a => a.approved == true);
        this.user.fileAttachments.unapproved = attachments.filter(a => a.approved == false);
      },
      err => console.error(err)
    );
  }

  removeFileAttachment(id) {
    if (confirm("Are you sure you want to delete this uploaded file? This cannot be undone.")) {
      this.submitting = true;
      this.articleService.removeFileAttachment({file_attachment_id: id}).subscribe(
        data => {
          this.submitting = false;
          this.getUserFileAttachments();
          this.getWorkflow(1);
        },
        err => {
          console.error('there is an error here');
          this.submitting = false;
          this.modal.error = err;
        }
      );
    }
  }
}
