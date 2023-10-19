import { Component, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.scss'],
})
export class FormTemplateComponent {
  @ViewChild('f') signupForm: NgForm;
  defaultQuestion: string = 'teacher';
  answer: string = '';
  genders: string[] = ['male', 'female'];
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: '',
  };

  suggestUserName() {
    const suggestedName = 'Superuser';

    // setValue ต้องกำหนดค่าทุก field
    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: '',
    //   },
    //   secret: 'pet',
    //   questionAnswer: '',
    //   gender: 'male',
    // });

    // patchValue กำหนดค่าบาง field
    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName,
      },
      secret: 'pet',
      gender: 'female',
    });
  }

  // onSubmit(form: NgForm) {
  //   console.log(form.value);
  // }

  onSubmit() {
    console.log(this.signupForm);
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secretQuestion = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;

    // this.signupForm.reset(); // Type FormGroup
    this.signupForm.resetForm(); // Type NgForm
  }
}
