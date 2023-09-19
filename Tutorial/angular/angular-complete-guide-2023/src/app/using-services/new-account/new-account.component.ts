import { Component } from '@angular/core';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss'],
  // providers: [LoggingService],
})
export class NewAccountComponent {
  constructor(private accountsService: AccountService) {
    this.accountsService.statusUpdated.subscribe((status: string) => {
      alert('new Status: ' + status);
      // console.log(status);
    });
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountsService.addAccount({
      name: accountName,
      status: accountStatus,
    });
  }
}
