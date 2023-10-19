import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormHandlingComponent } from './form-handling.component';
import { FormTemplateComponent } from './form-template/form-template.component';
import { PracticeTemplateComponent } from './practice-template/practice-template.component';
import { PracticeReactiveComponent } from './practice-reactive/practice-reactive.component';
import { FormReactiveComponent } from './form-reactive/form-reactive.component';

const routes: Routes = [
  {
    path: '',
    component: FormHandlingComponent,
    children: [
      { path: 'template', component: FormTemplateComponent },
      { path: 'practice-template', component: PracticeTemplateComponent },
      { path: 'reactive', component: FormReactiveComponent },
      { path: 'parctive-reactive', component: PracticeReactiveComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormRoutingModule {}
