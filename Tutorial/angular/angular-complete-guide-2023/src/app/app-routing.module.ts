import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './routes/users/users.component';
import { Servers2Component } from './routes/servers2/servers2.component';
import { UserComponent } from './routes/users/user/user.component';
import { EditServer2Component } from './routes/servers2/edit-server2/edit-server2.component';
import { Server2Component } from './routes/servers2/server2/server2.component';
import { AuthGuard } from './routes/auth-guard.service';
import { CanDeactivateGuard } from './routes/servers2/edit-server2/can-deactivate-guard.service';
import { ErrorPageComponent } from './routes/error-page/error-page.component';
import { Server2Resolver } from './routes/servers2/server2/server2-resolver.service';
import { ShoppingListComponent } from './shopping/shopping-list/shopping-list.component';
import { ObservableHomeComponent } from './observables/observable-home/observable-home.component';
import { ObservableUserComponent } from './observables/observable-user/observable-user.component';
import { NewModule } from './a-new-module/new.module';
import { AuthComponent } from './shopping/auth/auth.component';
import { RecipesModule } from './shopping/recipes/recipes.module';
import { ShoppingListModule } from './shopping/shopping-list/shopping-list.module';
import { AuthModule } from './shopping/auth/auth.module';
import { StandAloneModule } from './stand-alone/stand-alone.module';
import { SignalsComponent } from './signals/signals.component';
import { UnivarsalModule } from './univarsal/univarsal.module';

const routes: Routes = [
  // { path: '', component: HomeComponent },

  { path: 'new', loadChildren: () => NewModule },
  { path: 'stand', loadChildren: () => StandAloneModule },
  { path: 'signal', component: SignalsComponent },

  // { path: '', redirectTo: 'new', pathMatch: 'full' },
  // { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', loadChildren: () => RecipesModule },
  { path: 'shopping-list', loadChildren: () => ShoppingListModule },
  { path: 'auth', loadChildren: () => AuthModule },
  { path: 'universal', loadChildren: () => UnivarsalModule },

  {
    path: 'users',
    component: UsersComponent,
    children: [{ path: ':id/:name', component: UserComponent }],
  },
  {
    path: 'servers',
    component: Servers2Component,
    // canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: ':id',
        component: Server2Component,
        resolve: { server: Server2Resolver },
      },
      {
        path: ':id/edit',
        component: EditServer2Component,
        canDeactivate: [CanDeactivateGuard],
      },
    ],
  },
  // { path: 'not-found', component: PageNotFoundComponent },
  {
    path: 'not-found',
    component: ErrorPageComponent,
    data: { message: 'Page not found!' },
  },

  { path: 'obs/home', component: ObservableHomeComponent },
  { path: 'obs/user/:id', component: ObservableUserComponent },

  // { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  // imports: [RouterModule.forRoot(routes, { useHash: true })],
  imports: [
    RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    initialNavigation: 'enabledBlocking',
}),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
