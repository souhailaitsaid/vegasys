import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { ThemeModule } from '../../@theme/theme.module';
import { NbSpinnerModule } from '@nebular/theme';

@NgModule({
  declarations: [LoginComponent,],
  imports: [
    CommonModule,
    ThemeModule,
    NbSpinnerModule,
  ]
})
export class LoginModule { }
