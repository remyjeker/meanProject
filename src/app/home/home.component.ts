import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

import * as PATHS from '../app-routing/routes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ AuthService ]
})
export class HomeComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  public isLoggedIn: Boolean = false;

  ngOnInit() {
    this.isUserHome();
  }

  private isUserHome() {
    this.authService.me().subscribe((user) => {
      if (user != null) {
        this.isLoggedIn = true;
      }
    }, (error: any) => {
      console.log(error);
    });
  }

  public loginAccess() {
    this.router.navigate([PATHS.LOGIN_ROUTE]);
  }

}
