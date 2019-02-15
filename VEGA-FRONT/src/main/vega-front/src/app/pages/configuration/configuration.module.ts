import { NgModule } from '@angular/core';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationComponent } from './configuration.component';
import { ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from '../../shared/shared.module';
import { ToasterService } from 'angular2-toaster';
import { CategoryComponent } from './category/category.component';


@NgModule({
  imports: [
    ThemeModule,
    ConfigurationRoutingModule,
    SharedModule
  ],
  providers: [ToasterService],
  declarations: [
    ConfigurationComponent,
    CategoryComponent,
  ]
})
export class ConfigurationModule { }
