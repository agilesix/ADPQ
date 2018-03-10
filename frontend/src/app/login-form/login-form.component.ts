import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {AuthService} from '../services/auth.service';
import { StepService } from '../services/step.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  signInUser = {
    email: '',
    password: ''
  };
  submitting: boolean = false;
  @Output() onFormResult = new EventEmitter<any>();

  constructor(public authService: AuthService, public stepService: StepService, private router: Router) {}

  ngOnInit() {}

  onSignInSubmit() {
    this.submitting = true;
    this.authService.logInUser(this.signInUser).subscribe(
        res => {
          if (res.status === 200) {
            this.onFormResult.emit({signedIn: true, res});
            this.router.navigate(['/home']);
            this.stepService.getWorkflowSteps();
            this.submitting = false;
          }
        },
        err => {
          this.submitting = false;
          console.log('err:', err);
          this.onFormResult.emit({signedIn: false, err});
        }
    );

  }

}