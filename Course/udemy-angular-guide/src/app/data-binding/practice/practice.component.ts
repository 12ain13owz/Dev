import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss'],
})
export class PracticeComponent {
  number: number;

  onIntervalChange(number: number) {
    this.number = number;
  }
}
