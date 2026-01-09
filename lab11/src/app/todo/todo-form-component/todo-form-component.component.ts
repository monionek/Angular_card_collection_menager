import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoServiceService } from '../../services/todo-service.service';
import { Todo } from '../../../models/todo.model';

@Component({
  selector: 'app-todo-form-component',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './todo-form-component.component.html',
  styleUrl: './todo-form-component.component.scss'
})
export class TodoFormComponentComponent {
  public todoForm: FormGroup;
  constructor(private todoService: TodoServiceService,
    private fb: FormBuilder,
  ) {
    this.todoForm = this.fb.group({
      name: ['', Validators.required],
      isComplete: [false]
    })
  }

  public submit(): void {
    if (this.todoForm.invalid) return;
    const book: Todo = {
      id: Math.floor(Math.random()*100),
      ...this.todoForm.value as Omit<Todo, 'id'>
    }
  }

}
