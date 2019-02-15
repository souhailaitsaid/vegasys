/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

 
  constructor(private translate: TranslateService) {
    
    this.translate.setDefaultLang('fr')
    this.translate.use('fr')
}

  ngOnInit(): void {
  }
}
