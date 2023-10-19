import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ProjectComponent } from './project.component';
import { ProjectRoutingModule } from './project-routing.module';
import { HeaderComponent } from './header/header.component';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [ProjectComponent, HeaderComponent],
  imports: [ProjectRoutingModule, HttpClientModule, CoreModule, SharedModule],
})
export class ProjectModule {}
