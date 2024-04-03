import { Component, viewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { OnInit } from '@angular/core';
import { AvatarComponent } from '../core/components/avatar/avatar.component';
import { FORM } from '../core/form.constant';

interface FormModel
  extends FormGroup<{
    avatar: FormControl<File>;
    email: FormControl<string>;
    fullName: FormGroup<{
      firstName: FormControl<string>;
      lastName: FormControl<string>;
    }>;
    phone: FormControl<string>;
    gender: FormControl<string>;
    address: FormGroup<{
      addressLine1: FormControl<string>;
      addressLine2: FormControl<string>;
      subDistrict: FormControl<string>;
      district: FormControl<string>;
      province: FormControl<string>;
      protalCode: FormControl<string>;
    }>;
    test: FormControl<{ id: number; value: string }>;
  }> {}

@Component({
  selector: 'app-form-control',
  standalone: true,
  imports: [ReactiveFormsModule, CoreModule, AvatarComponent],
  templateUrl: './form-control.component.html',
  styleUrl: './form-control.component.scss',
})
export class FormControlComponent implements OnInit {
  private avatarComponent = viewChild(AvatarComponent);
  private formDirective = viewChild(FormGroupDirective);

  tests = [
    { id: 1, value: 'test1' },
    { id: 2, value: 'test2' },
    { id: 3, value: 'test3' },
    { id: 4, value: 'test4' },
  ];

  form: FormModel;
  validationField = FORM.validationField;

  ngOnInit(): void {
    this.initForm();

    this.email.patchValue('test@example.com');
    this.test.patchValue({
      id: 1,
      value: 'test1',
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    console.log(this.form.value);
  }

  onReset() {
    this.formDirective().resetForm();
    this.avatarComponent().resetForm();
  }

  onSelectImage(file: File) {
    this.avatar.setValue(file);
  }

  get avatar() {
    return this.form.controls['avatar'];
  }

  get email() {
    return this.form.controls['email'];
  }

  get firstName() {
    return this.form.controls['fullName'].controls['firstName'];
  }

  get lastName() {
    return this.form.controls['fullName'].controls['lastName'];
  }

  get age() {
    return this.form.controls['age'];
  }

  get phone() {
    return this.form.controls['phone'];
  }

  get gender() {
    return this.form.controls['gender'];
  }

  get addressLine1() {
    return this.form.controls['address'].controls['addressLine1'];
  }

  get addressLine2() {
    return this.form.controls['address'].controls['addressLine2'];
  }

  get subDistrict() {
    return this.form.controls['address'].controls['subDistrict'];
  }

  get district() {
    return this.form.controls['address'].controls['district'];
  }

  get province() {
    return this.form.controls['address'].controls['province'];
  }

  get protalCode() {
    return this.form.controls['address'].controls['protalCode'];
  }

  get test() {
    return this.form.controls['test'];
  }

  private initForm() {
    this.form = new FormGroup({
      avatar: new FormControl<File>(null),
      email: new FormControl<string>(null, {
        validators: [Validators.required, Validators.email],
      }),
      fullName: new FormGroup({
        firstName: new FormControl(null, [Validators.required]),
        lastName: new FormControl<string>(null, [Validators.required]),
      }),
      phone: new FormControl<string>(null, [Validators.required]),
      gender: new FormControl<string>(null, [Validators.required]),
      address: new FormGroup({
        addressLine1: new FormControl<string>(null, [Validators.required]),
        addressLine2: new FormControl<string>(null),
        subDistrict: new FormControl<string>(null, [Validators.required]),
        district: new FormControl<string>(null, [Validators.required]),
        province: new FormControl<string>(null, [Validators.required]),
        protalCode: new FormControl<string>(null, [Validators.required]),
      }),
      test: new FormControl<{ id: number; value: string }>(null, [
        Validators.required,
      ]),
    });
  }
}
