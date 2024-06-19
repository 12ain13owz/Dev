import { Routes } from '@angular/router';
import { FormControlComponent } from './form-control/form-control.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';

export const routes: Routes = [
  { path: 'control', component: FormControlComponent },
  { path: 'builder', component: FormBuilderComponent },
];
