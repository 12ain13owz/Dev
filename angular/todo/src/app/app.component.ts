import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface TodoList {
  todo: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  form: FormGroup = new FormGroup({
    todo: new FormControl(''),
  });

  todoList: TodoList[] = [];

  addTodo() {
    const todo = this.form.controls['todo'].value;
    if (!todo) return;

    this.todoList.push({ todo, completed: false });
    this.form.controls['todo'].setValue('');
  }

  removeTodo(index: number) {
    this.todoList.splice(index, 1);
  }

  changeComplete(index: number) {
    this.todoList[index].completed = !this.todoList[index].completed;
  }
}
