import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth.routes';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../shared/shared.module';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AuthComponent, LoginComponent, SignupComponent],
  imports: [AuthRoutingModule, CoreModule, SharedModule, ReactiveFormsModule],
})
export class AuthModule {}
