import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalDataSource } from 'ng2-smart-table';
import { TranslateService } from '@ngx-translate/core';
import { TABLE_EDIT, TABLE_DELETE } from '../../table-config';

@Component({
  selector: 'ngx-page-modal',
  templateUrl: './page-modal.component.html',
  styleUrls: ['./page-modal.component.scss']
})
export class PageModalComponent implements OnInit {

  catalog: any
  settings;
  modalHeader: string;
  modalBtn: string;
  source: LocalDataSource = new LocalDataSource();
  constructor(private activeModal: NgbActiveModal,
    private translate: TranslateService,) { }
  ngOnInit() { 
    this.source.load(this.catalog.pages);
    this.settings = this.getSettings()
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

}
