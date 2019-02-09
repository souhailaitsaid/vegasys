import { Component, OnInit } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster';
import { TOASTER_CONFIG } from '../toaster-config';

@Component({
  selector: 'configuration',
  template: '   <toaster-container [toasterconfig]="config"></toaster-container><router-outlet></router-outlet>',
})
export class ConfigurationComponent{
  config = TOASTER_CONFIG
}
