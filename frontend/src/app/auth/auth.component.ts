import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  @Input() authMode: 'Login' | 'Register' = 'Login';

  constructor( private router: Router ) { }
  
  onLoginFormResult(e) {

  if (e.signedIn) {
      this.router.navigate(['/home']);
    } else {
      alert(e.err.json().errors[0]);
    }
  }

  onRegisterFormResult(e) {
    if (e.signedUp) {
      this.router.navigate(['/home']);
    } else {
      alert(e.err.json()['errors']['full_messages'][0]);
    }
  }

  ngOnInit() {
  }
  
  isLoginMode() {
    return this.authMode === 'Login';
  }

  isRegisterMode() {
    return this.authMode === 'Register';
  }


}

