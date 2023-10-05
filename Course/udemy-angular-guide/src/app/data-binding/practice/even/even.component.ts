import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-even',
  templateUrl: './even.component.html',
  styleUrls: ['./even.component.scss'],
})
export class EvenComponent {
  @Input() inputNumber: number;
  number: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (this.inputNumber % 2 != 0) return;
    this.number.push(this.inputNumber);
  }
}
