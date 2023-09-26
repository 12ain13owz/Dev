import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Account } from 'src/app/services/account.model';
import { HttpService } from 'src/app/services/http.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-test-subject',
  templateUrl: './test-subject.component.html',
  styleUrls: ['./test-subject.component.scss'],
})
export class TestSubjectComponent {
  storeService = inject(StoreService);
  httpService = inject(HttpService);
  subscription = new Subscription();
  account: Account[];

  ngOnInit(): void {
    // this.subscription.add(
    //   this.storeService.accountChanged.subscribe(
    //     (account: Account[]) => (this.account = account)
    //   )
    // );
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

  onClick() {
    console.log(1);
    // this.account = this.storeService.getAccount();
    this.subscription.add(
      this.storeService.accountChanged.subscribe((account: Account[]) => {
        this.account = account;
        console.log(account);
      })
    );
  }
}
