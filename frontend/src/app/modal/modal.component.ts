import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';

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
  submission = new EventEmitter();

  public submitFile = {
    fileName: '',
    fileCategory: 1,
    fileContents: null,
    fileInput: null
  }

  constructor() { }

  ngOnInit() {
  }

  openModal(mode) {
    this.modalContent = mode;
    this.modalActions.emit({action: 'modal', params: ['open']});
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

  onFileInputChange(event: any) {    
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.submitFile.fileContents =
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

  modalFileReview() {
    return this.modalContent === 'fileReview';
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

}
