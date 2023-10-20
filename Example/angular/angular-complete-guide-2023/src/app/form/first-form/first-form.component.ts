import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-first-form',
  templateUrl: './first-form.component.html',
  styleUrls: ['./first-form.component.scss'],
})
export class FirstFormComponent {
  @ViewChild('f') signupForm: NgForm;
  @ViewChild('userData') userData: NgForm;
  defaultOption = 'pet';
  answer = '';
  genders = ['male', 'female'];
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: '',
  };
  submitted = false;

  suggestUsername() {
    const suggestName = 'Superuser';

    // วิธีที่ 1 setValue ต้องกำหนดทุกค่า
    this.signupForm.setValue({
      userData: {
        username: suggestName,
        email: 't@gmail.com',
      },
      secret: 'pet',
      questionAnswer: '',
      gender: 'male',
    });

    // วิธีที่ 2 patchValue กำหนดเฉพาะค่าที่ต้องการได้
    // this.signupForm.form.patchValue({
    //   userData: {
    //     username: suggestName,
    //     email: 't@gmail.com',
    //   },
    //   secret: 'pet',
    // });
  }

  // onSubmit(form: NgForm) {
  //   console.log('submit', form);
  // }

  onSubmit(form: NgForm) {
    // console.log('submit', this.signupForm, this.defaultOption);
    // console.log(this.userData);

    this.submitted = true;
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secretQuestion = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;

    // this.signupForm.reset();
    this.signupForm.resetForm();
  }
}
