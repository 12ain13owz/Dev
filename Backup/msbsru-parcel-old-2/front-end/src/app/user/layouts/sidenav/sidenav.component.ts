import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../shared/service/token.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  role: number;
  isExpanded: Expended[] = [{ url: 'setting', status: false }];

  constructor(public token: TokenService, private router: Router) {}

  ngOnInit(): void {
    this.role = this.token.getUser().role;
    this.onExpanded();
  }

  onExpanded(): void {
    const url = this.router.url.split('/');
    this.isExpanded.forEach((data) =>
      url.find((value) => {
        if (data.url == value) data.status = true;
      })
    );
  }
}

export interface Expended {
  url: string;
  status: boolean;
}
