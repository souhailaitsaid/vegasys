import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog.component';
import { SharedModule } from '../../shared/shared.module';
import { ThemeModule } from '../../@theme/theme.module';
import { PageModalComponent } from './page-modal/page-modal.component';

@NgModule({
  declarations: [CatalogComponent, PageModalComponent],
  imports: [
    ThemeModule,
    SharedModule,
  ],
  entryComponents: [PageModalComponent],
})
export class CatalogModule { }
