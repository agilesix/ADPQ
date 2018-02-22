import {Component, ViewChild} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor(public authService: AuthService, private router: Router) { }

  logOut() {
    this.authService.logOutUser().subscribe(() => this.router.navigate(['/login']));
  }

}

