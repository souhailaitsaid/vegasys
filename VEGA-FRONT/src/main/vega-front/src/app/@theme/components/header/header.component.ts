import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from '../../../@core/utils';
import { LayoutService } from '../../../@core/utils';
import { LoginService } from '../../../services/api/login.service';
import { filter, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: any;

  userMenu = [{ id:"profile",title: 'Profile' }, { id: 'logout',title: 'Log out' }];

  constructor(private router : Router,
    private loginService : LoginService,
    private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private analyticsService: AnalyticsService,
              private layoutService: LayoutService) {
  }

  ngOnInit() {
    
    this.menuService.onItemClick()
      .subscribe(value =>{
        if(value.item['id']==='logout'){
          console.log(value.item['id'])
          this.loginService.logout()
        } 
       else if(value.item['id']==='profile'){
          console.log(value.item['id'])
          this.router.navigate(['pages/profile']);
        }
         
        } );
  
   /* this.userService.getUsers()
      .subscribe((users: any) => this.user = users.nick);*/
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
