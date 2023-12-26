import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUpForm } from '../../models/signup.model';
import { SIGN_UP_CONSTANTS } from './signup.constants';

import { AuthService } from '../../../shared/services/auth.service';
import { NotifierService } from '../../../shared/services/notifier.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  form: FormGroup<SignUpForm>;
  fb = inject(FormBuilder);

  patternPassword = SIGN_UP_CONSTANTS.patternPassword;
  validationMessage = SIGN_UP_CONSTANTS.validationMessage;

  router = inject(Router);
  route = inject(ActivatedRoute);
  authService = inject(AuthService);
  notifier = inject(NotifierService);

  constructor() {
    this.initForm();
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.authService.signup(this.form.getRawValue()).subscribe((data) => {
      console.log('Signup:', data);

      this.notifier.success('Success', 'Signup completed ');
      this.router.navigate(['../login'], { relativeTo: this.route });
    });
  }

  initForm(): void {
    this.patternPassword = '';

    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.pattern(this.patternPassword)],
      ],
    });
  }

  get name() {
    return this.form.controls['name'];
  }

  get email() {
    return this.form.controls['email'];
  }

  get password() {
    return this.form.controls['password'];
  }
}
