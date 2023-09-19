import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StandAloneComponent } from './stand-alone.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SharedModule } from './shared/shared.module';
import { StandRoutingModule } from './stand-routing.module';
import { DetailComponent } from './welcome/detail/detail.component';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [CommonModule, StandRoutingModule, StandAloneComponent],
})
export class StandAloneModule {}
