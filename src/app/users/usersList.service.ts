import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UsersListService {

  constructor(
    private http: HttpClient,
  ) { }

  public $usersSource = new Subject<any>();

  fetch(): Observable<any> {
    return Observable.create(observer => {
      this.http.get('/api/users').subscribe((data: any) => {
        observer.next({users: data});
        this.setUsers(data);
        observer.complete();
      });
    });
  }

  setUsers(users: any): void {
    this.$usersSource.next(users);
    (<any>window).users = users;
  }
}
