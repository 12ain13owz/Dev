import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Observer, debounceTime, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-second-form',
  templateUrl: './second-form.component.html',
  styleUrls: ['./second-form.component.scss'],
})
export class SecondFormComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

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
          this.forbiddenEmail
        ),
        gender: new FormControl('male'),
      }),
      hobbies: new FormArray([]),
    });

    // this.signupForm.valueChanges.subscribe((value) => console.log(value));
    // this.signupForm.statusChanges.subscribe((value) => console.log(value));

    // setValue ต้องกำหนดค่า FormControl ทุกค่า
    this.signupForm.setValue({
      userData: {
        username: 'Max',
        email: 'max@gmail.com',
        gender: 'male',
      },
      hobbies: [],
    });

    // patchValue กำหนดเฉพาะ FormControl ที่ระบุ
    this.signupForm.patchValue({
      userData: {
        username: 'Max',
        email: 'max@gmail.com',
      },
    });
  }

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset({
      userData: {
        gender: 'male',
      },
    });
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    const arrayHobby = this.signupForm.get('hobbies') as FormArray;
    arrayHobby.push(control);
  }

  //  { [s: string]: boolean } return json แบบประการชื่อตัวแปรอะไรก็ได้ Ex. return { nameIsForbidden: true }; || Ex. return { test: true };
  //  { nameIsForbidden : boolean } return json โดยกำหนดชื่อตัวแปร nameIsForbidden Ex. return { nameIsForbidden: true };

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1)
      return { nameIsForbidden: true };
    return null;
  }

  forbiddenEmail(control: FormControl): Promise<any> | Observable<any> {
    // Observable
    return new Observable<any>((observer) => {
      const debounce = setTimeout(() => {
        if (control.value === 'test@test.com')
          observer.next({ emailIsForbidden: true });
        else observer.next(null);
        observer.complete();
      }, 1500);

      return () => clearTimeout(debounce);
    }).pipe(debounceTime(400));

    // Promise
    return new Promise<any>((resolve, reject) => {
      console.log(1);
      setTimeout(() => {
        console.log(2);
        if (control.value === 'test@test.com')
          resolve({ emailIsForbidden: true });
        else resolve(null);
      }, 1500);
    });
  }

  getControls() {
    // แบบที่ 1
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  get controls() {
    // แบบที่ 2
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }
}
