import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  activeToInactiveCounter: number = 0;
  inactiveToActiveCounter: number = 0;

  constructor() {}

  incrementActiveToInactive() {
    this.activeToInactiveCounter++;
    console.log('Active ' + this.activeToInactiveCounter);
  }

  incrementInActiveToActive() {
    this.inactiveToActiveCounter++;
    console.log('InActive ' + this.inactiveToActiveCounter);
  }
}
