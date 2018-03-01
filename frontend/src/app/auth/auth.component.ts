import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  @Input() authMode: 'login' | 'register' = 'login';

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
      location.reload();
    } else {
      alert(e.err.json()['errors']['full_messages'][0]);
    }
  }

  ngOnInit() {
  }
  
  isLoginMode() {
    return this.authMode === 'login';
  }

  isRegisterMode() {
    return this.authMode === 'register';
  }


}

