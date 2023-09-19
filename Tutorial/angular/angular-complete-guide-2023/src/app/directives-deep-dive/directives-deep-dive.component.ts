import { Component } from '@angular/core';

@Component({
  selector: 'app-directives-deep-dive',
  templateUrl: './directives-deep-dive.component.html',
  styleUrls: ['./directives-deep-dive.component.scss'],
})
export class DirectivesDeepDiveComponent {
  // numbers: number[] = [1, 2, 3, 4, 5];
  oddNumbers = [1, 3, 5];
  evenNumbers = [2, 4];
  onlyOdd: boolean = false;
  value = 100;
}
