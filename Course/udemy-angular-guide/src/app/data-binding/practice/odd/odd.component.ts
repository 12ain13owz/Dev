import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-odd',
  templateUrl: './odd.component.html',
  styleUrls: ['./odd.component.scss'],
})
export class OddComponent {
  @Input() inputNumber: number;
  number: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (this.inputNumber % 2 == 0) return;
    this.number.push(this.inputNumber);
  }
}
