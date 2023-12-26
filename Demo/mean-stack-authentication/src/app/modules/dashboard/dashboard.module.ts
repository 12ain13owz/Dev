import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { UserComponent } from './components/user/user.component';
import { DashboardRoutingModule } from './dashboard.routes';
import { CoreModule } from '../../core/core.module';
import { DashboardService } from './services/dashboard.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [DashboardComponent, UserComponent],
  imports: [CoreModule, SharedModule, DashboardRoutingModule],
  providers: [DashboardService],
})
export class DashboardModule {}
