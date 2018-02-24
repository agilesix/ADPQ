import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Angular2TokenService } from "angular2-token";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  constructor(public authTokenService:Angular2TokenService, public authService: AuthService) { }

  ngOnInit() {
     window.scrollTo(0, 0);
  }
    
  hasRole(roleName) {
      let userHasRole = this.authTokenService.currentUserData.roles.some(r => r.name == roleName);
      return userHasRole;
  }

}
