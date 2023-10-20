import { Component } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private readonly notifier: NotifierService
  ) { }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

	/**
	 * Hide oldest notification
	 */
  public hideOldestNotification(): void {
    this.notifier.hideOldest();
  }

	/**
	 * Hide newest notification
	 */
  public hideNewestNotification(): void {
    this.notifier.hideNewest();
  }

	/**
	 * Hide all notifications at once
	 */
  public hideAllNotifications(): void {
    this.notifier.hideAll();
  }

	/**
	 * Show a specific notification (with a custom notification ID)
	 *
	 * @param {string} type    Notification type
	 * @param {string} message Notification message
	 * @param {string} id      Notification ID
	 */
  public showSpecificNotification(type: string, message: string, id: string): void {
    this.notifier.show({
      id,
      message,
      type
    });
  }

	/**
	 * Hide a specific notification (by a given notification ID)
	 *
	 * @param {string} id Notification ID
	 */
  public hideSpecificNotification(id: string): void {
    this.notifier.hide(id);
  }



}
