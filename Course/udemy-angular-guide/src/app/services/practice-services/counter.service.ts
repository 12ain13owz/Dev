import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  activeToInactiveCounter = 0;
  inactiveToActiveCounter = 0;

  incrementCounterActiveToInactive() {
    this.activeToInactiveCounter++;
    console.log(
      '%cActive to Inactive: ' + this.activeToInactiveCounter,
      'color:deeppink'
    );
  }

  incrementCounterInActiveToactive() {
    this.inactiveToActiveCounter++;
    console.log(
      '%cInactive to Active: ' + this.inactiveToActiveCounter,
      'color: yellow'
    );
  }
}
