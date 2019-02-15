import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ToasterModule } from 'angular2-toaster';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ConfirmModalComponent } from '../common/modal/confirm-modal/confirm-modal.component';
import { NbSelectModule, NbCalendarRangeModule } from '@nebular/theme';
import { NgSelectModule } from '@ng-select/ng-select';
import { PageModalComponent } from '../pages/catalog/page-modal/page-modal.component';
@NgModule({

  exports: [
    CommonModule,
    ToasterModule,
    TranslateModule,
    Ng2SmartTableModule,
    NbSelectModule,
    NgSelectModule,
    NbCalendarRangeModule
    
  ],
  
  entryComponents: [ConfirmModalComponent],
  declarations: [ConfirmModalComponent]
})
export class SharedModule { }
