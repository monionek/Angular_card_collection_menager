import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../models/userModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList {
  @Input() userList: User[] = []
  @Output() public userDeleted: EventEmitter<number> = new EventEmitter();

  public emitUserDelete(id: number) {
    this.userDeleted.emit(id);
  }
}
