import { Component, inject } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Root, User } from './user.model';
import { AuthService } from '../../../shared/services/auth.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  router = inject(Router);
  authService = inject(AuthService);
  dashboardService = inject(DashboardService);
  user: User;

  ngOnInit(): void {
    this.dashboardService
      .getUser()
      .pipe(catchError((error) => throwError(() => error)))
      .subscribe({
        next: (result: Root) => {
          console.log('User:', result);

          this.authService.updateIsLoggedIn(true);
          this.user = result.user;
          this.authService;
        },
        error: (error) => {
          console.log('Token expire:', error);
          this.router.navigate(['auth/login']);
        },
      });

    // Test RefreshToken
    // let interval = setInterval(() => {
    //   this.dashboardService.refreshToken().subscribe((data: any) => {
    //     console.log(data);
    //   });
    // }, 1000 * 28);
  }
}
