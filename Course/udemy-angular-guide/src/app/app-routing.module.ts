import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainServerModule } from './server/main-server.module';
import { ProjectModule } from './project/project.module';

const routes: Routes = [
  { path: '', redirectTo: 'project', pathMatch: 'full' },

  { path: 'server', loadChildren: () => MainServerModule },
  { path: 'project', loadChildren: () => ProjectModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
