import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import * as PATHS from '../app-routing/routes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() user: any = {};

  constructor(private authService: AuthService, private router: Router) { }

  private PATHS: any = PATHS;

  ngOnInit() { }

  logout(): void {
    this.authService.signOut();
    this.navigate(PATHS.LOGIN_ROUTE);
  }

  isNotProfilePage(): Boolean {
    return !(this.router.url === PATHS.PROFILE_ROUTE);
  }

  navigate(link): void {
    this.router.navigate([link]);
  }

}
