import { Routes } from '@angular/router';
import { FormControlComponent } from './form-control/form-control.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { FormModuleComponent } from './form-module/form-module.component';

export const routes: Routes = [
  { path: 'control', component: FormControlComponent },
  { path: 'builder', component: FormBuilderComponent },
  { path: 'module', component: FormModuleComponent },
];
