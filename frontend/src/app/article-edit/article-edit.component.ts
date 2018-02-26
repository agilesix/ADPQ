import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { ArticleService } from '../services/article.service';
import { StepService } from '../services/step.service';
import { Angular2TokenService } from 'angular2-token';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Form } from '@angular/forms/src/directives/form_interface';

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
  public roles;

  public form: FormGroup;

  knowledgeArticle = {
    id: 0, 
    title: '', 
    description: '',
    body: '', 
    workflow_step_id: 0, 
    user_id: 0, 
    published: false
  };

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private articleService: ArticleService, private stepService: StepService, public authTokenService: Angular2TokenService) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      contentBlocks: this.fb.array([])
    });
   }

   initContentBlock() {
     return this.fb.group({
      id: [''],
      roles:[''],
      content: ['']
     });
   }

   addContentBlock() {
     const control = <FormArray>this.form.controls['contentBlocks'];
     control.push(this.initContentBlock());
   }

   removeContentBlock(i: number) {
     const control =  <FormArray>this.form.controls['contentBlocks'];
     control.removeAt(i);
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

  updateKnowledgeArticle(form) {
    //console.log(form);
    this.submitting = true;
    this.knowledgeArticle.id = this.id;
    this.knowledgeArticle.user_id = this.authTokenService.currentUserData.id;
    this.knowledgeArticle.workflow_step_id = this.stepId;
    this.articleService.updateKnowledgeArticle(this.knowledgeArticle).subscribe(
      data => { 
        this.article = data.json();;        
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
        this.article = data.json();;
        // this.form.patchValue({
        //   title: this.article.title, 
        //   body: this.article.body
        // });
        // this.patchContentBlocks();

        this.knowledgeArticle.title = this.article.title;
        console.log('article description', this.article.description);
        this.knowledgeArticle.description = this.article.description;
        console.log('knowledgeArticle description', this.knowledgeArticle.description);
        this.knowledgeArticle.body = this.article.body;
        this.knowledgeArticle.published = this.article.published;
        this.roles = this.article.roles;
        this.loading = false;
      },
      err => console.error(err),
      () => console.log('article: ', this.article)
    );
  }

  patchContentBlocks() {
    let control = <FormArray>this.form.controls.contentBlocks;
    this.article.content_blocks.forEach(cb => {
      let roles = []
      cb.roles.forEach(r => {return r.id})
      control.push(this.fb.group({id: cb.id, roles: roles, content: cb.content}))
    });
  }

  getStep() {
    this.stepLoading = true;
    this.stepService.getWorkflowStep(this.stepId).subscribe(
      data => { 
        this.step = data.json();;
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
