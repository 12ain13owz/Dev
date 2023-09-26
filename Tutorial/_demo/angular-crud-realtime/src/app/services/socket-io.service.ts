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
    if (!this.socket) return;

    this.socket.on('account:create', (account: Account) => {
      this.storeService.createAccount(account);
    });

    this.socket.on('account:update', (account: Account) => {
      this.storeService.updateAccount(account);
    });

    this.socket.on('account:delete', (id: number) => {
      this.storeService.deleteAccount(id);
    });
  }

  createAccount(account: Account) {
    if (!this.socket) return;
    this.socket.emit('account:create', account);
  }

  updateAccount(account: Account) {
    if (!this.socket) return;
    this.socket.emit('account:update', account);
  }

  deleteAccount(id: number) {
    if (!this.socket) return;
    this.socket.emit('account:delete', id);
  }

  onDisconnect() {
    // if (this.socket) this.socket.disconnect();
  }
}
