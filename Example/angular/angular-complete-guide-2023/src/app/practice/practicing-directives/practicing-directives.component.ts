import { Component } from '@angular/core';

@Component({
  selector: 'app-practicing-directives',
  templateUrl: './practicing-directives.component.html',
  styleUrls: ['./practicing-directives.component.scss'],
})
export class PracticingDirectivesComponent {
  displaySecret: boolean = false;

  logNumber: number[] = [];
  displayLog: boolean = false;

  showSecret() {
    this.displaySecret = true;
    this.displayLog = true;
    this.logNumber.push(this.logNumber.length + 1);
  }
}
