import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Angular2TokenService} from "angular2-token";
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef, public authService: AuthService) { 
  }

  ngOnInit() {    
    this.cdr.detectChanges();
    this.authService.isLoggedIn();
    this.cdr.detectChanges();
  }   

}
