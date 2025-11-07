import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import UserInterface from '../interfaces/user-interface';
import AdressInterface from '../interfaces/adress-interface';
@Component({
  selector: 'app-user-form',
  imports: [],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
})
export class UserForm {
form = new FormGroup({
  name: new FormControl(''),
  surname: new FormControl(''),
  phoneNumber: new FormControl(''),
  birthYear: new FormControl(''),
  street: new FormControl(''),
  houseNumber: new FormControl(''),
  appartmentNumber: new FormControl(''),
  postalCode: new FormControl(''),
  City: new FormControl(''),
})
}
