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
  error: any;
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
      this.initModal();
    });
    this.modal.submission.subscribe(() => {
      if (this.modal.modalRemove()) {
        // TODO: improve ordering by waiting to set `submitted` until success or failure
        if (this.modal.submitted) {
          this.removeArticle();
        }
      }
    });

    this.modal.fileSubmit.subscribe(submitFileData => {
      let fileAttachmentData = {
        filename: submitFileData.filename, 
        knowledge_article_id: this.id, 
        file_type_id: 1, 
        category_id: submitFileData.category_id, 
        file_contents: submitFileData.file_contents
      }
      this.articleService.submitFileAttachment(fileAttachmentData).subscribe(
        data => {
          this.modal['submitFile'] = {
            fileName: '',
            fileCategory: 1,
            fileContents: null,
            fileInput: null
          }
          this.modal.submitSuccess();
        },
        err => {
          this.error = err;
          console.error(err);
        }
      );
    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  initModal() {
    this.modal.fileActions.subscribe(evt => {
      switch (evt.action) {
        case 'approve': {
          this.articleService.approveFileAttachment(evt).subscribe(() => {
            this.getKnowledgeArticle(this.article.id);
          });
          break;
        }
        case 'reject': {
          this.articleService.removeFileAttachment(evt).subscribe(() => {
            this.getKnowledgeArticle(this.article.id);
          });
          break;
        }
      }
    });
  }

  refreshModal() {
    this.modal['fileSubmissions'] = this.article.file_attachments.filter( file => !file.approved ).map( file => {
      file.workflow_steps = this.article.workflow_steps;
      return file;
    });
  }

  getKnowledgeArticle(id) {
    this.loading = true;
    this.error = false;
    this.articleService.getKnowledgeArticle(id).subscribe(
      data => {
        this.article = data.json();
        this.refreshModal();
        this.loading = false;
      },
      err => {
        this.error = err;
        console.error(err);
      },
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

  removeArticle() {
    console.log('delete article', this.article);
    this.articleService.removeKnowledgeArticle(this.id).subscribe( params => {
      console.log('article deleted', params);
    });
  }
}
