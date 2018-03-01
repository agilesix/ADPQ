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
  submission = new EventEmitter();

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

  modalPortfolio() {
    return this.modalContent === 'portfolio';
  }

  modalFileSubmit() {
    return this.modalContent === 'fileSubmit';
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
