import { Routes } from '@angular/router';
import { TableResponsiveComponent } from './table-responsive/table-responsive.component';
import { Table2ResponsiveComponent } from './table2-responsive/table2-responsive.component';

export const routes: Routes = [
  { path: 'table', component: TableResponsiveComponent },
  { path: 'table2', component: Table2ResponsiveComponent },
];
