import { Component } from '@angular/core';

@Component({
  selector: 'app-first-pipes',
  templateUrl: './first-pipes.component.html',
  styleUrls: ['./first-pipes.component.scss'],
})
export class FirstPipesComponent {
  appStatus = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('stable');
    }, 1900);
  });
  servers: Server[] = [
    {
      instanceType: 'medium',
      name: 'Procution Server',
      status: 'stable',
      started: new Date(15, 1, 2017),
    },

    {
      instanceType: 'large',
      name: 'User Database',
      status: 'stable',
      started: new Date(15, 1, 2017),
    },

    {
      instanceType: 'small',
      name: 'Development Server',
      status: 'offline',
      started: new Date(15, 1, 2017),
    },

    {
      instanceType: 'small',
      name: 'Testing Environment Server',
      status: 'stable',
      started: new Date(15, 1, 2017),
    },
  ];

  filteredStatus: string;

  getStatusClasses(server: Server) {
    return {
      'list-group-item-success': server.status === 'stable',
      'list-group-item-warning': server.status === 'offline',
      'list-group-item-danger': server.status === 'critical',
    };
  }

  onAddServer() {
    this.servers.push({
      instanceType: 'small',
      name: 'New Server',
      status: 'stable',
      started: new Date(15, 1, 2017),
    });
  }
}

export interface Server {
  instanceType: string;
  name: string;
  status: string;
  started: Date;
}
