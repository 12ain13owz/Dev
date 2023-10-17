import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthRespnseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  email: string = 'test@example.com';
  password: string = '123456';

  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    const email = form.value.email;
    const password = form.value.password;
    let auth$: Observable<AuthRespnseData>;
    this.isLoading = true;
    this.error = '';

    if (this.isLoginMode) auth$ = this.authService.signin(email, password);
    else auth$ = this.authService.signup(email, password);

    auth$.subscribe({
      next: (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['../recipes'], { relativeTo: this.route });
      },
      error: (errMessage) => {
        console.log(errMessage);
        this.error = errMessage;
        this.isLoading = false;
      },
      complete: () => console.log('%cComplete', 'color:#f9e64f'),
    });
    form.resetForm();
  }
}
