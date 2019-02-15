import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent{


  modalHeader: string;
  modalContent: string
  modalBtn: string;

  constructor(private activeModal: NgbActiveModal) { }



  closeModal() {
    this.activeModal.close();
  }
  dismissModal() {
    this.activeModal.dismiss();
  }
}
