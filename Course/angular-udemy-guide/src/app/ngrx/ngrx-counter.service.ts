import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class NgrxCounterService {
  counter = 0;
  counterChanged = new Subject<number>();

  increment() {
    this.counter++;
    this.counterChanged.next(this.counter);
  }

  decrement() {
    this.counter--;
    this.counterChanged.next(this.counter);
  }
}
