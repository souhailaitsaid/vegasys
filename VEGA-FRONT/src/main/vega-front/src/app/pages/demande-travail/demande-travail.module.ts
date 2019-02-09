import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from '../../shared/shared.module';
import { ConfirmModalComponent } from '../../common/modal/confirm-modal/confirm-modal.component';
import { DemandeTravailComponent } from './demande-travail.component';

@NgModule({
  imports: [
    ThemeModule,
    SharedModule

  ],
  entryComponents: [ConfirmModalComponent],
  declarations: [DemandeTravailComponent]
})
export class DemandeTravailModule { }
