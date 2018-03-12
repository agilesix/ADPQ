import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {AuthService} from '../services/auth.service';
import { StepService } from '../services/step.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit { 
  
  signUpUser = {
    email: '',
    name: '',
    password: '',
    passwordConfirmation: ''
  };

  @Output() onFormResult = new EventEmitter<any>();

  constructor(public authService: AuthService, public stepService: StepService, private router: Router, private location: Location) {}

  ngOnInit() {}
  submitting:boolean = false; 
  onSignUpSubmit() {
    this.submitting = true;
    this.authService.registerUser(this.signUpUser).subscribe(      
        res => {
          if (res.status === 200) {         
            this.onFormResult.emit({signedUp: true, res});
          }
        },
        err => {
          console.log('err:', err);
          this.onFormResult.emit({signedUp: false, err});
        }
    );

  }

}