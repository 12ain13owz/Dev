import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainServerModule } from './server/main-server.module';
import { ProjectModule } from './project/project.module';
import { DataBindingModule } from './data-binding/data-binding.module';

const routes: Routes = [
  { path: '', redirectTo: 'project', pathMatch: 'full' },

  { path: 'project', loadChildren: () => ProjectModule },
  { path: 'server', loadChildren: () => MainServerModule },
  { path: 'binding', loadChildren: () => DataBindingModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
