import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormService } from './service/form.service';
import { TokenService } from './service/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivateChild {
  constructor(
    private router: Router,
    private token: TokenService,
    private jwtHelper: JwtHelperService,
    private fs: FormService
  ) {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.verifyLogin();
  }

  verifyLogin() {
    const token = this.token.getToken();

    if (!token) {
      this.token.onLogout();
      this.fs.showNotify('warning', 'Error! ไม่พบ Token กรุณาล็อกอิน');
      this.router.navigate(['login']);
      return false;
    }

    if (this.jwtHelper.isTokenExpired()) {
      this.token.onLogout();
      this.fs.showNotify('warning', 'Error! Token หมดอายุกรุณาล็อกอิน');
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }
}
