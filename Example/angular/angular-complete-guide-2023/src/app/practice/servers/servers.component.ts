import { Component } from '@angular/core';

@Component({
  selector: 'app-servers',
  // template: ` <app-server></app-server>
  //   <app-server></app-server>`,
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.scss'],
})
export class ServersComponent {
  allowNerServer: boolean = false;
  serverCreationStatus: string = 'No server was created!';
  serverName = 'Testserver';
  serverCreated = false;
  servers = ['Testserver', 'Testserver 2'];
  servers2 = [];

  constructor() {
    setTimeout(() => {
      this.allowNerServer = true;
    }, 2000);
  }

  ngOnInit(): void {}

  onCreateServer() {
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverCreationStatus =
      'Server was created! Name is ' + this.serverName;
  }

  onUpdateSserver(event: Event) {
    this.serverName = (<HTMLInputElement>event.target).value;
  }

  addServer() {}

  onAddServer() {
    this.servers2.push('Another Server');
  }

  onRemoveServer(id) {
    const position = id + 1;
    this.servers2.splice(position, 1);
  }
}
