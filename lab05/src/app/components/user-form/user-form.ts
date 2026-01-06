import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../models/userModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
})
export class UserForm {
  public id: number = 0;
  public username: string = '';
  public surname: string = '';
  public phoneNumber: string = '';
  public birthYear: number = 0;
  public street: string = '';
  public houseNumber: number = 0;
  public appartmentNumber: number = 0;
  public postalCode: string = '';
  public city: string = '';

  public add() {
    const user: User = {
      id: this.id,
      name: this.username,
      surname: this.surname,
      phoneNumber: this.phoneNumber,
      birthYear: this.birthYear,
      adress: {street: this.street,
      houseNumber: this.houseNumber,
      appartmentNumber: this.appartmentNumber,
      postalCode: this.postalCode,
      city: this.city,
      }
    }
    this.userSubmited.emit(user)
  }
  @Output() public userSubmited: EventEmitter<User> = new EventEmitter();
}
