import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { Account } from './account.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  // accountChanged = new Subject<Account[]>();
  accountChanged = new BehaviorSubject<Account[]>([]);
  // accountChanged = new ReplaySubject<Account[]>();
  private account: Account[] = [];
  constructor() {}

  setAccount(account: Account[]) {
    this.account = account;
    this.accountChanged.next(this.account.slice());
  }

  getAccounts() {
    return this.account.slice();
  }

  getAccount(id: number): Account {
    return this.account.find((account) => account.id === id);
  }

  addAccount(account: Account) {
    this.account.push(account);
    this.accountChanged.next(this.account.slice());
  }

  editAccount(account: Account) {
    const id = account.id;
    const index = this.account.findIndex((account) => account.id === id);

    if (index !== -1) {
      this.account[index] = account;
      this.accountChanged.next(this.account.slice());
    }
  }

  deleteAccount(id: number) {
    const index = this.account.findIndex((account) => account.id === +id);

    if (index !== -1) {
      this.account.splice(index, 1);
      this.accountChanged.next(this.account.slice());
    }
  }
}
