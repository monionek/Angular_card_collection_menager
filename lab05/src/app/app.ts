import { Component, signal } from '@angular/core';
import { User } from '../models/userModel';
import { UserForm } from './components/user-form/user-form';
import { UserList } from './components/user-list/user-list';

@Component({
  selector: 'app-root',
  imports: [UserForm, UserList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('lab05');
  
  public userList: User[] = [];

  public addUser(value: User): void {
    value.id = this.userList.length;
    this.userList = [...this.userList, value];
  }

  public removeUser(userId: number): void {
    this.userList = this.userList.filter((user: User) => !(user.id === userId))
  }
}
