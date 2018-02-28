import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { Angular2TokenService } from "angular2-token";
import { StepService } from '../services/step.service';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class ToolbarComponent {

  constructor(public location: Location, public authTokenService:Angular2TokenService, public authService: AuthService, public router: Router, public stepService: StepService, private route: ActivatedRoute) { }

  id: number;
  private sub: any;
  loading: boolean;

  ngOnInit() {
    this.stepService.getWorkflowSteps();
  }

  logOut() {
    this.authService.logOutUser().subscribe(() => this.router.navigate(['/login']));
  }  

  isActive(stepId) {
   if (this.location.path().indexOf('step') > 0) {     
    let paramId = +this.location.path().split('/')[2];

    return stepId == paramId;    
   }

    return false;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}

