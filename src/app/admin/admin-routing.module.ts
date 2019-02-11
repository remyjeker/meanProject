import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
// import { OnlyAdminUsersGuard } from './admin-user-guard';

import * as PATHS from '../app-routing/routes';

const routes: Routes = [{
  path: PATHS.ADMIN_ROUTE,
  // TODO : canActivateAsync
  // canActivate: [OnlyAdminUsersGuard],
  children: [
    {
      path: '',
      redirectTo: PATHS.ADMIN_DASHBOARD_PATH,
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
