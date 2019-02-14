import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { TranslateService } from '@ngx-translate/core';
import { ToasterService, ToasterConfig, BodyOutputType, Toast } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { TABLE_DELETE, TABLE_ADD, TABLE_EDIT } from '../table-config';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../../common/modal/confirm-modal/confirm-modal.component';
import { ClientService } from '../../@core/data/client.service';
import { CategoryService } from '../../@core/data/category.service';

@Component({
  selector: 'client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  public categories: any[]
  public selectedCategories : any[]
  settings;
  config: ToasterConfig;
  form: FormGroup
  source: LocalDataSource = new LocalDataSource();
  constructor(
    private modalService: NgbModal,
    private toaster: ToasterService,
    private translate: TranslateService,
    private service: ClientService,
    private categoryService: CategoryService) {

  }
  ngOnInit() {
    this.settings = this.getSettings()
    this.form = new FormGroup({
      clientId: new FormControl(),
      description: new FormControl(null, Validators.required),
      clientName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required,Validators.email]),
      phoneNumber: new FormControl(null, [Validators.required]),
    });
    this.getCategories()
    this.getAll()
  }

 

  getCategories() {
    this.categoryService.findAll().subscribe(response => {
      this.categories = response
    })
  }

  byCategoryId(item1: any, item2: any): boolean {
    return item1 && item2 ? item1.categorieId === item2.categorieId : item1 === item2;
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
        clientId: this.form.controls['clientId'].value,
        clientName: this.form.controls['clientName'].value,
        description: this.form.controls['description'].value,
        email: this.form.controls['email'].value,
        phoneNumber: this.form.controls['phoneNumber'].value,
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
      clientId: event.data.clientId,
      clientName: event.data.clientName,
      description: event.data.description,
      email: event.data.email,
      phoneNumber: event.data.phoneNumber,

    });
  }
  onDeleteConfirm(event): void {
    if (event.data) {
      this.showLargeModal(event.data.clientId, event)
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
        clientId: {
          title: this.translate.instant('common.id'),
          type: 'number',
        },
        clientName: {
          title: this.translate.instant('client.clientName'),
          type: 'string',
        },
        description: {
          title: this.translate.instant('common.description'),
          type: 'string',
        },
        email: {
          title: this.translate.instant('client.email'),
          type: 'string',
        },
        phoneNumber: {
          title: this.translate.instant('client.phoneNumber'),
          type: 'number',
        },
        /*etatInstallation: {
          title: this.translate.instant('demande-travail.etatInstallation'),
          valuePrepareFunction: (data) => { return data !== null ? data.label+' ('+data.description+')' : "-" },
          filterFunction: (cell?: any, search?: string) => {
            if (search.length > 0 && cell) {
              return cell.label.match(search) || cell.description.match(search);
            }
          },
        },*/
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
