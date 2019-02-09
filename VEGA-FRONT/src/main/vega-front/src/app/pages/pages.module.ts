import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { ConfigurationModule } from './configuration/configuration.module';

const PAGES_COMPONENTS = [
  PagesComponent,
];


@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    ConfigurationModule,
    MiscellaneousModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,    
  ],
})
export class PagesModule {
}
