import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { formatDate } from '../../helpers';

import { NON_ASSESSABLE_VALUE } from '../../constants';
import { USER_ROLE } from '../user-roles';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../auth.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(public authService: AuthService) { }

  public user: any = null;

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.authService.getUser().subscribe((data: any) => {
      this.user = this.formatProfile(data);
    });

    if (!this.user && (<any>window).user) {
      this.user = this.formatProfile((<any>window).user);
    }
  }

  formatProfile(data: any) {
    if (!data) return null;

    const userRoles = (!data.roles.length)
      ? [USER_ROLE]
      : data.roles;

    return {
      ...data,
      guid: data._id || NON_ASSESSABLE_VALUE,
      roles: userRoles.toString(),
      createdAt: formatDate(data.createdAt),
    };
  }
}
