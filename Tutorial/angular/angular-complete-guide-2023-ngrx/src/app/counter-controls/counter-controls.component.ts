import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { CounterService } from '../counter.service';
import { increment, decrement } from '../store/counter.action';

@Component({
  selector: 'app-counter-controls',
  templateUrl: './counter-controls.component.html',
  styleUrls: ['./counter-controls.component.scss'],
})
export class CounterControlsComponent {
  constructor(private counterService: CounterService, private store: Store) {}

  increment() {
    // this.counterService.increment();
    // this.store.dispatch(new IncrementAction(2));
    this.store.dispatch(increment({ value: 2 }));
  }

  decrement() {
    // this.counterService.decrement();
    this.store.dispatch(decrement({ value: 2 }));
  }
}
