import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {
  FormGroup,
  FormGroupDirective,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { MaterialModule } from './material/material.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  @ViewChild('formDirect', { static: false })
  private formDirect: FormGroupDirective;

  form: FormGroup;
  fb = new FormBuilder();

  form2: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['test@t.com', [Validators.required, Validators.email]],
      firstname: ['1032', [Validators.required]],
      lastname: ['123', [Validators.required]],
    });

    this.form2 = this.fb.group({
      email2: ['test@t.com', [Validators.required, Validators.email]],
      firstname2: ['1032', [Validators.required]],
      lastname2: ['123', [Validators.required]],
    });
  }

  onSubmit_1() {
    if (this.form.invalid) return;
    this.formDirect.resetForm();
  }

  onSubmit_2() {
    if (this.form2.invalid) return;

    this.form2.reset();
    Object.keys(this.form2.controls).forEach((controlName) => {
      const control = this.form2.get(controlName);
      control.setErrors(null);
    });
  }

  onSubmit_3(form: NgForm) {
    if (form.invalid) return;
    form.resetForm();
  }
}
