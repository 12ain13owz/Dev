import { Injectable } from '@angular/core';

// @Injectable()
export class LoggingService {
  lastlog: string;

  constructor() {}

  printLog(message: string) {
    console.log('%c' + message, 'color: hsl(0deg,100%,80%)');
    console.log('%c' + this.lastlog, 'color: hwb(0deg,75%,0%)');
    this.lastlog = message;
  }
}
