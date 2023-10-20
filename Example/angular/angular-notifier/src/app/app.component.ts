import { Component } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-notifier';

  constructor(private notifier: NotifierService) {}

  showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

  hideAllNotifications(): void {
    this.notifier.hideAll();
  }

  hideOldestNotification(): void {
    this.notifier.hideOldest();
  }

  hideNewestNotification(): void {
    this.notifier.hideNewest();
  }

  showSpecificNotification(type: string, message: string, id: string): void {
    this.notifier.show({ id, message, type });
  }

  hideSpecificNotification(id: string): void {
    this.notifier.hide(id);
  }
}
