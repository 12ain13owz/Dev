import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainServerModule } from './server/main-server.module';

const routes: Routes = [
  { path: '', redirectTo: 'server', pathMatch: 'full' },

  { path: 'server', loadChildren: () => MainServerModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
