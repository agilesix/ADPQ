import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Angular2TokenService } from "angular2-token";
import { Router, RouterLink } from '@angular/router';
import { StepService } from '../services/step.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef, public authTokenService:Angular2TokenService, public authService: AuthService, public stepService: StepService) { 
  }
    
  @ViewChild('modal') modal: ModalComponent;

  presentModal(mode) {
    this.modal.openModal(mode);
  }

  ngOnInit() {    
    this.cdr.detectChanges();
    this.authService.isLoggedIn();
    this.cdr.detectChanges();
    this.stepService.getWorkflowSteps();
  }   

  hasRole(roleName) {
    let userHasRole = false;
    if (this.authTokenService.currentUserData && this.authTokenService.currentUserData['roles'].length != 0) {
      userHasRole = this.authTokenService.currentUserData['roles'].some(r => r.name == roleName);
    }
    return userHasRole;
  }

}
