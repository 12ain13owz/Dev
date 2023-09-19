import { Component } from '@angular/core';
import { DetailComponent } from './detail/detail.component';

@Component({
  imports: [DetailComponent],
  standalone: true,
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {}
