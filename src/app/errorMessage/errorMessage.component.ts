import { Component, OnInit } from '@angular/core';

import { AuthService } from './../auth/auth.service';
import { ErrorType } from './../app.component';

@Component({
  selector: 'app-error-message',
  templateUrl: './errorMessage.component.html',
  styleUrls: ['./errorMessage.component.scss']
})
export class ErrorMessageComponent implements OnInit {

  constructor(public authService: AuthService) { }

  error: ErrorType = null;

  ngOnInit() { }

  ngDoCheck() {
    this.error = this.authService.getCurrentError('login');
  }
}
