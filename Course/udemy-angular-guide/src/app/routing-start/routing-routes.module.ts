import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutingStartComponent } from './routing-start.component';
import { HomeComponent } from './home/home.component';
import { ServersComponent } from './servers/servers.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard, authGuard, authGuardChild } from './auth-guard.guard';
import { canDeactivateGuard } from './servers/edit-server/can-deactivate-guard.guard';
import { ErrorPageComponent } from './error-page/error-page.component';
import { serverResolver } from './servers/server/server-resolver.resolver';

const routes: Routes = [
  {
    path: '',
    component: RoutingStartComponent,
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'users',
        component: UsersComponent,
        children: [{ path: ':id/:name', component: UserComponent }],
      },

      {
        path: 'servers',
        component: ServersComponent,
        // canActivate: [authGuard],
        canActivateChild: [authGuardChild],
        children: [
          {
            path: ':id',
            component: ServerComponent,
            resolve: { server: serverResolver },
          },
          {
            path: ':id/edit',
            component: EditServerComponent,
            canDeactivate: [canDeactivateGuard],
          },
        ],
      },

      // { path: 'not-found', component: PageNotFoundComponent },
      {
        path: 'not-found',
        component: ErrorPageComponent,
        data: { message: 'Page not found!' },
      },
    ],
  },
  { path: '**', redirectTo: 'not-found', pathMatch: 'prefix' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutingRoutesModule {}
