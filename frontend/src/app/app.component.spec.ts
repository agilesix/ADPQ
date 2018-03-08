// import { TestBed, async } from '@angular/core/testing';
// import { AppComponent } from './app.component';
// import { RouterTestingModule } from '@angular/router/testing';
// import { ToolbarComponent } from './toolbar/toolbar.component';
// import { AppModule } from './app.module';
// import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
// import { LoginFormComponent } from './login-form/login-form.component';
// import { RegisterFormComponent } from './register-form/register-form.component';
// import { MaterializeModule } from 'angular2-materialize/dist/materialize-module';
// import { HomeComponent } from './home/home.component';
// import { ProfileComponent } from './profile/profile.component';
// import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';
// import { AppRoutingModule } from './app-routing.module';
// import { APP_BASE_HREF } from '@angular/common';
// import { Angular2TokenService } from 'angular2-token';
// import { AuthService } from './services/auth.service';
// import { AuthGuard } from './guards/auth.guard';

// describe('AppComponent', () => {
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         AppComponent,
//         HomeComponent,
//         ToolbarComponent,
//         AuthDialogComponent,
//         LoginFormComponent,
//         RegisterFormComponent,
//         ProfileComponent
//       ],
//       imports: [
//         BrowserModule,
//         FormsModule,
//         HttpModule,
//         AppRoutingModule,
//         MaterializeModule    
//       ],
//       providers: [ Angular2TokenService, AuthService, AuthGuard, {provide: APP_BASE_HREF, useValue: '/'}]
      
//     }).compileComponents();
//   }));
//   it('should create the app', async(() => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app).toBeTruthy();
//   }));
//   it(`should have as title 'app'`, async(() => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app.title).toEqual('a2');
//   }));
//   it('should render title in a h1 tag', async(() => {
//     const fixture = TestBed.createComponent(AppComponent);
//     fixture.detectChanges();
//     const compiled = fixture.debugElement.nativeElement;
//     expect(compiled.querySelector('h1').textContent).toContain('a2');
//   }));
// });
