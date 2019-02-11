import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

import * as PATHS from '../app-routing/routes';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  providers: [ AuthService ]
})
export class AdminComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router) { }

  public isLoggedIn: Boolean = false;

  ngOnInit() {
    this.isUserHome();
  }

  private isUserHome() {
    this.authService.me().subscribe((user) => {
      if (user != null) this.isLoggedIn = true;
    }, (error: any) => {
      console.log(error);
    });
  }

  public loginAccess() {
    this.router.navigate([PATHS.LOGIN_PATH]);
  }
}
