import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'use-formgroup';
  form: FormGroup;

  // set "strictPropertyInitialization": false, in file tsconfig.json

  constructor(private fb: FormBuilder) {}

  createForm() {
    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
    });
  }
}
