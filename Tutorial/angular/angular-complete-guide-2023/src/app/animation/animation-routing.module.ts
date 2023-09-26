import { RouterModule, Routes } from '@angular/router';
import { AnimationComponent } from './animation.component';
import { NgModule } from '@angular/core';

const routes: Routes = [{ path: '', component: AnimationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimationRoutingModule {}
