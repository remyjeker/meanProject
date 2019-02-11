import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UsersListComponent } from '../users/list/usersList.component';
import { OnlyAdminUsersGuard } from './admin-user-guard';

@NgModule({
  declarations: [
    AdminComponent,
    UsersListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
  ],
  providers: [
    OnlyAdminUsersGuard
  ]
})
export class AdminModule { }
