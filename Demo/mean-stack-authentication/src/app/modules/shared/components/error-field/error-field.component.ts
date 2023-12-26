import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroupDirective,
} from '@angular/forms';

@Component({
  selector: 'error-field',
  templateUrl: './error-field.component.html',
  styleUrl: './error-field.component.scss',
})
export class ErrorFieldComponent {
  @Input() control: FormControl | AbstractControl;
  @Input() errorMessage: Record<string, unknown>;

  constructor(public formDirective: FormGroupDirective) {}
}
