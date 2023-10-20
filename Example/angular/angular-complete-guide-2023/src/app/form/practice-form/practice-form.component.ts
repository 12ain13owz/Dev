import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-practice-form',
  templateUrl: './practice-form.component.html',
  styleUrls: ['./practice-form.component.scss'],
})
export class PracticeFormComponent {
  subscriptions: string[] = ['Basic', 'Advanced', 'Prp'];
  onSubmit(form: NgForm) {
    console.log(form.value);
  }
}
