import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Angular2TokenService} from 'angular2-token';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private authTokenService: Angular2TokenService,
              private router: Router) {}

  hasRole(roleName) {
    let userHasRole = false;
    if (this.authTokenService.currentUserData && this.authTokenService.currentUserData['roles'].length != 0) {
      userHasRole = this.authTokenService.currentUserData['roles'].some(r => r.name == roleName);
    }
    return userHasRole;
  }

  canActivate() {
    return this.authTokenService.validateToken().map(
      res => {
        if (this.hasRole('Admin')) {
          return true;
        } else {
          this.router.navigate(['/home']);
          return false;
        }
      },
      () => {
        this.router.navigate(['/home']);
        return false;
      });
  }

}
