
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { TranslateService } from '@ngx-translate/core';
import { ToasterService, ToasterConfig, BodyOutputType, Toast } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { TABLE_DELETE, TABLE_ADD, TABLE_EDIT } from '../table-config';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../../common/modal/confirm-modal/confirm-modal.component';
import { DemandeTravailService } from '../../@core/data/demande-travail.service';
import { EtatInstallationService } from '../../@core/data/etat-installation.service';
import { TypeTravailService } from '../../@core/data/type-travail.service';
import { StatutDemandeTravailService } from '../../@core/data/statut-demande-travail';
import { PersonnelService } from '../../@core/data/personnel.service';
@Component({
  selector: 'demande-travail',
  templateUrl: './demande-travail.component.html',
  styleUrls: ['./demande-travail.component.scss']
})
export class DemandeTravailComponent implements OnInit {
  public personnels: any[]
  public statutDemandeTravails: any[]
  public typeTravails: any[]
  public etatInstallations: any[]
  public elementsList: any[];
  settings;
  config: ToasterConfig;
  form: FormGroup
  source: LocalDataSource = new LocalDataSource();
  constructor(
    private modalService: NgbModal,
    private toaster: ToasterService,
    private translate: TranslateService,
    private service: DemandeTravailService,
    private statutDemandeTravailService: StatutDemandeTravailService,
    private personnelService: PersonnelService,
    private typeTravailService: TypeTravailService,
    private etatInstallationService: EtatInstallationService) {

  }
  ngOnInit() {
    this.settings = this.getSettings()
    this.form = new FormGroup({
      demandeTravailId: new FormControl(),
      description: new FormControl(null, Validators.required),
      label: new FormControl(null, Validators.required),
      remarque: new FormControl(null, Validators.required),
      dureeArretMachine: new FormControl(null, Validators.required),
      semainePromise: new FormControl(null, Validators.required),
      urgent: new FormControl(false, Validators.required),
      etatInstallation: new FormControl(null, Validators.required),
      personnel: new FormControl(null, Validators.required),
      typeTravail: new FormControl(null, Validators.required),
      statutDemandeTravail: new FormControl(null, Validators.required)
    });
    this.getEtatInstallations()
    this.getTypeTravails()
    this.getStatutDemandeTravails()
    this.getPersonnels()
    this.getAll()
  }

  getEtatInstallations() {
    this.etatInstallationService.findAll().subscribe(response => {
      this.etatInstallations = response
    })
  }

  getPersonnels() {
    this.personnelService.findAll().subscribe(response => {
      this.personnels = response
    })
  }

  getTypeTravails() {
    this.typeTravailService.findAll().subscribe(response => {
      this.typeTravails = response
    })
  }

  getStatutDemandeTravails() {
    this.statutDemandeTravailService.findAll().subscribe(response => {
      this.statutDemandeTravails = response        
    })
  }

  byEtatInstallationId(item1: any, item2: any): boolean {
    return item1 && item2 ? item1.etatInstallationId === item2.etatInstallationId : item1 === item2;
  }

  byPersonnelId(item1: any, item2: any): boolean {
    return item1 && item2 ? item1.personnelId === item2.personnelId : item1 === item2;
  }

  byTypeTravailId(item1: any, item2: any): boolean {
    return item1 && item2 ? item1.typeTravailId === item2.typeTravailId : item1 === item2;
  }

  byStatutDemandeTravailId(item1: any, item2: any): boolean {
    return item1 && item2 ? item1.statutDemandeTravailId === item2.statutDemandeTravailId : item1 === item2;
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
        demandeTravailId: this.form.controls['demandeTravailId'].value,
        label: this.form.controls['label'].value,
        description: this.form.controls['description'].value,
        remarque: this.form.controls['remarque'].value,
        dureeArretMachine: this.form.controls['dureeArretMachine'].value,
        semainePromise: this.form.controls['semainePromise'].value,
        urgent: this.form.controls['urgent'].value,
        etatInstallation: this.form.controls['etatInstallation'].value,
        personnel: this.form.controls['personnel'].value,
        typeTravail: this.form.controls['typeTravail'].value,
        statutDemandeTravail: this.form.controls['statutDemandeTravail'].value
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
      demandeTravailId: event.data.demandeTravailId,
      label: event.data.label,
      description: event.data.description,
      remarque: event.data.remarque,
      dureeArretMachine: event.data.dureeArretMachine,
      semainePromise: event.data.semainePromise,
      urgent: event.data.urgent,
      personnel: event.data.personnel,
      etatInstallation: event.data.etatInstallation,
      typeTravail: event.data.typeTravail,
      statutDemandeTravail: event.data.statutDemandeTravail,

    });
  }
  onDeleteConfirm(event): void {
    if (event.data) {
      this.showLargeModal(event.data.demandeTravailId, event)
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
        demandeTravailId: {
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
        remarque: {
          title: this.translate.instant('demande-travail.remarque.remarque'),
          type: 'string',
        },
        urgent: {
          title: this.translate.instant('demande-travail.urgent'),
          type: 'boolean',
         
        },
        dureeArretMachine: {
          title: this.translate.instant('demande-travail.dureeArretMachine'),
          type: 'number',
        },
        semainePromise: {
          title: this.translate.instant('demande-travail.semainePromise'),
          type: 'number',
        },
        etatInstallation: {
          title: this.translate.instant('demande-travail.etatInstallation'),
          valuePrepareFunction: (data) => { return data !== null ? data.label+' ('+data.description+')' : "-" },
          filterFunction: (cell?: any, search?: string) => {
            if (search.length > 0 && cell) {
              return cell.label.match(search) || cell.description.match(search);
            }
          },
        },
        typeTravail: {
          title: this.translate.instant('demande-travail.typeTravail'),
          valuePrepareFunction: (data) => { return data !== null ? data.label+' ('+data.description+')' : "-" },
          filterFunction: (cell?: any, search?: string) => {
            if (search.length > 0 && cell) {
              return cell.label.match(search) || cell.description.match(search);
            }
          },
        },
        statutDemandeTravail: {
          title: this.translate.instant('demande-travail.statutDemandeTravail'),
          valuePrepareFunction: (data) => { return data !== null ? data.label+' ('+data.description+')' : "-" },
          filterFunction: (cell?: any, search?: string) => {
            if (search.length > 0 && cell) {
              return cell.label.match(search) || cell.description.match(search);
            }
          },
        },
        personnel: {
          title: this.translate.instant('demande-travail.personnel'),
          valuePrepareFunction: (data) => { return data !== null ? data.code+' ('+data.nom+' '+data.prenom+')' : "-" },
          filterFunction: (cell?: any, search?: string) => {
            if (search.length > 0 && cell) {
              return cell.nom.match(search) || cell.prenom.match(search)  || cell.code.match(search);
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
