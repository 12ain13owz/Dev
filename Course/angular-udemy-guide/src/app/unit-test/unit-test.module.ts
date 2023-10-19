import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitTestComponent } from './unit-test.component';
import { UnitTestRoutingModule } from './unit-test-routing.module';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [UnitTestComponent, UserComponent],
  imports: [CommonModule, UnitTestRoutingModule],
})
export class UnitTestModule {}
