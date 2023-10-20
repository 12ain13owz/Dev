import { Component } from '@angular/core';

import { DefaultComponent } from './default/default.component';
import { SignalComponent } from './signal/signal.component';

@Component({
  selector: 'app-root',
  templateUrl: './signals.component.html',
  styleUrls: ['./signals.component.scss'],
  standalone: true,
  imports: [DefaultComponent, SignalComponent],
})
export class SignalsComponent {}
