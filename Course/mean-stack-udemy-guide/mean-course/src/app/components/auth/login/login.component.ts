import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isLoading: boolean = false;

  authService = inject(AuthService);

  email: string = 'dryst@gmail.com';
  password: string = '123456';

  ngOnInit(): void {}

  onLogin(form: NgForm) {
    if (form.invalid) return;

    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password);
  }
}
