import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { TokenStorage } from './token.storage';
import { Observer } from 'rxjs';
import { formatDate } from '../helpers';
import * as PATHS from '../app-routing/routes';

import {
  NON_ASSESSABLE_VALUE,
  ERASE_ERRORS_DELAY,
} from '../constants';

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
    private token: TokenStorage,
    private router: Router,
  ) { }

  public $userSource = new Subject<any>();
  public $errorSource = new Subject<any>();

  login(email: string, password: string): Observable<any> {
    return Observable.create(observer => {
      this.http.post('/api/auth/login', {
        email,
        password
      }).subscribe(
        (data: any) => this.userLoginSuccess(observer, data),
        (error: any) => this.catchError(error),
      );
    });
  }

  register(fullname: string, email: string, password: string, repeatPassword: string): Observable<any> {
    return Observable.create(observer => {
      this.http.post('/api/auth/register', {
        fullname,
        email,
        password,
        repeatPassword
      }).subscribe(
        (data: any) => this.userLoginSuccess(observer, data, true),
        (error: any) => this.catchError(error),
      );
    });
  }

  userLoginSuccess(observer: Observer<any>, data: any, userProfileRedirection?: boolean): void {
    observer.next({ user: data.user });
    this.setUser(data.user);
    this.token.saveToken(data.token);
    observer.complete();

    if (userProfileRedirection) {
      this.router.navigate([PATHS.PROFILE_PATH]);
    }
  }

  catchError(catchedError: any): void {
    const genericMessage = catchedError.message;
    const isSimpleError = (typeof catchedError.error === 'string');

    let message: string;
    if (isSimpleError) message = catchedError.error;
    else message = catchedError.error.message;

    const errorDetails = {
      message: genericMessage || NON_ASSESSABLE_VALUE,
      details: message || NON_ASSESSABLE_VALUE,
      date: + new Date(),
      displayedDate: formatDate(),
    };

    this.setError(errorDetails);
  }

  getCurrentError(): any {
    const authError = (<any>window).error || null;
    if (authError == null) return;

    const now = + new Date();
    const authErrorDate = authError.date;
    const diff = now - authErrorDate;
    const shouldEraseError = (diff >= ERASE_ERRORS_DELAY);

    if (!shouldEraseError) return authError;

    (<any>window).error = null;
    return null;
  }

  setUser(user: any): void {
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
        return observer.complete();
      }

      this.http.get('/api/auth/me').subscribe((data: any) => {
        observer.next({ user: data.user });
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
