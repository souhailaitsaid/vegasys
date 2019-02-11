import { NgModule } from '@angular/core';
import { ClientComponent } from './client.component';
import { SharedModule } from '../../shared/shared.module';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  imports: [
    ThemeModule,
    SharedModule,
  ],
  declarations: [ClientComponent]
})
export class ClientModule { }
