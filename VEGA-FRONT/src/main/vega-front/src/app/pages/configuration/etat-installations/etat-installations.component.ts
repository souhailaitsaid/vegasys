import { Component, OnInit } from '@angular/core';
import { ClassificationService } from '../../../@core/data/classification.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { TranslateService } from '@ngx-translate/core';
import { ToasterService, ToasterConfig, BodyOutputType, Toast } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { TABLE_DELETE, TABLE_ADD, TABLE_EDIT } from '../../table-config';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../../../common/modal/confirm-modal/confirm-modal.component';
import { EtatInstallationService } from '../../../@core/data/etat-installation.service';

@Component({
  selector: 'etat-installations',
  templateUrl: './etat-installations.component.html',
  styleUrls: ['./etat-installations.component.scss']
})
export class EtatInstallationsComponent implements OnInit {

  public elementsList: any[];
  settings;
  config: ToasterConfig;

  source: LocalDataSource = new LocalDataSource();
  constructor(
    private modalService: NgbModal,
    private toaster: ToasterService,
    private translate: TranslateService,
    private service: EtatInstallationService
    ) { }

    showLargeModal( id : number ,event) {
      const activeModal = this.modalService.open(ConfirmModalComponent, { size: 'lg', container: 'nb-layout' });
  
      activeModal.componentInstance.modalHeader = this.translate.instant('modals.confirm-delete.header');
      activeModal.componentInstance.modalContent = this.translate.instant('modals.confirm-delete.body');
      activeModal.componentInstance.modalBtn =this.translate.instant('modals.confirm-delete.btn');
      activeModal.result.then((data) => {
       this.delete(id,event)
      }, (reason) => {
        console.log('activeModal.result.dismiss')
      });
    }



  ngOnInit() {

    this.settings = this.getSettings()
    this.getAll(null)
  }

  onSave(event) {
    this.service.save(event.newData).subscribe(
      res => {
        this.showToast('success',this.translate.instant(res.message),'')
        this.getAll(event)
        event.confirm.resolve();
      },
    )

  }

  onDeleteConfirm(event): void {  
    if (event.data) {
      this.showLargeModal(event.data.etatInstallationId,event)   
    }
  }

  delete(id : number,event){
      this.service.deleteById(id).subscribe(
        res => {
          this.showToast('success',this.translate.instant(res.message),'')  
          this.getAll(null)
        },
        error => {
          this.showToast('error',this.translate.instant('messages.server-error'),'')
          event.confirm.reject();
        }
      );
  }

  getAll(event) {
    this.service.findAll()
      .subscribe(
        elements => {
          this.elementsList = elements;
          if(event){
            event.confirm.resolve();
          }
          this.source.load(elements);
          console.log(elements);
        },
        err => {
          this.showToast('error',this.translate.instant('messages.server-error'),'')
          console.log(err)
        }
      )
  }

  getSettings() {
    return {
      add: TABLE_ADD,
      edit: TABLE_EDIT,
      delete: TABLE_DELETE,
      columns: {
        etatInstallationId: {
          editable: false,
          addable: false,
          title: this.translate.instant('common.id'),
          type: 'number',
        },
        label: {
          title: this.translate.instant('common.label'),
          type: 'string',
        },
        description: {
          title: this.translate.instant('common.description'),
          type: 'string',
        }
      }
    };
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
