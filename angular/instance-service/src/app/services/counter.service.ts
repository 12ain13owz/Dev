import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CounterService {
  private counter: number = 0;
  private counter$ = new BehaviorSubject<number>(this.counter);

  constructor() {}

  counterListener() {
    return this.counter$.asObservable();
  }

  counterIncrement(): void {
    this.counter++;
    this.counter$.next(this.counter);
  }

  counterDecrement(): void {
    this.counter--;
    this.counter$.next(this.counter);
  }
}
