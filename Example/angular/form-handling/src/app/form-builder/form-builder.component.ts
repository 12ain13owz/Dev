import { Component, inject, viewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { AvatarComponent } from '../core/components/avatar/avatar.component';
import { FORM } from '../core/form.constant';

@Component({
  selector: 'app-form-builder',
  standalone: true,
  imports: [ReactiveFormsModule, CoreModule, AvatarComponent],
  templateUrl: './form-builder.component.html',
  styleUrl: './form-builder.component.scss',
})
export class FormBuilderComponent {
  private avatarComponent = viewChild(AvatarComponent);
  private formDirective = viewChild(FormGroupDirective);

  private formBuilder = inject(FormBuilder);
  form = this.initForm();

  tests = [
    { id: 1, value: 'test1' },
    { id: 2, value: 'test2' },
    { id: 3, value: 'test3' },
    { id: 4, value: 'test4' },
  ];
  validationField = FORM.validationField;

  ngOnInit(): void {
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
    return this.formBuilder.nonNullable.group({
      avatar: this.formBuilder.control<File>(null),
      email: ['', [Validators.required, Validators.email]],
      fullName: this.formBuilder.nonNullable.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
      }),
      phone: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      address: this.formBuilder.nonNullable.group({
        addressLine1: ['', [Validators.required]],
        addressLine2: [''],
        subDistrict: ['', [Validators.required]],
        district: ['', [Validators.required]],
        province: ['', [Validators.required]],
        protalCode: ['', [Validators.required]],
      }),
      test: [{ id: null, value: null }, [Validators.required]],
    });
  }
}
