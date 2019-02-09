import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'confirm-modal',
  template:  `<div class="modal-header">
  <span>{{ modalHeader }}</span>
  <button class="close" aria-label="Close" (click)="dismissModal()">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
<div class="modal-body">
  {{ modalContent }}
</div>
<div class="modal-footer">
  <button class="btn btn-md btn-primary" (click)="closeModal()">{{ modalBtn }}</button>
</div>`,
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent{


  modalHeader: string;
  modalContent: string
  modalBtn: string

  constructor(private activeModal: NgbActiveModal) { }

  closeModal() {
    this.activeModal.close();
  }
  dismissModal() {
    this.activeModal.dismiss();
  }
}
