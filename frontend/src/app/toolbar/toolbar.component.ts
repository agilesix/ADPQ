import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { Angular2TokenService } from "angular2-token";
import { StepService } from '../services/step.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor(public authTokenService:Angular2TokenService, public authService: AuthService, private router: Router, private stepService: StepService, private route: ActivatedRoute) { }

  id: number;
  private sub: any;
  loading: boolean;

  ngOnInit() {
    this.getSteps();
  }

  logOut() {
    this.authService.logOutUser().subscribe(() => this.router.navigate(['/login']));
  }

  public steps;
  getSteps() {
    this.loading = true;
    this.stepService.getWorkflowSteps().subscribe(
      data => { 
        this.steps = JSON.parse(data._body);
        this.loading = false;
      },
      err => console.error(err),
      () => console.log('toolbar steps:', this.steps)
    );
  }

  isActive(stepId) {
   if (this.router.location.path().indexOf('step') > 0) {
    let paramId = +this.router.location.path().split('/')[2];

    return stepId == paramId;    
   }

    return false;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}

