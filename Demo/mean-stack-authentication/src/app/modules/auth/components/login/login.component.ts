import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { NotifierService } from '../../../shared/services/notifier.service';
import { LogInForm } from '../../models/login.model';
import { LOG_IN_CONSTANTS } from './login.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  form: FormGroup<LogInForm>;
  fb = inject(FormBuilder);

  patternPassword = LOG_IN_CONSTANTS.patternPassword;
  validationMessage = LOG_IN_CONSTANTS.validationMessage;

  router = inject(Router);

  authService = inject(AuthService);
  notifier = inject(NotifierService);

  constructor() {
    this.initForm();
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.authService.login(this.form.getRawValue()).subscribe((data) => {
      console.log('Login:', data);

      this.authService.updateIsLoggedIn(true);
      this.notifier.success('Success', 'Login completed');
      this.router.navigate(['dashboard/user']);
    });
  }

  initForm(): void {
    this.form = this.fb.group({
      email: ['dryst@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required]],
    });
  }

  get email() {
    return this.form.controls['email'];
  }

  get password() {
    return this.form.controls['password'];
  }
}
