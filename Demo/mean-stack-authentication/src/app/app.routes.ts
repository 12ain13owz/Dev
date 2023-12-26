import { Routes } from '@angular/router';
import { MainModule } from './modules/main.module';

export const routes: Routes = [{ path: '', loadChildren: () => MainModule }];
