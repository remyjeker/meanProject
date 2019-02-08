import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth-guard.service';
import { HomeComponent } from '../home/home.component';
import { ErrorPageComponent } from '../errorPage/errorPage.component';
import * as PATHS from './routes';

const pathMatchMode = 'full';

const errorPageRouteConfig = {
  path: '**',
  pathMatch: pathMatchMode,
  component: ErrorPageComponent
};

const routes: Routes = [{
  path: PATHS.DEFAULT_ROUTE,
  pathMatch: pathMatchMode,
  redirectTo: PATHS.HOME_ROUTE
}, {
  path: PATHS.HOME_ROUTE,
  component: HomeComponent
}, {
  path: PATHS.AUTH_ROUTE,
  loadChildren: 'app/auth/auth.module#AuthModule'
}, {
  path: PATHS.ADMIN_ROUTE,
  loadChildren: 'app/admin/admin.module#AdminModule'
},
  errorPageRouteConfig
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
  declarations: []
})

export class AppRoutingModule { }
