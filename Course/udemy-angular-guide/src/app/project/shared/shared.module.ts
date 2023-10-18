import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './dropdown.directive';
import { LoadingComponent } from './loading/loading.component';
import { AlertComponent } from './alert/alert.component';
import { PlaceholderDirective } from './placeholder.directive';
import { DataStorageService } from './data-storage.service';

@NgModule({
  declarations: [
    DropdownDirective,
    LoadingComponent,
    AlertComponent,
    PlaceholderDirective,
  ],
  imports: [CommonModule],
  exports: [
    CommonModule,
    LoadingComponent,
    AlertComponent,
    DropdownDirective,
    PlaceholderDirective,
  ],
  providers: [DataStorageService],
})
export class SharedModule {}
