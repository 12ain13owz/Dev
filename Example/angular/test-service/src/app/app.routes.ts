import { Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { TableComponent } from './components/table/table.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TreeComponent } from './components/tree/tree.component';
import { DragDropComponent } from './components/drag-drop/drag-drop.component';

export const routes: Routes = [
  { path: 'form', component: FormComponent },
  { path: 'table', component: TableComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tree', component: TreeComponent },
  { path: 'drop', component: DragDropComponent },
];
