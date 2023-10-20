import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StandAloneComponent } from './stand-alone.component';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { TodayComponent } from './dashboard/today/today.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: StandAloneComponent,
    children: [
      { path: 'home', component: WelcomeComponent },
      {
        path: 'about',
        // component: AboutComponent

        // Stand alone only
        loadComponent: () =>
          import('./about/about.component').then((mod) => mod.AboutComponent),
      },

      // {
      //   path: 'dashboard',
      //   loadChildren: () =>
      //     import('./dashboard/dashboard-routing.module').then(
      //       (mod) => mod.DashboardRoutingModule
      //     ),
      // },

      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/routes').then((mod) => mod.DASHBOARD_RUTES),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StandRoutingModule {}
