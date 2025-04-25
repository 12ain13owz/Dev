import { Component, ViewChild } from '@angular/core';
import { FormGroupDirective, FormsModule, NgForm } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { AvatarComponent } from '../core/components/avatar/avatar.component';
import { FORM } from '../core/form.constant';

@Component({
  selector: 'app-form-module',
  standalone: true,
  imports: [FormsModule, CoreModule, AvatarComponent],
  templateUrl: './form-module.component.html',
  styleUrl: './form-module.component.scss',
  providers: [FormGroupDirective],
})
export class FormModuleComponent {
  @ViewChild('profileForm') profileForm!: NgForm;

  profile = {
    avatar: '' as any,
    email: '',
    fullName: {
      firstName: '',
      lastName: '',
    },
    phone: '',
    gender: '',
    address: {
      addressLine1: '',
      addressLine2: '',
      subDistrict: '',
      district: '',
      province: '',
      postalCode: '',
    },
    test: null,
  };

  tests = [
    { id: 1, value: 'test1' },
    { id: 2, value: 'test2' },
    { id: 3, value: 'test3' },
    { id: 4, value: 'test4' },
  ];
  validationField = FORM.validationField;

  onSubmit() {
    console.log(this.profile);
  }

  onReset(): void {
    this.profile = {
      avatar: '',
      email: '',
      fullName: {
        firstName: '',
        lastName: '',
      },
      phone: '',
      gender: '',
      address: {
        addressLine1: '',
        addressLine2: '',
        subDistrict: '',
        district: '',
        province: '',
        postalCode: '',
      },
      test: null,
    };

    this.profileForm.resetForm();
  }

  onSelectImage(file: File) {
    this.profile.avatar = file;
  }
}
