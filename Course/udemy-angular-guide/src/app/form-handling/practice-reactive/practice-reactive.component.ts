import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CustomValidators } from './custom.validator';

@Component({
  selector: 'app-practice-reactive',
  templateUrl: './practice-reactive.component.html',
  styleUrls: ['./practice-reactive.component.scss'],
})
export class PracticeReactiveComponent {
  projectStatus: string[] = ['stable', 'critical', 'finished'];
  projectForm: FormGroup;

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      projectName: new FormControl(
        null,
        [Validators.required], //CustomValidators.invalidProjectName],
        CustomValidators.asyncInvalidProjectName
      ),
      projectEmail: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      projectStatus: new FormControl('stable'),
    });
  }

  onSubmit() {
    console.log(this.projectForm.value);
  }

  onCheckProjectName(
    control: FormControl
  ): Observable<{ [s: string]: boolean }> {
    return new Observable((observer) => {
      setTimeout(() => {
        if (control.value === 'Test')
          observer.next({ invalidProjectName: true });
        else observer.next(null);

        observer.complete();
      }, 1500);
    });
  }

  get projectName() {
    return this.projectForm.get('projectName');
  }

  get projectEmail() {
    return this.projectForm.get('projectEmail');
  }
}
