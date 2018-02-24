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

  knowledgeArticle = {
    id: 0, 
    title: '', 
    body: '', 
    workflow_step_id: 0, 
    user_id: 0, 
    published: false
  };

  constructor(private router: Router, private route: ActivatedRoute, private articleService: ArticleService, private stepService: StepService, public authTokenService: Angular2TokenService) { }

  ngOnInit() {
    console.log('onInit')
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
        this.article = JSON.parse(data._body);
        this.submitting = false;
        this.router.navigate(['/step/'+ this.stepId + '/article/' + this.article.id]);
      },
      err => console.error(err),
      () => console.log('article: ', this.article)
    );
  }

  getStep() {
    this.loading = true;
    this.stepService.getWorkflowStep(this.stepId).subscribe(
      data => { 
        this.step = JSON.parse(data._body);
        this.loading = false;
      },
      err => console.error(err),
      () => console.log('step: ', this.step)
    );
  } 
  

}
