import { Component } from '@angular/core';

@Component({
  // selector: '[app-servers]',
  // selector: '.app-servers',
  // template: `
  //   <app-server></app-server>
  //   <app-server></app-server>
  //   <app-server></app-server>
  // `,
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.scss'],
})
export class ServersComponent {
  allowNewServer = false;
  serverCreationStatus = 'No server was created!';
  serverName: string = 'Test Server';
  serverCreate: boolean = false;
  servers = ['Testserver', 'Testserver 2'];

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  onCreateServer() {
    this.servers.push(this.serverName);
    this.serverCreate = true;
    this.serverCreationStatus =
      'Server was created! Name is ' + this.serverName;
  }

  onUpdateServerName(event: Event) {
    if (!(event instanceof InputEvent)) return;

    // const inputValue = event.target as HTMLInputElement; แบบที่ 1
    const inputValue = <HTMLInputElement>event.target; // แบบที่ 2
    this.serverName = inputValue.value;
  }
}
