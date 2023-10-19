import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-udemy-guide';
  name: string = 'Dryst';

  // ตัวอย่างกำหนด Strictly Typed ของ Reactive form ใน angular
  // Ex.1
  form = this.fb.group({
    email: [
      '',
      {
        validators: [Validators.required, Validators.email],
      },
    ],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  // Ex.2
  formTest: FormGroup<Testform>;

  // Ex.3
  formTest2: FormGroup<TestForm2>;

  constructor(private fb: FormBuilder) {
    this.formTest = this.fb.group({
      username: new FormControl('', {
        validators: [Validators.required],
      }),
      email: this.fb.control('', {
        validators: [Validators.required, Validators.email],
      }),
    });

    this.formTest2 = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      gender: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.form.value.email;
    this.formTest.controls['username'];
    this.formTest2.controls['firstname'];
    this.formTest2.patchValue({
      firstname: '',
    });
  }
}

export interface Testform {
  username: FormControl<string> | null;
  email: FormControl<string | null>;
}

export interface TestForm2 {
  firstname: FormControl<string> | null;
  lastname: FormControl<string> | null;
  gender: FormControl<string> | null;
}
