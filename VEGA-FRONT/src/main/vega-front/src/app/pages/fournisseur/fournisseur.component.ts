import { Component, OnInit } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import { TranslateService } from '@ngx-translate/core';
import { ToasterService, ToasterConfig, BodyOutputType, Toast } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FournisseurService } from '../../@core/data/fournisseur.service';
import { ConfirmModalComponent } from '../../common/modal/confirm-modal/confirm-modal.component';
import { TABLE_ADD, TABLE_EDIT, TABLE_DELETE } from '../table-config';

@Component({
  selector: 'fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.scss']
})
export class FournisseurComponent implements OnInit {
  public elementsList: any[];
  settings;
  config: ToasterConfig;

  source: LocalDataSource = new LocalDataSource();
  constructor(
    private modalService: NgbModal,
    private toaster: ToasterService,
    private translate: TranslateService,
    private service: FournisseurService) { }

    showLargeModal( id : number,event) {
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
      this.showLargeModal(event.data.fournisseurId,event)   
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
        fournisseurId: {
          editable: false,
          addable: false,
          title: this.translate.instant('common.id'),
          type: 'number',
        },
        nomFournisseur: {
          title: this.translate.instant('fournisseur.nomFournisseur'),
          type: 'string',
        },
        nomContact: {
          title: this.translate.instant('fournisseur.nomContact'),
          type: 'string',
        },
        telContact: {
          title: this.translate.instant('fournisseur.telContact'),
          type: 'string',
        },
        adresse: {
          title: this.translate.instant('fournisseur.adresse'),
          type: 'string',
        },
        codePostal: {
          title: this.translate.instant('fournisseur.codePostal'),
          type: 'number',
        },
        ville: {
          title: this.translate.instant('fournisseur.ville'),
          type: 'string',
        },
        telephone: {
          title: this.translate.instant('fournisseur.telephone'),
          type: 'string',
        },
        telecopie: {
          title: this.translate.instant('fournisseur.telecopie'),
          type: 'string',
        },
        remarque: {
          title: this.translate.instant('fournisseur.remarque'),
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
