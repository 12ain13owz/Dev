import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/service/auth.service';
import { TokenService } from '../../shared/service/token.service';
import { FormService } from '../../shared/service/form.service';
import { finalize } from 'rxjs';
import { UserModel } from '../../shared/model/account.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isButtonLogin: boolean = false;
  isProgressBar: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private fs: FormService,
    private token: TokenService,
    private auth: AuthService
  ) {
    if (this.token.getToken()) this.router.navigate(['scan']);
  }

  ngOnInit(): void {
    this.createFormLogin();
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.isButtonLogin = true;
    this.isProgressBar = true;
    this.auth
      .onLogin(this.form.value)
      .pipe(
        finalize(() => {
          this.isButtonLogin = false;
          this.isProgressBar = false;
        })
      )
      .subscribe({
        next: (data: UserModel) => {
          this.token.saveUser(data);
          this.token.saveToken(data.accessToken);
          this.fs.showNotify('success', 'เข้าสู่ระบบสำเร็จ');
          this.router.navigate(['scan']);
        },
        error: (error) => this.fs.showNotify('error', error.error),
      });
  }

  createFormLogin() {
    const usernamePattern = '^[a-z0-9_-]{4,15}$';

    this.form = this.fb.group({
      username: [
        '',
        [Validators.required, Validators.pattern(usernamePattern)],
      ],
      password: ['', Validators.required],
      remember: [false],
    });
  }

  get username() {
    return this.form.controls['username'];
  }

  get password() {
    return this.form.controls['password'];
  }

  get remember() {
    return this.form.controls['remember'];
  }
}
