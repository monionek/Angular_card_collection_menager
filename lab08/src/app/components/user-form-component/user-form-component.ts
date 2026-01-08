import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../service/user-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form-component',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-form-component.html',
  styleUrl: './user-form-component.scss',
})
export class UserFormComponent {
  userForm: FormGroup;
  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      id: [crypto.randomUUID()],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      addresses: this.fb.array([])
    })
  }
  get addresses(): FormArray {
    return this.userForm.get('addresses') as FormArray;
  }

  createAddress(): FormGroup {
    return this.fb.group({
      street: ['', [Validators.required, Validators.minLength(3)]],
      city: ['', [Validators.required, Validators.minLength(3)]],
      zip: ['', [Validators.required, Validators.pattern(/^\d{2}-\d{3}$/)
      ]]
    })
  }

  addAddress(): void {
    this.addresses.push(this.createAddress())
  }

  removeAddress(index: number): void {
    this.addresses.removeAt(index);
  }

  public submit() {
  if (this.userForm.invalid) return;

  this.userService.addUser(this.userForm.value);
}
}
