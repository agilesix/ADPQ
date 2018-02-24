import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {AuthService} from '../services/auth.service';

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

  constructor(public authService: AuthService) {}

  ngOnInit() {}

  onSignUpSubmit() {

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