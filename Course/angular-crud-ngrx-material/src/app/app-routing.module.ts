import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssociatelistingComponent } from './components/associatelisting/associatelisting.component';
import { TestComponent } from './components/test/test.component';

const routes: Routes = [
  { path: '', component: AssociatelistingComponent },
  { path: 'test', component: TestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
