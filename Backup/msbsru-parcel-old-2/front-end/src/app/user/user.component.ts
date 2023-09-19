import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {}
  @ViewChild('sidenav') public sidenav: MatSidenav;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result) => result.matches));
  isRoute: string;
  prevRoute: string;

  onCloseSidenNav() {
    this.isHandset$.subscribe((data) => {
      if (!data) return;
      if (this.prevRoute != this.isRoute) this.prevRoute = this.isRoute;
      else return;

      this.sidenav.close();
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) this.isRoute = event.url;
    });
  }
}
