import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { ArticleService } from '../services/article.service';
import { StepService } from '../services/step.service';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss']
})
export class ArticleEditComponent implements OnInit {

  id: number;
  stepId: number;
  private sub: any;
  loading: boolean;
  stepLoading: boolean;
  submitting: boolean;
  public article;
  baseUrl: string = environment.token_auth_config.apiBase;
  public step;
  public edit: boolean = true;

  knowledgeArticle = {
    id: 0, 
    title: '', 
    body: '', 
    workflow_step_id: 0, 
    user_id: 0, 
    published: false
  };

  constructor(private router: Router, private route: ActivatedRoute, private articleService: ArticleService, private stepService: StepService, public authTokenService: Angular2TokenService) {
    
   }

  ngOnInit() {
     window.scrollTo(0, 0);
    this.sub = this.route.params.subscribe(params => {
      this.stepId = +params['stepId'];
      this.id = +params['id'];
      this.getStep();
      this.getKnowledgeArticle();
    });
  } 

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  updateKnowledgeArticle() {
    this.submitting = true;
    this.knowledgeArticle.id = this.id;
    this.knowledgeArticle.user_id = this.authTokenService.currentUserData.id;
    this.knowledgeArticle.workflow_step_id = this.stepId;
    this.articleService.updateKnowledgeArticle(this.knowledgeArticle).subscribe(
      data => { 
        this.article = JSON.parse(data['_body']);        
        this.submitting = false;
        this.router.navigate(['/step/'+ this.stepId + '/article/' + this.article.id]);
      },
      err => console.error(err),
      () => console.log('article: ', this.article)
    );
  }

  getKnowledgeArticle() {
    this.loading = true;
    this.articleService.getKnowledgeArticle(this.id).subscribe(
      data => { 
        this.article = JSON.parse(data['_body']);
        this.knowledgeArticle.title = this.article.title;
        this.knowledgeArticle.body = this.article.body;
        this.knowledgeArticle.published = this.article.published;
        this.loading = false;
      },
      err => console.error(err),
      () => console.log('article: ', this.article)
    );
  }

  getStep() {
    this.stepLoading = true;
    this.stepService.getWorkflowStep(this.stepId).subscribe(
      data => { 
        this.step = JSON.parse(data['_body']);
        this.stepLoading = false;
      },
      err => console.error(err),
      () => console.log('step: ', this.step)
    );
  } 
  
  toggleEdit() {
    this.edit = !this.edit;
  }

}
