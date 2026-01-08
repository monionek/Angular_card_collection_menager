import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../service/user-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list-component',
  imports: [CommonModule],
  templateUrl: './user-list-component.html',
  styleUrl: './user-list-component.scss',
})
export class UserListComponent implements OnInit {
  public users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  public loadUsers(): void {
    this.users = this.userService.getUsers();
  }

  public deleteUser(id: string): void {
    this.userService.deleteUser(id);
    this.loadUsers();
  }

  public deleteAddress(userId: string, index: number): void {
    this.userService.deleteAddress(userId, index);
    this.loadUsers();
  }
}