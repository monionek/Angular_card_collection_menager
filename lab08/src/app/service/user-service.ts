import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { User } from '../../models/user';
// localstorage się za każdym razem resetuje dobrze dodaje usera ale localstorage się resestuje oraz nie wyświetla listcomponent userów za każdym razem dostaj pustą tablice userów idk czm
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [];
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const savedUsers = localStorage.getItem('userData');
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
}