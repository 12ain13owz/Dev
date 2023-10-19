import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormHandlingComponent } from './form-handling.component';
import { FormRoutingModule } from './form-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PracticeTemplateComponent } from './practice-template/practice-template.component';
import { FormTemplateComponent } from './form-template/form-template.component';
import { FormReactiveComponent } from './form-reactive/form-reactive.component';
import { PracticeReactiveComponent } from './practice-reactive/practice-reactive.component';

@NgModule({
  declarations: [
    FormHandlingComponent,
    PracticeTemplateComponent,
    FormTemplateComponent,
    FormReactiveComponent,
    PracticeReactiveComponent,
  ],
  imports: [CommonModule, FormRoutingModule, FormsModule, ReactiveFormsModule],
})
export class FormHandlingModule {}
