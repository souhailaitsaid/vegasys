


import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
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
import { DataService } from '../../services/data-service';
import { UserService } from '../../@core/data/user.service';


@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public roles: any[] = ['USER','ADMIN']
  public clients: Observable<any[]>
  public selectedClient: any
  settings;
  config: ToasterConfig;
  form: FormGroup
  source: LocalDataSource = new LocalDataSource();
  constructor(
    private dataservice : DataService,
    private router : Router,
    private modalService: NgbModal,
    private toaster: ToasterService,
    private translate: TranslateService,
    private service: UserService,
    private clientService: ClientService) {

  }

  ngOnInit() {
    this.settings = this.getSettings()
    this.form = new FormGroup({
      userId: new FormControl(),
      username: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      active: new FormControl(true, ),
      blocked: new FormControl(false),
      role: new FormControl(null, [Validators.required]),
      client: new FormControl(null),
    });
    this.getCategories()
    this.getAll()
  }

  onSubmit() {
    if (this.form.valid) {
      let element: any = {
        userId: this.form.controls['userId'].value,
        username: this.form.controls['username'].value,
        firstName: this.form.controls['firstName'].value,
        lastName: this.form.controls['lastName'].value,
        email: this.form.controls['email'].value,
        active: this.form.controls['active'].value,
        blocked: this.form.controls['blocked'].value,
        role: this.form.controls['role'].value,
        client: this.form.controls['client'].value,
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

  getCategories() {
    /* this.categoryService.findAll().subscribe(response => {
       this.categories = response
     })*/
    this.clients = this.clientService.findAll()
  }

  byClientId(item1: any, item2: any): boolean {
    return item1 && item2 ? item1.clientId === item2.clientId : item1 === item2;
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

  reset() {
    this.form.reset();
  }

  edit(event): void {
    console.log(event);
    this.form.patchValue({
      userId: event.data.userId,
       username: event.data.username,
        firstName: event.data.firstName,
        lastName: event.data.lastName,
        email: event.data.email,
        active: event.data.active,
        blocked: event.data.blocked,
        role: event.data.role,
        client: event.data.client,
    });
  }
  onDeleteConfirm(event): void {
    if (event.data) {
      this.showLargeModal(event.data.userId, event)
    }
  }

  delete(id: number, event) {
    this.service.deleteById(id).subscribe(
      res => {
        if(res.success){
          this.showToast('success', this.translate.instant(res.message), '')
        }else{
          this.showToast('warning', this.translate.instant(res.message), '')
        }
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
    else if (event.action === 'deleteAction') {
      this.showLargeModal(event.data.userId, event)
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
        width:'50px',
        custom: [
        
          {
            name: 'editAction',
            title: '<i class="ion-edit" title="Edit"></i>'
          },
          {
            name: 'deleteAction',
            title: '<i class="fa fa-trash-alt" title="Delete"></i>'
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
        userId: {
          title: this.translate.instant('common.id'),
          type: 'number',
        },
      username: {
          title: this.translate.instant('user.username'),
          type: 'string',
        },
        firstName: {
          title: this.translate.instant('user.firstName'),
          type: 'string',
        },
        lastName: {
          title: this.translate.instant('user.lastName'),
          type: 'string',
        },
        email: {
          show:false,
          title: this.translate.instant('user.email'),
          type: 'string',
        },
        active: {
          title: this.translate.instant('user.isActive'),
          valuePrepareFunction: (value) => { console.log(value);return value ? 'true' : 'false' }
        },
        blocked: {
          title: this.translate.instant('user.isBlocked'),
          valuePrepareFunction: (value) => { return value ? 'true' : 'false' }
        },
        role: {
          title: this.translate.instant('user.role'),
          type: 'number',
        },
        client: {
          title: this.translate.instant('user.client'),
          class: 'string',
          valuePrepareFunction: (data) => {
            if(data){
              return data.clientName
            }
            return ""
          },
          filterFunction: (cell?: any, search?: string) => {
            if (search.length > 0 && cell) {
              cell.clientName.match(search)
            }
            return false
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

