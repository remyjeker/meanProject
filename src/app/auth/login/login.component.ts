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
    this.error = this.authService.getCurrentError('login');
  }

  login(): void {
    this.authService.login(this.email, this.password).subscribe(
      (data: any) => this.router.navigate(['']),
    );
  }

}
