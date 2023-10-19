import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AuthComponent],
  imports: [AuthRoutingModule, FormsModule, SharedModule],
})
export class AuthModule {}
