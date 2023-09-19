import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserModel } from './model/account.model';
import { FormService } from './service/form.service';
import { TokenService } from './service/token.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivateChild {
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
    return this.verifyAdmin();
  }

  verifyAdmin() {
    const user: UserModel = this.token.getUser();
    if (user.role !== 0) {
      this.fs.showNotify('error', 'Error! ไม่ได้รับอนุญาติ');
      this.router.navigate(['scan']);
      return false;
    }

    return true;
  }
}
