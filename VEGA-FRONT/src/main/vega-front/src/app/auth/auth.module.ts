import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginModule } from './login/login.module';
import { ThemeModule } from '../@theme/theme.module';

const PAGES_COMPONENTS = [
  AuthComponent
];

@NgModule({
  
  imports: [
    CommonModule,
    AuthRoutingModule,
    ThemeModule,
    LoginModule,
  ],


  declarations: [...PAGES_COMPONENTS],
})
export class AuthModule { }
