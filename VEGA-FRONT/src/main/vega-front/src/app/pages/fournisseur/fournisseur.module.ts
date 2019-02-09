import { NgModule } from '@angular/core';
import { FournisseurComponent } from './fournisseur.component';
import { ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from '../../shared/shared.module';
import { ConfirmModalComponent } from '../../common/modal/confirm-modal/confirm-modal.component';

@NgModule({
  imports: [
    ThemeModule,
    SharedModule

  ],
  entryComponents: [ConfirmModalComponent],
  declarations: [FournisseurComponent]
})
export class FournisseurModule { }
