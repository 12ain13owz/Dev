import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map, take, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  authService.autoLogin();

  return authService.user.pipe(
    take(1),
    map((user) => !!user),
    tap((isAuth) => !isAuth && router.navigate(['project/auth']))
  );
};
