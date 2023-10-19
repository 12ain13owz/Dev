import { Component } from '@angular/core';

@Component({
  selector: 'app-another-server',
  templateUrl: './another-server.component.html',
  styleUrls: ['./another-server.component.scss'],
})
export class AnotherServerComponent {
  servers = [];

  onAddServer() {
    this.servers.push('Another Server');
  }

  onRemoveServer(id: number, position: number = id + 1) {
    this.servers.splice(position, 1);
  }
}
