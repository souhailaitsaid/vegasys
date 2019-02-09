import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { TranslateService } from '@ngx-translate/core';
import { ToasterService, ToasterConfig, BodyOutputType, Toast } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { TABLE_DELETE, TABLE_ADD, TABLE_EDIT } from '../../table-config';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../../../common/modal/confirm-modal/confirm-modal.component';
import { CompteurService } from '../../../@core/data/compteur.service';
import { UniteCompteurService } from '../../../@core/data/unite-compteur.service';

@Component({
  selector: 'compteurs',
  templateUrl: './compteurs.component.html',
  styleUrls: ['./compteurs.component.scss']
})
export class CompteursComponent implements OnInit {
  public uniteCompteurs: any[]
  public elementsList: any[];
  settings;
  config: ToasterConfig;
  form: FormGroup
  source: LocalDataSource = new LocalDataSource();
  constructor(
    private modalService: NgbModal,
    private toaster: ToasterService,
    private translate: TranslateService,
    private unitCompteurService: UniteCompteurService,
    private service: CompteurService) {

  }
  ngOnInit() {
    this.settings = this.getSettings()
    this.form = new FormGroup({
      compteurId: new FormControl(),
      label: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      uniteCompteur: new FormControl(null, Validators.required)
    });
    this.getUnitCompteurs()
    this.getAll()
  }

  byUniteCompteurId(item1: any, item2: any): boolean {
    return item1 && item2 ? item1.uniteCompteurId === item2.uniteCompteurId : item1 === item2;
  }

  showLargeModal(id: number, event) {
    const activeModal = this.modalService.open(ConfirmModalComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = this.translate.instant('modals.confirm-delete.header');
    activeModal.componentInstance.modalContent = this.translate.instant('modals.confirm-delete.body');
    activeModal.componentInstance.modalBtn = this.translate.instant('modals.confirm-delete.btn');
    activeModal.result.then((data) => {
      this.delete(id, event)
    }, (reason) => {
      console.log('activeModal.result.dismiss')
    });
  }
  onSubmit() {
    if (this.form.valid) {
      let element: any = {
        compteurId: this.form.controls['compteurId'].value,
        label: this.form.controls['label'].value,
        description: this.form.controls['description'].value,
        uniteCompteur: this.form.controls['uniteCompteur'].value
      }
      this.service.save(element).subscribe(
        response => {
          this.reset();
          this.getAll();
          this.showToast('success', this.translate.instant(response.message), '')
        },
        error => this.showToast('error', this.translate.instant('messages.server-error'), '')
      );

    }
  }
  reset() {
    this.form.reset();
  }

  onUserRowSelect(event): void {
    console.log(event);
    this.form.patchValue({
      compteurId: event.data.compteurId,
      label: event.data.label,
      description: event.data.description,
      uniteCompteur: event.data.uniteCompteur,
    });
  }
  onDeleteConfirm(event): void {
    if (event.data) {
      this.showLargeModal(event.data.compteurId, event)
    }
  }

  delete(id: number, event) {
    this.service.deleteById(id).subscribe(
      res => {
        this.showToast('success', this.translate.instant(res.message), '')
        this.getAll()
      },
      error => {
        this.showToast('error', this.translate.instant('messages.server-error'), '')
        event.confirm.reject();
      }
    );
  }

  getUnitCompteurs() {
    this.unitCompteurService.findAll().subscribe(response => {
      this.uniteCompteurs = response
    })
  }

  getAll() {
    this.service.findAll()
      .subscribe(
        elements => {
          this.elementsList = elements;
          this.source.load(elements);
          console.log(elements);
        },
        err => {
          this.showToast('error', this.translate.instant('messages.server-error'), '')
          console.log(err)
        }
      )
  }

  getSettings() {
    return {
      actions: {
        add: false,
        edit: false,
      },
      add: TABLE_ADD,
      edit: TABLE_EDIT,
      delete: TABLE_DELETE,
      columns: {
        compteurId: {
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
        },
        uniteCompteur: {
          title: this.translate.instant('compteur.unite-compteur'),
          valuePrepareFunction: (data) => { return data !== null ? data.label+' ('+data.description+')' : "-" },
          filterFunction: (cell?: any, search?: string) => {
            if (search.length > 0 && cell) {
              return cell.label.match(search) || cell.description.match(search);
            }
          },
        },
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
