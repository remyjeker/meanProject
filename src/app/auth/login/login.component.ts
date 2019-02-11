import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../auth.service';
import { ErrorMessageComponent } from './../../errorMessage/errorMessage.component';

import * as PATHS from '../../app-routing/routes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss'],
  providers: [ RouterModule ],
})
export class LoginComponent extends ErrorMessageComponent implements OnInit  {

  constructor(public authService: AuthService, private router: Router) {
    super(authService);
  }

  email: string;
  password: string;

  ngOnInit() { }

  login(): void {
    this.authService.login(this.email, this.password).subscribe(
      (data: any) => this.router.navigate([PATHS.HOME_PATH]),
    );
  }

}
