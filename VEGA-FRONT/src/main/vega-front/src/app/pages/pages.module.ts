import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { ClientModule } from './client/client.module';
import { CatalogModule } from './catalog/catalog.module';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { HomeModule } from './home/home.module';

const PAGES_COMPONENTS = [
  PagesComponent,
];


@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    ClientModule,
    CatalogModule,
    ConfigurationModule,
    UserModule,
    ProfileModule,
    HomeModule,
    MiscellaneousModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,    
  ],
})
export class PagesModule {
}
