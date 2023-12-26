import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { NotifierService } from '../../shared/services/notifier.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private subscriptions: Subscription;

  isLoggedIn: boolean = false;

  router = inject(Router);
  authService = inject(AuthService);
  notifier = inject(NotifierService);

  ngOnInit(): void {
    this.subscriptions = this.authService
      .getIsLoggedIn()
      .subscribe((isLoggedIn: boolean) => {
        this.isLoggedIn = isLoggedIn;
      });
  }

  ngOnDestroy(): void {
    if (this.subscriptions) this.subscriptions.unsubscribe();
  }

  logout() {
    this.authService.logout().subscribe((data) => {
      console.log('Logout:', data);

      this.authService.updateIsLoggedIn(false);
      this.notifier.info('Success', 'Logout completed');
      this.router.navigate(['auth/login']);
    });
  }
}
