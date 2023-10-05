import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainServerComponent } from './main-server.component';
import { ServerComponent } from './server/server.component';
import { ServersComponent } from './servers/servers.component';
import { ServerRoutingModule } from './server-routing.module';
import { PracticeServerComponent } from './practice-server/practice-server.component';
import { WarningAlertComponent } from './practice-server/warning-alert/warning-alert.component';
import { SuccessAlertComponent } from './practice-server/success-alert/success-alert.component';
import { FormsModule } from '@angular/forms';
import { ParcticeDatabindingComponent } from './parctice-databinding/parctice-databinding.component';
import { ParcticeDirectivesComponent } from './parctice-directives/parctice-directives.component';

@NgModule({
  declarations: [
    MainServerComponent,
    ServerComponent,
    ServersComponent,
    PracticeServerComponent,
    WarningAlertComponent,
    SuccessAlertComponent,
    ParcticeDatabindingComponent,
    ParcticeDirectivesComponent,
  ],
  imports: [CommonModule, ServerRoutingModule, FormsModule],
})
export class MainServerModule {}
