import { Component } from '@angular/core';

@Component({
  selector: 'app-parctice-directives',
  templateUrl: './parctice-directives.component.html',
  styleUrls: ['./parctice-directives.component.scss'],
})
export class ParcticeDirectivesComponent {
  isSecret: boolean = false;
  logs = [];

  onToggleDetails() {
    // this.logs.push(this.logs.length + 1);
    this.logs.push(new Date());
  }
}
