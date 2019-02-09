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
        title: this.translate.instant('common.menu.demande-travail'),
        icon: 'nb-list',
        link: '/pages/demande-travail',
      },
      {
        title: this.translate.instant('common.menu.fournisseur'),
        icon: 'nb-grid-a-outline',
        link: '/pages/fournisseur',
      },
      {
        title: this.translate.instant('common.menu.personnel'),
        icon: 'nb-person',
        link: '/pages/personnel',
      },
      {
        title: this.translate.instant('common.menu.bon-travail'),
        icon: 'nb-compose',
        link: '/pages/bon-travail',
      },
      {
        title: this.translate.instant('common.menu.config'),
        icon: 'nb-gear',
        children: [
          {
            title: this.translate.instant('common.menu.classifications'),
            link: '/pages/configuration/classifications',
          },
          {
            title: this.translate.instant('common.menu.familles'),
            link: '/pages/configuration/familles',
          },
          {
            title: this.translate.instant('common.menu.criticites'),
            link: '/pages/configuration/criticites',
          },
          {
            title: this.translate.instant('common.menu.origines'),
            link: '/pages/configuration/origines',
          },
          {
            title: this.translate.instant('common.menu.services'),
            link: '/pages/configuration/services',
          },
          {
            title: this.translate.instant('common.menu.mode-gestions'),
            link: '/pages/configuration/mode-gestions',
          },
          {
            title: this.translate.instant('common.menu.statut-demande-travails'),
            link: '/pages/configuration/statut-demande-travails',
          },
          {
            title: this.translate.instant('common.menu.type-equips'),
            link: '/pages/configuration/type-equipements',
          },
          {
            title: this.translate.instant('common.menu.type-travails'),
            link: '/pages/configuration/type-travails',
          },
          {
            title: this.translate.instant('common.menu.etat-installations'),
            link: '/pages/configuration/etat-installations',
          },
          {
            title: this.translate.instant('common.menu.compteurs'),
            link: '/pages/configuration/compteurs',
          },
          {
            title: this.translate.instant('common.menu.occurences'),
            link: '/pages/configuration/occurences',
          },
          {
            title: this.translate.instant('common.menu.unites-compteurs'),
            link: '/pages/configuration/unites-compteurs',
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
