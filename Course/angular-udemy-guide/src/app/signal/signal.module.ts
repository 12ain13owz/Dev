import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignalComponent } from './signal.component';
import { SignalRoutingModule } from './signal-routing.module';
import { DefaultComponent } from './default/default.component';
import { SignalsComponent } from './signals/signals.component';

@NgModule({
  declarations: [SignalComponent, DefaultComponent, SignalsComponent],
  imports: [CommonModule, SignalRoutingModule],
})
export class SignalModule {}
