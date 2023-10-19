import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selecCount, selecdoubleCount } from '../store/counter.selectors';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.scss'],
})
export class CounterOutputComponent {
  count$: Observable<number>;
  countDouble$: Observable<number>;

  constructor(private store: Store<{ counter: number }>) {
    this.count$ = this.store.select(selecCount);
    this.countDouble$ = this.store.select(selecdoubleCount);
    // this.count$.subscribe();
  }
}
