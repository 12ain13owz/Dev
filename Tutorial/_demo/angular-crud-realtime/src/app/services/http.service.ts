import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { Account } from './account.model';
import { StoreService } from './store.service';
import { SocketIoService } from './socket-io.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private url: string = 'http://localhost:3000/api/account';

  constructor(
    private http: HttpClient,
    private storeService: StoreService,
    private socketService: SocketIoService
  ) {
    this.getAccount();
    this.socketService.setupSocketConnection();
  }

  getAccount() {
    return this.http
      .get<Account[]>(this.url)
      .pipe(
        tap((accounts: Account[]) => this.storeService.setAccount(accounts))
      )
      .subscribe();
  }

  addAccount(account: Account) {
    return this.http
      .post(this.url, account)
      .pipe(map((response: any) => response.result))
      .subscribe((account: Account) => {
        this.storeService.addAccount(account);
        this.socketService.createAccount(account);
      });
  }

  editAccount(account: Account) {
    return this.http
      .put(this.url, account)
      .pipe(map((response: any) => response.result))
      .subscribe((account: Account) => {
        this.storeService.editAccount(account);
        this.socketService.updateAccount(account);
      });
  }

  deleteAccount(id: number) {
    return this.http
      .delete(`${this.url}/${id}`)
      .pipe(map((response: any) => response.id))
      .subscribe((id: number) => {
        this.storeService.deleteAccount(id);
        this.socketService.deleteAccount(id);
      });
  }
}
