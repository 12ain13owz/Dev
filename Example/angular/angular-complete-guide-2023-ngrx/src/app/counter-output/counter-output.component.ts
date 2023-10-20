import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { CounterService } from '../counter.service';
import { Store } from '@ngrx/store';
import { selectCount, selectDoubleCount } from '../store/counter.selectors';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.scss'],
})
export class CounterOutputComponent implements OnInit, OnDestroy {
  // counter = 0;
  // counterServiceSub?: Subscription;

  count$: Observable<number>;
  doubleCount$: Observable<number>;

  constructor(
    private counterService: CounterService,
    private store: Store<{ counter: number }>
  ) {
    this.count$ = this.store.select(selectCount);
    this.doubleCount$ = this.store.select(selectDoubleCount);
  }

  ngOnInit(): void {
    // this.counterServiceSub = this.counterService.counterChanged.subscribe(
    //   (newVal) => (this.counter = newVal)
    // );
  }

  ngOnDestroy(): void {
    // if (this.counterServiceSub) {
    //   this.counterServiceSub.unsubscribe();
    // }
  }
}
