import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { BonTravailComponent } from './bon-travail/bon-travail.component';
import { PersonnelComponent } from './personnel/personnel.component';
import { DemandeTravailComponent } from './demande-travail/demande-travail.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'fournisseur',
      component: FournisseurComponent,
    },
    {
      path: 'demande-travail',
      component: DemandeTravailComponent,
    },
    {
      path: 'bon-travail',
      component: BonTravailComponent,
    },
    {
      path: 'personnel',
      component: PersonnelComponent,
    },
    {
      path: 'configuration',
      loadChildren: './configuration/configuration.module#ConfigurationModule',
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    }

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
