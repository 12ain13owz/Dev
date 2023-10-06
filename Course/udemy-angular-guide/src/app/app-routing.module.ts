import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainServerModule } from './server/main-server.module';
import { ProjectModule } from './project/project.module';
import { DataBindingModule } from './data-binding/data-binding.module';
import { DirectiveModule } from './directive/directive.module';

const routes: Routes = [
  { path: '', redirectTo: 'project', pathMatch: 'full' },

  { path: 'project', loadChildren: () => ProjectModule },
  { path: 'server', loadChildren: () => MainServerModule },
  { path: 'binding', loadChildren: () => DataBindingModule },
  { path: 'directive', loadChildren: () => DirectiveModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
