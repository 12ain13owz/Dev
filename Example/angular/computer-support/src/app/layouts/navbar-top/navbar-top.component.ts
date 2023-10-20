import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MockDataService } from 'src/app/services/mock.data.service';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.scss'],
})
export class NavbarTopComponent implements OnInit {
  constructor(
    public mockData: MockDataService,
    public navs: NavbarService,
    private router: Router
  ) {}

  items: MenuItem[] = [];
  value: number = 0;

  ngOnInit(): void {
    this.mockData.UserID;

    this.items = [
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-power-off',
        command: () => this.onLogout(),
      },
    ];
  }

  onLogout() {
    this.navs.hide();
    this.router.navigate(['login']);
  }

  onLog() {
    this.router.navigate(['lproblem']);
  }
}
