import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { TranslateService } from '@ngx-translate/core';
import { ToasterService, ToasterConfig, BodyOutputType, Toast } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { TABLE_DELETE, TABLE_ADD, TABLE_EDIT, TABLE_EDIT_CUSTOM } from '../table-config';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../../common/modal/confirm-modal/confirm-modal.component';
import { ClientService } from '../../@core/data/client.service';
import { CategoryService } from '../../@core/data/category.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  public categories: Observable<any[]>
  public selectedCategories: any[]
  settings;
  config: ToasterConfig;
  form: FormGroup
  source: LocalDataSource = new LocalDataSource();
  constructor(
    private router : Router,
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
      email: new FormControl(null, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(null, [Validators.required]),
      categories: new FormControl(null, [Validators.required]),
    });
    this.getCategories()
    this.getAll()
  }



  getCategories() {
    /* this.categoryService.findAll().subscribe(response => {
       this.categories = response
     })*/
    this.categories = this.categoryService.findAll()
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
        categories: this.form.controls['categories'].value,
      }
      this.service.save(element).subscribe(
        response => {
          if(response.success){
            this.showToast('success', this.translate.instant(response.message), '')
          }else{
            this.showToast('warning', this.translate.instant(response.message), '')
          }
          this.reset();
          this.getAll();
         
        },
        error => this.showToast('error', this.translate.instant('messages.server-error'), '')
      );

    }
  }
  reset() {
    this.form.reset();
  }

  edit(event): void {
    console.log(event);
    this.form.patchValue({
      clientId: event.data.clientId,
      clientName: event.data.clientName,
      description: event.data.description,
      email: event.data.email,
      phoneNumber: event.data.phoneNumber,
      categories: event.data.categories,
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

  onCustom(event) {
    if (event.action === 'editAction') {
        this.edit(event)
    }
    if (event.action === 'deleteAction') {
      this.showLargeModal(event.data.clientId, event)
    }
    if (event.action === 'redirectToCatalog') {
      console.log('redirectToCatalog : catalogs/client/'+event.data.clientId)
      this.router.navigate(['pages/catalogs/client/'+event.data.clientId])
    }

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
        custom: [
        
          {
            name: 'editAction',
            title: '<i class="ion-edit" title="Edit"></i>'
          },
          {
            name: 'deleteAction',
            title: '<i class="fa fa-trash-alt" title="Delete"></i>'
          },
          {
            name: 'redirectToCatalog',
            title: '<i class="fa fa-list-alt" title="Catalogs"></i>'
          },
        ],
        add: false,
        edit: false,
        delete: false,
        position: 'right'
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
        categories: {
          title: this.translate.instant('client.categories'),
          class: 'string',
          valuePrepareFunction: (data) => {
            let values = ''
            data.forEach(function (value) {
              if (values === '') {
                values = values + value.categoryName
              } else {
                values = values + ', ' + value.categoryName
              }
            })
            return values
          },
          filterFunction: (cell?: any, search?: string) => {
            if (search.length > 0 && cell) {
              let found = false
              cell.forEach(function (value) {
                if (value.categoryName.match(search)) {
                  found = true
                }
              })
              return found
            }
          },
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
