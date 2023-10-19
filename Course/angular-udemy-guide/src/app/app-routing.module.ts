import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ProjectModule } from './project/project.module';

import { MainServerModule } from './server/main-server.module';
import { DataBindingModule } from './data-binding/data-binding.module';
import { DirectiveModule } from './directive/directive.module';
import { ServicesModule } from './services/services.module';
import { RoutingStartModule } from './routing-start/routing-start.module';
import { ObservablesModule } from './observables/observables.module';
import { FormHandlingModule } from './form-handling/form-handling.module';
import { PipesModule } from './pipes/pipes.module';
import { HttpRequestModule } from './http-request/http-request.module';
import { StandAloneModule } from './stand-alone/stand-alone.module';
import { SignalModule } from './signal/signal.module';
import { NgrxModule } from './ngrx/ngrx.module';
import { AnimationsModule } from './animations/animations.module';

const routes: Routes = [
  { path: '', redirectTo: 'project', pathMatch: 'full' },

  { path: 'project', loadChildren: () => ProjectModule },
  { path: 'server', loadChildren: () => MainServerModule },
  { path: 'binding', loadChildren: () => DataBindingModule },
  { path: 'directive', loadChildren: () => DirectiveModule },
  { path: 'services', loadChildren: () => ServicesModule },
  { path: 'routing', loadChildren: () => RoutingStartModule },
  { path: 'observables', loadChildren: () => ObservablesModule },
  { path: 'form', loadChildren: () => FormHandlingModule },
  { path: 'pipes', loadChildren: () => PipesModule },
  { path: 'http', loadChildren: () => HttpRequestModule },
  { path: 'alone', loadChildren: () => StandAloneModule },
  { path: 'signal', loadChildren: () => SignalModule },
  { path: 'ngrx', loadChildren: () => NgrxModule },
  { path: 'animations', loadChildren: () => AnimationsModule },

  { path: '**', redirectTo: 'project', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
