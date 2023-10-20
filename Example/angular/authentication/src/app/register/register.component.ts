import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router
  ) {}

  registerform = this.builder.group({
    id: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.minLength(5)])
    ),
    name: ['', Validators.required],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$'
        ),
      ],
    ],
    email: ['', [Validators.required, Validators.email]],
    gender: ['male'],
    role: [''],
    isactive: [false, Validators.required],
  });

  ProceedRegisterion() {
    if (this.registerform.valid) {
      this.auth.ProceedRegister(this.registerform.value).subscribe((res) => {
        this.toastr.success(
          'please contace admin for enable access',
          'Registered Successfully'
        );
        this.router.navigate(['login']);
      });
    } else {
      this.toastr.warning('Please enter valid data');
    }
  }
}
