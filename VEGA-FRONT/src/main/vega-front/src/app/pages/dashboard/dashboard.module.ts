import { NgModule } from '@angular/core';

import { ChartModule } from 'angular2-chartjs';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { BtChartByStatusComponent } from './bt-chart-by-status/bt-chart-by-status.component';
import { DtChartByPersonnelComponent } from './dt-chart-by-personnel/dt-chart-by-personnel.component';
import { DtChartByStatusComponent } from './dt-chart-by-status/dt-chart-by-status.component';


@NgModule({
  imports: [
    ThemeModule,
    SharedModule,
    ChartModule
  ],
  declarations: [
    DashboardComponent,
    BtChartByStatusComponent,
    DtChartByStatusComponent,
    DtChartByPersonnelComponent,
  ],
})
export class DashboardModule { }
