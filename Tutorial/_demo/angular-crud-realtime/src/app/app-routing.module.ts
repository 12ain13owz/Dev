import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { ListAccountComponent } from './components/list-account/list-account.component';
import { TestSubjectComponent } from './components/test-subject/test-subject.component';

const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'prefix' },
  { path: 'register', component: RegisterComponent },
  { path: 'list', component: ListAccountComponent },
  { path: 'list/:id', component: ListAccountComponent },
  { path: 'test', component: TestSubjectComponent },
  // { path: '**', redirectTo: 'register' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
