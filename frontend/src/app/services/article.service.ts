import { Injectable } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Angular2TokenService } from "angular2-token";

const resource = 'knowledge_articles';
@Injectable()
export class ArticleService {

  constructor(private authTokenService: Angular2TokenService) { }

  getKnowledgeArticles() {
    return this.authTokenService.get(resource + '.json')
  }

  getKnowledgeArticle(id) {
    return this.authTokenService.get(resource + '/' + id + '.json')
  }

  removeKnowledgeArticle(id) {
    return this.authTokenService.delete(resource + '/' + id + '.json')
  }

  createKnowledgeArticle(article: {title: string, body: string, workflow_step_id: number, user_id: number, published: boolean}) {
    return this.authTokenService.post(resource + '.json', article);
  }

  updateKnowledgeArticle(article: {id: number, title: string, description: string, body: string, workflow_step_id: number, user_id: number}) {
    return this.authTokenService.put(resource + '/' + article.id + '.json', article);
  }

  // split out into a seprate service
  uploadFileAttachments(file_attachments: Array<{filename: string, filetype: string, knowledge_article_id: number, value: any}>) {
    return this.authTokenService.post('file_attachments/create/multiple.json', file_attachments);
  }

  submitFileAttachment(file_attachment: {filename: string, knowledge_article_id: number, file_type_id: number, category_id: number, file_contents: any}) {
    return this.authTokenService.post('file_attachments.json', file_attachment);
  }

  approveFileAttachment(file_attachment: {file_attachment_id: number}) {
    return this.authTokenService.put('file_attachments/' + file_attachment.file_attachment_id + '.json', {approved: true});
  }
  
  removeFileAttachment(file_attachment: {file_attachment_id: number}) {
    return this.authTokenService.delete('file_attachments/' + file_attachment.file_attachment_id + '.json');
  }
  
  getFileAttachments(params) {
    return this.authTokenService.get('file_attachments.json', {params: params});
  }

}
