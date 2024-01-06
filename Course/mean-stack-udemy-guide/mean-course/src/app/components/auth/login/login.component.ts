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

  ngOnInit(): void {
    // this.authService.getAuthStatusListener().subscribe((isAuthenticated) => {
    //   console.log('Header', 3);
    // });
  }

  onLogin(form: NgForm) {
    if (form.invalid) return;

    this.authService.login(form.value.email, form.value.password);
  }
}
