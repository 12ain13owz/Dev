import { Injectable } from '@angular/core';
import { NotificationType, NotificationsService } from 'angular2-notifications';

@Injectable({
  providedIn: 'root',
})
export class NotifierService {
  constructor(private notification: NotificationsService) {}

  option = {
    timeOut: 3000,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true,
    animate: 'fromRight',
  };

  alert(title: string, message: string) {
    this.notification.alert(title, message, this.option);
  }

  error(title: string, message: string) {
    this.notification.error(title, message, this.option);
  }

  info(title: string, message: string) {
    this.notification.info(title, message, this.option);
  }

  warn(title: string, message: string) {
    this.notification.warn(title, message, this.option);
  }

  success(title: string, message: string) {
    this.notification.success(title, message, this.option);
  }
}
