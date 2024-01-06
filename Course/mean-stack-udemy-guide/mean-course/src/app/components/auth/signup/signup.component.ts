import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  isLoading: boolean = false;

  authService = inject(AuthService);

  onSingup(form: NgForm) {
    if (form.invalid) return;
    this.authService.createUser(form.value.email, form.value.password);
  }
}
