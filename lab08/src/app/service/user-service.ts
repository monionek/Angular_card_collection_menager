import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { User } from '../../models/user';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [];
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const savedUsers = localStorage.getItem('users');
      if (savedUsers) {
        this.users = JSON.parse(savedUsers);
      }
    }
  }
  addUser(user: User): void {
    console.log('dodaje usera')
    console.log(user)
    this.users.push(user);
    this.save();
    console.log(this.users)
  }

  getUsers(): User[] {
    console.log('daje userów')
    console.log(this.users)
    return [...this.users];
  }

  private save(): void {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  deleteUser(id: string): void {
    this.users = this.users.filter((u: User) => u.id !== id);
    this.save()
  }

  deleteAddress(userId: string, addressIndex: number) {
  const user = this.users.find(u => u.id === userId);
  if (!user) return;

  user.addresses.splice(addressIndex, 1);
  this.save();
  }
}