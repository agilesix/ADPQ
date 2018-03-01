import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Angular2TokenService} from 'angular2-token';
import { Location } from '@angular/common';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private location: Location, private authTokenService: Angular2TokenService,
              private router: Router) {}

  canActivate() {
    if (this.authTokenService.userSignedIn()) {
        this.router.navigate(['/home']);
        return false;
    } else {
        return true;
    }
  }

}