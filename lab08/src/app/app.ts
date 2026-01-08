import { Component, signal } from '@angular/core';
import { UserFormComponent } from './components/user-form-component/user-form-component';
import { UserListComponent } from './components/user-list-component/user-list-component';

@Component({
  selector: 'app-root',
  imports: [UserFormComponent, UserListComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('lab08');
}
