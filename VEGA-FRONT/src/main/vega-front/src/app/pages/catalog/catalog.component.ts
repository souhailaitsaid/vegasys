import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../@core/data/client.service';
import { CatalogService } from '../../@core/data/catalog.service';
import { shiftInitState } from '@angular/core/src/view';
import { ToasterConfig, ToasterService, BodyOutputType, Toast } from 'angular2-toaster';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmModalComponent } from '../../common/modal/confirm-modal/confirm-modal.component';
import { TABLE_ADD, TABLE_EDIT, TABLE_DELETE } from '../table-config';
import { NbCalendarRange, NbDateService } from '@nebular/theme';
import { DatePipe } from '@angular/common';
import { PageModalComponent } from './page-modal/page-modal.component';
import { DataService } from '../../services/data-service';
import { UserInfoService } from '../../services/user-info.service';

@Component({
  selector: 'ngx-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  loading = false;
  range: NbCalendarRange<Date>;
  param
  client: any
  catalogs: any[]
  settings;
  config: ToasterConfig;
  form: FormGroup
  source: LocalDataSource = new LocalDataSource();
  constructor(
    private dataservice: DataService,
    private router: Router,
    private route: ActivatedRoute, protected dateService: NbDateService<Date>,
    private clientService: ClientService,
    private service: CatalogService,
    private modalService: NgbModal,
    private toaster: ToasterService,private userInfo : UserInfoService,
    private translate: TranslateService, private datePipe: DatePipe) {

    this.range = {
      start: this.dateService.addDay(this.monthStart, 3),
      end: this.dateService.addDay(this.monthEnd, -3),
    };
  }

  get monthStart(): Date {
    return this.dateService.getMonthStart(new Date());
  }

  get monthEnd(): Date {
    return this.dateService.getMonthEnd(new Date());
  }

  isValidRange(): boolean {
    return this.range != null && this.range.start != null && this.range.end != null
  }

  isEdit(): boolean {
    return this.form.controls['catalogId'].value !== "" && this.form.controls['catalogId'].value !== null
  }

  ngOnInit() {

    /*this.param = this.route.params.subscribe(params => {
      if (params['id']) {
        this.clientService.findById(params['id']).subscribe(response => {
          this.client = response
          this.getAll(this.client.clientId)
        })
      }

    });*/
    if(this.userInfo.isAdmin()){
      if (!this.dataservice.client) {
        this.router.navigate(['pages/clients'])
      } else {
        this.client = this.dataservice.client
        this.getAll(this.client.clientId)
      }
    }else{
      if (!this.userInfo.getUserInfo().client) {
        this.router.navigate(['pages/home'])
      } else {
        this.client = this.userInfo.getUserInfo().client
        this.getAll(this.client.clientId)
      }
    }
   
    this.settings = this.getSettings()
    this.form = new FormGroup({
      catalogId: new FormControl(),
      description: new FormControl(),
    });

  }


  getAll(id: number) {
    this.loading = true;
    this.service.findAllByClientId(id)
      .subscribe(
        elements => {
          this.source.load(elements);
          console.log(elements);
          this.loading = false;
        },
        err => {
          this.showToast('error', this.translate.instant('messages.server-error'), '')
          console.log(err)
          this.loading = false;
        }
      )
  }


  byCategoryId(item1: any, item2: any): boolean {
    return item1 && item2 ? item1.categorieId === item2.categorieId : item1 === item2;
  }

  showDeleteModal(id: number, event) {
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

  showPagesModal(id: number, event) {
    console.log(event)
    const activeModal = this.modalService.open(PageModalComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = this.translate.instant('modals.pageManagement',
      { debut: this.datePipe.transform(event.data.debut, 'dd-MMM-yyyy'), fin: this.datePipe.transform(event.data.fin, 'dd-MMM-yyyy'), name: event.data.client.clientName });
    activeModal.componentInstance.catalog = event.data
    activeModal.componentInstance.modalBtn = this.translate.instant('modals.close');
    activeModal.result.then((data) => {
    }, (reason) => {
      //this.getAll(this.client.clientId)
      console.log('activeModal.result.dismiss')
    });
  }

  onSubmit() {
    if (this.isValidRange) {
      let element: any = {
        catalogId: this.form.controls['catalogId'].value,
        description: this.form.controls['description'].value,
        debut: this.range.start,
        fin: this.range.end,
        client: this.client,
      }
      this.service.save(element).subscribe(
        response => {
          this.reset();
          this.getAll(this.client.clientId)
          this.showToast('success', this.translate.instant(response.message), '')
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
    this.range = {
      start: new Date(event.data.debut),
      end: new Date(event.data.fin),
    }
    this.form.patchValue({
      catalogId: event.data.catalogId,
      description: event.data.description
    });
  }
  onDeleteConfirm(event): void {
    if (event.data) {
      this.showDeleteModal(event.data.catalogId, event)
    }
  }
  onPagesOpen(event): void {
    if (event.data) {
      this.showPagesModal(event.data.catalogId, event)
    }
  }

  delete(id: number, event) {
    this.service.deleteById(id).subscribe(
      res => {
        this.showToast('success', this.translate.instant(res.message), '')
        this.getAll(this.client.clientId)
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
      this.showDeleteModal(event.data.catalogId, event)
    }
    if (event.action === 'openPagesAction') {
      this.showPagesModal(event.data.catalogId, event)
      console.log('openPages : catalogs/client/' + event.data.catalogId)

    }

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
      add: TABLE_ADD,
      edit: TABLE_EDIT,
      delete: TABLE_DELETE,
      columns: {
        catalogId: {
          title: this.translate.instant('common.id'),
          type: 'number',
        },
        description: {
          title: this.translate.instant('common.description'),
          type: 'number',
        },
        debut: {
          title: this.translate.instant('catalog.debut'),
          type: 'string',
          valuePrepareFunction: (date) => {
            var raw = new Date(date);
            var formatted = this.datePipe.transform(raw, 'dd-MMM-yyyy');
            return formatted;
          },
          filterFunction: (cell?: any, search?: string) => {
            if (search.length > 0 && cell) {
              var raw = new Date(cell);
              var formatted = this.datePipe.transform(raw, 'dd-MMM-yyyy');
              return formatted.toLowerCase().match(search.toLowerCase())
            }
          }
        },
        fin: {
          title: this.translate.instant('catalog.fin'),
          type: 'string',
          valuePrepareFunction: (date) => {
            var raw = new Date(date);
            var formatted = this.datePipe.transform(raw, 'dd-MMM-yyyy');
            return formatted;
          },
          filterFunction: (cell?: any, search?: string) => {
            if (search.length > 0 && cell) {
              var raw = new Date(cell);
              var formatted = this.datePipe.transform(raw, 'dd-MMM-yyyy');
              return formatted.toLowerCase().match(search.toLowerCase())
            }
          }
        },

        /* pages: {
           title: this.translate.instant('catalog.nbrPages'),
           type: 'string',
           valuePrepareFunction: (data) => {
             return data.length
           },
           filterFunction: (cell?: any, search?: string) => {
             if (search.length > 0 && cell) {
               return search == cell.length
             }
           }
         },*/

        /* categories: {
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