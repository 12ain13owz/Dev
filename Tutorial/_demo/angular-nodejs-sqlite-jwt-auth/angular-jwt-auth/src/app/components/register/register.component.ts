import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: Register = {
    username: null,
    email: null,
    password: null,
  };

  isSuccessful: boolean = false;
  isSignUpFailed: boolean = false;
  errorMessage: string = '';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const { username, email, password } = this.form;
    this.auth.register(username, email, password).subscribe({
      next: (data) => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      },
    });
  }
}

export interface Register {
  username: string | null;
  email: string | null;
  password: string | null;
}
