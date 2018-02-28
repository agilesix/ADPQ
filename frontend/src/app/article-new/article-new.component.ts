import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';
import { ArticleService } from '../services/article.service';
import { StepService } from '../services/step.service';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.scss']
})
export class ArticleNewComponent implements OnInit {

  stepId: number;
  private sub: any;
  loading: boolean;
  submitting: boolean;
  public article;
  baseUrl: string = environment.token_auth_config.apiBase;
  public step;
  public edit: boolean = true;

  knowledgeArticle = {
    id: 0, 
    title: '', 
    description: '',
    body: '', 
    workflow_step_id: 0, 
    user_id: 0, 
    published: false,
    file_attachments: []
  };

  constructor(private router: Router, private route: ActivatedRoute, private articleService: ArticleService, private stepService: StepService, public authTokenService: Angular2TokenService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.sub = this.route.params.subscribe(params => {
      this.stepId = +params['stepId'];
      this.getStep();
    });
  } 

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  createKnowledgeArticle() {
    this.submitting = true;
    this.knowledgeArticle.user_id = this.authTokenService.currentUserData.id;
    this.knowledgeArticle.workflow_step_id = this.stepId;
    this.articleService.createKnowledgeArticle(this.knowledgeArticle).subscribe(
      data => { 
        this.article = data.json();
        
        for (let file of this.knowledgeArticle.file_attachments) {
          file.knowledge_article_id = this.article.id;
        }

        if (this.knowledgeArticle.file_attachments.length > 0) {
          this.articleService.uploadFileAttachments(this.knowledgeArticle.file_attachments).subscribe(
            data => {
              this.submitting = false;
              this.router.navigate(['/step/'+ this.stepId + '/article/' + this.article.id]);
            },
            err => console.error(err),
            () => console.log()
          ) 
        } else {
          this.submitting = false;
          this.router.navigate(['/step/'+ this.stepId + '/article/' + this.article.id]);
        }
      },
      err => console.error(err),
      () => console.log('article: ', this.article)
    );
  }

  getStep() {
    this.loading = true;
    this.stepService.getWorkflowStep(this.stepId).subscribe(
      data => { 
        this.step = JSON.parse(data['_body']);
        this.loading = false;
      },
      err => console.error(err),
      () => console.log('step: ', this.step)
    );
  } 
  
  toggleEdit() {
    this.edit = !this.edit;
  }

  onFileInputChange(event: any) {
    console.log(event);
    
    if(event.target.files && event.target.files.length > 0) {
      let files = event.target.files;
      
      for (let file of files) {
        if (file.name) {
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            this.knowledgeArticle.file_attachments.push(
              {
                filename: file.name,
                filetype: file.type,
                value: reader.result.split(',')[1]
              }
            );
          }
        }
      }    
    }
  }

}
