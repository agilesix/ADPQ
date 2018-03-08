import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  submitted: boolean;

  @Input() modalContent;

  modalActions = new EventEmitter<string|MaterializeAction>();
  fileActions = new EventEmitter<{file_attachment_id: number, action: string}>();
  fileSubmit = new EventEmitter<{filename: string, category_id: number, file_contents: any}>();
  packageFileSubmit = new EventEmitter<{filename: string, workflow_step_package_id: number, file_contents: any}>();
  submission = new EventEmitter();

  public submitFile = {
    fileName: '',
    fileCategory: 1,
    fileContents: null,
    fileInput: null
  }

  public packageFileAttachment = {
    fileName: '',
    workflowStepPackageId: 0,
    fileContents: null,
    fileInput: null
  }

  public fileSubmissionCount;
  public workflow;
  public loading: boolean = true;
  public user = {
    filesLoading: true,
    fileAttachments:  {
      approved: [],
      unapproved: []
    }
  }

  public data: any;

  public error = null;

  constructor(public articleService: ArticleService) {}

  ngOnInit() {
    this.refreshFileSubmissions();
    this.getUserFileAttachments();
  }

  openModal(mode, data?) {
    this.modalContent = mode;
    this.modalActions.emit({action: 'modal', params: ['open']});
    this.data = data;
  }

  closeModal() {
    this.modalActions.emit({action: 'modal', params: ['close']});
  }

  modalComingSoon() {
    return this.modalContent === 'comingSoon';
  }

  modalPortfolio() {
    return this.modalContent === 'portfolio';
  }

  modalFileSubmit() {
    return this.modalContent === 'fileSubmit';
  }

  onFileInputChange(event: any, fileInputModel) {    
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this[fileInputModel].fileContents =
          {
            filename: file.name,
            filetype: file.type,
            value: reader.result.split(',')[1]
          }           
      }
    }
  }  

  submitFileSubmission() {
    this.fileSubmit.emit({filename: this.submitFile.fileName, category_id: this.submitFile.fileCategory, file_contents: this.submitFile.fileContents});
  }

  submitPackageFileAttachment() {
    //data is the workflow step package
    this.packageFileSubmit.emit({filename: this.packageFileAttachment.fileName, workflow_step_package_id: this.data.id, file_contents: this.packageFileAttachment.fileContents});
  }

  modalFileReview() {
    return this.modalContent === 'fileReview';
  }

  modalFileManage() {
    return this.modalContent === 'fileManage';
  }

  approveFile(file_id) {
    this.fileActions.emit({file_attachment_id: file_id, action: 'approve'});
  }

  rejectFile(file_id) {
    this.fileActions.emit({file_attachment_id: file_id, action: 'reject'});
  }

  modalRemove() {
    return this.modalContent === 'remove';
  }

  submitSuccess() {
    this.submitted = !this.submitted;
    if (this.submitted) {
      this.submission.emit();
    }
  }

  //get the user's specific submitted files
  getUserFileAttachments() {
    this.articleService.getFileAttachments({user: true}).subscribe(
      data => {
        this.user.filesLoading = false;
        let attachments = data.json();
        this.user.fileAttachments.approved = attachments.filter(a => a.approved == true);
        this.user.fileAttachments.unapproved = attachments.filter(a => a.approved == false);
      },
      err => { 
        console.error(err);
        this.error = err;
      }
    );
  }

  removeFileAttachment(id) {
    if (confirm("Are you sure you want to delete this uploaded file? This cannot be undone.")) {
      this.articleService.removeFileAttachment({file_attachment_id: id}).subscribe(
        data => {
          this.fileActions.emit({file_attachment_id: id, action: 'contributorDelete'});
          this.getUserFileAttachments();
        },
        err => { 
          console.error(err);
          this.error = err;
        }
      );
    }
  }

  refreshFileSubmissions() {
    this.articleService.getFileAttachments({approved: false}).subscribe(
      data => {
        this['fileSubmissions'] = data.json();
        this.fileSubmissionCount = this['fileSubmissions'].length;
      },
      err => { 
        console.error(err);
        this.error = err;
      }
    );
  }

}
