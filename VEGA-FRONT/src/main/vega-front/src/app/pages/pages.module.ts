import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { FournisseurModule } from './fournisseur/fournisseur.module';
import { BonTravailModule } from './bon-travail/bon-travail.module';
import { PersonnelModule } from './personnel/personnel.module';
import { DemandeTravailModule } from './demande-travail/demande-travail.module';

const PAGES_COMPONENTS = [
  PagesComponent,
];


@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    ConfigurationModule,
    FournisseurModule,
    PersonnelModule,
    BonTravailModule,
    DemandeTravailModule,
    MiscellaneousModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,    
  ],
})
export class PagesModule {
}
