import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { SharedModule } from '../../shared/shared.module';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  declarations: [UserComponent],
  imports: [
    ThemeModule,
    SharedModule,
  ]
})
export class UserModule { }
