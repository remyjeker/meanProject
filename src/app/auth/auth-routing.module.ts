import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

import * as PATHS from '../app-routing/routes';

const routes: Routes = [{
  path: PATHS.AUTH_ROUTE,
  children: [
    {
      path: '',
      redirectTo: PATHS.LOGIN_ROUTE,
      pathMatch: 'full'
    }, {
      path: 'login',
      component: LoginComponent
    }, {
      path: 'profile',
      component: ProfileComponent
    }, {
      path: 'register',
      component: RegisterComponent,
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthRoutingModule { }
