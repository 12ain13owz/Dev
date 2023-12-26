import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main.routes';

import { MainComponent } from './main.component';
import { HeaderComponent } from './layout/header/header.component';
import { CoreModule } from '../core/core.module';
import { SharedModule } from './shared/shared.module';
import { AuthService } from './shared/services/auth.service';
import { NotifierService } from './shared/services/notifier.service';

@NgModule({
  declarations: [MainComponent, HeaderComponent],
  imports: [MainRoutingModule, CoreModule, SharedModule],
  providers: [AuthService, NotifierService],
})
export class MainModule {}
