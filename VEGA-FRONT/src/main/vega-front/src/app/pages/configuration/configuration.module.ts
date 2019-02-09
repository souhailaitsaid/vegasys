import { NgModule } from '@angular/core';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ClassificationsComponent } from './classifications/classifications.component';
import { FamillesComponent } from './familles/familles.component';
import { TypeEquipementsComponent } from './type-equipements/type-equipements.component';
import { ConfigurationComponent } from './configuration.component';
import { ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from '../../shared/shared.module';
import { ToasterService } from 'angular2-toaster';
import { ConfirmModalComponent } from '../../common/modal/confirm-modal/confirm-modal.component';
import { CompteursComponent } from './compteurs/compteurs.component';
import { UnitesCompteursComponent } from './unites-compteurs/unites-compteurs.component';
import { OccurencesComponent } from './occurences/occurences.component';
import { CriticitesComponent } from './criticites/criticites.component';
import { ServicesComponent } from './services/services.component';
import { EtatInstallationsComponent } from './etat-installations/etat-installations.component';
import { TypeTravailsComponent } from './type-travails/type-travails.component';
import { OriginesComponent } from './origines/origines.component';
import { ModeGestionsComponent } from './mode-gestions/mode-gestions.component';
import { StatutDemandeTravailsComponent } from './statut-demande-travails/statut-demande-travails.component';

@NgModule({
  imports: [
    ThemeModule,
    ConfigurationRoutingModule,
    SharedModule
  ],
  providers: [ToasterService],
  entryComponents: [ConfirmModalComponent],
  declarations: [
    ConfigurationComponent,
    ClassificationsComponent,
    FamillesComponent,
    TypeEquipementsComponent,
    CompteursComponent,
    UnitesCompteursComponent,
    OccurencesComponent,
    CriticitesComponent,
    ServicesComponent,
    EtatInstallationsComponent,
    TypeTravailsComponent,
    OriginesComponent,
    ModeGestionsComponent,
    StatutDemandeTravailsComponent
  ]
})
export class ConfigurationModule { }
