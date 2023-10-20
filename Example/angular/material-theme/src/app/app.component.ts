import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { map } from 'rxjs';
import { Observable } from 'rxjs';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  3;
  @ViewChild('sidenav') sidenav: MatSidenav;
  title = 'material-theme';

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result) => result.matches));
  isRoute: string;
  prevRoute: string;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {}

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
