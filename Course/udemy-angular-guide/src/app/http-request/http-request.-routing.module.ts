import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpRequestComponent } from './http-request.component';

const routes: Routes = [{ path: '', component: HttpRequestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HttpRequestRoutingModule {}
