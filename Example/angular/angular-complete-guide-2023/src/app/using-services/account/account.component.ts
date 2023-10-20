import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  // providers: [LoggingService],
})
export class AccountComponent {
  @Input() account: { name: string; status: string };
  @Input() id: number;

  constructor(private accountsService: AccountService) {}

  onSetTo(status: string) {
    this.accountsService.updateStatus({ id: this.id, status: status });
    this.accountsService.statusUpdated.emit(status);
  }
}
