import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map, take, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const store: Store<fromApp.AppState> = inject(Store);

  // Rxjs
  // return authService.user.pipe(
  //   take(1),
  //   map((user) => {
  //     const isAuth = !!user;
  //     if (isAuth) return true;
  //     return router.createUrlTree(['/auth']);
  //   })
  //   // tap((isAuth) => {
  //   //   if (!isAuth) router.navigate(['/auth']);
  //   // })
  // );

  // Ngrx
  return store.select('auth2').pipe(
    take(1),
    map((authState) => authState.user),
    map((user) => {
      const isAuth = !!user;
      if (isAuth) return true;
      return router.createUrlTree(['/auth']);
    })
  );
};
