import { Component, OnInit, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import {
  SideMenuItems,
  items,
  authItems,
  optItems,
} from './sideMenuItems';

@Component({
  selector: 'app-side-bar',
  templateUrl: './sideMenu.component.html',
  styleUrls: ['./sideMenu.component.scss'],
  providers: [ RouterModule ],
})
export class SideMenuComponent implements OnInit {

  @Input() user: any = {};

  constructor(private authService: AuthService, private router: Router) { }

  public currentViewTitle: string;
  public userIsLoggedIn: Boolean = false;
  public sideMenuItems: Array<SideMenuItems> = [].concat(authItems);

  ngOnInit() {
    this.setRouterWatcher();
    this.refreshMenu();
  }

  setRouterWatcher() {
    this.router.events.subscribe((event) => {
      if ('urlAfterRedirects' in event) {
        const { urlAfterRedirects } = event;
        const allRoutes = [].concat(items).concat(optItems).concat(authItems);
        const matchs = allRoutes.filter((item) => {
          return item.path === urlAfterRedirects;
        });

        if (matchs.length) {
          const currentRoute = matchs[0];
          const currentTitle = currentRoute.title;
          this.currentViewTitle = currentTitle;
        } else {
          this.currentViewTitle = 'Page title (undefined)';
        }
      }
    });
  }

  refreshMenu() {
    this.authService.getUser().subscribe((data) => {
      if (!data) this.userIsLoggedIn = false;
      if (data != null) this.userIsLoggedIn = true;

      this.sideMenuItems = (this.userIsLoggedIn)
        ? [].concat(items).concat(optItems)
        : [].concat(authItems);

      this.sideMenuItems = this.sideMenuItems
        .filter(item => !item.masked);

      this.refreshLayout();
    });
  }

  refreshLayout() {
    const sideMenuToggle = document.getElementById('sideMenu-toggle');
    sideMenuToggle.click();
    sideMenuToggle.click();
  }
}
