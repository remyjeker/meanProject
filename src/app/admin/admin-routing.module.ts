import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { OnlyAdminUsersGuard } from './admin-user-guard';

import * as PATHS from '../app-routing/routes';

const routes: Routes = [{
  path: PATHS.ADMIN_ROUTE,
  // canActivateAsync
  // canActivate: [OnlyAdminUsersGuard],
  children: [
    {
      path: '',
      redirectTo: PATHS.ADMIN_DASHBOARD_ROUTE,
      pathMatch: 'full'
    }, {
      path: 'dashboard',
      component: AdminComponent,
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }
