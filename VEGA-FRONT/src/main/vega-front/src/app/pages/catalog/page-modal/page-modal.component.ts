import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalDataSource } from 'ng2-smart-table';
import { TranslateService } from '@ngx-translate/core';
import { TABLE_EDIT, TABLE_DELETE } from '../../table-config';
import { PageService } from '../../../@core/data/page.service';
import { ConfirmModalComponent } from '../../../common/modal/confirm-modal/confirm-modal.component';
import { Toast, BodyOutputType, ToasterService } from 'angular2-toaster';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { NgxGalleryOptions, NgxGalleryAnimation, NgxGalleryImage } from 'ngx-gallery';
// const URL = '/api/';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';
@Component({
  selector: 'ngx-page-modal',
  templateUrl: './page-modal.component.html',
  styleUrls: ['./page-modal.component.scss']
})
export class PageModalComponent implements OnInit {

  catalog: any
  pages: any[]
  settings;
  modalHeader: string;
  modalBtn: string;
  source: LocalDataSource = new LocalDataSource();
  uploader
  isDropOver: boolean;
  fileUploads : any []
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  @ViewChild('fileInput') fileInput: ElementRef;
  constructor(
    private toaster: ToasterService,
    private modalService: NgbModal, private activeModal: NgbActiveModal,
    private translate: TranslateService, private service: PageService) { }


  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }
  fileClicked() {
    this.fileInput.nativeElement.click();
  }

  getAllUploadedFiles(){
     this.service.getFiles(this.catalog.client.clientId,this.catalog.catalogId).subscribe(
      response => {
        this.fileUploads = response

      let images : any[] = []
      this.fileUploads.forEach(f => images.push({
        small: f,
        medium: f,
        big: f
    }))
      this.galleryImages = images
      console.log(this.galleryImages)     
    }
    );
  }

  ngOnInit() {
    this.galleryOptions = this.getGalleryOptions();
    this.getAll()
    this. getAllUploadedFiles()
    const headers = [{ name: 'Accept', value: 'application/json' }];
    this.uploader = new FileUploader(
      {
        url: this.service.api_root + '/uploadFile',
        headers: headers,
        allowedMimeType: ['image/png', 'image/gif', 'image/jpeg'],
        maxFileSize: 5 * 1024 * 1024 // 5 MB
      }
    )
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }
    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('catalogId', this.catalog.catalogId);
      form.append('clientId', this.catalog.client.clientId);
      form.append('type', 'PAGE');
    };
    this.uploader.onErrorItem = ((item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any => {
      this.showToast('error', this.translate.instant('messages.server-error'), response)
    });

    this.uploader.onSuccessItem = ((item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any => {
      this.getAllUploadedFiles()
    });

   this.settings = this.getSettings()
  }

  getAll() {
    this.service.findAllByCatalogId(this.catalog.catalogId).subscribe(response => {
      this.pages = response;
    })
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

  showDeleteModal(id: number) {
    const activeModal = this.modalService.open(ConfirmModalComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = this.translate.instant('modals.confirm-delete.header');
    activeModal.componentInstance.modalContent = this.translate.instant('modals.confirm-delete.body');
    activeModal.componentInstance.modalBtn = this.translate.instant('modals.confirm-delete.btn');
    activeModal.result.then((data) => {
      this.delete(id)
    }, (reason) => {
      console.log('activeModal.result.dismiss')
    });
  }

  delete(id: number) {
    this.service.deleteById(id).subscribe(
      res => {
        this.showToast('success', this.translate.instant(res.message), '')
        this.getAll()
      },
      error => {
        this.showToast('error', this.translate.instant('messages.server-error'), '')
      }
    );
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

  private getGalleryOptions(){ 
    return     [
      {
          width: '733px',
          height: '400px',
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
          breakpoint: 800,
          width: '100%',
          height: '600px',
          imagePercent: 80,
          thumbnailsPercent: 20,
          thumbnailsMargin: 20,
          thumbnailMargin: 20
      },
      // max-width 400
      {
          breakpoint: 400,
          preview: false
      }
  ];
  }

}
