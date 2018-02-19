import {Component, ViewChild} from '@angular/core';
import {AuthDialogComponent} from '../auth-dialog/auth-dialog.component';
import {AuthService} from '../services/auth.service';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  @ViewChild('authDialog') authDialog: AuthDialogComponent;

  constructor(public authService: AuthService, private router: Router) { }

  logOut() {
    this.authService.logOutUser().subscribe(() => this.router.navigate(['/']));
  }

  presentAuthDialog(mode?: 'login'| 'register') {
    this.authDialog.openDialog(mode);
  }

}

