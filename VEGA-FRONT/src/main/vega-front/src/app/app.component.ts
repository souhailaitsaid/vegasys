/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { TranslateService } from '@ngx-translate/core';
import { ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
 
  constructor(private translate: TranslateService,private analytics: AnalyticsService) {
    
      this.translate.setDefaultLang('fr')
      this.translate.use('fr')
  }

  ngOnInit() {
   
    this.analytics.trackPageViews();
  }
}
