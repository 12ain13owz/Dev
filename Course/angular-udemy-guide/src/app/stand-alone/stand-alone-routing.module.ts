import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StandAloneComponent } from './stand-alone.component';
import { AboutComponent } from './about/about.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { DASHBOARD_ROUTES } from './dashboard/dashboard.routes';
// import { DashboardModule } from './dashboard/dashboard.module';

const routes: Routes = [
  {
    path: '',
    component: StandAloneComponent,
    children: [
      { path: '', component: WelcomeComponent },

      // { path: 'about', component: AboutComponent },
      { path: 'about', loadComponent: () => AboutComponent }, // lazy loading components

      // { path: 'dashboard', loadChildren: () => DashboardModule },
      { path: 'dashboard', loadChildren: () => DASHBOARD_ROUTES },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StandAloneRoutingModule {}
