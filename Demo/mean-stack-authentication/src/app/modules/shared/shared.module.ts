import { NgModule } from '@angular/core';
import { ErrorFieldComponent } from './components/error-field/error-field.component';
import { ValidationPipe } from './components/error-field/validation.pipe';
import { SimpleNotificationsModule } from 'angular2-notifications';

@NgModule({
  declarations: [ErrorFieldComponent, ValidationPipe],
  imports: [SimpleNotificationsModule.forRoot()],
  exports: [ErrorFieldComponent, SimpleNotificationsModule],
  providers: [ValidationPipe],
})
export class SharedModule {}
