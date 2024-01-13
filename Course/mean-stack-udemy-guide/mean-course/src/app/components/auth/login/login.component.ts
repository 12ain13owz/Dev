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

<<<<<<< HEAD
  authService = inject(AuthService);

  email: string = 'dryst@gmail.com';
  password: string = '123456';

  ngOnInit(): void {}
=======
  email: string = 'dryst@gmail.com';
  password: string = '123456';

  authService = inject(AuthService);

  ngOnInit(): void {
    this.subscription = this.authService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
>>>>>>> parent of 28fb870 (Update course mean stack)

  onLogin(form: NgForm) {
    if (form.invalid) return;

    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password);
  }
}
