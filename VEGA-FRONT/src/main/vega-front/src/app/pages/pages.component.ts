import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent implements OnInit {
  menu  : NbMenuItem[]
  constructor(private translate: TranslateService) { 

  }
  ngOnInit() {
    
   this.menu  = [
      {
        title: this.translate.instant('common.menu.dashboard'),
        icon: 'nb-bar-chart',
        link: '/pages/dashboard',
        home: true,
      },
      {
        title: this.translate.instant('common.menu.clients'),
        icon: 'nb-star',
        link: '/pages/clients',
      },
      {
        title: this.translate.instant('common.menu.config'),
        icon: 'nb-gear',
        children: [
          {
            title: this.translate.instant('common.menu.categories'),
            link: '/pages/configuration/categories',
          },
         

        ],
      },
      /*{
        title: 'FEATURES',
        group: true,
      },
      {
        title: 'Auth',
        icon: 'nb-locked',
        children: [
          {
            title: 'Login',
            link: '/auth/login',
          },
          {
            title: 'Register',
            link: '/auth/register',
          },
          {
            title: 'Request Password',
            link: '/auth/request-password',
          },
          {
            title: 'Reset Password',
            link: '/auth/reset-password',
          },
        ],
      },*/
    ];
  }
  
}
