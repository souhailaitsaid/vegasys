import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { DashboardService } from '../../../@core/data/dashboard.service';



@Component({
  selector: 'bt-chart-by-status',
  template: `
    <chart type="bar" [data]="data" [options]="options"></chart>
  `,
})

export class BtChartByStatusComponent implements OnDestroy {
  data: any;
  options: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService, private dashboard: DashboardService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;
      this.dashboard.getBtByStatus().subscribe(
        response => {
          console.log('getBtByStatus')
          this.buildChart(response, colors, chartjs);
        }
      );

    });
  }

  buildChart(data: Map<string, Object>, colors, chartjs): any {
    let datasets: any[] = []
    let labels: any[] = Object.keys(data)

    this.data = {
      labels: labels,
      datasets: [{
        data: Object.values(data),//.map(x => x[0] / this.unit),
        label: 'BT by Status',
        backgroundColor: NbColorHelper.hexToRgbA(colors.primaryLight, 0.8),
      }],
    };
    this.options = {
      maintainAspectRatio: true,
      responsive: true,
      legend: {
        labels: {
          fontColor: chartjs.textColor,
        },
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false,
              color: chartjs.axisLineColor,
            },
            ticks: {
              fontColor: chartjs.textColor,
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              display: true,
              color: chartjs.axisLineColor,
            },
            ticks: {
              beginAtZero: true,
              fontColor: chartjs.textColor,
            },
          },
        ],
      },
    };
  }
  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
