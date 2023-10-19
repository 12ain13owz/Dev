import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-practice-template',
  templateUrl: './practice-template.component.html',
  styleUrls: ['./practice-template.component.scss'],
})
export class PracticeTemplateComponent {
  subscriptions: string[] = ['Basic', 'Advanced', 'Pro'];
  onSubmit(form: NgForm) {
    console.log(form.value);
  }
}
