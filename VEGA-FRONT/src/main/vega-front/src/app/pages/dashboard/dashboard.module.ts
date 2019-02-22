import { NgModule } from '@angular/core';

import { ChartModule } from 'angular2-chartjs';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { DtChartByPersonnelComponent } from './dt-chart-by-personnel/dt-chart-by-personnel.component';
import { DtChartByStatusComponent } from './dt-chart-by-status/dt-chart-by-status.component';
import { CatalogChartByClientComponent } from './catalog-chart-by-client/catalog-chart-by-client.component';


@NgModule({
  imports: [
    ThemeModule,
    SharedModule,
    ChartModule
  ],
  declarations: [
 
    DashboardComponent,
       
    CatalogChartByClientComponent,
    DtChartByStatusComponent,
    DtChartByPersonnelComponent,
  ],
})
export class DashboardModule { }
