import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataBindingComponent } from './data-binding.component';
import { DatabindingRoutingModule } from './data-routing.module';
import { ServerElementComponent } from './server-element/server-element.component';
import { CockpitComponent } from './cockpit/cockpit.component';
import { PracticeComponent } from './practice/practice.component';
import { GameControlComponent } from './practice/game-control/game-control.component';
import { OddComponent } from './practice/odd/odd.component';
import { EvenComponent } from './practice/even/even.component';

@NgModule({
  declarations: [
    DataBindingComponent,
    ServerElementComponent,
    CockpitComponent,
    PracticeComponent,
    GameControlComponent,
    OddComponent,
    EvenComponent,
  ],
  imports: [CommonModule, DatabindingRoutingModule, FormsModule],
})
export class DataBindingModule {}
