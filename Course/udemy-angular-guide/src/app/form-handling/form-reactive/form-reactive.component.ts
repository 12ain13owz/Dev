import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, debounceTime } from 'rxjs';

@Component({
  selector: 'app-form-reactive',
  templateUrl: './form-reactive.component.html',
  styleUrls: ['./form-reactive.component.scss'],
})
export class FormReactiveComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'John'];

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.forbiddenNames.bind(this),
        ]),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          this.forbiddenEmails
        ),
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([]),
    });

    this.signupForm.valueChanges.subscribe((value) => {
      // แสดงข้อมูลทั้งหมด
      console.log(value);
    });

    this.signupForm.statusChanges.subscribe((value) => {
      // แสดงเฉพาะ status Ex. VALID / INVALID/ PENDING
      console.log(value);
    });

    this.signupForm.setValue({
      userData: {
        username: 'Dryst',
        email: 'test@t.com',
      },
      gender: 'female',
      hobbies: [],
    });

    this.signupForm.patchValue({
      userData: {
        username: 'Anna',
      },
    });
  }

  onSubmit() {
    if (this.signupForm.invalid) return;
    console.log(this.signupForm);
    console.log(this.signupForm.value);
    this.signupForm.reset(); // FormGroup
  }

  onAddHobby() {
    this.signupForm.get('hobbies');

    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  get hobbies() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  // get controls() {
  // แบบที่ 2
  //   return (this.signupForm.get('hobbies') as FormArray).controls;
  // }

  // สร้าง Validators Ex. input ชื่อต้องไม่ตรงกับ forbiddenUsernames = ['Chris', 'John'];
  //  { [s: string]: boolean } return json แบบประการชื่อตัวแปรอะไรก็ได้ Ex. return { nameIsForbidden: true }; || Ex. return { test: true };
  //  { nameIsForbidden : boolean } return json โดยกำหนดชื่อตัวแปร nameIsForbidden Ex. return { nameIsForbidden: true };
  forbiddenNames(control: FormControl): { [s: string]: boolean } | null {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      // ชื่อตัวแปรไว้สำหรับเช็ค error Ex. signupForm.get('userData.username').errors['nameIsForbidden']
      return { nameIsForbidden: true };
    }
    return null;
  }

  // เช็คคำต้องห้าม Email
  forbiddenEmails(
    control: FormControl
  ): Promise<{ [s: string]: boolean }> | Observable<{ [s: string]: boolean }> {
    // Observable
    const observable = new Observable<{ [s: string]: boolean }>((observer) => {
      const checkForbiddienEmail = setTimeout(() => {
        if (control.value === 'test@test.com')
          observer.next({ emailIsForbidden: true });
        else observer.next(null);
        observer.complete();
      }, 1500);

      return () => clearTimeout(checkForbiddienEmail);
    }).pipe(debounceTime(400));

    return observable;

    // Promise
    const promise = new Promise<{ [s: string]: boolean }>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ emailIsForbidden: true });
        } else resolve(null);
      }, 1500);
    });

    return promise;
  }

  // forbiddenEmail(control: FormControl): Promise<any> | Observable<any> {
  //   // Observable
  // return new Observable<any>((observer) => {
  //   const debounce = setTimeout(() => {
  //     if (control.value === 'test@test.com')
  //       observer.next({ emailIsForbidden: true });
  //     else observer.next(null);
  //     observer.complete();
  //   }, 1500);

  //   return () => clearTimeout(debounce);
  // }).pipe(debounceTime(400));

  //   // Promise
  //   return new Promise<any>((resolve, reject) => {
  //     console.log(1);
  //     setTimeout(() => {
  //       console.log(2);
  //       if (control.value === 'test@test.com')
  //         resolve({ emailIsForbidden: true });
  //       else resolve(null);
  //     }, 1500);
  //   });
  // }
}
