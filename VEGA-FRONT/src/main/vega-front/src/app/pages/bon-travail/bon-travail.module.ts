import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BonTravailComponent } from './bon-travail.component';
import { SharedModule } from '../../shared/shared.module';
import { ThemeModule } from '../../@theme/theme.module';
import { ConfirmModalComponent } from '../../common/modal/confirm-modal/confirm-modal.component';

@NgModule({
  imports: [
    ThemeModule,
    SharedModule

  ],
  entryComponents: [ConfirmModalComponent],
  declarations: [BonTravailComponent]
})
export class BonTravailModule { }
