import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CounterService {
  private counter = 0;
  counterChanged = new Subject<number>();

  constructor() {}

  increment() {
    this.counter++;
    this.counterChanged.next(this.counter);
  }

  decrement() {
    this.counter--;
    this.counterChanged.next(this.counter);
  }
}
