import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() modalContent;

  modalActions = new EventEmitter<string|MaterializeAction>();

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
  
  submitSuccess() {
    this.submitted = !this.submitted;
  }

}
