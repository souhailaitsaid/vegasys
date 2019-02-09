import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { TranslateService } from '@ngx-translate/core';
import { ToasterService, ToasterConfig, BodyOutputType, Toast } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { TABLE_DELETE, TABLE_ADD, TABLE_EDIT } from '../../table-config';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../../../common/modal/confirm-modal/confirm-modal.component';
import { TypeTravailService } from '../../../@core/data/type-travail.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OccurenceService } from '../../../@core/data/occurence.service';

@Component({
  selector: 'type-travails',
  templateUrl: './type-travails.component.html',
  styleUrls: ['./type-travails.component.scss']
})
export class TypeTravailsComponent implements OnInit {
  form: FormGroup
  public elementsList: any[];
  public occurences: any[]
  settings;
  config: ToasterConfig;

  source: LocalDataSource = new LocalDataSource();
  constructor(
    private modalService: NgbModal,
    private toaster: ToasterService,
    private translate: TranslateService,
    private service: TypeTravailService,
    private occurenceService: OccurenceService
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
    this.form = new FormGroup({
      typeTravailId: new FormControl(),
      label: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      occurence: new FormControl(null, Validators.required)
    });
    this.getOccurences()
    this.getAll()
  }
  byOccurenceId(item1: any, item2: any): boolean {
    return item1 && item2 ? item1.occurenceId === item2.occurenceId : item1 === item2;
  }
  onSubmit() {
    if (this.form.valid) {
      let element: any = {
        typeTravailId: this.form.controls['typeTravailId'].value,
        label: this.form.controls['label'].value,
        description: this.form.controls['description'].value,
        occurence: this.form.controls['occurence'].value
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

  onDeleteConfirm(event): void {  
    if (event.data) {
      this.showLargeModal(event.data.typeTravailId,event)   
    }
  }

  delete(id : number,event){
      this.service.deleteById(id).subscribe(
        res => {
          this.showToast('success',this.translate.instant(res.message),'')  
          this.getAll()
        },
        error => {
          this.showToast('error',this.translate.instant('messages.server-error'),'')
          event.confirm.reject();
        }
      );
  }
  getOccurences() {
    this.occurenceService.findAll().subscribe(
      response => {
      this.occurences = response
    },err => {
      this.showToast('error',this.translate.instant('messages.server-error'),'')
      console.log(err)
    }
    )
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
          this.showToast('error',this.translate.instant('messages.server-error'),'')
          console.log(err)
        }
      )
  }
  reset() {
    this.form.reset();
  }
  onUserRowSelect(event): void {
    console.log(event);
    this.form.patchValue({
      typeTravailId: event.data.typeTravailId,
      label: event.data.label,
      description: event.data.description,
      occurence: event.data.occurence,
    });
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
        typeTravailId: {
          width: '150px', 
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
        },

        occurence: {
          title: this.translate.instant('type-travail.occurence'),
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
