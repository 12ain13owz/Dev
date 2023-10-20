import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin.routing';
import { SharedModule } from '../shared/shared.module';
import { NavbarAdminComponent } from './layouts/navbar-admin/navbar-admin.component';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SettingComponent } from './components/setting/setting.component';

@NgModule({
  declarations: [
    NavbarAdminComponent,
    AdminComponent,
    DashboardComponent,
    SettingComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})

export class AdminModule { }