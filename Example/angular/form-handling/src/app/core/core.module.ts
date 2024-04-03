import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorFieldComponent } from './components/error-field/error-field.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';

export const matInputFormat: Provider = {
  provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
  useValue: { appearance: 'outline' },
};

@NgModule({
  imports: [ErrorFieldComponent, NgxMaskDirective, NgxMaskPipe],
  exports: [
    CommonModule,
    ErrorFieldComponent,
    MatToolbarModule,
    MatSlideToggleModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatChipsModule,
    MatDividerModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [matInputFormat, provideNgxMask()],
})
export class CoreModule {}
