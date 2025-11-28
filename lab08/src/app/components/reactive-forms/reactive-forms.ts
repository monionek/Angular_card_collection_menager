import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AddressForm, UserForm } from './user-form.interface';

@Component({
  selector: 'app-reactive-forms',
  imports: [ReactiveFormsModule],
  templateUrl: './reactive-forms.html',
  styleUrl: './reactive-forms.scss',
})
export class ReactiveForms implements OnInit {

  nameControl = new FormControl<string | null>('');

  userForm: FormGroup<UserForm> = new FormGroup(
    {
      firstName: new FormControl<string | null>(''),
      lastName: new FormControl<string | null>('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      email: new FormControl<string | null>('', Validators.email),

      // 🔥 TERAZ TABLICA ADRESÓW
      addresses: new FormArray<FormGroup<AddressForm>>([]),
    },
    { updateOn: 'change' }
  );

  ngOnInit(): void {
    this.userForm.controls.firstName.addValidators(Validators.required);
    this.userForm.controls.firstName.setValue('Hanna');

    // Dodaj przykładowy adres na start:
    this.addAddress();
  }

  // Gettery ułatwiają użycie w HTML
  get addresses(): FormArray<FormGroup<AddressForm>> {
    return this.userForm.get('addresses') as FormArray<FormGroup<AddressForm>>;
  }

  confirm(): void {
    console.log(this.nameControl.value);
  }

  resetFirstName(): void {
    this.userForm.controls.firstName.reset();
  }

  resetForm(): void {
    this.userForm.reset();
  }

  confirmForm(): void {
    console.log(this.userForm.value);
  }

  addAddress(): void {
    this.addresses.push(
      new FormGroup<AddressForm>({
        street: new FormControl<string | null>(''),
        city: new FormControl<string | null>(''),
      })
    );
  }

  removeAddress(index: number): void {
    this.addresses.removeAt(index);
  }

  clearAddresses(): void {
    this.addresses.clear();
  }
}
