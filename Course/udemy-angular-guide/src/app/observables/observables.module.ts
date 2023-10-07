import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObservablesComponent } from './observables.component';
import { ObservablesRoutingModule } from './observables-routing.module';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [ObservablesComponent, HomeComponent, UserComponent],
  imports: [CommonModule, ObservablesRoutingModule],
})
export class ObservablesModule {}
