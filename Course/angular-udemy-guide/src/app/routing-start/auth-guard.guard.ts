import { Injectable, inject } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanActivateChildFn,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

// Old
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.authService.isAuthenticated().then((authenticated: boolean) => {
      if (authenticated) return true;
      else {
        this.router.navigate(['routing']);
        return false;
      }
    });
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.canActivate(route, state);
  }
}

// New
export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const authenticated = await authService.isAuthenticated();
  const url = state.url.split('/')[1];

  if (authenticated) return true;
  else {
    router.navigate([url]);
    return false;
  }
};

export const authGuardChild: CanActivateChildFn = (route, state) => {
  return authGuard(route, state);
};
