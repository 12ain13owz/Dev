import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmproblemComponent } from './confirmproblem/confirmproblem.component';
import { DetailproblemComponent } from './detailproblem/detailproblem.component';
import { FixproblemComponent } from './fixproblem/fixproblem.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogproblemComponent } from './logproblem/logproblem.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ProblemComponent } from './problem/problem.component';
import { ReportComponent } from './report/report.component';
import { TransferproblemComponent } from './transferproblem/transferproblem.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'problem', component: ProblemComponent },
  { path: 'cproblem', component: ConfirmproblemComponent },
  { path: 'dproblem/:id', component: DetailproblemComponent },
  { path: 'lproblem', component: LogproblemComponent },
  { path: 'tproblem', component: TransferproblemComponent },
  { path: 'fproblem', component: FixproblemComponent },
  { path: 'report', component: ReportComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
