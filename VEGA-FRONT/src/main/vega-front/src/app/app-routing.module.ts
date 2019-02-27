import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './services/auth_guard.service';

//import { LoginComponent } from './auth/login/login.component';
//import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {
    path: 'pages', canActivate:[AuthGuard], data: { expectedRoles: ['ADMIN','USER']}, loadChildren: 'app/pages/pages.module#PagesModule'
  },
  {
    path: 'auth', data: { expectedRoles: []}, loadChildren: 'app/auth/auth.module#AuthModule'
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth' },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
