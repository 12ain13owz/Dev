import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainServerComponent } from './main-server.component';

const routes: Routes = [{ path: '', component: MainServerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainServerRoutingModule {}
