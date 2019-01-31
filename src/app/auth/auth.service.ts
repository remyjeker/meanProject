import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { TokenStorage } from './token.storage';
import { Observer } from 'rxjs';

import { ErrorType } from './../app.component';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private token: TokenStorage) {}

  public $userSource = new Subject<any>();
  public $errorSource = new Subject<any>();

  private NON_ASSESSABLE_VALUE: String = 'N-A';
  private ERASE_ERRORS_DELAY: Number = 5000;

  login(email: string, password: string): Observable <any> {
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

  register(fullname: string, email: string, password: string, repeatPassword: string): Observable <any> {
    return Observable.create(observer => {
      this.http.post('/api/auth/register', {
        fullname,
        email,
        password,
        repeatPassword
      }).subscribe(
        (data: any) => this.userLoginSuccess(observer, data),
        (error: any) => this.catchError(error),
      );
    });
  }

  userLoginSuccess(observer: Observer <any>, data: any): void {
    observer.next({user: data.user});
    this.setUser(data.user);
    this.token.saveToken(data.token);
    observer.complete();
  }

  catchError(catchedError: any): void {
    const genericMessage = catchedError.message;
    const isSimpleError = (typeof catchedError.error === 'string');

    let message: string;
    if (isSimpleError) message = catchedError.error;
    else message = catchedError.error.message;

    const errorDetails = {
      message: genericMessage || this.NON_ASSESSABLE_VALUE,
      details: message || this. NON_ASSESSABLE_VALUE,
      date: + new Date(),
    };

    this.setError(errorDetails);
  }

  getCurrentError(componentName: string): any {
    const authError = (<any>window).error || null;
    if (authError == null) return;

    const now = + new Date();
    const authErrorDate = authError.date;
    const diff = now - authErrorDate;
    const shouldEraseError = (diff >= this.ERASE_ERRORS_DELAY);

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
