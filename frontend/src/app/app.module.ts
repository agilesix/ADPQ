import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { MaterializeModule } from 'angular2-materialize';
import { AppComponent } from './app.component';
import { Angular2TokenService } from 'angular2-token';
import { HomeComponent } from './home/home.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthService } from './services/auth.service';
import { StepService } from './services/step.service';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { APP_BASE_HREF } from '@angular/common';
import { StepComponent } from './step/step.component';
import { AuthComponent } from './auth/auth.component';
import { ArticleComponent } from './article/article.component';
import { ModalComponent } from './modal/modal.component';
import { HttpClientModule} from '@angular/common/http';
import { ArticleService } from './services/article.service';
import { ArticleNewComponent } from './article-new/article-new.component';
import { MarkdownModule } from 'ngx-markdown';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { LMarkdownEditorModule } from 'ngx-markdown-editor';
import { LoginGuard } from './guards/login.guard';
import { WorkflowService } from './services/workflow.service';
import { Ng2FileRequiredModule } from 'ng2-file-required';
import { WorkflowPackageService } from './services/workflow-package.service';
import { WorkflowStepPackageService } from './services/workflow-step-package.service';
import { PackageFileAttachmentService } from './services/package-file-attachment.service';
import { LandingComponent } from './landing/landing.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ProfileComponent,
    StepComponent,
    AuthComponent,
    ArticleComponent,
    ModalComponent,
    ArticleNewComponent,
    ArticleEditComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterializeModule,
    HttpClientModule,
    ReactiveFormsModule,
    MarkdownModule.forRoot(),
    LMarkdownEditorModule,
    Ng2FileRequiredModule
  ],
  providers: [
    Angular2TokenService,
    AuthService,
    AuthGuard,
    AdminGuard,
    LoginGuard,
    {provide: APP_BASE_HREF, useValue: '/'},
    StepService,
    ArticleService,
    WorkflowService,
    WorkflowPackageService,
    WorkflowStepPackageService,
    PackageFileAttachmentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
