import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Account } from 'src/app/services/account.model';
import { HttpService } from 'src/app/services/http.service';
import { SocketIoService } from 'src/app/services/socket-io.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-list-account',
  templateUrl: './list-account.component.html',
  styleUrls: ['./list-account.component.scss'],
})
export class ListAccountComponent implements OnInit, OnDestroy {
  storeService = inject(StoreService);
  httpService = inject(HttpService);
  subscription = new Subscription();
  account: Account[];

  ngOnInit(): void {
    this.account = this.storeService.getAccount();
    this.subscription = this.storeService.accountChanged.subscribe(
      (account: Account[]) => (this.account = account)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
