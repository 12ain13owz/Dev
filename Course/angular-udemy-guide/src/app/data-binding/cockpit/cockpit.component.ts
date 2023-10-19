import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.scss'],
})
export class CockpitComponent {
  @Output() serverCreated = new EventEmitter<{
    type: string;
    name: string;
    content: string;
  }>();
  @Output('bpCreated') bluePrintCreated = new EventEmitter<{
    type: string;
    name: string;
    content: string;
  }>();

  newServerName: string = '';
  newServerContent: string = '';

  @ViewChild('serverContentInput', { static: true })
  serverContentInput: ElementRef;

  onAddServer(nameInput: HTMLInputElement) {
    this.serverCreated.emit({
      type: 'server',
      name: nameInput.value,
      content: this.serverContentInput.nativeElement.value,
    });
  }

  onAddBlueprint() {
    this.bluePrintCreated.emit({
      type: 'blueprint',
      name: this.newServerName,
      content: this.newServerContent,
    });
  }
}
