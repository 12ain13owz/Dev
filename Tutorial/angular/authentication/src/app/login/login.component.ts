import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  userdata: any;

  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router
  ) {
    sessionStorage.clear();
  }

  loginform = this.builder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  ProceedLogin() {
    if (this.loginform.valid) {
      this.auth.GetbyCode(this.loginform.value.username).subscribe((res) => {
        this.userdata = res;
        console.log(this.userdata);

        if (this.userdata.password === this.loginform.value.password) {
          if (this.userdata.isactive) {
            sessionStorage.setItem('username', this.userdata.id);
            sessionStorage.setItem('userrole', this.userdata.role);
            this.router.navigate(['']);
          } else {
            this.toastr.error('Please contace admin.', 'In Active User');
          }
        } else {
          this.toastr.error('Invalid credentials');
        }
      });

      // this.auth.ProceedRegister(this.loginform.value).subscribe((res) => {
      //   this.toastr.success(
      //     'please contace admin for enable access',
      //     'Registered Successfully'
      //   );
      //   this.router.navigate(['login']);
      // });
    } else {
      this.toastr.warning('Please enter valid data');
    }
  }
}
