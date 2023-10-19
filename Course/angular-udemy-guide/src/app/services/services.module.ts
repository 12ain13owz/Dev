import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesComponent } from './services.component';
import { AccountComponent } from './account/account.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { ServicesRoutingModule } from './services-routing.module';
import { AccountsService } from './accounts.service';
import { LoggingService } from './logging.service';
import { PracticeServicesComponent } from './practice-services/practice-services.component';
import { ActiveUsersComponent } from './practice-services/active-users/active-users.component';
import { InactiveUsersComponent } from './practice-services/inactive-users/inactive-users.component';

@NgModule({
  declarations: [ServicesComponent, AccountComponent, NewAccountComponent, PracticeServicesComponent, ActiveUsersComponent, InactiveUsersComponent],
  imports: [CommonModule, ServicesRoutingModule],
  providers: [AccountsService, LoggingService],
})
export class ServicesModule {}
