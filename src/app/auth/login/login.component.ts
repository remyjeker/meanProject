import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { Error } from '../../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  email: string;
  password: string;
  error: Error = null;

  ngOnInit() {
  }

  ngDoCheck() {
    const loginError = (<any>window).error || null;

    if (loginError != null) {
      const now = + new Date();
      const loginErrorDate = loginError.timestamp;
      const diff = now - loginErrorDate;
      const shouldEraseError = (diff >= 2000);

      if (shouldEraseError) {
        (<any>window).error = null;
        this.error = null;
      } else {
        this.error = loginError;
      }
    }
  }

  login(): void {
    this.authService.login(this.email, this.password).subscribe(
      (data: any) => this.router.navigate(['']),
    );
  }

}
