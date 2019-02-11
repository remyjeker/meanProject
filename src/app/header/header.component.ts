import { Component, OnInit, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import * as PATHS from '../app-routing/routes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [ RouterModule ],
})
export class HeaderComponent implements OnInit {

  @Input() user: any = {};

  constructor(private authService: AuthService, private router: Router) { }

  public PATHS: any = PATHS;

  ngOnInit() { }

  logout(): void {
    this.authService.signOut();
    this.navigate(PATHS.LOGIN_PATH);
  }

  isNotProfilePage(): Boolean {
    return !(this.router.url === PATHS.PROFILE_PATH);
  }

  navigate(link): void {
    this.router.navigate([link]);
  }

}
