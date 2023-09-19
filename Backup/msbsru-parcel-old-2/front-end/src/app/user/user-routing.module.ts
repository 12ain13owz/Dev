import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './shared/auth.guard';
import { AdminGuard } from './shared/admin.guard';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ItemComponent } from './components/item/item.component';
import { ScanComponent } from './components/scan/scan.component';
import { LoginComponent } from './pages/login/login.component';
import { UserComponent } from './user.component';
import { LogComponent } from './components/log/log.component';
import { AccountComponent } from './components/setting/components/account/account.component';
import { CategoryComponent } from './components/setting/components/category/category.component';
import { StatusComponent } from './components/setting/components/status/status.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: UserComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'scan', component: ScanComponent },
      { path: 'item', component: ItemComponent },
      { path: 'search', component: SearchComponent },
      { path: 'log', component: LogComponent },
      {
        path: 'setting',
        canActivateChild: [AdminGuard],
        children: [
          { path: '', redirectTo: 'account', pathMatch: 'full' },
          { path: 'account', component: AccountComponent },
          { path: 'category', component: CategoryComponent },
          { path: 'status', component: StatusComponent },
        ],
      },
    ],
  },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
