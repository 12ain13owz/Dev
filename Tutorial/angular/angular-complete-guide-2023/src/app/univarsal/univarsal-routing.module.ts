import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { UnivarsalComponent } from './univarsal.component';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  {
    path: '',
    component: UnivarsalComponent,
    children: [
      { path: 'about', component: AboutComponent },
      { path: 'welcome', component: WelcomeComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnivarsalRoutingModule {}
