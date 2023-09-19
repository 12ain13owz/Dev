import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { StoreService } from './store.service';
import { Account } from './account.model';

@Injectable({
  providedIn: 'root',
})
export class SocketIoService {
  private url: string = 'http://localhost:3000';
  private socket: any;
  constructor(private storeService: StoreService) {}

  setupSocketConnection() {
    this.socket = io(this.url, {
      reconnection: false,
    });

    this.socket.on('addData', (account: Account) => {
      this.storeService.addAccount(account);
    });
  }

  onDisconnect() {
    // if (this.socket) this.socket.disconnect();
  }
}
