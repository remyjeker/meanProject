import { Component, OnInit, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

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
  providers: [ RouterLink ]
})
export class SideMenuComponent implements OnInit {

  @Input() user: any = {};

  constructor(private authService: AuthService, private router: Router) { }

  public isLoggedIn: Boolean = false;
  public sideMenuItems: Array<SideMenuItems> = [].concat(authItems);

  ngOnInit() {
    this.refreshMenu();
  }

  refreshMenu() {
    this.authService.getUser().subscribe((data) => {
      if (!data) this.isLoggedIn = false;
      if (data != null) this.isLoggedIn = true;

      this.sideMenuItems = (this.isLoggedIn)
        ? [].concat(items).concat(optItems)
        : [].concat(authItems);

      this.sideMenuItems = this.sideMenuItems
        .filter(item => !item.masked);

      // TODO : fix for execute drawer
      document.getElementById('ok').click();
      document.getElementById('ok').click();
    });
  }
}
