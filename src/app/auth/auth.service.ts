import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { TokenStorage } from './token.storage';
import { TooltipComponent } from '@angular/material';
import { Observer } from 'rxjs';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private token: TokenStorage) {}

  public $userSource = new Subject<any>();
  public $errorSource = new Subject<any>();

  private NON_ASSESSABLE_VALUE = 'N-A';

  login(email: string, password: string): Observable <any> {
    return Observable.create(observer => {
      this.http.post('/api/auth/login', {
        email,
        password
      }).subscribe((data: any) => {
          observer.next({user: data.user});
          this.setUser(data.user);
          this.token.saveToken(data.token);
          observer.complete();
      });
    });
  }

  register(fullname: string, email: string, password: string, repeatPassword: string): Observable <any> {
    return Observable.create(observer => {
      this.http.post('/api/auth/register', {
        fullname,
        email,
        password,
        repeatPassword
      }).subscribe((data: any) => {
        this.registerUserSuccess(observer, data);
      }, (error: any) => {
        const genericMessage = error.message;
        const { error: { message } } = error;
        const errorDetails = {
          message: genericMessage || this.NON_ASSESSABLE_VALUE,
          details: message || this. NON_ASSESSABLE_VALUE,
          timestamp: + new Date(),
        };
        this.setError(errorDetails);
      });
    });
  }

  registerUserSuccess(observer: Observer <any>, data: any) {
    observer.next({user: data.user});
    this.setUser(data.user);
    this.token.saveToken(data.token);
    observer.complete();
  }

  setUser(user): void {
    if (user) {
      user.isAdmin = (user.roles.indexOf('admin') > -1);
    }

    this.$userSource.next(user);
    (<any>window).user = user;
  }

  setError(error): void {
    this.$errorSource.next(error);
    (<any>window).error = error;
  }

  getUser(): Observable<any> {
    return this.$userSource.asObservable();
  }

  me(): Observable<any> {
    return Observable.create(observer => {
      const tokenVal = this.token.getToken();

      if (!tokenVal) {
        return  observer.complete();
      }

      this.http.get('/api/auth/me').subscribe((data: any) => {
        observer.next({user: data.user});
        this.setUser(data.user);
        observer.complete();
      });
    });
  }

  signOut(): void {
    this.token.signOut();
    this.setUser(null);
    delete (<any>window).user;
  }
}
