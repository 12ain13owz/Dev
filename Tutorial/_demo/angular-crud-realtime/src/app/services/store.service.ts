import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Account } from './account.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  accountChanged = new Subject<Account[]>();
  private account: Account[] = [];
  constructor() {}

  setAccount(account: Account[]) {
    this.account = account;
    this.accountChanged.next(this.account.slice());
  }

  getAccount() {
    return this.account.slice();
  }

  addAccount(account: Account) {
    this.account.push(account);
    this.accountChanged.next(this.account.slice());
  }
}
