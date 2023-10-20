import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
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
    this.getAccount().subscribe();
    this.socketService.setupSocketConnection();
  }

  getAccount() {
    return this.http
      .get<Account[]>(this.url)
      .pipe(
        tap((accounts: Account[]) => this.storeService.setAccount(accounts))
      );
  }

  // createAccount(account: Account) {
  //   return this.http
  //     .post(this.url, account)
  //     .pipe(map((response: any) => response.result))
  //     .subscribe((account: Account) => {
  //       this.storeService.createAccount(account);
  //       this.socketService.createAccount(account);
  //     });
  // }

  createAccount(account: Account) {
    return this.http.post(this.url, account).pipe(
      map((response: any) => response.result),
      tap((account: Account) => this.storeService.createAccount(account)),
      tap((account: Account) => this.socketService.createAccount(account))
    );
  }

  updateAccount(account: Account) {
    return this.http.put(this.url, account).pipe(
      map((response: any) => response.result),
      tap((account: Account) => this.storeService.updateAccount(account)),
      tap((account: Account) => this.socketService.updateAccount(account))
    );
  }

  deleteAccount(id: number) {
    return this.http.delete(`${this.url}/${id}`).pipe(
      map((response: any) => response.id),
      tap((id: number) => this.storeService.deleteAccount(id)),
      tap((id: number) => this.socketService.deleteAccount(id))
    );
  }
}
