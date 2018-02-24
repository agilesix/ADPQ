import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { Angular2TokenService } from "angular2-token";
import { environment } from '../../environments/environment';
import { DatePipe } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  id: number;
  stepId: number;
  private sub: any;
  loading: boolean;
  public article;
  baseUrl: string = environment.token_auth_config.apiBase;

  constructor(public authTokenService:Angular2TokenService, private route: ActivatedRoute, private articleService: ArticleService) { }

  @ViewChild('modal') modal: ModalComponent;

  presentModal(mode) {
    this.modal.openModal(mode);
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.stepId = +params['stepId'];
      this.getKnowledgeArticle(this.id);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getKnowledgeArticle(id) {
    this.loading = true;
    this.articleService.getKnowledgeArticle(id).subscribe(
      data => {
        this.article = JSON.parse(data['_body']);
        this.loading = false;
      },
      err => console.error(err),
      () => console.log('article: ', this.article)
    );
  }

  hasRole(roleName) {
    let userHasRole = false;
    if (this.authTokenService.currentUserData && this.authTokenService.currentUserData['roles'].length != 0) {
      userHasRole = this.authTokenService.currentUserData['roles'].some(r => r.name == roleName);
    }
    return userHasRole;
  }

}
