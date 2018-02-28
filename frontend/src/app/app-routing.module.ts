import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { AuthComponent } from './auth/auth.component';
import { ProfileComponent } from './profile/profile.component';
import { StepComponent } from './step/step.component';
import { ArticleComponent } from './article/article.component';
import { ArticleNewComponent } from './article-new/article-new.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'step/:id',
    component: StepComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'step/:stepId/article/:id',
    component: ArticleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'step/:stepId/new/article',
    component: ArticleNewComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'step/:stepId/article/:id/edit',
    component: ArticleEditComponent,
    canActivate: [AuthGuard, AdminGuard]
  }    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule { }
