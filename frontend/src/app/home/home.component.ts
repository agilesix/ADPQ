import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Angular2TokenService } from "angular2-token";
import { Router, RouterLink } from '@angular/router';
import { StepService } from '../services/step.service';
import { ModalComponent } from '../modal/modal.component';
import { WorkflowService } from '../services/workflow.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public workflow;
  loading: boolean = true;
  constructor(private cdr: ChangeDetectorRef, public authTokenService: Angular2TokenService, public authService: AuthService, public workflowService: WorkflowService) { 
  }
    
  @ViewChild('modal') modal: ModalComponent;

  presentModal(mode) {
    this.modal.openModal(mode);
  }

  metrics = {
    knowledgeArticlesCount: 0,
    filesCount: 0,
    fileSubmissionsCount: 0,
    usersCount: 0
  }

  ngOnInit() {    
    this.cdr.detectChanges();
    this.authService.isLoggedIn();
    this.cdr.detectChanges();
    this.getWorkflow(1);
  }   

  getWorkflow(id) {
    this.workflowService.getWorkflow(id).subscribe(data => {
      this.loading = false;
      this.workflow = data.json();
      if (this.hasRole('Admin')) {
        this.metrics.knowledgeArticlesCount = this.workflow.knowledge_articles_count;
        this.metrics.filesCount = this.workflow.files_count;
        this.metrics.fileSubmissionsCount = this.workflow.file_submissions_count;
        this.metrics.usersCount = this.workflow.users_count;
      }
    });
  }

  hasRole(roleName) {
    let userHasRole = false;
    if (this.authTokenService.currentUserData && this.authTokenService.currentUserData['roles'].length != 0) {
      userHasRole = this.authTokenService.currentUserData['roles'].some(r => r.name == roleName);
    }
    return userHasRole;
  }
}
