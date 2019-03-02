import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { ClientComponent } from './client/client.component';
import { CatalogComponent } from './catalog/catalog.component';
import { AuthGuard } from '../services/auth_guard.service';
import { UserComponent } from './user/user.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  canActivateChild:[AuthGuard],
  children: [
    {
      path: 'home',
      component: HomeComponent,
      data: { expectedRoles: []}
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
      data: { expectedRoles: ['ADMIN']}
    },
    
    {
      path: 'clients',
      component: ClientComponent,
      data: { expectedRoles: ['ADMIN']}
    },
    {
      path: 'my-catalogs',
      component: CatalogComponent,
      data: { expectedRoles: ['USER']}
    },
    {
      path: 'catalogs/client/:id',
      component: CatalogComponent,
      data: { expectedRoles: ['ADMIN','USER']}
    },
    {
      path: 'profile',
      component: ProfileComponent,
      data: { expectedRoles: ['ADMIN','USER']}
    },
    {
      path: 'users',
      component: UserComponent,
      data: { expectedRoles: ['ADMIN']}
    },
  
    {
      path: 'configuration',
      loadChildren: './configuration/configuration.module#ConfigurationModule', 
      data: { expectedRoles: ['ADMIN']}
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    }

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
