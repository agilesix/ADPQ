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
    published: false,
    file_attachments: []
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
    this.submitting = true;
    this.knowledgeArticle.id = this.id;
    this.knowledgeArticle.user_id = this.authTokenService.currentUserData.id;
    this.knowledgeArticle.workflow_step_id = this.stepId;
    this.articleService.updateKnowledgeArticle(this.knowledgeArticle).subscribe(
      data => { 
        this.article = data.json();

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
      err => console.error(err)
    );
  }

  onFileInputChange(event: any) {    
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
                knowledge_article_id: this.article.id,
                value: reader.result.split(',')[1]
              }
            );
          }
        }
      }    
    }
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
        this.knowledgeArticle.description = this.article.description;
        this.knowledgeArticle.body = this.article.body;
        this.knowledgeArticle.published = this.article.published;
        this.roles = this.article.roles;
        this.loading = false;
      },
      err => console.error(err)
    );
  }

  patchContentBlocks() {
    let control = <FormArray>this.form.controls.contentBlocks;
    this.article.content_blocks.forEach(cb => {
      let roles = [];
      cb.roles.forEach(r => {return r.id});
      control.push(this.fb.group({id: cb.id, roles: roles, content: cb.content}));
    });
  }

  getStep() {
    this.stepLoading = true;
    this.stepService.getWorkflowStep(this.stepId).subscribe(
      data => { 
        this.step = data.json();
        this.stepLoading = false;
      },
      err => console.error(err)
    );
  } 
  
  toggleEdit() {
    this.edit = !this.edit;
  }

  removeFileAttachment(id) {
    if (confirm("Are you sure you want to delete this uploaded file? This cannot be undone.")) {
      this.articleService.removeFileAttachment({file_attachment_id: id}).subscribe(
        data => {
          this.getKnowledgeArticle();
        },
        err => console.error(err)
      );
    }
  }

}
