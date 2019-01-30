import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';

import { AuthService } from '../auth.service';
import { Error } from '../../app.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  error: Error = null;

  ngOnInit() {}

  ngDoCheck() {
    this.error = this.authService.getCurrentError('registration');
  }

  passwordsMatchValidator(control: FormControl): ValidationErrors {
    const password = control.root.get('password');

    return (password && control.value !== password.value)
      ? { passwordMatch: true }
      : null;
  }

  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    fullname: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    repeatPassword: new FormControl('', [Validators.required, this.passwordsMatchValidator])
  });

  get fullname(): any { return this.userForm.get('fullname'); }
  get email(): any { return this.userForm.get('email'); }
  get password(): any { return this.userForm.get('password'); }
  get repeatPassword(): any { return this.userForm.get('repeatPassword'); }

  register() {

    if (!this.userForm.valid) {
      return;
    }

    const {
      fullname,
      email,
      password,
      repeatPassword
    } = this.userForm.getRawValue();

    this.authService.register(fullname, email, password, repeatPassword).subscribe(data => {
      this.router.navigate(['']);
    });
  }

}
