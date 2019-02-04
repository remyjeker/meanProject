import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import * as PATHS from '../app-routing/routes';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public router: Router) {}

    canActivate() {
      const user = (<any>window).user;

      if (user) {
        return true;
      }

      this.router.navigate([PATHS.LOGIN_ROUTE]);
      return false;
  }
}
