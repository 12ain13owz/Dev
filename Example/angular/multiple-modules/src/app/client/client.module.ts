import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client.routing';
import { SharedModule } from '../shared/shared.module';
import { NavbarClientComponent } from './layouts/navbar-client/navbar-client.component';
import { ClientComponent } from './client.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';

@NgModule({
  declarations: [
    NavbarClientComponent,
    ClientComponent,
    HomeComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule
  ]
})

export class ClientModule { }