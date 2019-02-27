import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '../../shared/shared.module';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    ThemeModule,
    SharedModule,
  ]
})
export class ProfileModule { }
