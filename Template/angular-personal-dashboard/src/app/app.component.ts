import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routeSlideAnimation } from './app.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeSlideAnimation],
})
export class AppComponent {
  prepareRoute(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRouteData['tab'] : '';
  }
}
