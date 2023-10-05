import { Component } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.scss'],
})
export class DataBindingComponent {
  serverElements = [
    {
      type: 'server',
      name: 'Testserver',
      content: 'Just a test!',
    },
    // {
    //   type: 'blueprint',
    //   name: 'Testserver2',
    //   content: 'Just a test2!',
    // },
  ];

  onAddServer(serverData: { type: string; name: string; content: string }) {
    this.serverElements.push({
      type: serverData.type,
      name: serverData.name,
      content: serverData.content,
    });
  }

  onAddBlueprint(blueprintData: {
    type: string;
    name: string;
    content: string;
  }) {
    this.serverElements.push({
      type: blueprintData.type,
      name: blueprintData.name,
      content: blueprintData.content,
    });
  }

  onChangeFirst() {
    this.serverElements[0].name = 'Changed!';
  }

  onDestroyFirst() {
    this.serverElements.splice(0, 1);
  }
}
