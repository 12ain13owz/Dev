import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.scss'],
})
export class GameControlComponent {
  @Output() intervalEvent: EventEmitter<number> = new EventEmitter();
  interval: any;
  i: number = 0;

  constructor() {}

  onStart() {
    this.onStop();

    this.interval = setInterval(() => {
      this.i++;
      this.intervalEvent.emit(this.i);
    }, 1000);
  }

  onStop() {
    clearInterval(this.interval);
  }
}
