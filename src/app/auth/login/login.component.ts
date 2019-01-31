import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { ErrorMessageComponent } from './../../errorMessage/errorMessage.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss']
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
      (data: any) => this.router.navigate(['']),
    );
  }

}
