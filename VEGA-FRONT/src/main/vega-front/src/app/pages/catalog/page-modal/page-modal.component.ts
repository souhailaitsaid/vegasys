import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalDataSource } from 'ng2-smart-table';
import { TranslateService } from '@ngx-translate/core';
import { TABLE_EDIT, TABLE_DELETE } from '../../table-config';
import { PageService } from '../../../@core/data/page.service';
import { ConfirmModalComponent } from '../../../common/modal/confirm-modal/confirm-modal.component';
import { Toast, BodyOutputType, ToasterService } from 'angular2-toaster';

@Component({
  selector: 'ngx-page-modal',
  templateUrl: './page-modal.component.html',
  styleUrls: ['./page-modal.component.scss']
})
export class PageModalComponent implements OnInit {

  catalog: any
  pages : any[]
  settings;
  modalHeader: string;
  modalBtn: string;
  source: LocalDataSource = new LocalDataSource();
  constructor(
    private toaster: ToasterService,
    private modalService: NgbModal,private activeModal: NgbActiveModal,
    private translate: TranslateService,private service : PageService) { }
  ngOnInit() { 
    this.getAll()
   // this.source.load(this.catalog.pages);
    this.settings = this.getSettings()
  }

  getAll(){
    this.service.findAllByCatalogId(this.catalog.catalogId).subscribe( response => {
      this.pages = response;
    })
  }

  getSettings() {
    return {
      actions: {
        custom: [

          {
            name: 'editAction',
            title: '<i class="ion-edit" title="Edit"></i>'
          },
          {
            name: 'deleteAction',
            title: '<i class="far fa-trash-alt" title="Delete"></i>'
          },
          {
            name: 'openPagesAction',
            title: '<i class="ion-document" title="Pages"></i>'
          },
        ],
        add: false,
        edit: false,
        delete: false,
        position: 'right'
      },
      edit: TABLE_EDIT,
      delete: TABLE_DELETE,
      columns: {
        pageId: {
          title: this.translate.instant('common.id'),
          type: 'number',
        },
        number: {
          title: this.translate.instant('page.number'),
          type: 'number',
        },
        filePath: {
          title: this.translate.instant('page.filePath'),
          type: 'number',
        },
      }
    };
  }
  closeModal() {
    this.activeModal.close();
  }
  dismissModal() {
    this.activeModal.dismiss();
  }

  showDeleteModal(id: number) {
    const activeModal = this.modalService.open(ConfirmModalComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = this.translate.instant('modals.confirm-delete.header');
    activeModal.componentInstance.modalContent = this.translate.instant('modals.confirm-delete.body');
    activeModal.componentInstance.modalBtn = this.translate.instant('modals.confirm-delete.btn');
    activeModal.result.then((data) => {
      this.delete(id)
    }, (reason) => {
      console.log('activeModal.result.dismiss')
    });
  }

  delete(id: number) {
    this.service.deleteById(id).subscribe(
      res => {
        this.showToast('success', this.translate.instant(res.message), '')
        this.getAll()
      },
      error => {
        this.showToast('error', this.translate.instant('messages.server-error'), '')
      }
    );
  }

  private showToast(type: string, title: string, body: string) {

    const toast: Toast = {
      type: type,
      title: title,
      body: body,
      timeout: 5000,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toaster.popAsync(toast);
  }

}
