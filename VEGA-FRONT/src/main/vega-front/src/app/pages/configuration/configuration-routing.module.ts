import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigurationComponent } from './configuration.component';
import { ClassificationsComponent } from './classifications/classifications.component';
import { TypeEquipementsComponent } from './type-equipements/type-equipements.component';
import { FamillesComponent } from './familles/familles.component';
import { UnitesCompteursComponent } from './unites-compteurs/unites-compteurs.component';
import { CompteursComponent } from './compteurs/compteurs.component';
import { OccurencesComponent } from './occurences/occurences.component';
import { CriticitesComponent } from './criticites/criticites.component';
import { ServicesComponent } from './services/services.component';
import { TypeTravailsComponent } from './type-travails/type-travails.component';
import { EtatInstallationsComponent } from './etat-installations/etat-installations.component';
import { OriginesComponent } from './origines/origines.component';
import { ModeGestionsComponent } from './mode-gestions/mode-gestions.component';
import { StatutDemandeTravailsComponent } from './statut-demande-travails/statut-demande-travails.component';

const routes: Routes = [
  {
    path: '',
    component: ConfigurationComponent,
    children: [
      {
        path: 'classifications',
        component: ClassificationsComponent,
      },
      {
        path: 'type-equipements',
        component: TypeEquipementsComponent,
      },
      {
        path: 'type-travails',
        component: TypeTravailsComponent,
      },
      {
        path: 'etat-installations',
        component: EtatInstallationsComponent,
      },
      {
        path: 'statut-demande-travails',
        component: StatutDemandeTravailsComponent,
      },
      {
        path: 'familles',
        component: FamillesComponent,
      },
      {
        path: 'mode-gestions',
        component: ModeGestionsComponent,
      },
      {
        path: 'criticites',
        component: CriticitesComponent,
      },
      {
        path: 'origines',
        component: OriginesComponent,
      },
      {
        path: 'services',
        component: ServicesComponent,
      },
      {
        path: 'unites-compteurs',
        component: UnitesCompteursComponent,
      },
      {
        path: 'occurences',
        component: OccurencesComponent,
      },
      {
        path: 'compteurs',
        component: CompteursComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
