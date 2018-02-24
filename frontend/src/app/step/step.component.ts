import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Angular2TokenService } from "angular2-token";

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {

  constructor(public authTokenService:Angular2TokenService, public authService: AuthService) { }

  ngOnInit() {
     window.scrollTo(0, 0);
  }
    
  hasRole(roleName) {
      let userHasRole = this.authTokenService.currentUserData.roles.some(r => r.name == roleName);
      return userHasRole;
  }

}
