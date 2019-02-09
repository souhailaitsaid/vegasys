import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ToasterModule } from 'angular2-toaster';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ConfirmModalComponent } from '../common/modal/confirm-modal/confirm-modal.component';

@NgModule({

  exports: [
    CommonModule,
    ToasterModule,
    TranslateModule,
    NgxDatatableModule,
    Ng2SmartTableModule,
    
  ],
  declarations: [ConfirmModalComponent]
})
export class SharedModule { }
