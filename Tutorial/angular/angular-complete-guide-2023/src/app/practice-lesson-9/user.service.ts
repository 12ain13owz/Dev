import { Injectable } from '@angular/core';
import { CounterService } from './counter.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  activeUser: string[] = ['Max', 'Anna'];
  inactiveUser: string[] = ['Chris', 'Manu'];

  constructor(private counterService: CounterService) {}

  onSetToActive(index: number) {
    this.activeUser.push(this.inactiveUser[index]);
    this.inactiveUser.splice(index, 1);
    this.counterService.incrementInActiveToActive();
  }

  onSetToInActive(index: number) {
    this.inactiveUser.push(this.activeUser[index]);
    this.activeUser.splice(index, 1);
    this.counterService.incrementActiveToInactive();
  }
}
