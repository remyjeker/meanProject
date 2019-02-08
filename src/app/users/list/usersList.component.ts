import { Component, OnInit } from '@angular/core';

import { UsersListService } from '../usersList.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './usersList.component.html',
  styleUrls: ['./usersList.component.scss'],
  providers: [ UsersListService ],
})
export class UsersListComponent implements OnInit {

  constructor(private usersListService: UsersListService) { }

  public loading: Boolean = true;
  public users: any = null;

  public ngOnInit() {
    this.fetchUsersList();
  }

  fetchUsersList() {
    this.usersListService.fetch().subscribe(data => {
      this.users = data.users;
    }, (error: any) => {
      console.log(error);
    }, () => {
      this.loading = false;
    });
  }

}
