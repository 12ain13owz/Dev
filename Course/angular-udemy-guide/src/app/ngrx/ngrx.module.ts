import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgrxComponent } from './ngrx.component';
import { NgrxRoutingModule } from './ngrx-routing.module';
import { CounterOutputComponent } from './counter-output/counter-output.component';
import { CounterControlsComponent } from './counter-controls/counter-controls.component';
import { NgrxCounterService } from './ngrx-counter.service';

@NgModule({
  declarations: [
    NgrxComponent,
    CounterOutputComponent,
    CounterControlsComponent,
  ],
  imports: [CommonModule, NgrxRoutingModule],
  providers: [NgrxCounterService],
})
export class NgrxModule {}
