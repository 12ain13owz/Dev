import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.scss'],
})
export class GameControlComponent {
  @Output() count = new EventEmitter<number>();
  intervalCount: ReturnType<typeof setInterval>;
  intervalRunning: boolean = false;
  lastNumber: number = 0;

  onStart() {
    if (this.intervalRunning) return;
    this.intervalRunning = true;
    this.intervalCount = setInterval(() => {
      this.count.emit(this.lastNumber);
      this.lastNumber++;
    }, 1000);
  }

  onStop() {
    this.intervalRunning = false;
    clearInterval(this.intervalCount);
  }
}
