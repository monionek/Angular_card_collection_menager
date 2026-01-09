import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoDetailsComponentComponent } from './todo/todo-details-component/todo-details-component.component';
import { TodoFormComponentComponent } from './todo/todo-form-component/todo-form-component.component';
import { TodoListComponentComponent } from './todo/todo-list-component/todo-list-component.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TodoDetailsComponentComponent, TodoFormComponentComponent, TodoListComponentComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'lab11';
}
