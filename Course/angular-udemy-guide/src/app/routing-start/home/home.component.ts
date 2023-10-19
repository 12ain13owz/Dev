import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  onLoadServers(id: number) {
    // this.router.navigate(['routing/servers']);
    // this.router.navigate(['servers'], { relativeTo: this.route }); Best Practice

    // add parameters
    this.router.navigate(['servers', id, 'edit'], {
      relativeTo: this.route,
      queryParams: { allowEdit: '1' },
      fragment: 'loading',
    });
  }

  onLogin() {
    this.authService.login();
  }

  onLogout() {
    this.authService.logout();
  }
}
