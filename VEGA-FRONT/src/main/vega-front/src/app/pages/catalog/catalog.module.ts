import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog.component';
import { SharedModule } from '../../shared/shared.module';
import { ThemeModule } from '../../@theme/theme.module';
import { PageModalComponent } from './page-modal/page-modal.component';

import { NgxGalleryModule } from 'ngx-gallery';
@NgModule({
  declarations: [CatalogComponent, PageModalComponent],
  imports: [
    ThemeModule,
    SharedModule,
    NgxGalleryModule,
  ],
  entryComponents: [PageModalComponent],
})
export class CatalogModule { }
