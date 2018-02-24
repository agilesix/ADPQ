import { Injectable } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Angular2TokenService } from "angular2-token";

const resource = 'knowledge_articles';
@Injectable()
export class ArticleService {

  constructor(private http: HttpClient, private authTokenService: Angular2TokenService) { }

  getKnowledgeArticles() {
    return this.authTokenService.get(resource + '.json')
  }

  getKnowledgeArticle(id) {
    return this.authTokenService.get(resource + '/' + id + '.json')
  }

  createKnowledgeArticle(article: {title: string, body: string, workflow_step_id: number, user_id: number, published: boolean}) {
    return this.authTokenService.post(resource + '.json', article);
  }

  updateKnowledgeArticle(article: {id: number, title: string, body: string, workflow_step_id: number, user_id: number, published: boolean}) {
    return this.authTokenService.put(resource + '/' + article.id + '.json', article);
  }

  uploadFileAttachment(file_attachment: {filename: string, knowledge_article_id: number, file_type_id: number, category_id: number, approved: boolean}) {

  }

  approveFileAttachment(file_attachment: {file_attachment_id: number}) {

  }

}
