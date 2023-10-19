import { Component, EventEmitter, Output } from '@angular/core';
import { LoggingService } from '../logging.service';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss'],
  // providers: [LoggingService],
})
export class NewAccountComponent {
  @Output() accountAdded = new EventEmitter<{ name: string; status: string }>();

  constructor(
    private logginService: LoggingService,
    private accountsServices: AccountsService
  ) {
    this.accountsServices.statusUpdated.subscribe((status: string) => {
      alert('New Status: ' + status);
    });
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountsServices.addAccount(accountName, accountStatus);
    // this.logginService.logStatusChang(accountStatus);
  }
}
